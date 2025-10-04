package com.jarvis.RetrieveEx.controller;

import com.jarvis.RetrieveEx.model.Item;
import com.jarvis.RetrieveEx.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:5173")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    // POST endpoint from Feature 1 (no changes needed)
    @PostMapping
    public ResponseEntity<Item> createItem(@RequestBody Item item) {
        try {
            item.setStatus("pending_approval");
            Item savedItem = itemRepository.save(item);
            return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // NEW: GET endpoint to fetch all items pending approval
    @GetMapping("/pending")
    public ResponseEntity<List<Item>> getPendingItems() {
        try {
            List<Item> pendingItems = itemRepository.findByStatus("pending_approval");
            return new ResponseEntity<>(pendingItems, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //PATCH endpoint to update the status of an item
    @PatchMapping("/{id}/status")
    public ResponseEntity<Item> updateItemStatus(@PathVariable UUID id, @RequestBody Map<String, String> statusUpdate) {
        Optional<Item> itemData = itemRepository.findById(id);

        if (itemData.isPresent()) {
            Item item = itemData.get();
            String newStatus = statusUpdate.get("status");

            // Basic validation for the new status
            if ("approved".equals(newStatus) || "rejected".equals(newStatus)) {
                item.setStatus(newStatus);
                return new ResponseEntity<>(itemRepository.save(item), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Invalid status value
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Item with the given ID not found
        }
    }
}
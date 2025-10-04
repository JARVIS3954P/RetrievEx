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
    

    @PostMapping // POST endpoint from Feature 1
    public ResponseEntity<Item> createItem(@RequestBody Item item) {
        try {
            item.setStatus("pending_approval");
            Item savedItem = itemRepository.save(item);
            return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/pending") // GET endpoint from Feature 2
    public ResponseEntity<List<Item>> getPendingItems() {
        try {
            List<Item> pendingItems = itemRepository.findByStatus("pending_approval");
            return new ResponseEntity<>(pendingItems, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/{id}/status") // PATCH endpoint from Feature 2
    public ResponseEntity<Item> updateItemStatus(@PathVariable UUID id, @RequestBody Map<String, String> statusUpdate) {
        Optional<Item> itemData = itemRepository.findById(id);
        if (itemData.isPresent()) {
            Item item = itemData.get();
            String newStatus = statusUpdate.get("status");
            if ("approved".equals(newStatus) || "rejected".equals(newStatus)) {
                item.setStatus(newStatus);
                return new ResponseEntity<>(itemRepository.save(item), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // NEW: GET endpoint to fetch all publicly approved items
    @GetMapping("/approved")
    public ResponseEntity<List<Item>> getApprovedItems() {
        try {
            List<Item> approvedItems = itemRepository.findByStatus("approved");
            return new ResponseEntity<>(approvedItems, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // NEW: PATCH endpoint for a user to claim an item
    @PatchMapping("/{id}/claim")
    public ResponseEntity<Item> claimItem(@PathVariable UUID id, @RequestBody Map<String, String> claimDetails) {
        Optional<Item> itemData = itemRepository.findById(id);
        String claimantEmail = claimDetails.get("claimantEmail");

        if (claimantEmail == null || claimantEmail.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Claimant email is required
        }

        if (itemData.isPresent()) {
            Item item = itemData.get();
            // Ensure only approved items can be claimed
            if ("approved".equals(item.getStatus())) {
                item.setStatus("claimed");
                item.setClaimantId(claimantEmail); // Storing email in claimantId field
                Item updatedItem = itemRepository.save(item);
                // Simulate notification
                System.out.println("Notification: Item with ID " + id + " has been claimed by " + claimantEmail);
                return new ResponseEntity<>(updatedItem, HttpStatus.OK);
            } else {
                // Item is not in a claimable state (e.g., already claimed or pending)
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
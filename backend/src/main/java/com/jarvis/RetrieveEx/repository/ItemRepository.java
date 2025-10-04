package com.jarvis.RetrieveEx.repository;

import com.jarvis.RetrieveEx.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List; // Import List
import java.util.UUID;

@Repository
public interface ItemRepository extends JpaRepository<Item, UUID> {
    // This method will automatically generate a query: "SELECT * FROM items WHERE status = ?"
    List<Item> findByStatus(String status);
}
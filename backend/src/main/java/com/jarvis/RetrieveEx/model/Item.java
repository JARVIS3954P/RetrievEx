package com.jarvis.RetrieveEx.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

@Data // Lombok annotation for getters, setters, etc.
@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(name = "reporter_email")
    private String reporterEmail;

    @Column(nullable = false)
    private String status = "pending_approval";

    @Column(name = "claimant_id")
    private String claimantId;
}
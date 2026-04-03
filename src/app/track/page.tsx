
"use client";

import React, { useState } from "react";
import styles from "@/styles/PageLayout.module.css";

export default function TrackOrder() {
    const [orderId, setOrderId] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<string | null>(null);

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulation
        if (orderId.toUpperCase().startsWith("VC")) {
            setStatus("In Transit - Arriving within 2 days");
        } else {
            setStatus("Order Not Found. Please check your credentials.");
        }
    };

    return (
        <div className={styles.page}>
            <header className={styles.hero}>
                <div className="container">
                    <h1>Track Order</h1>
                    <p>Enter your order details to see current status.</p>
                </div>
            </header>
            <div className="container" style={{ maxWidth: '600px', padding: '4rem 1rem' }}>
                <form onSubmit={handleTrack} style={{ display: 'grid', gap: '1.5rem', background: 'rgba(0,0,0,0.03)', padding: '2.5rem', borderRadius: '12px' }}>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Order ID</label>
                        <input
                            type="text"
                            placeholder="VC123ABCD"
                            required
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
                        />
                    </div>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                        Track My Shipment
                    </button>
                    {status && (
                        <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #eee', textAlign: 'center' }}>
                            <p style={{ fontWeight: 700, color: 'var(--primary)' }}>{status}</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}


"use client";

import React, { useState } from "react";
import styles from "@/styles/PageLayout.module.css";
import Link from "next/link";

export default function GoldMembership() {
    const [joined, setJoined] = useState(false);

    return (
        <div className={styles.page}>
            <header className={styles.hero} style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#000' }}>
                <div className="container">
                    <h1>VisionCraft Gold</h1>
                    <p>Unlock elite rewards, unlimited eye tests, and priority customer care.</p>
                </div>
            </header>
            <div className="container" style={{ padding: '6rem 1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    <div style={{ padding: '2.5rem', background: '#f8f9fa', borderRadius: '16px', border: '1px solid #eee' }}>
                        <h2 style={{ marginBottom: '1.5rem', color: '#000' }}>Membership Tiers</h2>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1rem' }}>
                            <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <span style={{ color: '#FFD700' }}>✔</span> Unlimited Home Eye Tests
                            </li>
                            <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <span style={{ color: '#FFD700' }}>✔</span> 15% Additional Discount on all frames
                            </li>
                            <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <span style={{ color: '#FFD700' }}>✔</span> Priority 24-Hour Shipping
                            </li>
                            <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <span style={{ color: '#FFD700' }}>✔</span> Accidental Damage Warranty
                            </li>
                        </ul>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', fontWeight: 800, color: '#000', marginBottom: '1rem' }}>₹999<span style={{ fontSize: '1rem', fontWeight: 500, color: '#666' }}> / year</span></div>
                        <p style={{ color: '#666', marginBottom: '2.5rem' }}>Join 500,000+ members enjoying premium eye care every single day across India.</p>
                        <button
                            className="btn btn-primary"
                            style={{ height: 'auto', padding: '1.25rem 3rem', background: joined ? '#28a745' : '#000', borderRadius: '50px', transition: 'all 0.3s ease' }}
                            onClick={() => setJoined(true)}
                        >
                            {joined ? "You are now a Gold Member!" : "Join Gold Membership"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

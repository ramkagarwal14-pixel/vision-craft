
"use client";

import React, { useState } from "react";
import styles from "@/styles/PageLayout.module.css";

const MOCK_STORES = [
    { id: 1, name: "Flagship Store - Mumbai", address: "Plot No. 12, BKC Complex, Mumbai 400051", tel: "+91 (22) 555-0100" },
    { id: 2, name: "City Plaza - Delhi", address: "Level 1, DLF Mall of India, Noida 201301", tel: "+91 (11) 555-0200" },
    { id: 3, name: "Tech Hub - Bangalore", address: "Indiranagar 100 Ft Rd, Bangalore 560038", tel: "+91 (80) 555-0300" },
];

export default function StoreLocator() {
    const [mapEnabled, setMapEnabled] = useState(false);
    const [loadingMap, setLoadingMap] = useState(false);

    return (
        <div className={styles.page}>
            <header className={styles.hero}>
                <div className="container">
                    <h1>Store Locator</h1>
                    <p>Find a VisionCraft store near you with ease.</p>
                </div>
            </header>
            <div className="container" style={{ padding: '6rem 1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '4rem', alignItems: 'start' }}>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div style={{ padding: '2.5rem', background: '#f8f9fa', borderRadius: '16px', border: '1px solid #eee' }}>
                            <h3 style={{ marginBottom: '1.5rem', color: '#000' }}>Store Directory</h3>
                            <div style={{ display: 'grid', gap: '2rem' }}>
                                {MOCK_STORES.map(store => (
                                    <div key={store.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
                                        <h4 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{store.name}</h4>
                                        <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.25rem' }}>{store.address}</p>
                                        <p style={{ fontSize: '0.875rem', color: '#000', fontWeight: 600 }}>Tel: {store.tel}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: '550px', background: '#e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
                        {mapEnabled ? (
                            <iframe
                                title="VisionCraft Mumbai Flagship"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.83510!2d72.8631!3d19.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8ef4a47fb81%3A0x6739983998f5a67!2sVisionCraft+Eyewear,+BKC,+Mumbai+Flagship!5e0!3m2!1sen!2sin!4v1711425000000"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        ) : (
                            <>
                                <div style={{ position: 'absolute', padding: '1rem', background: 'rgba(255,255,255,0.9)', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', top: '2rem', left: '2rem', zIndex: 5 }}>
                                    <p style={{ fontWeight: 600, fontSize: '0.8125rem', color: '#000' }}>Live Map Preview</p>
                                </div>
                                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" alt="Map Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                                <div
                                    style={{ position: 'absolute', zIndex: 10, background: loadingMap ? 'var(--primary)' : 'rgba(0,0,0,0.9)', color: 'white', padding: '1.25rem 2.5rem', borderRadius: '100px', fontWeight: 600, fontSize: '0.9375rem', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
                                    onClick={() => {
                                        setLoadingMap(true);
                                        setTimeout(() => {
                                            setLoadingMap(false);
                                            setMapEnabled(true);
                                        }, 1500);
                                    }}
                                >
                                    {loadingMap ? "Connecting to Satellite..." : "Activate Interactive Map"}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div >
        </div >
    );
}

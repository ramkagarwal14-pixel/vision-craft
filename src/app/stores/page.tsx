import styles from "@/styles/PageLayout.module.css";

export default function StoreLocator() {
    return (
        <div className={styles.page}>
            <header className={styles.hero}>
                <div className="container">
                    <h1>Store Locator</h1>
                    <p>Find a VisionCraft store near you.</p>
                </div>
            </header>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.section}>
                        <div style={{ width: '100%', height: '450px', background: '#e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}>
                            <p style={{ fontWeight: '600' }}>Google Maps Integration Placeholder</p>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <h3>Flagship Store - NYC</h3>
                        <p>123 Eyewear Ave, New York, NY 10001</p>
                        <p>Tel: +1 (212) 555-0199</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

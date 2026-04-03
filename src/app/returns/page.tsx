import styles from "@/styles/PageLayout.module.css";

export default function Returns() {
    return (
        <div className={styles.page}>
            <header className={styles.hero}>
                <div className="container">
                    <h1>Returns & Exchanges</h1>
                    <p>Hassle-free returns within 30 days of purchase.</p>
                </div>
            </header>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.section}>
                        <h2>The VisionCraft Guarantee</h2>
                        <p>We want you to love your new eyewear. If you're not completely satisfied, you can return your items for a full refund or exchange within 30 days.</p>
                    </div>
                    <div className={styles.section}>
                        <h2>How to Return</h2>
                        <ul>
                            <li>Visit our Return Portal and enter your order number.</li>
                            <li>Download and print your pre-paid shipping label.</li>
                            <li>Pack the items securely in their original packaging.</li>
                            <li>Drop off the package at any authorized shipping location.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

import styles from "@/styles/PageLayout.module.css";

export default function Shipping() {
    return (
        <div className={styles.page}>
            <header className={styles.hero}>
                <div className="container">
                    <h1>Shipping Information</h1>
                    <p>Fast and reliable shipping to your doorstep.</p>
                </div>
            </header>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.section}>
                        <h2>Domestic Shipping</h2>
                        <p>We offer free standard shipping on all orders within the United States.</p>
                        <ul>
                            <li>Standard (5-7 business days): FREE</li>
                            <li>Expedited (2-3 business days): $15.00</li>
                            <li>Overnight (1 business day): $30.00</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

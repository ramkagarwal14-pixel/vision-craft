import styles from "@/styles/PageLayout.module.css";

export default function Sustainability() {
    return (
        <div className={styles.page}>
            <header className={styles.hero}>
                <div className="container">
                    <h1>Sustainability</h1>
                    <p>Building a clearer future, one frame at a time.</p>
                </div>
            </header>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.section}>
                        <h2>Eco-Friendly Materials</h2>
                        <p>Our bio-acetate frames are made from renewable resources like wood pulp and cotton fibers, making them 100% biodegradable.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

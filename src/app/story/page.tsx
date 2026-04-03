import styles from "@/styles/PageLayout.module.css";

export default function OurStory() {
    return (
        <div className={styles.page}>
            <header className={styles.hero}>
                <div className="container">
                    <h1>Our Story</h1>
                    <p>Designed in New York, Made for Everyone.</p>
                </div>
            </header>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.section}>
                        <h2>The Beginning</h2>
                        <p>VisionCraft was founded on a simple idea: premium eyewear shouldn't cost a fortune. We cut out the middlemen to bring you the highest quality designs at a fraction of the price.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

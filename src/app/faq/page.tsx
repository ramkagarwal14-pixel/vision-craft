import styles from "@/styles/PageLayout.module.css";

export default function FAQ() {
    const faqs = [
        { q: "How do I know my frame size?", a: "Most frames have three numbers printed on the inside of the temple (e.g., 52-18-145). These represent the lens width, bridge width, and temple length respectively." },
        { q: "Do you offer prescription lenses?", a: "Yes, we offer a wide range of prescription options including single vision, progressives, and bifocals." },
        { q: "How long does shipping take?", a: "Standard shipping typically takes 5-7 business days. Express shipping is available for 2-3 business day delivery." },
        { q: "What is your return policy?", a: "We offer a 30-day, no-questions-asked return policy on all our eyewear." }
    ];

    return (
        <div className={styles.page}>
            <header className={styles.hero}>
                <div className="container">
                    <h1>Frequently Asked Questions</h1>
                    <p>Everything you need to know about VisionCraft eyewear and services.</p>
                </div>
            </header>
            <div className="container">
                <div className={styles.content}>
                    {faqs.map((faq, i) => (
                        <div key={i} className={styles.faqItem}>
                            <span className={styles.faqQuestion}>{faq.q}</span>
                            <p>{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

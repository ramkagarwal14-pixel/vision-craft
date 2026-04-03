import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.uspRibbon}>
                <div className="container">
                    <div className={styles.uspContent}>
                        <div className={styles.uspItem}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                            <span>100% Authentic</span>
                        </div>
                        <div className={styles.uspItem}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                            <span>Free Express Delivery</span>
                        </div>
                        <div className={styles.uspItem}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"></path><path d="M9 22V12h6v10"></path><path d="M2 10.6L12 2l10 8.6"></path></svg>
                            <span>Home Eye Checkup</span>
                        </div>
                        <div className={styles.uspItem}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                            <span>14 Day Exchange</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            VisionCraft
                        </Link>
                        <p className={styles.description}>
                            Establishing a new standard in high-end eyewear. Precision, performance, and unparalleled aesthetics for the modern professional.
                        </p>
                    </div>

                    <div className={styles.grid}>
                        <div className={styles.column}>
                            <h4>Curation</h4>
                            <ul>
                                <li><Link href="/shop?category=MEN">Men's Atelier</Link></li>
                                <li><Link href="/shop?category=WOMEN">Women's Collection</Link></li>
                                <li><Link href="/shop?category=UNISEX">Shared Designs</Link></li>
                                <li><Link href="/shop">The Archive</Link></li>
                            </ul>
                        </div>

                        <div className={styles.column}>
                            <h4>Maison</h4>
                            <ul>
                                <li><Link href="/story">Our Heritage</Link></li>
                                <li><Link href="/sustainability">Craftsmanship</Link></li>
                                <li><Link href="/membership">Gold Membership</Link></li>
                                <li><Link href="/locator">Boutique Finder</Link></li>
                            </ul>
                        </div>

                        <div className={styles.column}>
                            <h4>Concierge</h4>
                            <ul>
                                <li><Link href="/faq">Support</Link></li>
                                <li><Link href="/track">Track Shipment</Link></li>
                                <li><Link href="/shipping">Privacy Policy</Link></li>
                                <li><Link href="/contact">Direct Inquiry</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} VisionCraft Eyewear Group. All rights reserved.</p>
                    <div className={styles.social}>
                        <Link href="#" aria-label="Instagram">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </Link>
                        <Link href="#" aria-label="Twitter">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                        </Link>
                        <Link href="#" aria-label="LinkedIn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}


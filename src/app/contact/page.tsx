"use client";

import styles from "./Contact.module.css";
import { useState } from "react";
import Link from "next/link";

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className={styles.page}>
            <header className={styles.hero}>
                <div className="container">
                    <span className="badge" style={{ marginBottom: '1.5rem' }}>Get in Touch</span>
                    <h1>Contact the Experts</h1>
                    <p>Whether you need a style consultation or have a question about your vision, our team is here to assist you.</p>
                </div>
            </header>

            <div className="container">
                <div className={styles.contactGrid}>
                    <div className={styles.info}>
                        <div className={styles.infoSection}>
                            <h2>How can we help?</h2>
                            <div className={styles.contactItem}>
                                <div className={styles.contactIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                </div>
                                <div className={styles.contactText}>
                                    <h4>Email Us</h4>
                                    <p>concierge@visioncraft.in</p>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>Response within 24 hours</p>
                                </div>
                            </div>
                            <div className={styles.contactItem}>
                                <div className={styles.contactIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                </div>
                                <div className={styles.contactText}>
                                    <h4>Call Us</h4>
                                    <p>+91 (80) 4567-8901</p>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>Mon-Sat, 10am - 8pm IST</p>
                                </div>
                            </div>
                            <div className={styles.contactItem}>
                                <div className={styles.contactIcon}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                </div>
                                <div className={styles.contactText}>
                                    <h4>Our Flagship</h4>
                                    <p>Plot No. 12, BKC Complex<br />Mumbai, MH 400051</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.formContainer}>
                        {submitted ? (
                            <div className={styles.success}>
                                <div className={styles.successIcon}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                <h2>Message Sent</h2>
                                <p>Thank you for reaching out. A specialist will be in touch with you shortly.</p>
                                <button className="btn btn-outline" style={{ margin: '0 auto' }} onClick={() => setSubmitted(false)}>Send Another Message</button>
                            </div>
                        ) : (
                            <form className={styles.form} onSubmit={handleSubmit}>
                                <div className={styles.field}>
                                    <label htmlFor="name">Full Name</label>
                                    <input type="text" id="name" required placeholder="John Doe" />
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor="email">Email Address</label>
                                    <input type="email" id="email" required placeholder="john@example.com" />
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor="subject">Subject</label>
                                    <input type="text" id="subject" required placeholder="Question about order" />
                                </div>
                                <div className={styles.field}>
                                    <label htmlFor="message">How can we help?</label>
                                    <textarea id="message" rows={6} required placeholder="Tell us more about your request..."></textarea>
                                </div>
                                <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>Send Message</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


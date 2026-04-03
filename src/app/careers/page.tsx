"use client";

import styles from "@/styles/PageLayout.module.css";
import { useState } from "react";

export default function Careers() {
    const [applied, setApplied] = useState(false);

    return (
        <div className={styles.page}>
            <header className={styles.hero}>
                <div className="container">
                    <h1>Join the Vision</h1>
                    <p>Help us redefine how the world sees.</p>
                </div>
            </header>
            <div className="container">
                <div className={styles.content}>
                    {applied ? (
                        <div className={styles.success}>
                            <h2>Application Received!</h2>
                            <p>Thank you for your interest in VisionCraft. Our HR team will review your CV and get in touch if there's a match.</p>
                        </div>
                    ) : (
                        <form className={styles.form} onSubmit={(e) => { e.preventDefault(); setApplied(true); }}>
                            <div className={styles.field}>
                                <label>Full Name</label>
                                <input type="text" required />
                            </div>
                            <div className={styles.field}>
                                <label>Email</label>
                                <input type="email" required />
                            </div>
                            <div className={styles.field}>
                                <label>Department</label>
                                <select className={styles.select}>
                                    <option>Design</option>
                                    <option>Engineering</option>
                                    <option>Marketing</option>
                                    <option>Retail</option>
                                </select>
                            </div>
                            <div className={styles.field}>
                                <label>Upload CV (PDF/Doc)</label>
                                <input type="file" required accept=".pdf,.doc,.docx" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit Application</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

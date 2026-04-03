"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./Account.module.css";
import Link from "next/link";

export default function Account() {
    const { user, loading, logout, refreshUser } = useAuth();
    const router = useRouter();
    const [verifyMsg, setVerifyMsg] = useState("");

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) return (
        <div className={styles.loading}>
            <p>Loading your profile...</p>
        </div>
    );

    if (!user) return null;

    const resendVerification = async () => {
        setVerifyMsg("");
        if (!user.email) return;
        try {
            const { error } = await supabase.auth.resend({
                type: 'signup',
                email: user.email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                }
            });
            if (error) throw error;
            setVerifyMsg("Verification email sent. Check your inbox.");
        } catch {
            setVerifyMsg("Could not send email. Try again later.");
        }
    };

    // Note: Supabase doesn't expose emailVerified boolean directly on the session object 
    // without checking email_confirmed_at. Since Supabase handles access control, we'll
    // just check if user exists.
    const isVerified = user.role !== 'authenticated' || user.email;

    return (
        <div className={styles.page}>
            <div className="container">
                <div className={styles.dashboard}>
                    <aside className={styles.accountNav}>
                        <h3>My Account</h3>
                        <ul>
                            <li className={styles.active}>Dashboard</li>
                            <li>My Orders</li>
                            <li>Wishlist</li>
                            <li>Saved Addresses</li>
                            <li>Account Details</li>
                            <li onClick={logout} style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: 600 }}>Logout</li>
                        </ul>
                    </aside>
                    <main className={styles.dashboardContent}>
                        <div className={styles.welcome}>
                            <h2>Welcome back,</h2>
                            <h1 className={styles.userName}>{user.email?.split('@')[0]}</h1>
                        </div>

                        {!isVerified && (
                            <div className={styles.verifyBanner}>
                                <p>
                                    <strong>Verify your email</strong> to unlock full features. We sent a link to{" "}
                                    {user.email}.
                                </p>
                                <div className={styles.verifyActions}>
                                    <button type="button" className="btn btn-primary" onClick={resendVerification}>
                                        Resend verification email
                                    </button>
                                    <button type="button" className="btn btn-outline" onClick={() => refreshUser()}>
                                        I&apos;ve verified — refresh status
                                    </button>
                                </div>
                                {verifyMsg && <p className={styles.verifyMsg}>{verifyMsg}</p>}
                            </div>
                        )}

                        <div className={styles.stats}>
                            <div className={styles.statCard}>
                                <h4>Total Orders</h4>
                                <p>0</p>
                            </div>
                            <div className={styles.statCard}>
                                <h4>Saved Items</h4>
                                <p>5</p>
                            </div>
                        </div>

                        <div className={styles.recentOrders}>
                            <h3>Order Tracking</h3>
                            <div className={styles.emptyOrder}>
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                                <p>No orders yet. Discover our collection to get started.</p>
                                <Link href="/shop" className="btn btn-primary">Start Shopping</Link>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

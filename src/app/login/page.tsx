"use client";

import { Suspense, useState } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Login.module.css";
import Link from "next/link";

function LoginForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [info, setInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setInfo("");

        if (!auth) {
            setError("Firebase configuration is missing. Set NEXT_PUBLIC_* keys in .env.local.");
            return;
        }

        setLoading(true);

        try {
            if (isLogin) {
                const cred = await signInWithEmailAndPassword(auth, email, password);
                if (!cred.user.emailVerified) {
                    setInfo(
                        "This email is not verified yet. Check your inbox for the link, or we can resend it from your account page after sign-in."
                    );
                }
                router.push(redirectTo);
            } else {
                const cred = await createUserWithEmailAndPassword(auth, email, password);
                await sendEmailVerification(cred.user);
                setInfo(
                    "Account created. We sent a verification link to your email — please confirm it before checkout."
                );
                router.push(redirectTo);
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        if (!auth) {
            setError("Firebase configuration is missing. Set NEXT_PUBLIC_* keys in .env.local.");
            return;
        }
        setError("");
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            router.push(redirectTo);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Google Sign-In failed.";
            setError(message);
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.card}>
                <h1 className={styles.title}>{isLogin ? "Welcome back" : "Create account"}</h1>
                <p className={styles.subtitle}>
                    {isLogin
                        ? "Sign in to your VisionCraft account to checkout and track orders."
                        : "Register with email — we’ll send a quick verification link for secure checkout."}
                </p>

                {error && <div className={styles.error}>{error}</div>}
                {info && <div className={styles.info}>{info}</div>}

                <button type="button" onClick={handleGoogleSignIn} className={styles.googleBtn}>
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Continue with Google
                </button>

                <div className={styles.divider}>
                    <span>or use email</span>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Email address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            autoComplete="email"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min. 8 characters"
                            autoComplete={isLogin ? "current-password" : "new-password"}
                        />
                    </div>
                    <button type="submit" disabled={loading} className={styles.submitBtn}>
                        {loading ? "Processing…" : isLogin ? "Sign in" : "Sign up & verify email"}
                    </button>
                </form>

                <div className={styles.switch}>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button type="button" onClick={() => { setIsLogin(!isLogin); setInfo(""); setError(""); }}>
                        {isLogin ? "Sign up" : "Sign in"}
                    </button>
                </div>

                <p className={styles.footerNote}>
                    Prices are in <strong>Indian Rupees (INR)</strong>.{" "}
                    <Link href="/shop">Browse spectacles</Link>
                </p>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className={styles.loginPage}><div className={styles.card}>Loading…</div></div>}>
            <LoginForm />
        </Suspense>
    );
}

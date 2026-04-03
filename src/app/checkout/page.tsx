"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatINR } from "@/lib/currency";
import { getSpectacleImageUrl } from "@/lib/spectacleImages";
import styles from "./Checkout.module.css";

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const { user, loading: authLoading, refreshUser } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderNumber, setOrderNumber] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [emailDemo, setEmailDemo] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const taxes = Math.round(cartTotal * 0.18);
    const total = cartTotal + taxes;

    useEffect(() => {
        if (user && formRef.current) {
            const emailInput = formRef.current.querySelector("#email") as HTMLInputElement | null;
            if (emailInput && !emailInput.value && user.email) {
                emailInput.value = user.email;
            }
        }
    }, [user]);

    if (authLoading) {
        return (
            <div className={styles.checkoutPage}>
                <div className="container" style={{ textAlign: "center", padding: "100px 0" }}>
                    <p className={styles.muted}>Loading…</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className={styles.checkoutPage}>
                <div className={styles.authGate}>
                    <h1 className={styles.summaryTitle}>Sign in to checkout</h1>
                    <p className={styles.muted}>
                        Create an account or sign in to place an order. We&apos;ll send order updates to your verified email.
                    </p>
                    <div className={styles.authActions}>
                        <Link href="/login?redirect=/checkout" className="btn btn-primary">
                            Sign in or register
                        </Link>
                        <Link href="/shop" className="btn btn-outline">
                            Continue shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }



    if (cart.length === 0 && !orderPlaced) {
        return (
            <div className={styles.checkoutPage}>
                <div className="container" style={{ textAlign: "center", padding: "100px 0" }}>
                    <h1 className={styles.summaryTitle}>Your cart is empty</h1>
                    <p style={{ marginBottom: "2rem", color: "var(--text-muted)" }}>
                        Add frames to your bag before checking out.
                    </p>
                    <Link href="/shop" className="btn btn-primary">
                        Go to shop
                    </Link>
                </div>
            </div>
        );
    }

    const sendOrderEmail = async (
        email: string,
        firstName: string,
        lastName: string,
        orderId: string
    ) => {
        const items = cart.map((item) => ({
            name: item.product.name,
            variantName: item.variant.name,
            quantity: item.quantity,
            lineTotal: item.product.price * item.quantity,
        }));

        try {
            const res = await fetch("/api/order-confirmation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    firstName,
                    lastName,
                    orderId,
                    items,
                    subtotal: cartTotal,
                    taxes,
                    total,
                    siteUrl: typeof window !== "undefined" ? window.location.origin : "",
                }),
            });
            const data = await res.json();
            if (res.ok && data.ok) {
                if (data.demo) {
                    setEmailDemo(true);
                } else {
                    setEmailSent(true);
                }
            }
        } catch {
            console.warn("Order email request failed");
        }
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setEmailDemo(false);

        const form = formRef.current;
        if (!form) return;

        const firstName = (form.querySelector("#firstName") as HTMLInputElement).value;
        const lastName = (form.querySelector("#lastName") as HTMLInputElement).value;
        const email = (form.querySelector("#email") as HTMLInputElement).value;

        if (user.email && email.toLowerCase() !== user.email.toLowerCase()) {
            setLoading(false);
            alert("Use the same email as your signed-in account for this order.");
            return;
        }

        const orderId =
            "VC" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();

        await sendOrderEmail(email, firstName, lastName, orderId);

        setOrderNumber(orderId);
        setOrderPlaced(true);
        setLoading(false);
        clearCart();
    };

    if (orderPlaced) {
        return (
            <div className={styles.checkoutPage}>
                <div className={styles.confirmationPage}>
                    <div className={styles.confirmationCard}>
                        <div className={styles.confirmIcon}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <h1>Order confirmed</h1>
                        <p className={styles.confirmSub}>Thank you — your spectacles order is received.</p>

                        <div className={styles.orderMeta}>
                            <div className={styles.metaItem}>
                                <span>Order number</span>
                                <strong>#{orderNumber}</strong>
                            </div>
                            <div className={styles.metaItem}>
                                <span>Total</span>
                                <strong>{formatINR(total)}</strong>
                            </div>
                        </div>

                        {emailSent ? (
                            <p className={styles.emailNote}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="M22 7l-10 7L2 7" />
                                </svg>
                                A confirmation email has been sent to your inbox.
                            </p>
                        ) : emailDemo ? (
                            <p className={styles.emailNote}>
                                Order saved. To receive real emails, add{" "}
                                <code style={{ fontSize: "0.85em" }}>RESEND_API_KEY</code> in{" "}
                                <code style={{ fontSize: "0.85em" }}>.env.local</code>.
                            </p>
                        ) : (
                            <p className={styles.emailNote}>
                                Order confirmed. If you don&apos;t see an email, check spam or contact support.
                            </p>
                        )}

                        <div className={styles.confirmActions}>
                            <Link href="/shop" className="btn btn-primary">
                                Continue shopping
                            </Link>
                            <Link href="/" className="btn btn-outline" style={{ borderColor: "var(--border)" }}>
                                Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.checkoutPage}>
            <div className={styles.container}>
                <div className={styles.leftColumn}>
                    <Link href="/cart" className={styles.backToCart}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Back to cart
                    </Link>

                    <form ref={formRef} onSubmit={handlePlaceOrder} className={styles.section}>
                        <div className={styles.sectionTitle}>
                            <span>1</span>
                            Shipping details
                        </div>
                        <div className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="firstName">First name</label>
                                <input type="text" id="firstName" required placeholder="Rahul" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="lastName">Last name</label>
                                <input type="text" id="lastName" required placeholder="Sharma" />
                            </div>
                            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                <label htmlFor="email">Email (must match your account)</label>
                                <input type="email" id="email" required placeholder="you@example.com" defaultValue={user.email || ""} />
                            </div>
                            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                <label htmlFor="address">Address</label>
                                <input type="text" id="address" required placeholder="Street, area" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="city">City</label>
                                <input type="text" id="city" required placeholder="Mumbai" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="zip">PIN code</label>
                                <input type="text" id="zip" required placeholder="400001" />
                            </div>
                        </div>

                        <div className={styles.sectionTitle} style={{ marginTop: "2rem" }}>
                            <span>2</span>
                            Payment (demo)
                        </div>
                        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
                            Demo checkout only — no real card charge. Prices are in Indian Rupees (INR).
                        </p>
                        <div className={styles.form}>
                            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                <label htmlFor="card">Card number</label>
                                <input type="text" id="card" required placeholder="0000 0000 0000 0000" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="expiry">Expiry</label>
                                <input type="text" id="expiry" required placeholder="MM/YY" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="cvc">CVC</label>
                                <input type="text" id="cvc" required placeholder="123" />
                            </div>
                        </div>

                        <button type="submit" className={styles.placeOrderBtn} disabled={loading}>
                            {loading ? "Processing…" : "Place order"}
                        </button>
                    </form>
                </div>

                <div className={styles.rightColumn}>
                    <div className={styles.summaryCard}>
                        <h2 className={styles.summaryTitle}>Order summary</h2>
                        <div className={styles.lineItems}>
                            {cart.map((item) => (
                                <div key={`${item.product.id}-${item.variant.name}`} className={styles.lineItem}>
                                    <div className={styles.itemThumb}>
                                        <Image
                                            src={getSpectacleImageUrl(item.product.id, item.variant.name)}
                                            alt={item.product.name}
                                            fill
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    <div className={styles.itemDetails}>
                                        <p className={styles.itemName}>{item.product.name}</p>
                                        <p className={styles.itemMeta}>
                                            Color: {item.variant.name} · Qty: {item.quantity}
                                        </p>
                                    </div>
                                    <p className={styles.itemPrice}>{formatINR(item.product.price * item.quantity)}</p>
                                </div>
                            ))}
                        </div>

                        <div className={styles.totals}>
                            <div className={styles.totalRow}>
                                <span>Subtotal</span>
                                <span>{formatINR(cartTotal)}</span>
                            </div>
                            <div className={styles.totalRow}>
                                <span>Shipping</span>
                                <span style={{ color: "var(--primary)", fontWeight: 600 }}>FREE</span>
                            </div>
                            <div className={styles.totalRow}>
                                <span>GST (est.)</span>
                                <span>{formatINR(taxes)}</span>
                            </div>
                            <div className={styles.grandTotal}>
                                <span>Total</span>
                                <span>{formatINR(total)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

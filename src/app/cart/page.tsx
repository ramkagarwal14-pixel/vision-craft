"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/currency";
import { getSpectacleImageUrl } from "@/lib/spectacleImages";
import styles from "./Cart.module.css";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    return (
        <div className={styles.cartPage}>
            <div className="container">
                <h1 className={styles.title}>Your shopping bag</h1>

                {cart.length > 0 ? (
                    <div className={styles.layout}>
                        <div className={styles.items}>
                            {cart.map((item) => (
                                <div key={`${item.product.id}-${item.variant.name}`} className={styles.item}>
                                    <div className={styles.itemImage}>
                                        <Image
                                            src={getSpectacleImageUrl(item.product.id, item.variant.name)}
                                            alt={item.product.name}
                                            fill
                                        />
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <div className={styles.itemHeader}>
                                            <h3>{item.product.name}</h3>
                                            <p className={styles.itemPrice}>{formatINR(item.product.price)}</p>
                                        </div>
                                        <p className={styles.itemCategory}>
                                            {item.product.category} • {item.variant.name}
                                        </p>
                                        <div className={styles.itemActions}>
                                            <div className={styles.quantityControl}>
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(item.product.id, item.variant.name, item.quantity - 1)
                                                    }
                                                >
                                                    −
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(item.product.id, item.variant.name, item.quantity + 1)
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                className={styles.remove}
                                                onClick={() => removeFromCart(item.product.id, item.variant.name)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <aside className={styles.summary}>
                            <h2>Order summary</h2>
                            <div className={styles.summaryRow}>
                                <span>Subtotal</span>
                                <span>{formatINR(cartTotal)}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>GST (at checkout)</span>
                                <span>—</span>
                            </div>
                            <div className={`${styles.summaryRow} ${styles.total}`}>
                                <span>Total (excl. GST)</span>
                                <span>{formatINR(cartTotal)}</span>
                            </div>
                            <Link href="/checkout" className={`btn btn-primary ${styles.checkoutBtn}`}>
                                Proceed to checkout
                            </Link>
                            <div className={styles.payments}>
                                <p>We accept:</p>
                                <div className={styles.paymentIcons}>
                                    <span>VISA</span>
                                    <span>MasterCard</span>
                                    <span>UPI</span>
                                    <span>COD</span>
                                </div>
                            </div>
                        </aside>
                    </div>
                ) : (
                    <div className={styles.empty}>
                        <p>Your bag is empty.</p>
                        <Link href="/shop" className="btn btn-primary">
                            Start shopping
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

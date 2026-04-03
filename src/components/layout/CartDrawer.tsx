"use client";

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/currency';
import { getSpectacleImageUrl } from '@/lib/spectacleImages';
import styles from './CartDrawer.module.css';
import { useRouter } from 'next/navigation';

const CartDrawer: React.FC = () => {
    const { cart, isCartOpen, setCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();
    const router = useRouter();

    const handleCheckout = () => {
        setCartOpen(false);
        router.push('/checkout');
    };

    if (!isCartOpen) return null;

    return (
        <div className={styles.overlay} onClick={() => setCartOpen(false)}>
            <div className={styles.drawer} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2>Shopping Bag ({cart.reduce((acc, item) => acc + item.quantity, 0)})</h2>
                    <button className={styles.close} onClick={() => setCartOpen(false)}>✕</button>
                </div>

                <div className={styles.items}>
                    {cart.length === 0 ? (
                        <div className={styles.empty}>
                            <p>Your bag is empty</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setCartOpen(false);
                                    router.push('/shop');
                                }}
                            >
                                Shop Now
                            </button>
                        </div>
                    ) : (
                        cart.map((item, idx) => (
                            <div key={`${item.product.id}-${item.variant.name}`} className={styles.item}>
                                <div className={styles.itemImage}>
                                    <Image src={getSpectacleImageUrl(item.product.id, item.variant.name)} alt={item.product.name} fill />
                                </div>
                                <div className={styles.itemInfo}>
                                    <div className={styles.itemHeader}>
                                        <h3>{item.product.name}</h3>
                                        <p className={styles.price}>{formatINR(item.product.price)}</p>
                                    </div>
                                    <p className={styles.variant}>Color: {item.variant.name}</p>
                                    <div className={styles.actions}>
                                        <div className={styles.quantity}>
                                            <button onClick={() => updateQuantity(item.product.id, item.variant.name, item.quantity - 1)}>−</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.product.id, item.variant.name, item.quantity + 1)}>+</button>
                                        </div>
                                        <button className={styles.remove} onClick={() => removeFromCart(item.product.id, item.variant.name)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className={styles.footer}>
                        <div className={styles.totalRow}>
                            <span>Subtotal</span>
                            <span>{formatINR(cartTotal)}</span>
                        </div>
                        <p className={styles.taxNote}>Shipping & taxes calculated at checkout</p>
                        <button
                            className={`btn btn-primary ${styles.checkoutBtn}`}
                            onClick={handleCheckout}
                        >
                            Check Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;

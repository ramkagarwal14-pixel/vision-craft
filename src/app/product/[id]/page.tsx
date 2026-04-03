"use client";

import { use, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/currency";
import { getSpectacleImageUrl } from "@/lib/spectacleImages";
import { useWishlist } from "@/context/WishlistContext";
import styles from "./ProductDetail.module.css";
import ProductCard from "@/components/ui/ProductCard";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const product = products.find(p => p.id === id);
    const { addToCart, buyNow } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const router = useRouter();

    const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");

    if (!product || !selectedVariant) {
        return (
            <div className={styles.error}>
                <div className="container">
                    <h1>Product not found</h1>
                    <Link href="/shop" className="btn btn-primary">Back to Boutique</Link>
                </div>
            </div>
        );
    }

    const relatedProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const incrementQty = () => setQuantity(q => q + 1);
    const decrementQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    return (
        <div className={styles.productPage}>
            <div className="container">
                <nav className={styles.breadcrumb}>
                    <Link href="/">Home</Link> / <Link href="/shop">Boutique</Link> / <Link href={`/shop?category=${product.category}`}>{product.category}</Link> / {product.name}
                </nav>

                <div className={styles.layout}>
                    <div className={styles.media}>
                        <div className={styles.mainImage}>
                            <Image
                                src={getSpectacleImageUrl(product.id, selectedVariant.name)}
                                alt={product.name}
                                fill
                                priority
                            />
                        </div>
                        <div className={styles.thumbnails}>
                            {product.variants.map((v, idx) => (
                                <div
                                    key={idx}
                                    className={`${styles.thumb} ${selectedVariant.name === v.name ? styles.active : ""}`}
                                    onClick={() => setSelectedVariant(v)}
                                >
                                    <Image
                                        src={getSpectacleImageUrl(product.id, v.name)}
                                        alt={`${product.name} ${idx}`}
                                        fill
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.info}>
                        <div className={styles.header}>
                            {product.isNew && <span className={styles.badge}>Maison Select</span>}
                            <h1>{product.name}</h1>
                            <p className={styles.sku}>COLLECTION PREMIÈRE — {product.sku}</p>
                            <p className={styles.price}>{formatINR(product.price)}</p>
                        </div>

                        <div className={styles.variants}>
                            <h3>Refinement: {selectedVariant.name}</h3>
                            <div className={styles.colorGrid}>
                                {product.variants.map(v => (
                                    <button
                                        key={v.name}
                                        className={`${styles.colorCircle} ${selectedVariant.name === v.name ? styles.activeColor : ""}`}
                                        style={{ backgroundColor: v.hex }}
                                        onClick={() => setSelectedVariant(v)}
                                        title={v.name}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <div className={styles.purchase}>
                                <div className={styles.quantity}>
                                    <button onClick={decrementQty}>-</button>
                                    <span>{quantity}</span>
                                    <button onClick={incrementQty}>+</button>
                                </div>
                                <button
                                    className={`btn btn-primary ${styles.addToCart}`}
                                    onClick={() => {
                                        for (let i = 0; i < quantity; i++) addToCart(product, selectedVariant);
                                    }}
                                >
                                    Add to cart
                                </button>
                                <button
                                    type="button"
                                    className={`btn btn-outline ${styles.buyNow}`}
                                    onClick={() => {
                                        buyNow(product, selectedVariant, quantity);
                                        router.push("/checkout");
                                    }}
                                >
                                    Buy now
                                </button>
                                <button
                                    className={`${styles.wishlistBtn} ${isInWishlist(product.id) ? styles.wishlisted : ""}`}
                                    onClick={() => toggleWishlist(product)}
                                    title={isInWishlist(product.id) ? "Remove from Favorites" : "Add to Favorites"}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill={isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                </button>
                            </div>

                            <Link href="/try-on" className={`btn btn-outline ${styles.vtoBtn}`}>
                                Virtual Try-On
                            </Link>
                        </div>

                        <div className={styles.tabs}>
                            <div className={styles.tabHeaders}>
                                <button className={activeTab === "description" ? styles.activeTab : ""} onClick={() => setActiveTab("description")}>Description</button>
                                <button className={activeTab === "details" ? styles.activeTab : ""} onClick={() => setActiveTab("details")}>Craftsmanship</button>
                                <button className={activeTab === "shipping" ? styles.activeTab : ""} onClick={() => setActiveTab("shipping")}>Concierge</button>
                            </div>
                            <div className={styles.tabContent}>
                                {activeTab === "description" && <p>{product.description}</p>}
                                {activeTab === "details" && (
                                    <ul className={styles.detailsList}>
                                        <li>Material: <strong>{product.details.material}</strong></li>
                                        <li>Lens: <strong>{product.details.lensType}</strong></li>
                                        <li>Protection: <strong>{product.details.uvProtection}</strong></li>
                                        <li>Architecture: <strong>{product.details.shape}</strong></li>
                                        <li>Chassis: <strong>{product.details.frameType}</strong></li>
                                        <li>Sizing: <strong>{product.details.sizeGuide}</strong></li>
                                    </ul>
                                )}
                                {activeTab === "shipping" && (
                                    <p>Complimentary signature shipping on all orders worldwide. Standard returns and exchanges within 30 days of receipt.</p>
                                )}
                            </div>
                        </div>

                        <div className={styles.trustBadges}>
                            <div className={styles.trustItem}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                                <span>SSL Encrypted</span>
                            </div>
                            <div className={styles.trustItem}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                <span>Global Delivery</span>
                            </div>
                            <div className={styles.trustItem}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                                <span>Private Returns</span>
                            </div>
                        </div>
                    </div>
                </div>

                <section className={styles.related}>
                    <h2>Curatorial Suggestions</h2>
                    <div className={styles.relatedGrid}>
                        {relatedProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}


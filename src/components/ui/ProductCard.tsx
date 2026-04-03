"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/currency";
import { getSpectacleImageUrl } from "@/lib/spectacleImages";
import { useWishlist } from "@/context/WishlistContext";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
    const { addToCart, buyNow } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const router = useRouter();

    const inWishlist = isInWishlist(product.id);

    const handleBuyNow = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        buyNow(product, selectedVariant);
        router.push("/checkout");
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, selectedVariant);
    };

    return (
        <div className={styles.card} onClick={() => router.push(`/product/${product.id}`)}>
            <div className={styles.imageWrapper}>
                <div className={styles.imageContainer}>
                    <Image
                        src={getSpectacleImageUrl(product.id, selectedVariant.name)}
                        alt={product.name}
                        fill
                        className={styles.image}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                <div className={styles.badges}>
                    {product.isNew && <span className={`${styles.badge} ${styles.new}`}>New Arrival</span>}
                    {product.isBestSeller && <span className={`${styles.badge} ${styles.best}`}>Best Seller</span>}
                    {product.stockStatus === "Low Stock" && <span className={`${styles.badge} ${styles.low}`}>Low Stock</span>}
                </div>

                <div className={styles.overlayActions}>
                    <button
                        className={`${styles.iconBtn} ${inWishlist ? styles.activeWishlist : ""}`}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product);
                        }}
                        aria-label="Toggle Wishlist"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                    <button className={styles.quickView} onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>Quick View</button>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.reviewsRow}>
                    <div className={styles.rating}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className={styles.star}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                        <span>{product.reviews.rating}</span>
                        <span className={styles.count}>({product.reviews.count})</span>
                    </div>
                </div>

                <div className={styles.header}>
                    <h3 className={styles.name}>{product.name}</h3>
                    <div className={styles.priceContainer}>
                        {product.originalPrice != null && product.originalPrice > 0 && (
                            <span className={styles.originalPrice}>{formatINR(product.originalPrice)}</span>
                        )}
                        <span className={styles.price}>{formatINR(product.price)}</span>
                        {product.discount && (
                            <span className={styles.discountBadge}>-{product.discount}%</span>
                        )}
                    </div>
                </div>

                <p className={styles.category}>{product.category} • {product.details.shape} • {product.details.size}</p>

                <div className={styles.colors}>
                    {product.variants.map((variant) => (
                        <button
                            key={variant.name}
                            className={`${styles.colorCircle} ${selectedVariant.name === variant.name ? styles.activeColor : ""}`}
                            style={{ backgroundColor: variant.hex }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectedVariant(variant);
                            }}
                            title={variant.name}
                        />
                    ))}
                </div>

                <div className={styles.footerActions}>
                    <button
                        className={`btn btn-primary ${styles.addToCartBtn}`}
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                    <button
                        className={`btn btn-outline ${styles.buyNowBtn}`}
                        onClick={handleBuyNow}
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}

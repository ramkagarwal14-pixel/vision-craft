"use client";

import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ui/ProductCard";
import styles from "./Wishlist.module.css";
import Link from "next/link";

export default function Wishlist() {
    const { wishlist } = useWishlist();

    return (
        <div className={styles.page}>
            <div className="container">
                <header className={styles.header}>
                    <h1>Your Wishlist</h1>
                    <p>{wishlist.length === 0 ? "Your favorites, all in one place." : `${wishlist.length} items saved`}</p>
                </header>

                {wishlist.length > 0 ? (
                    <div className={styles.grid}>
                        {wishlist.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className={styles.empty}>
                        <div className={styles.emptyIcon}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </div>
                        <h2>Your wishlist is currently empty</h2>
                        <p>Save your favorite eyewear pieces here and they'll be ready for you whenever you're ready to make them yours.</p>
                        <Link href="/shop" className="btn btn-primary">Discover the Collection</Link>
                    </div>
                )}
            </div>
        </div>
    );
}


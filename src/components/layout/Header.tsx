"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.css";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const { cartCount, setCartOpen } = useCart();
    const { wishlist } = useWishlist();
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.topBar}>
                <div className="container">
                    <div className={styles.topBarContent}>
                        <div className={styles.topBarLinks}>
                            <Link href="/track">Track Order</Link>
                            <Link href="/contact">Contact Us</Link>
                            <Link href="/locator">Store Locator</Link>
                        </div>
                        <div className={styles.topBarPromo}>
                            <span>Free shipping on orders over ₹5,000</span>
                        </div>
                        <div className={styles.topBarRight}>
                            <Link href="/try-on">3D Try On</Link>
                            <Link href="/membership">Gold Membership</Link>
                        </div>
                    </div>
                </div>
            </div>
            <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
                <div className={`container ${styles.container}`}>
                    <nav className={styles.nav}>
                        <Link href="/shop?category=MEN">Men</Link>
                        <Link href="/shop?category=WOMEN">Women</Link>
                        <Link href="/shop?category=UNISEX">Unisex</Link>
                        <Link href="/shop?type=sunglasses">Sunglasses</Link>
                        <Link href="/shop?type=computer">Computer Glasses</Link>
                    </nav>

                    <Link href="/" className={styles.logo}>
                        VISIONCRAFT
                    </Link>

                    <div className={styles.actions}>
                        <div className={styles.searchWrapper}>
                            {isSearchOpen ? (
                                <form onSubmit={handleSearch} className={styles.searchForm}>
                                    <input
                                        type="text"
                                        placeholder="Search eyeglasses..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        autoFocus
                                        className={styles.searchInput}
                                    />
                                    <button type="button" onClick={() => setIsSearchOpen(false)} className={styles.closeSearch}>
                                        ✕
                                    </button>
                                </form>
                            ) : (
                                <button
                                    className={styles.iconButton}
                                    aria-label="Search"
                                    onClick={() => setIsSearchOpen(true)}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                    <span className={styles.actionLabel}>Search</span>
                                </button>
                            )}
                        </div>

                        <Link href="/wishlist" className={styles.iconButton} aria-label="Wishlist">
                            <div className={styles.iconBadgeWrapper}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                {wishlist.length > 0 && <span className={styles.badge}>{wishlist.length}</span>}
                            </div>
                            <span className={styles.actionLabel}>Wishlist</span>
                        </Link>

                        <div className={styles.userAction}>
                            {user ? (
                                <div className={styles.accountMenu}>
                                    <Link href="/account" className={styles.iconButton} aria-label="Dashboard" title="My Account">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        <span className={styles.actionLabel}>Me</span>
                                    </Link>
                                    <button className={styles.logoutBtn} onClick={logout} title="Log Out">
                                        Log Out
                                    </button>
                                </div>
                            ) : (
                                <Link href="/login" className={styles.iconButton} aria-label="Sign In" title="Log In">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    <span className={styles.actionLabel}>Sign In</span>
                                </Link>
                            )}
                        </div>

                        <button className={styles.cartLink} onClick={() => setCartOpen(true)} aria-label="Cart">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                            <span className={styles.cartCount}>{cartCount}</span>
                            <span className={styles.actionLabel}>Cart</span>
                        </button>
                    </div>
                </div>
            </header>
        </div>

    );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./page.module.css";
import ProductCard from "@/components/ui/ProductCard";
import { products } from "@/data/products";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const featuredProducts = products.filter(p => p.isBestSeller || p.isNew).slice(0, 4);
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa' }}>
        <p style={{ fontWeight: 600, color: '#666', fontFamily: 'var(--font-outfit)' }}>Authenticating...</p>
      </div>
    );
  }

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <Image
            src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2670&auto=format&fit=crop"
            alt="VisionCraft Luxury Eyewear"
            fill
            priority
            className={styles.heroImg}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>Redefining <br /> Modern Vision</h1>
          <p className={styles.heroSubtitle}>
            Precision-engineered frames. Exceptional clarity. Handcrafted for those who see the world differently.
          </p>
          <div className={styles.heroActions}>
            <Link href="/shop" className="btn btn-primary">Shop Collection</Link>
            <Link href="/try-on" className="btn btn-outline" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>Try On Virtually</Link>
          </div>
        </div>
      </section>

      {/* Top Categories Row - Lenskart Style */}
      <section className={styles.topCategories}>
        <div className="container">
          <div className={styles.categoryIcons}>
            <Link href="/shop?type=reading" className={styles.iconCard}>
              <div className={styles.iconCircle}>
                {/* Reading: man with reading glasses -- verified */}
                <Image src="https://images.unsplash.com/photo-1585167404119-b1d79ddeb7fc?q=80&w=200&auto=format&fit=crop" alt="Reading" fill />
              </div>
              <span>Reading Glasses</span>
            </Link>
            <Link href="/shop?type=computer" className={styles.iconCard}>
              <div className={styles.iconCircle}>
                {/* Computer: man with glasses at work -- verified */}
                <Image src="https://images.unsplash.com/photo-1551283279-166ab6d719af?q=80&w=200&auto=format&fit=crop" alt="Computer" fill />
              </div>
              <span>Computer Glasses</span>
            </Link>
            <Link href="/shop?type=sunglasses" className={styles.iconCard}>
              <div className={styles.iconCircle}>
                {/* Sunglasses: cool sunglasses model -- verified */}
                <Image src="https://images.unsplash.com/photo-1621876857416-0d52e088f1bc?q=80&w=200&auto=format&fit=crop" alt="Sunglasses" fill />
              </div>
              <span>Sunglasses</span>
            </Link>
            <Link href="/shop?type=contact" className={styles.iconCard}>
              <div className={styles.iconCircle}>
                {/* Contacts: close-up eye shot -- verified */}
                <Image src="https://images.unsplash.com/photo-1628619487942-01c58eed5c33?q=80&w=200&auto=format&fit=crop" alt="Contacts" fill />
              </div>
              <span>Contact Lenses</span>
            </Link>
            <Link href="/shop?type=kids" className={styles.iconCard}>
              <div className={styles.iconCircle}>
                {/* Kids: portrait with glasses -- verified */}
                <Image src="https://images.unsplash.com/photo-1533866254047-a8ec7410aa35?q=80&w=200&auto=format&fit=crop" alt="Kids" fill />
              </div>
              <span>Kids Glasses</span>
            </Link>
            <Link href="/shop?type=progressive" className={styles.iconCard}>
              <div className={styles.iconCircle}>
                {/* Progressive: professional woman in glasses -- verified */}
                <Image src="https://images.unsplash.com/photo-1527824302753-e38410b44929?q=80&w=200&auto=format&fit=crop" alt="Progressive" fill />
              </div>
              <span>Progressive</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Frame Shape Section */}
      <section className={styles.shapeSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Shop by Frame Shape</h2>
          <div className={styles.shapeGrid}>
            <Link href="/shop?shape=Aviator" className={styles.shapeCard}>
              <div className={styles.shapeImageWrap}>
                {/* Aviator: classic pilot frames - men pool verified */}
                <Image src="https://images.unsplash.com/photo-1687092084146-a2893f0b896a?q=80&w=400&auto=format&fit=crop" alt="Aviator" fill className={styles.shapeImg} />
                <div className={styles.shapeOverlay} />
              </div>
              <span className={styles.shapeLabel}>Aviator</span>
            </Link>
            <Link href="/shop?shape=Wayfarer" className={styles.shapeCard}>
              <div className={styles.shapeImageWrap}>
                {/* Wayfarer: bold rectangular frames */}
                <Image src="https://images.unsplash.com/photo-1714356590155-f896e15d21c9?q=80&w=400&auto=format&fit=crop" alt="Wayfarer" fill className={styles.shapeImg} />
                <div className={styles.shapeOverlay} />
              </div>
              <span className={styles.shapeLabel}>Wayfarer</span>
            </Link>
            <Link href="/shop?shape=Round" className={styles.shapeCard}>
              <div className={styles.shapeImageWrap}>
                {/* Round: vintage circular frames */}
                <Image src="https://images.unsplash.com/photo-1634795776422-5a85c8e0f1ce?q=80&w=400&auto=format&fit=crop" alt="Round" fill className={styles.shapeImg} />
                <div className={styles.shapeOverlay} />
              </div>
              <span className={styles.shapeLabel}>Round</span>
            </Link>
            <Link href="/shop?shape=Cat Eye" className={styles.shapeCard}>
              <div className={styles.shapeImageWrap}>
                {/* Cat Eye: upswept women's frames */}
                <Image src="https://images.unsplash.com/photo-1749183778702-bdf9e92253e6?q=80&w=400&auto=format&fit=crop" alt="Cat Eye" fill className={styles.shapeImg} />
                <div className={styles.shapeOverlay} />
              </div>
              <span className={styles.shapeLabel}>Cat Eye</span>
            </Link>
            <Link href="/shop?shape=Square" className={styles.shapeCard}>
              <div className={styles.shapeImageWrap}>
                {/* Square: bold geometric frames */}
                <Image src="https://images.unsplash.com/photo-1684854001420-6cfed609fdf2?q=80&w=400&auto=format&fit=crop" alt="Square" fill className={styles.shapeImg} />
                <div className={styles.shapeOverlay} />
              </div>
              <span className={styles.shapeLabel}>Square</span>
            </Link>
            <Link href="/shop?shape=Rectangle" className={styles.shapeCard}>
              <div className={styles.shapeImageWrap}>
                {/* Rectangle: modern slim frames */}
                <Image src="https://images.unsplash.com/photo-1551283279-166ab6d719af?q=80&w=400&auto=format&fit=crop" alt="Rectangle" fill className={styles.shapeImg} />
                <div className={styles.shapeOverlay} />
              </div>
              <span className={styles.shapeLabel}>Rectangle</span>
            </Link>
            <Link href="/shop?shape=Oversized" className={styles.shapeCard}>
              <div className={styles.shapeImageWrap}>
                {/* Oversized: bold fashion frames */}
                <Image src="https://images.unsplash.com/photo-1621876857416-0d52e088f1bc?q=80&w=400&auto=format&fit=crop" alt="Oversized" fill className={styles.shapeImg} />
                <div className={styles.shapeOverlay} />
              </div>
              <span className={styles.shapeLabel}>Oversized</span>
            </Link>
            <Link href="/shop?shape=Geometric" className={styles.shapeCard}>
              <div className={styles.shapeImageWrap}>
                {/* Geometric: avant-garde angular frames */}
                <Image src="https://images.unsplash.com/photo-1567472221856-705c090c88f0?q=80&w=400&auto=format&fit=crop" alt="Geometric" fill className={styles.shapeImg} />
                <div className={styles.shapeOverlay} />
              </div>
              <span className={styles.shapeLabel}>Geometric</span>
            </Link>
          </div>
        </div>
      </section>


      {/* Categories Section */}
      <section className="section">
        <div className="container">
          <div className={styles.categoryGrid}>
            <div className={styles.categoryCard}>
              <div className={styles.categoryImage}>
                <Image src="https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=2000&auto=format&fit=crop" alt="Men's" fill />
              </div>
              <div className={styles.categoryContent}>
                <h2>For Men</h2>
                <Link href="/shop?category=MEN">Explore Classics</Link>
              </div>
            </div>
            <div className={styles.categoryCard}>
              <div className={styles.categoryImage}>
                <Image src="https://images.unsplash.com/photo-1508296695146-257a8bf4fb92?q=80&w=2000&auto=format&fit=crop" alt="Women's" fill />
              </div>
              <div className={styles.categoryContent}>
                <h2>For Women</h2>
                <Link href="/shop?category=WOMEN">Timeless Styles</Link>
              </div>
            </div>
            <div className={styles.categoryCard}>
              <div className={styles.categoryImage}>
                <Image src="https://images.unsplash.com/photo-1687092084146-a2893f0b896a?q=80&w=2000&auto=format&fit=crop" alt="Unisex" fill />
              </div>
              <div className={styles.categoryContent}>
                <h2>Essence</h2>
                <Link href="/shop?category=UNISEX">Shared Vision</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Curated Selection</h2>
            <p className={styles.sectionSubtitle}>Exceptional craftsmanship for exceptional individuals.</p>
          </div>
          <div className={styles.productGrid}>
            {featuredProducts.length > 0 ? (
              featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products featured yet.</p>
            )}
          </div>
          <div className={styles.centerActions}>
            <Link href="/shop" className="btn btn-outline">View Entire Boutique</Link>
          </div>
        </div>
      </section>

      {/* Virtual Try-On Section */}
      <section className={styles.vtoSection}>
        <div className="container">
          <div className={styles.vtoContent}>
            <div className={styles.vtoText}>
              <span className="badge">Next Generation AR</span>
              <h2>Digital Fitting Room</h2>
              <p>Eliminate uncertainty with our world-class AR fitting technology. Experience precision fit from anywhere in the world.</p>
              <Link href="/try-on" className="btn btn-primary">Try It Now</Link>
            </div>
            <div className={styles.vtoPreview}>
              <div className={styles.vtoImageContainer}>
                <Image src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=2000&auto=format&fit=crop" alt="VTO Preview" fill className={styles.vtoImage} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section">
        <div className="container">
          <div className={styles.newsletter}>
            <h2>Join the Inner Circle</h2>
            <p>Subscribe for exclusive access to upcoming collections, private viewings, and exceptional insights.</p>
            <form className={styles.newsletterForm} onSubmit={(e) => { e.preventDefault(); alert("Welcome to the VisionCraft collection."); }}>
              <input type="email" placeholder="Your premium email" required />
              <button type="submit" className="btn btn-primary">Request Access</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}


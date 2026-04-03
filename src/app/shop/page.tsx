"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import styles from "./Shop.module.css";
import { Category, Shape, Material, LensType, FrameType } from "@/types";

function ShopContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") as Category | null;
    const initialShape = searchParams.get("shape") as Shape | null;
    const searchQuery = searchParams.get("search");

    const [selectedCategory, setSelectedCategory] = useState<Category | null>(initialCategory);
    const [selectedShape, setSelectedShape] = useState<Shape | null>(initialShape);
    const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
    const [selectedLens, setSelectedLens] = useState<LensType | null>(null);
    const [selectedFrameType, setSelectedFrameType] = useState<FrameType | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<string>("featured");

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (selectedCategory) {
            result = result.filter(p => p.category === selectedCategory);
        }

        if (selectedShape) {
            result = result.filter(p => p.details.shape === selectedShape);
        }

        if (selectedMaterial) {
            result = result.filter(p => p.details.material === selectedMaterial);
        }

        if (selectedLens) {
            result = result.filter(p => p.details.lensType === selectedLens);
        }

        if (selectedFrameType) {
            result = result.filter(p => p.details.frameType === selectedFrameType);
        }

        if (selectedSize) {
            result = result.filter(p => p.details.size === selectedSize);
        }

        if (priceRange) {
            if (priceRange === "under-250") result = result.filter(p => p.price < 250);
            else if (priceRange === "250-400") result = result.filter(p => p.price >= 250 && p.price < 400);
            else if (priceRange === "above-400") result = result.filter(p => p.price >= 400);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query) ||
                p.details.shape.toLowerCase().includes(query)
            );
        }

        if (sortBy === "price-low") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-high") {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === "newest") {
            result.sort((a, b) => (a.isNew ? -1 : 1));
        } else if (sortBy === "rating") {
            result.sort((a, b) => b.reviews.rating - a.reviews.rating);
        } else if (sortBy === "discount") {
            result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        }

        return result;
    }, [selectedCategory, selectedShape, selectedMaterial, selectedLens, selectedFrameType, selectedSize, priceRange, searchQuery, sortBy]);

    const categories: Category[] = ["MEN", "WOMEN", "UNISEX"];
    const shapes: Shape[] = ["Aviator", "Wayfarer", "Round", "Square", "Rectangle", "Cat Eye", "Oversized", "Geometric", "Rimless", "Semi Rimless"];
    const materials: Material[] = ["Metal", "Acetate", "TR90", "Titanium", "Stainless Steel"];
    const lenses: LensType[] = ["Polarized", "UV400", "Blue Light Blocking", "Photochromic"];
    const frameTypes: FrameType[] = ["Full Rim", "Half Rim", "Rimless", "Semi Rimless"];

    const handleClearFilters = () => {
        setSelectedCategory(null);
        setSelectedShape(null);
        setSelectedMaterial(null);
        setSelectedLens(null);
        setSelectedFrameType(null);
        setSelectedSize(null);
        setPriceRange(null);
    };

    return (
        <div className={styles.shopPage}>
            <header className={styles.header}>
                <div className="container">
                    <h1 className={styles.title}>
                        {searchQuery ? `Search: ${searchQuery}` : (selectedCategory === "MEN" ? "Men's Boutique" : selectedCategory === "WOMEN" ? "Women's Collection" : selectedCategory === "UNISEX" ? "Shared Vision" : "The Complete Boutique")}
                    </h1>
                    <p className={styles.subtitle}>
                        {filteredProducts.length} masterpieces curated for your vision
                    </p>
                </div>
            </header>

            <div className="container">
                <div className={styles.layout}>
                    <aside className={styles.sidebar}>
                        <FilterSection
                            title="Category"
                            items={categories}
                            selected={selectedCategory}
                            onSelect={setSelectedCategory}
                        />
                        <FilterSection
                            title="Frame Shape"
                            items={shapes}
                            selected={selectedShape}
                            onSelect={setSelectedShape}
                        />
                        <FilterSection
                            title="Frame Style"
                            items={frameTypes}
                            selected={selectedFrameType}
                            onSelect={setSelectedFrameType}
                        />
                        <FilterSection
                            title="Eye Size"
                            items={["Narrow", "Medium", "Wide"]}
                            selected={selectedSize}
                            onSelect={setSelectedSize}
                        />
                        <FilterSection
                            title="Lens Type"
                            items={lenses}
                            selected={selectedLens}
                            onSelect={setSelectedLens}
                        />
                        <FilterSection
                            title="Material"
                            items={materials}
                            selected={selectedMaterial}
                            onSelect={setSelectedMaterial}
                        />

                        <div className={styles.filterGroup}>
                            <h3>Price Range</h3>
                            <ul className={styles.filterList}>
                                <li className={priceRange === "under-250" ? styles.active : ""} onClick={() => setPriceRange(priceRange === "under-250" ? null : "under-250")}>Under ₹250</li>
                                <li className={priceRange === "250-400" ? styles.active : ""} onClick={() => setPriceRange(priceRange === "250-400" ? null : "250-400")}>₹250 – ₹400</li>
                                <li className={priceRange === "above-400" ? styles.active : ""} onClick={() => setPriceRange(priceRange === "above-400" ? null : "above-400")}>Premium (₹400+)</li>
                            </ul>
                        </div>
                    </aside>

                    <main className={styles.main}>
                        <div className={styles.toolbar}>
                            <div className={styles.activeFilters}>
                                {[selectedCategory, selectedShape, selectedMaterial, selectedLens, selectedFrameType, selectedSize, priceRange].some(x => x !== null) && (
                                    <button className={styles.clearAll} onClick={handleClearFilters}>
                                        Reset Boutique Selection ✕
                                    </button>
                                )}
                            </div>
                            <div className={styles.sort}>
                                <label>View By</label>
                                <select
                                    className={styles.sortSelect}
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="featured">Most Coveted</option>
                                    <option value="newest">Latest Releases</option>
                                    <option value="rating">Top Rated</option>
                                    <option value="discount">Biggest Savings</option>
                                    <option value="price-low">Entry level Price</option>
                                    <option value="price-high">Highest Craftsmanship</option>
                                </select>
                            </div>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className={styles.grid}>
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className={styles.noResults}>
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '24px', color: 'var(--border)' }}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                <h3>No frames match this vision</h3>
                                <p>We couldn't find any products matching your specific refining criteria.</p>
                                <button className="btn btn-primary" style={{ marginTop: '30px' }} onClick={handleClearFilters}>Show Entire Collection</button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

function FilterSection({ title, items, selected, onSelect }: any) {
    return (
        <div className={styles.filterGroup}>
            <h3>{title}</h3>
            <ul className={styles.filterList}>
                {items.map((item: any) => (
                    <li
                        key={item}
                        className={selected === item ? styles.active : ""}
                        onClick={() => onSelect(selected === item ? null : item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Shop() {
    return (
        <Suspense fallback={<div className={styles.loading}>Curating boutique selection...</div>}>
            <ShopContent />
        </Suspense>
    );
}


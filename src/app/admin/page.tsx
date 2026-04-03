"use client";

import { useState } from "react";
import styles from "./Admin.module.css";
import { products } from "@/data/products";
import { formatINR } from "@/lib/currency";

export default function AdminDashboard() {
    const [view, setView] = useState("overview");

    const stats = [
        { label: "Total Sales", value: "₹29,50,000", change: "+12%" },
        { label: "Pending Orders", value: "24", change: "-2" },
        { label: "Total Customers", value: "1,204", change: "+45" },
        { label: "Inventory Items", value: products.length.toString(), change: "0" }
    ];

    return (
        <div className={styles.adminPage}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2>VC ADMIN</h2>
                </div>
                <nav className={styles.nav}>
                    <button className={view === "overview" ? styles.active : ""} onClick={() => setView("overview")}>Overview</button>
                    <button className={view === "products" ? styles.active : ""} onClick={() => setView("products")}>Products</button>
                    <button className={view === "orders" ? styles.active : ""} onClick={() => setView("orders")}>Orders</button>
                    <button className={view === "customers" ? styles.active : ""} onClick={() => setView("customers")}>Customers</button>
                    <button className={view === "discounts" ? styles.active : ""} onClick={() => setView("discounts")}>Discounts</button>
                </nav>
            </aside>

            <main className={styles.content}>
                <header className={styles.header}>
                    <h1>{view.charAt(0).toUpperCase() + view.slice(1)}</h1>
                    <div className={styles.user}>
                        <span>Admin User</span>
                    </div>
                </header>

                <div className={styles.body}>
                    {view === "overview" && (
                        <>
                            <div className={styles.statsGrid}>
                                {stats.map((s, i) => (
                                    <div key={i} className={styles.statCard}>
                                        <p className={styles.statLabel}>{s.label}</p>
                                        <p className={styles.statValue}>{s.value}</p>
                                        <span className={s.change.startsWith("+") ? styles.positive : styles.negative}>{s.change} vs last month</span>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.recentActivity}>
                                <h3>Recent Orders</h3>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Customer</th>
                                            <th>Date</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#ORD-7721</td>
                                            <td>Amit Sharma</td>
                                            <td>Feb 25, 2026</td>
                                            <td>{formatINR(3450)}</td>
                                            <td><span className={styles.statusShipped}>Shipped</span></td>
                                        </tr>
                                        <tr>
                                            <td>#ORD-7720</td>
                                            <td>Priya Singh</td>
                                            <td>Feb 25, 2026</td>
                                            <td>{formatINR(1200)}</td>
                                            <td><span className={styles.statusProcessing}>Processing</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}

                    {view === "products" && (
                        <div className={styles.productList}>
                            <div className={styles.listHeader}>
                                <h3>Product Catalog</h3>
                                <button className="btn btn-primary">Add New Product</button>
                            </div>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>SKU</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.slice(0, 10).map(p => (
                                        <tr key={p.id}>
                                            <td>{p.name}</td>
                                            <td>{p.sku}</td>
                                            <td>{formatINR(p.price)}</td>
                                            <td>{p.stockStatus}</td>
                                            <td>
                                                <button className={styles.editBtn}>Edit</button>
                                                <button className={styles.deleteBtn}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ColorVariant } from '@/types';

interface CartItem {
    product: Product;
    variant: ColorVariant;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, variant: ColorVariant) => void;
    /** Replace bag with a single line and close drawer — used for Buy Now → checkout. */
    buyNow: (product: Product, variant: ColorVariant, quantity?: number) => void;
    removeFromCart: (productId: string, variantName: string) => void;
    updateQuantity: (productId: string, variantName: string, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
    isCartOpen: boolean;
    setCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setCartOpen] = useState(false);

    // Load cart from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('visioncraft_cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to load cart", e);
            }
        }
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        localStorage.setItem('visioncraft_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: Product, variant: ColorVariant) => {
        setCart(prev => {
            const existingIndex = prev.findIndex(item => item.product.id === product.id && item.variant.name === variant.name);
            if (existingIndex > -1) {
                const newCart = [...prev];
                newCart[existingIndex].quantity += 1;
                return newCart;
            }
            return [...prev, { product, variant, quantity: 1 }];
        });
        setCartOpen(true);
    };

    const buyNow = (product: Product, variant: ColorVariant, quantity = 1) => {
        const q = Math.max(1, Math.floor(quantity));
        setCart([{ product, variant, quantity: q }]);
        setCartOpen(false);
    };

    const removeFromCart = (productId: string, variantName: string) => {
        setCart(prev => prev.filter(item => !(item.product.id === productId && item.variant.name === variantName)));
    };

    const updateQuantity = (productId: string, variantName: string, quantity: number) => {
        if (quantity < 1) return;
        setCart(prev => prev.map(item =>
            (item.product.id === productId && item.variant.name === variantName)
                ? { ...item, quantity }
                : item
        ));
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart, addToCart, buyNow, removeFromCart, updateQuantity, clearCart,
            cartTotal, cartCount, isCartOpen, setCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};

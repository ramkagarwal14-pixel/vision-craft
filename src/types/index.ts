export type Category = "MEN" | "WOMEN" | "UNISEX";
export type Shape = "Aviator" | "Wayfarer" | "Round" | "Square" | "Rectangle" | "Cat Eye" | "Oversized" | "Geometric" | "Rimless" | "Semi Rimless";
export type FrameType = "Full Rim" | "Half Rim" | "Rimless" | "Semi Rimless";
export type Material = "Metal" | "Acetate" | "TR90" | "Titanium" | "Stainless Steel";
export type LensType = "Polarized" | "UV400" | "Blue Light Blocking" | "Photochromic";

export interface ColorVariant {
    name: string;
    hex: string;
    image: string;
}

/** Monetary fields are stored in Indian Rupees (INR). */
export interface Product {
    id: string;
    sku: string;
    name: string;
    category: Category;
    price: number;
    originalPrice?: number | null;
    discount?: number | null;
    description: string;
    details: {
        material: Material;
        lensType: LensType;
        uvProtection: string;
        sizeGuide: string;
        shape: Shape;
        frameType: FrameType;
        size: "Narrow" | "Medium" | "Wide";
    };
    variants: ColorVariant[];
    images: string[]; // 4-6 images
    stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
    isNew?: boolean;
    isBestSeller?: boolean;
    reviews: {
        rating: number;
        count: number;
    };
}

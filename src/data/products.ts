export type Product = {
    id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    promoPrice?: number | null;
    images: string[];
};

import { supabase } from "@/lib/supabase";



export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        console.error('Error fetching products:', error);
        return [];
    }

    console.log("Fetched products count:", data?.length); // Debug log


    return data.map((p: any) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        description: p.description,
        price: Number(p.price),
        promoPrice: p.promo_price ? Number(p.promo_price) : null,
        images: p.images || [],
    }));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching product by slug:', error);
        return null;
    }

    return {
        id: data.id,
        title: data.title,
        slug: data.slug,
        description: data.description,
        price: Number(data.price),
        promoPrice: data.promo_price ? Number(data.promo_price) : null,
        images: data.images || [],
    };
}

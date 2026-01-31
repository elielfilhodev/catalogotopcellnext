import { supabase } from "@/lib/supabase";

export type Category = {
    id: string;
    name: string;
    slug: string;
};

export async function getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
        .from('categories')
        .select('*');

    if (error) {
        console.error('Error fetching categories:', error);
        return [];
    }

    return data as Category[];
}


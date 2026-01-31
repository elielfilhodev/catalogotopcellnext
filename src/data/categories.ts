export type Category = {
    id: string;
    name: string;
    slug: string;
};

export const categories: Category[] = [
    { id: "1", name: "Móveis", slug: "moveis" },
    { id: "2", name: "Iluminação", slug: "iluminacao" },
    { id: "3", name: "Decoração", slug: "decoracao" },
    { id: "4", name: "Organização", slug: "organizacao" },
];

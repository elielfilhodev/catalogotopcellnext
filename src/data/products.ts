export type Product = {
    id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    promoPrice?: number | null;
    images: string[];
};

export const products: Product[] = [
    {
        id: "1",
        title: "Fone Headset Bluetooth JBL",
        slug: "cadeira-slim-comfort",
        description:
            "Cadeira ergonômica com revestimento em tecido e encosto respirável.",
        price: 499.9,
        promoPrice: 429.9,
        images: ["/products/chair-1.svg", "/products/chair-2.svg"],
    },
    {
        id: "2",
        title: "Video Game Playstation 5 Bundle Fortnite Mídia Física",
        slug: "mesa-nordic-120cm",
        description: "Divirta-se com tecnologia de ponta, o vídeo game playstation, proporciona o máximo dos gráficos dos jogos atuais, jogue online com seus amigos e com a sua família.",
        price: 3999.90,
        promoPrice: null,
        images: ["/products/table-1.svg"],
    },
    {
        id: "3",
        title: "Luminária Orbit",
        slug: "luminaria-orbit",
        description: "Luminária pendente com design moderno e LED integrado.",
        price: 249.0,
        promoPrice: 199.0,
        images: ["/products/lamp-1.svg", "/products/lamp-2.svg"],
    },
    {
        id: "4",
        title: "Luminária Orbit",
        slug: "luminaria-orbit",
        description: "Luminária pendente com design moderno e LED integrado.",
        price: 249.0,
        promoPrice: 199.0,
        images: ["/products/lamp-1.svg", "/products/lamp-2.svg"],
    },
    {
        id: "5",
        title: "Luminária Orbit",
        slug: "luminaria-orbit",
        description: "Luminária pendente com design moderno e LED integrado.",
        price: 249.0,
        promoPrice: 199.0,
        images: ["/products/lamp-1.svg", "/products/lamp-2.svg"],
    },
    {
        id: "6",
        title: "Luminária Orbit",
        slug: "luminaria-orbit",
        description: "Luminária pendente com design moderno e LED integrado.",
        price: 249.0,
        promoPrice: 199.0,
        images: ["/products/lamp-1.svg", "/products/lamp-2.svg"],
    },
    {
        id: "7",
        title: "Luminária Orbit",
        slug: "luminaria-orbit",
        description: "Luminária pendente com design moderno e LED integrado.",
        price: 249.0,
        promoPrice: 199.0,
        images: ["/products/lamp-1.svg", "/products/lamp-2.svg"],
    },
    {
        id: "8",
        title: "Luminária Orbit",
        slug: "luminaria-orbit",
        description: "Luminária pendente com design moderno e LED integrado.",
        price: 249.0,
        promoPrice: 199.0,
        images: ["/products/lamp-1.svg", "/products/lamp-2.svg"],
    },
];

export function getProductBySlug(slug: string) {
    return products.find((p) => p.slug === slug) || null;
}

import Image from "next/image";
import { getProductBySlug } from "../../../data/products";

type Props = {
    params: any;
};

export default async function ProductPage({ params }: Props) {
    const resolved = await params;
    const slug: string = resolved?.slug;
    const product = await getProductBySlug(slug);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">Produto não encontrado</div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black">
            <main className="mx-auto max-w-4xl p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-3">
                        <div className="relative h-96 w-full overflow-hidden rounded-md bg-zinc-100">
                            <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                        </div>
                        {product.images.slice(1).map((img) => (
                            <div key={img} className="relative h-24 w-full overflow-hidden rounded-md bg-zinc-100">
                                <Image src={img} alt={product.title} fill className="object-cover" />
                            </div>
                        ))}
                    </div>

                    <div>
                        <h1 className="text-2xl font-semibold">{product.title}</h1>
                        <p className="mt-3 text-zinc-600">{product.description}</p>

                        <div className="mt-6 flex items-center gap-4">
                            {product.promoPrice ? (
                                <div className="flex items-baseline gap-3">
                                    <span className="text-sm text-zinc-500 line-through">R$ {product.price.toFixed(2)}</span>
                                    <span className="text-2xl font-semibold text-rose-600">R$ {product.promoPrice.toFixed(2)}</span>
                                </div>
                            ) : (
                                <span className="text-2xl font-semibold">R$ {product.price.toFixed(2)}</span>
                            )}
                        </div>

                        <div className="mt-8 flex gap-3">
                            <a
                                href={`mailto:contato@loja.com?subject=Consulta%20sobre%20${encodeURIComponent(
                                    product.title
                                )}`}
                                className="rounded-md border px-4 py-2 text-sm"
                            >
                                Consultar disponibilidade
                            </a>

                            <a
                                href={`https://wa.me/5511999999999?text=${encodeURIComponent(
                                    `Olá, gostaria de saber sobre ${product.title}`
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-md bg-green-600 px-4 py-2 text-sm text-white"
                            >
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

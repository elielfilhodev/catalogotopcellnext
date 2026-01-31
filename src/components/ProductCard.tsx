"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import type { Product } from "../data/products";

export default function ProductCard({ product }: { product: Product }) {
    const { addItem } = useCartStore();

    const handleAddToCart = () => {
        addItem(product);
        toast.success("Produto adicionado ao carrinho!");
    };

    return (
        <Card className="flex w-full max-w-sm flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <Link href={`/products/${product.slug}`} className="group relative block aspect-square w-full overflow-hidden bg-zinc-100">
                <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </Link>

            <CardContent className="flex flex-1 flex-col gap-2 p-4">
                <Link href={`/products/${product.slug}`} className="hover:underline">
                    <h3 className="line-clamp-2 text-lg font-medium leading-tight text-foreground">
                        {product.title}
                    </h3>
                </Link>
                <p className="line-clamp-3 text-sm text-muted-foreground">
                    {product.description}
                </p>
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t p-4 bg-zinc-50/50 dark:bg-zinc-900/50">
                <div className="flex flex-col">
                    {product.promoPrice ? (
                        <>
                            <span className="text-xs text-muted-foreground line-through">
                                R$ {product.price.toFixed(2)}
                            </span>
                            <span className="text-lg font-bold text-green-600 dark:text-green-400">
                                R$ {product.promoPrice.toFixed(2)}
                            </span>
                        </>
                    ) : (
                        <span className="text-lg font-bold text-foreground">
                            R$ {product.price.toFixed(2)}
                        </span>
                    )}
                </div>

                <div className="flex gap-2">
                    <Button size="icon" variant="outline" onClick={handleAddToCart}>
                        <ShoppingCart className="h-4 w-4" />
                    </Button>
                    <Button asChild size="sm" className="font-medium">
                        <Link href={`/products/${product.slug}`}>
                            Ver Detalhes
                        </Link>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}

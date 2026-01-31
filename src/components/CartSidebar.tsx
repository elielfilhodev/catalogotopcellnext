"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart-store";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";

export default function CartSidebar() {
    const { items, removeItem, updateQuantity, total } = useCartStore();

    const handleWhatsAppCheckout = () => {
        const phoneNumber = "5511999999999"; // Replace with your number

        let message = "*Olá! Gostaria de consultar a disponibilidade dos seguintes itens:*\n\n";

        items.forEach((item) => {
            message += `• ${item.quantity}x ${item.title} - R$ ${(item.promoPrice || item.price).toFixed(2)}\n`;
        });

        message += `\n*Total Estimado: R$ ${total().toFixed(2)}*`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative group">
                    <ShoppingCart className="h-5 w-5" />
                    {items.length > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center animate-in zoom-in">
                            {items.length}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle>Seu Carrinho</SheetTitle>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                            <ShoppingCart className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-semibold text-lg">Seu carrinho está vazio</h3>
                            <p className="text-sm text-muted-foreground">
                                Adicione produtos para consultar a disponibilidade.
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="flex-1 -mx-6 px-6">
                            <div className="space-y-6 py-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                                            <Image
                                                src={item.images[0]}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between">
                                            <div className="space-y-1">
                                                <h4 className="text-sm font-medium line-clamp-2 leading-tight">{item.title}</h4>
                                                <p className="text-sm font-bold text-primary">
                                                    R$ {(item.promoPrice || item.price).toFixed(2)}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center h-8 rounded-md border bg-background shadow-sm">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-full w-8 rounded-none px-0"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-full w-8 rounded-none px-0"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        <div className="space-y-4 pt-6 pb-2">
                            <Separator />
                            <div className="flex items-center justify-between text-base font-medium">
                                <span>Total Estimado</span>
                                <span className="text-lg">R$ {total().toFixed(2)}</span>
                            </div>
                            <Button className="w-full gap-2 h-12 text-base font-semibold shadow-md" size="lg" onClick={handleWhatsAppCheckout}>
                                <Image
                                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                                    alt="WhatsApp"
                                    width={20}
                                    height={20}
                                    className="invert brightness-0 dark:invert-0"
                                />
                                Consultar Disponibilidade
                            </Button>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}

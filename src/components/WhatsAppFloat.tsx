"use client";

import { usePathname } from "next/navigation";


import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function WhatsAppFloat() {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);

    if (pathname?.startsWith("/admin")) return null;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
        >
            <Button
                asChild
                size="icon"
                className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all hover:scale-110"
            >
                <a
                    href="https://wa.me/5514996228136"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Fale conosco no WhatsApp"
                >
                    <MessageCircle className="h-7 w-7 text-white" />
                </a>
            </Button>
        </div>
    );
}

"use client";

import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { categories } from "@/data/categories";
import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";

import { User } from "lucide-react";
import CartSidebar from "./CartSidebar";

export default function Navbar() {
    const pathname = usePathname();

    if (pathname?.startsWith("/admin")) {
        return null;
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-7xl items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight transition-opacity hover:opacity-90">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                        <span className="text-lg">T</span>
                    </div>
                    <span>TopCell</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="gap-1 font-medium">
                                Categorias
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56">
                            {categories.map((cat) => (
                                <DropdownMenuItem key={cat.id} asChild>
                                    <Link href={`/?categoria=${cat.slug}`}>
                                        {cat.name}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Link href="/#contato" className="text-sm font-medium hover:text-primary transition-colors">
                        Contato
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <CartSidebar />

                    <Button variant="ghost" size="icon" asChild className="hidden md:flex">
                        <Link href="/login">
                            <User className="h-5 w-5" />
                        </Link>
                    </Button>

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="flex w-full flex-col sm:max-w-xs">
                            <div className="flex flex-col gap-6 py-6 flex-1">
                                <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                                        <span className="text-lg">T</span>
                                    </div>
                                    <span>TopCell</span>
                                </div>

                                <nav className="grid gap-2">
                                    <p className="text-sm font-medium text-muted-foreground px-2 mb-2">Categorias</p>
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat.id}
                                            href={`/?categoria=${cat.slug}`}
                                            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium hover:bg-accent transition-colors border border-transparent hover:border-border"
                                        >
                                            <div className="h-2 w-2 rounded-full bg-primary/50" />
                                            {cat.name}
                                        </Link>
                                    ))}
                                </nav>

                                <div className="mt-auto grid gap-2">
                                    <Link
                                        href="/login" // Redirects to Login options (Login/Register)
                                        className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium bg-secondary/50 hover:bg-secondary transition-colors"
                                    >
                                        <User className="h-4 w-4" />
                                        Minha Conta / Entrar
                                    </Link>
                                    <Link
                                        href="/#contato"
                                        className="flex items-center justify-center gap-2 rounded-lg border px-3 py-3 text-sm font-medium hover:bg-accent transition-colors"
                                    >
                                        Fale Conosco
                                    </Link>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}

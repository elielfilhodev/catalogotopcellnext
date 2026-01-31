"use client";

import Link from "next/link";
import { useState } from "react";

type NavItem = {
    label: string;
    href: string;
    icon: string;
};

const navItems: NavItem[] = [
    { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
    { label: "Produtos", href: "/admin/products", icon: "📦" },
    { label: "Categorias", href: "/admin/categories", icon: "📁" },
    { label: "Pedidos", href: "/admin/orders", icon: "🛒" },
    { label: "Usuários", href: "/admin/users", icon: "👥" },
    { label: "Configurações", href: "/admin/settings", icon: "⚙️" },
];

export default function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-40 flex h-10 w-10 items-center justify-center rounded-md bg-foreground text-background md:hidden"
            >
                {isOpen ? "✕" : "≡"}
            </button>

            {/* Overlay (Mobile) */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-40 h-screen w-64 transform bg-zinc-900 text-white transition-transform duration-200 md:relative md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
            >
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-zinc-700 p-4">
                        <h2 className="text-lg font-bold">Catálogo Admin</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="rounded p-1 hover:bg-zinc-800 md:hidden"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 overflow-y-auto px-4 py-6">
                        <ul className="space-y-2">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-zinc-800 transition"
                                    >
                                        <span>{item.icon}</span>
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Footer */}
                    <div className="border-t border-zinc-700 p-4">
                        <Link
                            href="/"
                            className="block rounded-md bg-zinc-700 px-3 py-2 text-center text-sm hover:bg-zinc-600 transition"
                        >
                            ← Voltar
                        </Link>
                        <button
                            onClick={() => alert("Logout")}
                            className="mt-2 w-full rounded-md bg-rose-600 px-3 py-2 text-sm hover:bg-rose-700 transition"
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}

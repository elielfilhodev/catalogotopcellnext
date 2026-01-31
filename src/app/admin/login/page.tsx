"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function submit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Simulate network delay
        setTimeout(() => {
            if (password === "admin") {
                localStorage.setItem("admin_logged_in", "true");
                // Using window.location to ensure full page refresh and state reset
                window.location.href = "/admin/dashboard";
            } else {
                setError("Senha incorreta");
                setLoading(false);
            }
        }, 500);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
            <form onSubmit={submit} className="w-full max-w-sm rounded-md bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">Login Admin</h2>
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border p-2 mb-2"
                    disabled={loading}
                />
                {error && <div className="mb-2 text-sm text-rose-600">{error}</div>}
                <button
                    disabled={loading}
                    className="mt-4 w-full rounded-md bg-foreground px-4 py-2 text-background disabled:opacity-50"
                >
                    {loading ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </div>
    );
}

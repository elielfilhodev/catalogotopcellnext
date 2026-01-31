"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function submit(e: React.FormEvent) {
        e.preventDefault();
        // Interface mínima: senha 'admin' leva ao dashboard. Real backend deve validar.
        if (password === "admin") {
            router.push("/admin/dashboard");
        } else {
            setError("Senha incorreta");
        }
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
                    className="w-full rounded-md border p-2"
                />
                {error && <div className="mt-2 text-sm text-rose-600">{error}</div>}
                <button className="mt-4 w-full rounded-md bg-foreground px-4 py-2 text-background">Entrar</button>
            </form>
        </div>
    );
}

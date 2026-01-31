"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            console.log("Tentando login com:", username);
            const { data, error } = await supabase
                .from('admins')
                .select('*')
                .eq('username', username)
                .eq('password', password)
                .single();

            console.log("Supabase response:", { data, error });

            if (error) {
                console.error("Erro Supabase:", error);
                setError(`Erro: ${error.message} (${error.code})`);
                setLoading(false);
                return;
            }

            if (!data) {
                console.warn("Nenhum dado retornado");
                setError("Usuário ou senha incorretos");
                setLoading(false);
                return;
            }

            // Login successful
            console.log("Login sucesso, redirecionando...");
            localStorage.setItem("admin_logged_in", "true");
            window.location.href = "/admin/dashboard";

        } catch (err: any) {
            console.error("Erro inesperado:", err);
            setError(`Erro inesperado: ${err.message || err}`);
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
            <form onSubmit={submit} className="w-full max-w-sm rounded-md bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold">Login Admin</h2>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Usuário</label>
                        <input
                            type="text"
                            placeholder="Usuário"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded-md border p-2 mt-1"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Senha</label>
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-md border p-2 mt-1"
                            disabled={loading}
                        />
                    </div>
                </div>

                {error && <div className="mt-4 text-sm text-rose-600">{error}</div>}

                <button
                    disabled={loading}
                    className="mt-6 w-full rounded-md bg-foreground px-4 py-2 text-background disabled:opacity-50"
                >
                    {loading ? "Verificando..." : "Entrar"}
                </button>
            </form>
        </div>
    );
}

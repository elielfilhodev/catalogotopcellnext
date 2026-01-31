import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminDashboard() {
    return (
        <>
            <div className="flex items-center gap-4 mb-6">
                <SidebarTrigger />
                <div>
                    <h1 className="text-3xl font-bold pt-10 pb-4 pl-4">Dashboard</h1>
                    <p className="mt-2 text-zinc-600 pl-4">Bem-vindo ao painel de administração</p>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 pl-15 pr-15">
                <div className="rounded-lg border bg-white p-4 shadow-sm">
                    <p className="text-sm text-zinc-600">Total de Produtos</p>
                    <p className="mt-2 text-2xl font-bold">0</p>
                </div>
                <div className="rounded-lg border bg-white p-4 shadow-sm">
                    <p className="text-sm text-zinc-600">Visitas</p>
                    <p className="mt-2 text-2xl font-bold">0</p>
                </div>
                <div className="rounded-lg border bg-white p-4 shadow-sm">
                    <p className="text-sm text-zinc-600">Usuários</p>
                    <p className="mt-2 text-2xl font-bold">0</p>
                </div>
                <div className="rounded-lg border bg-white p-4 shadow-sm">
                    <p className="text-sm text-zinc-600">Mensagens</p>
                    <p className="mt-2 text-2xl font-bold">0</p>
                </div>
            </div>

            <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm m-15">
                <h2 className="text-lg font-semibold">Próximos passos</h2>
                <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-zinc-600">
                    <li>Gerenciar produtos (criar, editar, deletar)</li>
                    <li>Upload de imagens via Supabase Storage</li>
                    <li>Visualizar mensagens de contato</li>
                    <li>Gerenciar usuários e permissões</li>
                </ul>
            </div>
        </>
    );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { toast } from "sonner";

export default function SettingsPage() {
    return (
        <div className="p-6 space-y-6 max-w-2xl">
            <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Informações da Loja</CardTitle>
                    <CardDescription>Configure os dados principais do seu catálogo.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="storeName">Nome da Loja</Label>
                        <Input id="storeName" defaultValue="TopCell" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="whatsapp">WhatsApp (para pedidos)</Label>
                        <Input id="whatsapp" defaultValue="5511999999999" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="currency">Moeda</Label>
                        <Input id="currency" defaultValue="BRL (R$)" disabled />
                    </div>
                    <Button onClick={() => toast.success("Configurações salvas!")}>
                        Salvar Alterações
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

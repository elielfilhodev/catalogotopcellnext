"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { categories } from "@/data/categories";
import { ChevronLeft, Upload } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ProductFormPage() {
    const handleSave = () => {
        toast.success("Produto salvo com sucesso!");
    };

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/products">
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold tracking-tight">Editar Produto</h1>
                    <p className="text-sm text-muted-foreground">Preencha os dados do produto.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" asChild>
                        <Link href="/admin/products">Cancelar</Link>
                    </Button>
                    <Button onClick={handleSave}>Salvar Alterações</Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informações Básicas</CardTitle>
                            <CardDescription>Título, descrição e categoria do produto.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Título do Produto</Label>
                                <Input id="title" placeholder="Ex: Cadeira de Escritório Ergonômica" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug (URL)</Label>
                                <Input id="slug" placeholder="Ex: cadeira-escritorio-ergonomica" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Descrição Completa</Label>
                                <Textarea id="description" className="min-h-[150px]" placeholder="Descreva os detalhes do produto..." />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Imagens</CardTitle>
                            <CardDescription>Adicione imagens do produto (Máx 5).</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-3">
                                    <Upload className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <h4 className="font-medium">Clique para fazer upload</h4>
                                <p className="text-sm text-muted-foreground mt-1">SVG, PNG, JPG ou GIF (max 2MB)</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Preços</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Preço Base (R$)</Label>
                                <Input id="price" type="number" placeholder="0.00" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="promoPrice">Preço Promocional (R$)</Label>
                                <Input id="promoPrice" type="number" placeholder="0.00" />
                                <p className="text-xs text-muted-foreground">Deixe em branco se não houver promoção.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Organização</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Categoria</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.slug}>{cat.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-3">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Ativo</Label>
                                    <p className="text-xs text-muted-foreground">Visível na loja</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-3">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Destaque</Label>
                                    <p className="text-xs text-muted-foreground">Exibir na home</p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

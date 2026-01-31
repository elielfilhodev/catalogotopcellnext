"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Category, getCategories } from "@/data/categories";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ProductFormPage() {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    // Form state
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [promoPrice, setPromoPrice] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [active, setActive] = useState(true);
    const [featured, setFeatured] = useState(false);
    const [image, setImage] = useState(""); // Simplified for now (URL string)

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);

    // Auto-generate slug from title
    useEffect(() => {
        if (title) {
            const generatedSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            setSlug(generatedSlug);
        }
    }, [title]);

    const handleSave = async () => {
        if (!title || !slug || !price) {
            toast.error("Preencha os campos obrigatórios (Título, Slug, Preço)");
            return;
        }

        setLoading(true);

        try {
            const productData = {
                title,
                slug,
                description,
                price: parseFloat(price),
                promo_price: promoPrice ? parseFloat(promoPrice) : null,
                images: image ? [image] : [],
                // category_id: categoryId || null, // Not saving category yet as we need to match UUIDs properly, let's stick to basic fields first
                active,
                featured
            };

            const { error } = await supabase.from('products').insert(productData);

            if (error) throw error;

            toast.success("Produto criado com sucesso!");
            router.push("/admin/products");

        } catch (error: any) {
            console.error("Erro ao salvar produto:", error);
            toast.error(`Erro ao salvar: ${error.message}`);
        } finally {
            setLoading(false);
        }
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
                    <h1 className="text-2xl font-bold tracking-tight">Novo Produto</h1>
                    <p className="text-sm text-muted-foreground">Preencha os dados do produto.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" asChild disabled={loading}>
                        <Link href="/admin/products">Cancelar</Link>
                    </Button>
                    <Button onClick={handleSave} disabled={loading}>
                        {loading ? "Salvando..." : "Criar Produto"}
                    </Button>
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
                                <Label htmlFor="title">Título do Produto *</Label>
                                <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Cadeira de Escritório" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug (URL) *</Label>
                                <Input id="slug" value={slug} onChange={e => setSlug(e.target.value)} placeholder="Ex: cadeira-escritorio" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Descrição Completa</Label>
                                <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className="min-h-[150px]" placeholder="Descreva os detalhes..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="image">URL da Imagem (Temporário)</Label>
                                <Input id="image" value={image} onChange={e => setImage(e.target.value)} placeholder="http://exemplo.com/imagem.jpg" />
                                <p className="text-xs text-muted-foreground">Para teste, cole uma URL de imagem externa.</p>
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
                                <Label htmlFor="price">Preço Base (R$) *</Label>
                                <Input id="price" type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="promoPrice">Preço Promocional (R$)</Label>
                                <Input id="promoPrice" type="number" value={promoPrice} onChange={e => setPromoPrice(e.target.value)} placeholder="0.00" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Organização</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Category Select Logic Omitted for simplicity/UUID mismatch prevetion in this step */}

                            <div className="flex items-center justify-between rounded-lg border p-3">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Ativo</Label>
                                    <p className="text-xs text-muted-foreground">Visível na loja</p>
                                </div>
                                <Switch checked={active} onCheckedChange={setActive} />
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-3">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Destaque</Label>
                                    <p className="text-xs text-muted-foreground">Exibir na home</p>
                                </div>
                                <Switch checked={featured} onCheckedChange={setFeatured} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

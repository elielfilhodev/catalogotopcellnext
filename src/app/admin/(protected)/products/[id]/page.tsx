"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Category, getCategories } from "@/data/categories";
import { supabase } from "@/lib/supabase";
import { ChevronLeft, X } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProductFormPage() {
    const router = useRouter();
    const params = useParams();
    const productId = params?.id as string;
    const isEditing = productId && productId !== 'new';

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

    // Image state
    const [images, setImages] = useState<string[]>([]);
    const [newImageUrl, setNewImageUrl] = useState("");

    const handleAddImage = () => {
        if (!newImageUrl) return;
        setImages([...images, newImageUrl]);
        setNewImageUrl("");
    };

    const handleRemoveImage = (indexToRemove: number) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);

    // Fetch product data if editing
    useEffect(() => {
        if (isEditing) {
            setLoading(true);
            const fetchProduct = async () => {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', productId)
                    .single();

                if (error) {
                    console.error("Erro ao buscar produto:", error);
                    toast.error("Erro ao carregar produto.");
                    setLoading(false);
                    return;
                }

                if (data) {
                    setTitle(data.title);
                    setSlug(data.slug);
                    setDescription(data.description || "");
                    setPrice(data.price.toString());
                    setPromoPrice(data.promo_price ? data.promo_price.toString() : "");
                    setCategoryId(data.category_id || "");
                    setActive(data.active);
                    setFeatured(data.featured);
                    setImages(data.images || []);
                }
                setLoading(false);
            };
            fetchProduct();
        }
    }, [isEditing, productId]);

    // Auto-generate slug from title ONLY if creating new
    useEffect(() => {
        if (!isEditing && title) {
            const generatedSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            setSlug(generatedSlug);
        }
    }, [title, isEditing]);

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
                images: images,
                category_id: categoryId && categoryId !== "" ? categoryId : null,
                active,
                featured
            };

            console.log("Saving product data:", productData); // Debug log

            let error;
            let data;

            if (isEditing) {
                const response = await supabase
                    .from('products')
                    .update(productData)
                    .eq('id', productId)
                    .select();
                error = response.error;
                data = response.data;
            } else {
                const response = await supabase
                    .from('products')
                    .insert(productData)
                    .select();
                error = response.error;
                data = response.data;
            }

            console.log("Supabase operation result:", { data, error }); // CRITICAL DEBUG LOG

            if (error) {
                console.error("Detailed Supabase Error:", error);
                throw error;
            }

            if (error) throw error;

            toast.success(`Produto ${isEditing ? 'atualizado' : 'criado'} com sucesso!`);
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
                    <h1 className="text-2xl font-bold tracking-tight">{isEditing ? 'Editar Produto' : 'Novo Produto'}</h1>
                    <p className="text-sm text-muted-foreground">{isEditing ? 'Edite os dados do produto.' : 'Preencha os dados do produto.'}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" asChild disabled={loading}>
                        <Link href="/admin/products">Cancelar</Link>
                    </Button>
                    <Button onClick={handleSave} disabled={loading}>
                        {loading ? "Salvando..." : (isEditing ? "Salvar Alterações" : "Criar Produto")}
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
                            <div className="space-y-4">
                                <Label>Imagens do Produto</Label>

                                <div className="flex gap-2">
                                    <Input
                                        value={newImageUrl}
                                        onChange={e => setNewImageUrl(e.target.value)}
                                        placeholder="http://exemplo.com/imagem.jpg"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleAddImage();
                                            }
                                        }}
                                    />
                                    <Button type="button" onClick={handleAddImage} variant="secondary">Adicionar</Button>
                                </div>
                                <p className="text-xs text-muted-foreground">Cole a URL da imagem e clique em Adicionar.</p>

                                {images.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                        {images.map((img, index) => (
                                            <div key={index} className="relative group border rounded-lg overflow-hidden aspect-square bg-muted">
                                                <img src={img} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveImage(index)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="Remover imagem"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
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
                            <div className="space-y-2">
                                <Label>Categoria</Label>
                                <Select value={categoryId} onValueChange={setCategoryId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

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

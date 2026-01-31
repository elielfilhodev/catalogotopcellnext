"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Login realizado com sucesso!");
            router.push("/");
        }, 1000);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate registration
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Conta criada com sucesso!");
            router.push("/");
        }, 1000);
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Entrar</TabsTrigger>
                    <TabsTrigger value="register">Cadastrar</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Bem-vindo de volta</CardTitle>
                            <CardDescription>
                                Entre com seu email e senha para acessar sua conta.
                            </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleLogin}>
                            <CardContent className="space-y-4 px-6 pb-6 pt-0">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="seu@email.com" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input id="password" type="password" required />
                                </div>
                            </CardContent>
                            <CardFooter className="px-6 pb-6">
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "Entrando..." : "Entrar"}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>

                <TabsContent value="register">
                    <Card>
                        <CardHeader>
                            <CardTitle>Criar nova conta</CardTitle>
                            <CardDescription>
                                Preencha seus dados para começar.
                            </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleRegister}>
                            <CardContent className="space-y-4 px-6 pb-6 pt-0">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nome Completo</Label>
                                    <Input id="name" placeholder="Seu nome" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="reg-email">Email</Label>
                                    <Input id="reg-email" type="email" placeholder="seu@email.com" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="reg-password">Senha</Label>
                                    <Input id="reg-password" type="password" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirmar Senha</Label>
                                    <Input id="confirm-password" type="password" required />
                                </div>
                            </CardContent>
                            <CardFooter className="px-6 pb-6">
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "Criando conta..." : "Criar Conta"}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

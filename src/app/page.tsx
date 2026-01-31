import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-16 pt-12 md:pt-20 text-center">
          <div className="mx-auto max-w-3xl space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              TopCell <span className="text-primary block sm:inline">Catálogo</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
              Confira os melhores produtos de tecnologia e decoração com preços imperdíveis.
            </p>
          </div>
        </section>

        {/* Product Grid */}
        <section className="mb-20">
          <h2 className="mb-8 text-2xl font-bold tracking-tight">Destaques</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contato" className="mx-auto max-w-2xl mb-20">
          <Card>
            <CardHeader>
              <CardTitle>Fale Conosco</CardTitle>
              <CardDescription>
                Entre em contato para tirar dúvidas ou solicitar um orçamento.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                action="/api/contact"
                method="post"
                className="grid gap-4"
              >
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" name="name" placeholder="Seu nome" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" name="phone" placeholder="(11) 99999-9999" />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="seu@email.com" required />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input id="subject" name="subject" placeholder="Assunto da mensagem" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Escreva sua mensagem aqui..."
                    className="h-32"
                    required
                  />
                </div>

                <Button type="submit" className="w-full sm:w-auto">
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

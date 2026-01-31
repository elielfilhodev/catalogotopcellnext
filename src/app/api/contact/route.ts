import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const form = await request.formData();
        const data: Record<string, string> = {};
        form.forEach((value, key) => (data[key] = String(value)));

        // Aqui você integraria com um serviço de e-mail ou gravação no banco.
        console.log("Contato recebido:", data);

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}

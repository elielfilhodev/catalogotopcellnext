import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/api/products", async (req, res) => {
    const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
    res.json(products);
});

app.post("/api/contact", async (req, res) => {
    // Apenas grava/loga a mensagem; você pode integrar com e-mail ou notificações
    console.log("Contato recebido (backend):", req.body);
    res.json({ ok: true });
});

app.post("/api/auth/register", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Missing" });
    const user = await prisma.user.create({ data: { email, password } });
    res.json({ ok: true, user: { id: user.id, email: user.email } });
});

app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) return res.status(401).json({ error: "Unauthorized" });
    res.json({ ok: true, user: { id: user.id, email: user.email, role: user.role } });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

import express from "express";

const app = express();
const PORT = 3000;

const fibonacci = (n) => {
         if (n <= 1) return n;
         return fibonacci(n - 1) + fibonacci(n - 2);
};

app.get("/", (_req, res) => {
         res.json({ message: "Servidor activo", pid: process.pid });
});

app.get("/heavy", (_req, res) => {
         const start = Date.now();
         const result = fibonacci(42);
         const duration = Date.now() - start;

         res.json({ result, duration: `${duration}ms`, pid: process.pid });
});

app.get("/light", (_req, res) => {
         res.json({ message: "Respuesta rápida", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
         console.log(`=== INCORRECTO: Servidor Express SIN fork ===`);
         console.log(`Servidor en http://localhost:${PORT}`);
         console.log(`\nPrueba esto:`);
         console.log(`  1. Abrí http://localhost:${PORT}/heavy en una pestaña`);
         console.log(`  2. Inmediatamente abrí http://localhost:${PORT}/light en otra`);
         console.log(`  ⚠️  /light va a ESPERAR a que /heavy termine porque bloquea el hilo.\n`);
});
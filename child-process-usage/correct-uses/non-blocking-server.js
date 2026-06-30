import express from "express";
import { fork } from "node:child_process";

const app = express();
const PORT = 3000;

app.get("/", (_req, res) => {
         res.json({ message: "Servidor activo", pid: process.pid });
});

app.get("/heavy", (_req, res) => {
         const child = fork("../uso_procesos_hijos/procesos/fibonacci.js");

         child.on("message", (msg) => {
                  res.json({
                           result: msg.result,
                           duration: `${msg.duration}ms`,
                           workerPid: msg.pid,
                           serverPid: process.pid,
                  });
         });

         // Importante en casos de que falle el proceso hijo
         child.on("error", (err) => {
                  res.status(500).json({ error: err.message });
         });

         child.send({ action: "calculate", number: 42 });
});

app.get("/light", (_req, res) => {
         res.json({ message: "Respuesta rápida", timestamp: new Date().toISOString() });
});


app.listen(PORT, () => {
         console.log(`=== CORRECTO: Servidor Express CON fork ===`);
         console.log(`Servidor en http://localhost:${PORT}`);
         console.log(`\nPrueba esto:`);
         console.log(`  1. Abrí http://localhost:${PORT}/heavy en una pestaña`);
         console.log(`  2. Inmediatamente abrí http://localhost:${PORT}/light en otra`);
         console.log(`  ✅ /light responde INMEDIATAMENTE porque /heavy corre en otro proceso.\n`);
});
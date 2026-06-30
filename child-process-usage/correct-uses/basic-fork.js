import { fork } from "node:child_process";


console.log("=== CORRECTO: Uso básico de fork() ===\n");
console.log(`Proceso padre PID: ${process.pid}`);

const child = fork("../uso_procesos_hijos/procesos/tarea-pesada.js");

child.on("message", (msg) => {
         console.log(`\n✅ Resultado recibido del hijo (PID: ${msg.pid}):`);
         console.log(`   Primos encontrados: ${msg.primes}`);
         console.log(`   Tiempo: ${msg.duration}ms`);
});

child.on("error", (err) => {
         console.error("Error en proceso hijo:", err.message);
});

child.on("exit", (code) => {
         console.log(`\nProceso hijo terminó con código: ${code}`);
});

child.send({ action: "calculate", limit: 500000 });

console.log("El proceso padre sigue ejecutándose sin bloquearse...");

setTimeout(() => {
         console.log("⏱️  Tarea liviana ejecutada a los 100ms (no fue bloqueada)");
}, 100);
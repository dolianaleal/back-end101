const calculatePrimes = (limit) => {
         const primes = [];
         for (let i = 2; i <= limit; i++) {
                  let isPrime = true;
                  for (let j = 2; j <= Math.sqrt(i); j++) {
                           if (i % j === 0) {
                                    isPrime = false;
                                    break;
                           }
                  }
                  if (isPrime) primes.push(i);
         }
         return primes;
};

console.log("=== INCORRECTO: Cálculo pesado bloqueando el hilo principal ===\n");

console.log("[1] Iniciando tarea liviana (setTimeout 100ms)...");
setTimeout(() => {
         console.log("[1] Tarea liviana completada (esto debería haber tardado ~100ms)");
}, 100);

console.log("[2] Iniciando cálculo pesado de números primos...");
const start = Date.now();
const primes = calculatePrimes(500000);
const duration = Date.now() - start;
console.log(
         `[2] Cálculo terminado: ${primes.length} primos encontrados en ${duration}ms`
);

console.log("[3] Esto se ejecuta después del cálculo pesado");
console.log(
         "\n⚠️  La tarea liviana [1] tuvo que ESPERAR a que terminara el cálculo pesado [2]."
);
console.log(
         "   El hilo principal quedó bloqueado y nada más pudo ejecutarse.\n"
);
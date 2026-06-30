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

process.on("message", (msg) => {
         // El uso de este IF es opcional, asi como la implementacion con el uso de msg.action, lo utlilizamos para delimitar la funcinalidad
         // ya qu podriamos tener mas operaciones a la vez ademas de calculador los primos.
         if (msg.action === "calculate") {
                  const start = Date.now();
                  const result = calculatePrimes(msg.limit || 500000);
                  const duration = Date.now() - start;

                  process.send({
                           primes: result.length,
                           duration,
                           pid: process.pid,
                  });

                  process.exit(0);
         }
});
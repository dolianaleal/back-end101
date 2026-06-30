const fibonacci = (n) => {
         if (n <= 1) return n;
         return fibonacci(n - 1) + fibonacci(n - 2);
};

process.on("message", (msg) => {
         if (msg.action === "calculate") {
                  const start = Date.now();
                  const result = fibonacci(msg.number || 40);
                  const duration = Date.now() - start;

                  process.send({
                           number: msg.number,
                           result,
                           duration,
                           pid: process.pid,
                  });

                  process.exit(0);
         }
});
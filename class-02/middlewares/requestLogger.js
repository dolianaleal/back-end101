/**
 * REQUEST LOGGER - Middleware custom
 *
 * Registra en consola información útil de cada request/response:
 * - Método HTTP
 * - Path
 * - Status code de la respuesta
 * - Tiempo de demora (ms)
 * - Fecha y hora
 *
 * Este logger es básico e intencional para fines didácticos.
 * En producción usaríamos librerías como morgan, pino o winston.
 */

export const requestLogger = (req, res, next) => {
         const start = Date.now();

         // Guardamos la fecha en que llegó el request
         const timestamp = new Date().toISOString();

         // Interceptamos el evento "finish" de la response para loggear
         // cuando ya se haya enviado la respuesta al cliente
         res.on("finish", () => {
                  const duration = Date.now() - start;
                  const statusCode = res.statusCode;

                  // Colores según status code (para la terminal)
                  let statusColor;
                  if (statusCode >= 500) statusColor = "\x1b[31m"; // rojo
                  else if (statusCode >= 400) statusColor = "\x1b[33m"; // amarillo
                  else if (statusCode >= 300) statusColor = "\x1b[36m"; // cyan
                  else statusColor = "\x1b[32m"; // verde

                  const reset = "\x1b[0m";

                  console.log(
                           `[${timestamp}] ${req.method} ${req.originalUrl} → ${statusColor}${statusCode}${reset} (${duration}ms)`
                  );
         });

         next();
};
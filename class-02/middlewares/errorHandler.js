import { config } from "../config/env.js";

/**
 * MIDDLEWARE DE MANEJO CENTRALIZADO DE ERRORES
 *
 * Este middleware debe registrarse AL FINAL de todas las rutas.
 * Express reconoce que es un middleware de error por tener 4 parámetros (err, req, res, next).
 *
 * Responsabilidades:
 * 1. Loggear el error (en prod se enviaría a un servicio como Sentry)
 * 2. Determinar qué información mostrar según el entorno
 * 3. Responder al cliente con un formato consistente
 */
export const errorHandler = (err, req, res, next) => {
         // Log del error (siempre, en cualquier entorno)
         console.error("\n❌ Error capturado por errorHandler:");
         console.error(`   Ruta: ${req.method} ${req.originalUrl}`);
         console.error(`   Mensaje: ${err.message}`);

         if (config.env !== "production") {
                  console.error(`   Stack: ${err.stack}`);
         }

         // Determinamos el status code
         const statusCode = err.statusCode || 500;
         const code = err.code || "INTERNAL_ERROR";

         // Construimos la respuesta
         const response = {
                  status: "error",
                  error: {
                           code,
                           message: config.env === "production" && statusCode === 500
                                    ? "Ocurrió un error interno del servidor"
                                    : err.message,
                  },
         };

         // En desarrollo, incluimos información extra para debugging
         if (config.env !== "production") {
                  response.error.details = err.details || null;
                  response.error.stack = err.stack;
         }

         res.status(statusCode).json(response);
};
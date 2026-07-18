/**
 * NORMALIZACIÓN DE RESPUESTAS JSON
 *
 * El objetivo es que TODAS nuestras respuestas tengan una estructura consistente.
 * Esto facilita el trabajo del frontend ya que siempre sabe qué esperar.
 *
 * Estructura de respuesta exitosa:
 * {
 *   status: "success",
 *   data: { ... },
 *   meta: { ... }   // opcional: paginación, conteos, etc.
 * }
 *
 * Estructura de respuesta con error:
 * {
 *   status: "error",
 *   error: {
 *     code: "ERROR_CODE",
 *     message: "Mensaje legible para el usuario",
 *     details: { ... }  // solo en development
 *   }
 * }
 */

export const sendSuccess = (res, { data, meta = null, statusCode = 200 }) => {
         const response = {
                  status: "success",
                  data,
         };

         if (meta) {
                  response.meta = meta;
         }

         return res.status(statusCode).json(response);
};

export const sendError = (
         res,
         { code = "INTERNAL_ERROR", message = "Ocurrió un error", details = null, statusCode = 500 }
) => {
         const response = {
                  status: "error",
                  error: {
                           code,
                           message,
                  },
         };

         // Solo mostramos detalles si NO estamos en producción
         if (details && process.env.NODE_ENV !== "production") {
                  response.error.details = details;
         }

         return res.status(statusCode).json(response);
};

export const sendPaginated = (res, { data, page, limit, total }) => {
         return sendSuccess(res, {
                  data,
                  meta: {
                           page,
                           limit,
                           total,
                           totalPages: Math.ceil(total / limit),
                  },
         });
};
/**
 * DICCIONARIO DE ERRORES
 *
 * Centralizamos todos los errores posibles de nuestra aplicación.
 * Esto nos permite:
 * - Tener consistencia en los mensajes de error
 * - Reutilizar errores en distintas partes del código
 * - Facilitar la internacionalización (i18n) en el futuro
 * - Documentar los errores para el equipo de frontend
 */

export const ERROR_CODES = {
         // --- Errores de validación ---
         VALIDATION_ERROR: {
                  statusCode: 400,
                  code: "VALIDATION_ERROR",
                  message: "Los datos enviados no son válidos",
         },
         MISSING_FIELDS: {
                  statusCode: 400,
                  code: "MISSING_FIELDS",
                  message: "Faltan campos obligatorios en la petición",
         },

         // --- Errores de autenticación / autorización ---
         UNAUTHORIZED: {
                  statusCode: 401,
                  code: "UNAUTHORIZED",
                  message: "No estás autenticado. Iniciá sesión para continuar",
         },
         FORBIDDEN: {
                  statusCode: 403,
                  code: "FORBIDDEN",
                  message: "No tenés permisos para realizar esta acción",
         },

         // --- Errores de recursos ---
         NOT_FOUND: {
                  statusCode: 404,
                  code: "NOT_FOUND",
                  message: "El recurso solicitado no existe",
         },
         PRODUCT_NOT_FOUND: {
                  statusCode: 404,
                  code: "PRODUCT_NOT_FOUND",
                  message: "El producto solicitado no fue encontrado",
         },
         CART_NOT_FOUND: {
                  statusCode: 404,
                  code: "CART_NOT_FOUND",
                  message: "El carrito solicitado no fue encontrado",
         },
         ORDER_NOT_FOUND: {
                  statusCode: 404,
                  code: "ORDER_NOT_FOUND",
                  message: "La orden solicitada no fue encontrada",
         },

         // --- Errores de negocio ---
         INSUFFICIENT_STOCK: {
                  statusCode: 409,
                  code: "INSUFFICIENT_STOCK",
                  message: "No hay stock suficiente para completar la operación",
         },
         DUPLICATE_ENTRY: {
                  statusCode: 409,
                  code: "DUPLICATE_ENTRY",
                  message: "Ya existe un registro con estos datos",
         },

         // --- Errores internos ---
         INTERNAL_ERROR: {
                  statusCode: 500,
                  code: "INTERNAL_ERROR",
                  message: "Ocurrió un error interno del servidor",
         },
         DATABASE_ERROR: {
                  statusCode: 500,
                  code: "DATABASE_ERROR",
                  message: "Error de conexión con la base de datos",
         },
};
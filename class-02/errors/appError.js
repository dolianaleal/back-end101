import { ERROR_CODES } from "./errorDictionary.js";

/**
 * GENERADOR PERSONALIZADO DE ERRORES
 *
 * Crea un objeto Error con propiedades extra que nuestro middleware
 * de errores puede leer (statusCode, code, details, isOperational).
 *
 * Uso: throw createAppError("VALIDATION_ERROR", { campo: "email" })
 */

export function createAppError(errorCode, details = null) {
         const errorDef = ERROR_CODES[errorCode] || ERROR_CODES.INTERNAL_ERROR;

         const err = new Error(errorDef.message);

         err.statusCode = errorDef.statusCode;
         err.code = errorDef.code;
         err.details = details;

         return err;
}
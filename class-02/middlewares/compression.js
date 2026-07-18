import compression from "express-compression";
import { constants } from "zlib";

/**
 * COMPRESIÓN HTTP (express-compression con Brotli)
 *
 * La compresión reduce el tamaño de las respuestas HTTP.
 * El servidor comprime la respuesta y el navegador la descomprime automáticamente.
 *
 * Algoritmos soportados por express-compression:
 * - br (brotli): El más eficiente. Mejor ratio de compresión que gzip.
 * - gzip: El más compatible. Fallback cuando brotli no está disponible.
 * - deflate: Alternativa más antigua, raramente usada.
 *
 * Brotli es preferido porque:
 * - Reduce el tamaño de transferencia un 20-30% más que gzip
 * - Es el algoritmo por defecto en HTTP/2 y HTTP/3
 * - Los navegadores modernos lo soportan nativamente
 *
 * Opciones importantes:
 */

export const compressionMiddleware = compression({
         brotli: {
                  enabled: true,
                  // Las opciones de Brotli se configuran dentro de zlib usando constantes de Node.js
                  zlib: {
                           //[constants.BROTLI_PARAM_QUALITY]: 10,
                           // ↑ Nivel de calidad de Brotli (0-11). Default: 4.
                           //   A diferencia de gzip (1-9), Brotli va hasta 11.
                           //   - 0-3: Muy rápido, compresión baja. APIs de muy alto tráfico.
                           //   - 4: Balance recomendado (default).
                           //   - 5-8: Mejor compresión, más lento.
                           //   - 9-11: Máxima compresión, consume más CPU.

                           // [constants.BROTLI_PARAM_MODE]: constants.BROTLI_MODE_TEXT,
                           // ↑ Modo de compresión de Brotli:
                           //   - BROTLI_MODE_GENERIC (0): Para cualquier dato (default).
                           //   - BROTLI_MODE_TEXT (1): Optimizado para UTF-8 (JSON, HTML, CSS).
                           //   Si tu API devuelve principalmente JSON, el modo texto puede mejorar el ratio.
                  },
         },

         // threshold: 1024,
         // ↑ Tamaño mínimo en bytes para comprimir (default: 1kb).
         //   Respuestas menores a este tamaño NO se comprimen porque
         //   el overhead de compresión no justifica para payloads chicos.

         // level: 6,
         // ↑ Nivel de compresión gzip (1-9). Default: 6.
         //   Solo aplica cuando se usa gzip como fallback de brotli.
         //   - 1: Compresión más rápida, menor ratio.
         //   - 9: Compresión más lenta, mejor ratio.
         //   - 6: Balance entre velocidad y ratio (recomendado).

         // filter: (req, res) => {
         //   // Podemos decidir qué requests comprimir
         //   if (req.headers['x-no-compression']) {
         //     return false;
         //   }
         //   return compression.filter(req, res);
         // },
});
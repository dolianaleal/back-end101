/**
 * MIDDLEWARE DE CACHE CONTROL (reutilizable)
 *
 * Este middleware se puede aplicar a rutas individuales o grupos de rutas.
 * Recibe opciones de configuración y setea el header Cache-Control.
 *
 * Uso:
 *   router.get("/categorias", cacheControl({ maxAge: 60 }), controller);
 *   router.get("/carrito", cacheControl({ noStore: true }), controller);
 *
 * Directivas de Cache-Control:
 * - no-store: No guardar nada en caché (datos sensibles, carritos, sesiones)
 * - no-cache: Guardar pero siempre revalidar con el servidor antes de usar
 * - max-age=N: Tiempo en segundos que el recurso es considerado "fresco"
 * - stale-while-revalidate=N: Servir stale mientras se revalida en background
 */

export const cacheControl = (options = {}) => {
         const {
                  maxAge = 0,              // segundos
                  noStore = false,         // no guardar nada
                  noCache = false,         // guardar pero revalidar siempre
                  staleWhileRevalidate = null, // segundos
         } = options;

         return (req, res, next) => {
                  // Si es no-store, ignora todo lo demás
                  if (noStore) {
                           res.set("Cache-Control", "no-store");
                           return next();
                  }

                  // Si es no-cache
                  if (noCache) {
                           res.set("Cache-Control", "no-cache");
                           return next();
                  }

                  // Construimos la directiva
                  const directives = [];
                  directives.push(`max-age=${maxAge}`);


                  if (staleWhileRevalidate !== null) {
                           directives.push(`stale-while-revalidate=${staleWhileRevalidate}`);
                  }

                  res.set("Cache-Control", directives.join(", "));
                  next();
         };
};
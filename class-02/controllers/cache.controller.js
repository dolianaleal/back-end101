import { Router } from "express";
import { faker } from "@faker-js/faker";
import { cacheControl } from "../middlewares/cacheControl.js";

const router = Router();

/**
 * CONTROLADOR: Cache Control
 *
 * Demostramos el uso del middleware de cache aplicado a rutas individuales.
 * Cada endpoint tiene una política de cache distinta según su caso de uso.
 *
 * Para probar:
 * - Hacer click varias veces y ver que el timestamp no cambia (viene de caché)
 * - Ver en DevTools > Network la columna "Size" (muestra "disk cache" o "memory cache")
 * - Desactivar cache en DevTools para comparar
 */

// ============================================================
// Ejemplo 1: Sin caché (datos que cambian siempre)
// Caso de uso: Carrito de compras, stock en tiempo real
// ============================================================
router.get(
         "/sin-cache",
         cacheControl({ noStore: true }),
         async (req, res) => {
                  // Simulamos un proceso pesado que tarda (ej: consulta a DB con JOINs complejos)
                  await new Promise((resolve) => setTimeout(resolve, 800));

                  res.json({
                           status: "success",
                           data: {
                                    carrito: {
                                             id: faker.string.uuid(),
                                             items: Array.from({ length: 50 }, () => ({
                                                      producto: faker.commerce.productName(),
                                                      cantidad: faker.number.int({ min: 1, max: 5 }),
                                                      precio: parseFloat(faker.commerce.price()),
                                                      sku: faker.string.alphanumeric(8),
                                                      categoria: faker.commerce.department(),
                                                      descripcion: faker.commerce.productDescription(),
                                             })),
                                             total: parseFloat(faker.commerce.price({ min: 5000, max: 100000 })),
                                             actualizadoEn: new Date().toISOString(),
                                    },
                           },
                  });
         }
);

// ============================================================
// Ejemplo 2: Caché corto (datos que cambian poco)
// Caso de uso: Listado de categorías, productos destacados
// ============================================================
router.get(
         "/cache-corto",
         cacheControl({ visibility: "public", maxAge: 60 }),
         async (req, res) => {
                  // Simulamos un proceso pesado que tarda (ej: generar reporte, procesar datos)
                  await new Promise((resolve) => setTimeout(resolve, 800));

                  res.json({
                           status: "success",
                           data: {
                                    categorias: Array.from({ length: 100 }, (_, i) => ({
                                             id: faker.string.uuid(),
                                             nombre: faker.commerce.department(),
                                             productosCount: faker.number.int({ min: 10, max: 500 }),
                                             imagen: faker.image.url(),
                                             descripcion: faker.commerce.productDescription(),
                                             destacados: Array.from({ length: 5 }, () => faker.commerce.productName()),
                                    })),
                           },
                  });
         }
);

// ============================================================
// Ejemplo 3: Caché largo (datos estáticos o que raramente cambian)
// Caso de uso: Info de la empresa, políticas, assets
// ============================================================
router.get(
         "/cache-largo",
         cacheControl({ visibility: "private", maxAge: 86400, staleWhileRevalidate: 3600 }),
         async (req, res) => {
                  // Simulamos un proceso pesado que tarda (ej: leer archivo, generar contenido estático)
                  await new Promise((resolve) => setTimeout(resolve, 800));

                  res.json({
                           status: "success",
                           meta: {
                                    cacheControl: "private, max-age=86400, stale-while-revalidate=3600",
                                    descripcion: "Cacheado por 24 horas. Ideal para datos que casi nunca cambian.",
                                    casoDeUso: "Información de la tienda, políticas, listado de países/provincias",
                                    timestamp: new Date().toISOString(),
                           },
                           data: {
                                    tienda: {
                                             nombre: faker.company.name(),
                                             slogan: faker.company.catchPhrase(),
                                             direccion: faker.location.streetAddress({ useFullAddress: true }),
                                             telefono: faker.phone.number(),
                                             email: faker.internet.email(),
                                             redesSociales: {
                                                      instagram: `@${faker.internet.username()}`,
                                                      twitter: `@${faker.internet.username()}`,
                                                      facebook: faker.internet.url(),
                                                      linkedin: faker.internet.url(),
                                             },
                                             politicaDevolucion: faker.lorem.paragraphs(10),
                                             faq: Array.from({ length: 20 }, () => ({
                                                      pregunta: faker.lorem.sentence(),
                                                      respuesta: faker.lorem.paragraph(),
                                             })),
                                             sucursales: Array.from({ length: 15 }, () => ({
                                                      ciudad: faker.location.city(),
                                                      direccion: faker.location.streetAddress(),
                                                      telefono: faker.phone.number(),
                                                      horario: "9:00 - 18:00",
                                             })),
                                    },
                           },
                  });
         }
);

export default router;
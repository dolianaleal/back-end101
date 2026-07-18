import { Router } from "express";
import { sendSuccess, sendError, sendPaginated } from "../helpers/responseHelper.js";

const router = Router();

/**
 * CONTROLADOR: Normalización de Respuestas
 *
 * Demostramos cómo usar helpers para que todas las respuestas
 * del backend tengan el mismo formato predecible.
 */


// ============================================================
// EJEMPLOS SIN NORMALIZACIÓN (anti-patrón)
// Estos endpoints muestran respuestas inconsistentes para comparar.
// ============================================================

// Ejemplo 4: Sin normalización - respuesta exitosa
router.get("/mal-ejemplo/producto/:id", (req, res) => {
         res.json({
                  producto_id: req.params.id,
                  producto_nombre: "Notebook Lenovo ThinkPad",
                  producto_precio: 1200000,
         });
});

// Ejemplo 5: Sin normalización - error
router.post("/mal-ejemplo/producto", (req, res) => {
         const { nombre, precio } = req.body;

         if (!nombre || !precio) {
                  // Formato de error distinto al de arriba
                  return res.status(400).json({
                           err: "Faltan datos",
                           info: "mandame nombre y precio",
                  });
         }

         // En éxito también responde distinto
         res.status(200).json({
                  creado: true,
                  item: { nombre, precio },
         });
});


// Ejemplo 1: Respuesta exitosa simple
router.get("/producto/:id", (req, res) => {
         const producto = {
                  id: req.params.id,
                  nombre: "Notebook Lenovo ThinkPad",
                  precio: 1200000,
                  stock: 15,
                  categoria: "Electrónica",
         };

         sendSuccess(res, { data: producto });
});

// Ejemplo 2: Respuesta con paginación
router.get("/productos", (req, res) => {
         const page = parseInt(req.query.page) || 1;
         const limit = parseInt(req.query.limit) || 10;

         // Simulamos productos
         const todosLosProductos = Array.from({ length: 50 }, (_, i) => ({
                  id: i + 1,
                  nombre: `Producto ${i + 1}`,
                  precio: Math.floor(Math.random() * 100000) + 1000,
         }));

         const start = (page - 1) * limit;
         const productosPage = todosLosProductos.slice(start, start + limit);

         sendPaginated(res, {
                  data: productosPage,
                  page,
                  limit,
                  total: todosLosProductos.length,
         });
});

// Ejemplo 3: Respuesta con error controlado
router.post("/producto", (req, res) => {
         const { nombre, precio } = req.body;

         if (!nombre || !precio) {
                  return sendError(res, {
                           code: "VALIDATION_ERROR",
                           message: "Los campos 'nombre' y 'precio' son obligatorios",
                           details: {
                                    camposRecibidos: Object.keys(req.body),
                                    camposFaltantes: [!nombre && "nombre", !precio && "precio"].filter(Boolean),
                           },
                           statusCode: 400,
                  });
         }

         const nuevoProducto = { id: Date.now(), nombre, precio };
         sendSuccess(res, { data: nuevoProducto, statusCode: 201 });
});


export default router;
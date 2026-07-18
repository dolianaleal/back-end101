import { Router } from "express";
import { createAppError } from "../errors/AppError.js";
import { sendSuccess } from "../helpers/responseHelper.js";

const router = Router();

router.get("/sin-middleware/:id", (req, res) => {
         const { id } = req.params;

         // Sin middleware, cada ruta maneja sus errores de forma distinta
         // Esto genera inconsistencia en las respuestas
         if (!id || isNaN(id)) {
                  // Un dev responde así:
                  return res.status(400).json({ msg: "id invalido" });
         }

         if (Number(id) > 100) {
                  // Otro dev responde así (distinto formato):
                  return res.status(404).send("Producto no encontrado!!");
         }

         // Otro dev responde distinto en éxito también:
         res.json({ product_name: "Widget", product_id: id });
});

router.get("/con-middleware/:id", (req, res, next) => {
         const { id } = req.params;

         if (!id || isNaN(id)) {
                  throw createAppError("VALIDATION_ERROR", {
                           campo: "id",
                           valorRecibido: id,
                           tipoEsperado: "number",
                  });
         }

         if (Number(id) > 100) {
                  throw createAppError("PRODUCT_NOT_FOUND", {
                           productId: id,
                  });
         }

         // Stock insuficiente (error de negocio)
         if (Number(id) === 50) {
                  const error = (createAppError("INSUFFICIENT_STOCK", {
                           productId: id,
                           stockActual: 0,
                           cantidadSolicitada: 1,
                  }));

                  return next(error)
         }

         sendSuccess(res, { data: { id: Number(id), nombre: "Notebook Lenovo", precio: 1200000 } })
});

// ============================================================
// EJEMPLO 3: Error en código async que el middleware NO atrapa
//
// IMPORTANTE: Express 4 no atrapa errores en funciones async
// a menos que usemos un wrapper o express 5.
// Este ejemplo muestra qué pasa cuando un error "se escapa".
// ============================================================
router.get("/async-no-atrapado", async (req, res, next) => {
         // Simulamos un proceso async que falla después de un tiempo
         // Si no usamos try/catch o next(err), el error se pierde
         // y el cliente queda colgado (timeout)
         setTimeout(() => {
                  try {
                           throw new Error("Error en un timeout - no atrapado por Express");
                  } catch (err) {
                           // Si no hacemos nada aquí, el cliente nunca recibe respuesta
                           console.error("⚠️  Error en proceso async NO manejado:", err.message);
                           console.error("   El cliente nunca recibirá una respuesta de este request.");
                           // NOTA: Para solucionarlo, necesitaríamos pasar el error a next():
                           // next(err);  // <-- esto SÍ lo enviaría al errorHandler
                  }
         }, 1000);

         // El response nunca se envía porque esperamos que el setTimeout lo haga
         // Esto causa un timeout en el cliente
});

// Ejemplo 3b: La forma CORRECTA de manejar errores async
router.get("/async-correcto", async (req, res, next) => {
         try {
                  // Simulamos una operación async que falla
                  await new Promise((_, reject) => {
                           setTimeout(() => reject(new Error("Falló la operación async")), 500);
                  });
         } catch (error) {
                  // Pasamos el error a next() para que lo atrape el errorHandler
                  next(createAppError("DATABASE_ERROR", { originalError: error.message }));
         }
});

// Ejemplo 3d: Error NO operacional (bug real del código)
// Este error NO es un AppError. Es un bug inesperado.
// El middleware de errores lo atrapa
router.get("/bug-real", (req, res) => {
         const productos = undefined;
         const resultado = productos.map((p) => p.nombre);

         res.json({ status: "success", data: resultado });
});

// Ejemplo 3e: Error NO operacional con referencia inválida
router.get("/referencia-invalida", (req, res) => {
         // Simulamos un bug: usamos una variable que no existe
         // Esto lanza ReferenceError: usuarioLogueado is not defined
         const datos = {
                  nombre: usuarioLogueado.nombre,
                  email: usuarioLogueado.email,
         };

         res.json({ status: "success", data: datos });
});

export default router;
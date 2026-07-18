import { Router } from "express";
import { orders } from "../data/ordersData.js";

const router = Router();


// ANALIZAR QUE SE PUEDE MEJORAR DE ESTOS ENDPOINTS
// IMPLEMENTAR MEJORAS

// GET /api/orders/:id - Obtener una orden por ID
router.get("/:id", (req, res) => {
         const id = req.params.id;
         // No valida que id sea un número
         const order = orders.find((o) => o.id == id); // Usa == en vez de ===

         if (!order) {
                  return res.status(404).json({ msg: "no encontrado" });
         }

         // Devuelve la orden completa con internalNotes y metadatos de DB
         res.json({ success: true, order });
});

// POST /api/orders - Crear nueva orden
router.post("/", (req, res) => {
         try {
                  const { userId, items } = req.body;

                  // Validación mínima y mensajes poco claros
                  if (!userId) {
                           return res.status(400).send("falta userId");
                  }
                  if (!items || items.length === 0) {
                           // Formato distinto de error al de arriba
                           return res.status(400).json({ error: "items vacío" });
                  }

                  const newOrder = {
                           id: orders.length + 1,
                           userId,
                           items,
                           total: items.reduce((sum, item) => sum + item.price * item.qty, 0),
                           status: "pending",
                           createdAt: new Date().toISOString(),
                  };

                  orders.push(newOrder);

                  res.json({ created: true, data: newOrder });
         } catch (err) {
                  console.log("Error:", err);
                  res.status(500).json({
                           error: err.message,
                           stack: err.stack, // NUNCA hacer esto en producción
                  });
         }
});

export default router;
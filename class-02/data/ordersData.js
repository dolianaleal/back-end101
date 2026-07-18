/**
 * DATA: Orders (simulación de base de datos en memoria)
 *
 * Este archivo simula datos persistentes para el controlador de orders.
 * En producción esto vendría de una base de datos real.
 */

export const orders = [
         {
                  id: 1,
                  userId: 42,
                  userEmail: "juan@gmail.com",
                  // ⚠️ userPassword removido del seed, pero el controlador sigue
                  // exponiendo TODO sin filtrar. Esto es solo la fuente de datos.
                  items: [
                           { productId: 101, name: "Mouse Gamer", qty: 1, price: 45000 },
                           { productId: 205, name: "Teclado Mecánico", qty: 1, price: 89000 },
                  ],
                  total: 134000,
                  status: "completed",
                  internalNotes: "Cliente VIP - aplicar descuento manual", // ⚠️ Nota interna
                  createdAt: "2024-03-15T10:30:00Z",
                  _dbVersion: 3, // ⚠️ Metadato interno
                  __v: 0, // ⚠️ Otro metadato interno (simula mongoose)
         },
         {
                  id: 2,
                  userId: 77,
                  userEmail: "maria@empresa.com",
                  items: [{ productId: 301, name: "Monitor 27\"", qty: 2, price: 320000 }],
                  total: 640000,
                  status: "pending",
                  internalNotes: "Revisar stock con depósito central",
                  createdAt: "2024-03-16T14:00:00Z",
                  _dbVersion: 1,
                  __v: 0,
         },
];
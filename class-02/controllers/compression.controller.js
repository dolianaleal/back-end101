import { Router } from "express";
import { faker } from "@faker-js/faker";

const router = Router();

// Helper: genera N productos fake con datos pesados
const generarProductos = (cantidad) => {
         return Array.from({ length: cantidad }, () => ({
                  id: faker.string.uuid(),
                  nombre: faker.commerce.productName(),
                  descripcion: faker.commerce.productDescription(),
                  precio: parseFloat(faker.commerce.price({ min: 1000, max: 500000 })),
                  categoria: faker.commerce.department(),
                  imagen: faker.image.url(),
                  sku: faker.string.alphanumeric(10),
                  vendor: {
                           nombre: faker.company.name(),
                           direccion: faker.location.streetAddress(),
                           ciudad: faker.location.city(),
                           pais: faker.location.country(),
                  },
                  reviews: Array.from({ length: 3 }, () => ({
                           usuario: faker.person.fullName(),
                           comentario: faker.lorem.paragraph(),
                           puntuacion: faker.number.int({ min: 1, max: 5 }),
                           fecha: faker.date.past().toISOString(),
                  })),
                  tags: faker.helpers.arrayElements(
                           ["oferta", "nuevo", "destacado", "envío gratis", "última unidad", "importado"],
                           { min: 1, max: 4 }
                  ),
                  createdAt: faker.date.past().toISOString(),
         }));
};


router.get("/productos/:cantidad", (req, res) => {
         const cantidad = Math.min(parseInt(req.params.cantidad) || 100, 5000);
         const productos = generarProductos(cantidad);

         res.json({
                  status: "success",
                  meta: {
                           cantidad,
                           nota: "Compará el tamaño Transfer vs Size en DevTools > Network",
                  },
                  data: productos,
         });
});

export default router;
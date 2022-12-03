import { Router } from "express";
import { getSalas, getSalaById } from "../controllers/Sala-VentasController.js"
import { updateProductos, getProductos, getProductosById, createProductos, CambioEstado} from "../controllers/ProductosController.js"
import { createCategorias, updateCategorias, getCategoriaById, getCategorias } from "../controllers/CategoriasController.js"
import {getSalaProductos, getSalaProductosById, createSalaProductos, updateSalaProductos, CambioEstadoSP} from "../controllers/Sala-ProductosController.js"
const router = Router();

router.get("/salas", getSalas);

router.get("/salas/:id", getSalaById);

router.get("/producto/:id", getProductos);

router.get("/productos/:id", getProductosById);

router.post("/productos-create", createProductos);

router.post("/productos-update/:id", updateProductos);

router.post("/productos-cambio-estado/:id", CambioEstado);

router.get("/categoria/:id", getCategorias);

router.get("/categorias/:id", getCategoriaById);

router.post("/categorias-create", createCategorias);

router.post("/categorias-update/:id", updateCategorias);

router.post("/categorias-cambio-estado/:id", updateCategorias);

router.get("/salas-producto/:id", getSalaProductos);

router.get("/salas-productos/:id", getSalaProductosById);

router.post("/salas-productos-create", createSalaProductos);

router.post("/salas-productos-update/:id", updateSalaProductos);

router.post("/salas-productos-cambio-estado/:id", CambioEstadoSP);


export default router;

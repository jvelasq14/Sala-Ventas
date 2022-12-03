import { Router } from "express";
import { index, ping } from "../controllers/Rutas.js";

const router = Router();

router.get("/", index);

router.get("/ping", ping);

export default router;

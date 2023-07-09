import { Router } from "express";
import { RegController, LoginController } from "../Controllers/AuthController.js";
const router = Router();


router.post("/register", RegController)
router.post("/login", LoginController)


export default router;
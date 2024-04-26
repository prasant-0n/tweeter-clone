import express from "express";
import { Signup } from "../controllers/auth.controller.js";
import { Login } from "../controllers/auth.controller.js";
import { Logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/signup", Signup);

router.get("/login", Login);
router.get("/logout", Logout);

export default router;

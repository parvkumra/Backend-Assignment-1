import express from "express";
import { login, register, getDetails } from "../controller/userController";
import { authenticate } from "../middlewares/auth";
import z from "zod";
import { validate } from "../middlewares/validate";
// import { authenticate } from "../middleware/auth";
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const registerSchema = z.object({
    username:z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });
const router = express.Router();

router.post("/login",validate(loginSchema),login);
router.post("/register",validate(registerSchema),register);
router.get("/me",authenticate,getDetails); // protected route

export default router;

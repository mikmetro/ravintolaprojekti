import express from "express";
import { body } from "express-validator";
import { login, getMe } from "../controllers/auth-controller.js";
import { authenticateToken, validationErrors } from "../../middlewares.js";

const authRouter = express.Router();

authRouter
  .route("/login")
  .post(
    body("email").trim().notEmpty(),
    body("password").trim().notEmpty(),
    validationErrors,
    login
  );

authRouter.route("/me").get(authenticateToken, getMe);

export default authRouter;

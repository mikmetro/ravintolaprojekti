import express from "express";
import { body } from "express-validator";
import {
  placeOrder,
  getOrder,
  getMyOrders,
  getAllActiveOrders,
  updateOrder,
} from "../controllers/order-controller.js";
import {
  authenticateToken,
  isAdmin,
  /*isEmployee,*/
  validationErrors,
} from "../../middlewares.js";

const orderRouter = express.Router();

orderRouter
  .route("/")
  .post(
    authenticateToken,
    body("country").trim().isLength({ min: 1, max: 100 }),
    body("city").trim().isLength({ min: 1, max: 100 }),
    body("postalcode").trim().isLength({ min: 1, max: 20 }),
    body("street").trim().isLength({ min: 1, max: 255 }),
    body("doorCode").optional().trim().isLength({ max: 50 }),
    body("subTotal").isNumeric(),
    body("total").isNumeric(),
    body("type").isIn(["delivery", "pickup"]),
    body("items").isArray({ min: 1 }),
    body("items.*.id").isNumeric(),
    body("items.*.quantity").isInt({ min: 1 }),
    body("items.*.price").isNumeric(),
    validationErrors,
    placeOrder
  );

orderRouter.route("/my-orders").get(authenticateToken, getMyOrders);

orderRouter
  .route("/active")
  .get(authenticateToken, isAdmin, getAllActiveOrders);

orderRouter.route("/:id").get(authenticateToken, getOrder);

orderRouter
  .route("/:id")
  .put(
    authenticateToken,
    isAdmin,
    body("status").isIn([
      "pending",
      "paid",
      "preparing",
      "delivering",
      "completed",
      "cancelled",
    ]),
    validationErrors,
    updateOrder
  );

export default orderRouter;

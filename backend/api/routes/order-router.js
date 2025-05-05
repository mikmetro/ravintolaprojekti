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
    body("address").isNumeric(),
    body("type").isIn(["delivery", "pickup"]),
    body("items").isObject({ strict: false }),
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

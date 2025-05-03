import express from "express";
import { body } from "express-validator";
import {
  getItems,
  getMenu,
  getItemById,
  postItem,
  putItem,
  deleteItem,
  getCategories,
  putCategory,
} from "../controllers/item-controller.js";
import {
  authenticateToken,
  isAdmin,
  validationErrors,
} from "../../middlewares.js";

const itemRouter = express.Router();

itemRouter.route("/categories").get(getCategories);
itemRouter.route("/categories/:id").put(putCategory);
itemRouter.route("/").get(getMenu);
itemRouter.route("/all").get(getItems);

itemRouter
  .route("/")
  .post(
    authenticateToken,
    isAdmin,
    body("name").trim().isLength({ min: 1, max: 255 }).escape(),
    body("description").optional().trim().isLength({ max: 1000 }).escape(),
    body("price").isDecimal({ decimal_digits: "1,2" }).toFloat(),
    body("status").optional().isIn(["active", "inactive"]),
    validationErrors,
    postItem
  );

itemRouter.route("/:id").get(getItemById);

itemRouter
  .route("/:id")
  .put(
    authenticateToken,
    isAdmin,
    body("name").optional().trim().isLength({ min: 1, max: 255 }).escape(),
    body("description").optional().trim().isLength({ max: 1000 }).escape(),
    body("price").optional().isDecimal({ decimal_digits: "1,2" }).toFloat(),
    body("status").optional().isIn(["active", "inactive"]),
    validationErrors,
    putItem
  );

itemRouter.route("/:id").delete(authenticateToken, isAdmin, deleteItem);

export default itemRouter;

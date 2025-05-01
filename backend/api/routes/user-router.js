import express from "express";
import { body } from "express-validator";
import {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
  getUserAddresses,
  getAddressById,
  postAddress,
  putAddress,
  deleteAddress,
} from "../controllers/user-controller.js";
import { authenticateToken, validationErrors } from "../../middlewares.js";

const userRouter = express.Router();

userRouter
  .route("/")
  .post(
    body("email").trim().isEmail(),
    body("password").trim().isLength({ min: 8 }),
    body("name").trim().isLength({ min: 3, max: 100 }),
    body("phone").trim().isMobilePhone(),
    validationErrors,
    postUser
  );

userRouter
  .route("/:id")
  .get(authenticateToken, getUserById)
  .put(
    authenticateToken,
    body("email").optional().trim().isEmail(),
    body("password").optional().trim().isLength({ min: 8 }),
    body("name").optional().trim().isLength({ min: 3, max: 100 }),
    body("phone").optional().trim().isMobilePhone(),
    validationErrors,
    putUser
  )
  .delete(authenticateToken, deleteUser);

userRouter
  .route("/:id/addresses")
  .get(authenticateToken, getUserAddresses)
  .post(
    authenticateToken,
    body("country").trim().isLength({ min: 1, max: 100 }),
    body("city").trim().isLength({ min: 1, max: 100 }),
    body("postalcode").trim().isLength({ min: 1, max: 20 }),
    body("street").trim().isLength({ min: 1, max: 255 }),
    body("doorCode").optional().trim().isLength({ max: 50 }),
    validationErrors,
    postAddress
  );

userRouter
  .route("/:id/addresses/:addressId")
  .get(authenticateToken, getAddressById)
  .put(
    authenticateToken,
    body("country").optional().trim().isLength({ min: 1, max: 100 }),
    body("city").optional().trim().isLength({ min: 1, max: 100 }),
    body("postalcode").optional().trim().isLength({ min: 1, max: 20 }),
    body("street").optional().trim().isLength({ min: 1, max: 255 }),
    body("doorCode").optional().trim().isLength({ max: 50 }),
    validationErrors,
    putAddress
  )
  .delete(authenticateToken, deleteAddress);

export default userRouter;

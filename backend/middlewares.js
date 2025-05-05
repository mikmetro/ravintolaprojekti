import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import "dotenv/config";
import {findUserById} from "./api/models/user-model.js";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    const error = new Error("Token required");
    error.status = 401;
    return next(error);
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(403);

    try {
      const user = await findUserById(decoded.id);
      if (!user) return res.status(401).json({ message: "Invalid or expired token" });
      req.user = user;
      next();
    } catch (e) {
      res.status(500).json({ message: 'Failed to fetch user' });
    }
  });
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  const error = new Error("Admin privileges required");
  error.status = 403;
  next(error);
};

const validationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors
      .array()
      .map((error) => `${error.path}: ${error.msg}`)
      .join(", ");
    const error = new Error(messages);
    error.status = 400;
    return next(error);
  }
  next();
};

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
};

export {
  authenticateToken,
  isAdmin,
  validationErrors,
  notFoundHandler,
  errorHandler,
};

import {
  createOrder,
  getOrderById,
  getUserOrders,
  getActiveOrders,
  updateOrderStatus,
} from "../models/order-model.js";
import { findItemById } from "../models/item-model.js";
import { findAddressById } from "../models/user-model.js";

const placeOrder = async (req, res, next) => {
  try {
    const { address, type, items } = req.body;

    if (!items || Object.keys(items).length === 0)
      return res.status(400).json({ message: "Items cannot be empty!" });

    // Myöhemmin ehkä jotakin funktionaalista näille
    const discount = 0;
    const fee = 0;

    const itemDetails = await Promise.all(
      Object.keys(items).map(async (k) => await findItemById(k))
    );
    const subTotal = itemDetails.reduce(
      (acc, item) => acc + +item.price * items[item.id]["quantity"],
      0
    );
    const total = subTotal + discount + fee;

    const userId = req.user.id;

    // Handle address fields only if the type is "delivery"
    console.log("type", type);
    let addressDetails = {};
    if (type === "delivery") {
      const userAddress = await findAddressById(address);

      if (!userAddress || userAddress.user_id !== userId) {
        return res.status(404).json({
          message: "Address not found!",
        });
      }

      addressDetails = {
        country: userAddress.country,
        city: userAddress.city,
        postalcode: userAddress.postalcode,
        street: userAddress.street,
        doorCode: userAddress.door_code,
      };
    } else {
      addressDetails = {
        country: null,
        city: null,
        postalcode: null,
        street: null,
        doorCode: null,
      };
    }

    const result = await createOrder({
      userId,
      ...addressDetails,
      subTotal,
      discount,
      fee,
      total,
      type,
      items,
    });

    res.status(201).json({
      message: result.message,
      orderId: result.orderId,
    });
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const order = await getOrderById(req.params.id);

    if (!order) {
      const error = new Error("Order not found");
      error.status = 404;
      throw error;
    }

    if (order.user_id !== req.user.id && req.user.role !== "admin") {
      const error = new Error("Unauthorized");
      error.status = 403;
      throw error;
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await getUserOrders(req.user.id);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const getAllActiveOrders = async (req, res, next) => {
  try {
    const orders = await getActiveOrders();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (
      ![
        "pending",
        "paid",
        "preparing",
        "delivering",
        "completed",
        "cancelled",
      ].includes(status)
    ) {
      const error = new Error("Invalid status");
      error.status = 400;
      throw error;
    }

    const result = await updateOrderStatus(req.params.id, status);

    if (!result.success) {
      const error = new Error(result.message);
      error.status = 404;
      throw error;
    }

    res.json({
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

export { placeOrder, getOrder, getMyOrders, getAllActiveOrders, updateOrder };

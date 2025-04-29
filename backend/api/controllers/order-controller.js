import {
  createOrder,
  getOrderById,
  getUserOrders,
  getActiveOrders,
  updateOrderStatus
} from "../models/order-model.js";

const placeOrder = async (req, res, next) => {
  try {
    const { 
      country, city, postalcode, street, doorCode,
      subTotal, discount, fee, total, type, items 
    } = req.body;
    
    const userId = req.user.id;
    
    const result = await createOrder({
      userId,
      country,
      city,
      postalcode,
      street,
      doorCode,
      subTotal,
      discount: discount || 0,
      fee: fee || 0,
      total,
      type,
      items
    });
    
    res.status(201).json({
      message: result.message,
      orderId: result.orderId
    });
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const order = await getOrderById(req.params.id);
    
    if (!order) {
      const error = new Error('Order not found');
      error.status = 404;
      throw error;
    }
    
    if (order.user_id !== req.user.id && req.user.role !== 'admin') {
      const error = new Error('Unauthorized');
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
    
    if (!['pending', 'paid', 'preparing', 'delivering', 'completed', 'cancelled'].includes(status)) {
      const error = new Error('Invalid status');
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
      message: result.message
    });
  } catch (error) {
    next(error);
  }
};

export {
  placeOrder,
  getOrder,
  getMyOrders,
  getAllActiveOrders,
  updateOrder
};

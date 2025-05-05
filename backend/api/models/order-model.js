import promisePool from "../../utils/database.js";

const createOrder = async (orderData) => {
  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();

    const {
      userId,
      country,
      city,
      postalcode,
      street,
      doorCode,
      subTotal,
      discount,
      fee,
      total,
      type,
      items,
    } = orderData;

    const [orderResult] = await connection.execute(
      `INSERT INTO orders 
       (user_id, country, city, postalcode, street, door_code, 
        sub_total, discount, fee, total, type, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())`,
      [
        userId,
        country,
        city,
        postalcode,
        street,
        doorCode,
        subTotal,
        discount,
        fee,
        total,
        type,
      ]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      await connection.execute(
        `INSERT INTO order_item 
         (order_id, item_id, quantity, item_price)
         VALUES (?, ?, ?, ?)`,
        [orderId, item.info.id, item.quantity, item.info.price]
      );
    }

    await connection.commit();

    return {
      success: true,
      orderId,
      message: "Order created successfully",
    };
  } catch (error) {
    await connection.rollback();
    throw new Error(`Failed to create order: ${error.message}`);
  } finally {
    connection.release();
  }
};

const getOrderById = async (id) => {
  try {
    const [orderRows] = await promisePool.execute(
      `SELECT * FROM orders WHERE id = ?`,
      [id]
    );

    if (orderRows.length === 0) {
      return null;
    }

    const order = orderRows[0];

    const [itemRows] = await promisePool.execute(
      `SELECT oi.*, i.name, i.description
       FROM order_item oi
       JOIN items i ON oi.item_id = i.id
       WHERE oi.order_id = ?`,
      [id]
    );

    return {
      ...order,
      items: itemRows,
    };
  } catch (error) {
    throw new Error(`Failed to get order with ID ${id}: ${error.message}`);
  }
};

const getUserOrders = async (userId) => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
      [userId]
    );

    return rows;
  } catch (error) {
    throw new Error(
      `Failed to get orders for user ${userId}: ${error.message}`
    );
  }
};

const getActiveOrders = async () => {
  try {
    const [rows] = await promisePool.execute(
      `SELECT o.*, u.name as customer_name, u.phone as customer_phone
       FROM orders o
       JOIN users u ON o.user_id = u.id
       WHERE o.status IN ('pending', 'paid', 'preparing', 'delivering')
       ORDER BY o.created_at ASC`
    );

    for (let i = 0; i < rows.length; i++) {
      const [itemRows] = await promisePool.execute(
        `SELECT oi.*, i.name
         FROM order_item oi
         JOIN items i ON oi.item_id = i.id
         WHERE oi.order_id = ?`,
        [rows[i].id]
      );

      rows[i].items = itemRows;
    }

    return rows;
  } catch (error) {
    throw new Error(`Failed to get active orders: ${error.message}`);
  }
};

const updateOrderStatus = async (id, status) => {
  try {
    const [result] = await promisePool.execute(
      `UPDATE orders SET status = ? WHERE id = ?`,
      [status, id]
    );

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: `Order with ID ${id} not found`,
      };
    }

    return {
      success: true,
      message: `Order status updated to ${status}`,
    };
  } catch (error) {
    throw new Error(`Failed to update order status: ${error.message}`);
  }
};

export {
  createOrder,
  getOrderById,
  getUserOrders,
  getActiveOrders,
  updateOrderStatus,
};

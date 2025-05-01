import promisePool from "../../utils/database.js";

const listAllUsers = async () => {
  try {
    const [rows] = await promisePool.query(`
      SELECT id, name, email, phone, role, created_at 
      FROM users
      ORDER BY id DESC
    `);
    return rows;
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
};

const findUserById = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      `
      SELECT id, name, email, phone, role, created_at 
      FROM users 
      WHERE id = ?
    `,
      [id]
    );

    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    throw new Error(`Failed to find user with ID ${id}: ${error.message}`);
  }
};

const findUserByEmail = async (email) => {
  try {
    const [rows] = await promisePool.execute(
      `
      SELECT * FROM users WHERE email = ?
    `,
      [email]
    );

    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    throw new Error(
      `Failed to find user with email ${email}: ${error.message}`
    );
  }
};

const addUser = async (user) => {
  try {
    const { name, email, password, phone, role } = user;

    const [result] = await promisePool.execute(
      "INSERT INTO users (name, email, password, phone, role, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
      [name, email, password, phone, role || "customer"] // ENUMS: check /utils/init_db.sql
    );

    return {
      success: true,
      id: result.insertId,
      details: `User ${name} created successfully with ID ${result.insertId}`,
    };
  } catch (error) {
    throw new Error(`Failed to add user: ${error.message}`);
  }
};

const modifyUser = async (user, id) => {
  try {
    let sql = "UPDATE users SET ";
    const params = [];
    const keys = Object.keys(user);

    if (keys.length === 0) {
      throw new Error("No fields provided for update?");
    }

    keys.forEach((key, index) => {
      sql += `${key} = ?`;
      params.push(user[key]);
      if (index < keys.length - 1) {
        sql += ", ";
      }
    });

    sql += " WHERE id = ?";
    params.push(id);

    const [result] = await promisePool.execute(sql, params);

    if (result.affectedRows === 0) {
      return {
        success: false,
        details: `User with ID ${id} not found`,
      };
    }

    return {
      success: true,
      details: `User with ID ${id} updated successfully`,
    };
  } catch (error) {
    throw new Error(`Failed to modify user with ID ${id}: ${error.message}`);
  }
};

const removeUser = async (id) => {
  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.execute("DELETE FROM addresses WHERE user_id = ?", [id]);

    await connection.execute("DELETE FROM orders WHERE user_id = ?", [id]);

    const [result] = await connection.execute(
      "DELETE FROM users WHERE id = ?",
      [id]
    );

    await connection.commit();

    if (result.affectedRows === 0) {
      return {
        success: false,
        details: `User with ID ${id} not found.`,
      };
    }

    return {
      success: true,
      details: `User with ID ${id} and all their data have been deleted successfully.`,
    };
  } catch (error) {
    await connection.rollback();
    throw new Error(`Failed to remove user with ID ${id}: ${error.message}`);
  } finally {
    connection.release();
  }
};

export {
  listAllUsers,
  findUserById,
  findUserByEmail,
  addUser,
  modifyUser,
  removeUser,
  listUserAddresses,
  findAddressById,
  addAddress,
  modifyAddress,
  removeAddress,
};

const listUserAddresses = async (userId) => {
  try {
    const [rows] = await promisePool.execute(
      `
      SELECT id, country, city, postalcode, street, door_code 
      FROM addresses 
      WHERE user_id = ?
      ORDER BY id DESC
    `,
      [userId]
    );
    return rows;
  } catch (error) {
    throw new Error(
      `Failed to fetch addresses for user ${userId}: ${error.message}`
    );
  }
};

const findAddressById = async (addressId) => {
  try {
    const [rows] = await promisePool.execute(
      `
      SELECT id, user_id, country, city, postalcode, street, door_code 
      FROM addresses 
      WHERE id = ?
    `,
      [addressId]
    );

    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    throw new Error(
      `Failed to find address with ID ${addressId}: ${error.message}`
    );
  }
};

const addAddress = async (addressData) => {
  try {
    const { userId, country, city, postalcode, street, doorCode } = addressData;

    const [result] = await promisePool.execute(
      `INSERT INTO addresses 
       (user_id, country, city, postalcode, street, door_code) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, country, city, postalcode, street, doorCode]
    );

    return {
      success: true,
      id: result.insertId,
      details: `Address created successfully with ID ${result.insertId}`,
    };
  } catch (error) {
    throw new Error(`Failed to add address: ${error.message}`);
  }
};

const modifyAddress = async (addressData, addressId) => {
  try {
    let sql = "UPDATE addresses SET ";
    const params = [];
    const keys = Object.keys(addressData);

    if (keys.length === 0) {
      throw new Error("No fields provided for update?");
    }

    keys.forEach((key, index) => {
      sql += `${key} = ?`;
      params.push(addressData[key]);
      if (index < keys.length - 1) {
        sql += ", ";
      }
    });

    sql += " WHERE id = ?";
    params.push(addressId);

    const [result] = await promisePool.execute(sql, params);

    if (result.affectedRows === 0) {
      return {
        success: false,
        details: `Address with ID ${addressId} not found`,
      };
    }

    return {
      success: true,
      details: `Address with ID ${addressId} updated successfully`,
    };
  } catch (error) {
    throw new Error(
      `Failed to modify address with ID ${addressId}: ${error.message}`
    );
  }
};

const removeAddress = async (addressId) => {
  try {
    const [result] = await promisePool.execute(
      "DELETE FROM addresses WHERE id = ?",
      [addressId]
    );

    if (result.affectedRows === 0) {
      return {
        success: false,
        details: `Address with ID ${addressId} not found.`,
      };
    }

    return {
      success: true,
      details: `Address with ID ${addressId} deleted successfully.`,
    };
  } catch (error) {
    throw new Error(
      `Failed to remove address with ID ${addressId}: ${error.message}`
    );
  }
};

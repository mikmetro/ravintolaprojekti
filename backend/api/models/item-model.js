import promisePool from "../../utils/database.js";

const listAllItems = async () => {
  try {
    const [rows] = await promisePool.query(`
      SELECT id, name, description, category, price, status 
      FROM items
      ORDER BY id DESC
    `);
    return rows;
  } catch (error) {
    throw new Error(`Failed to fetch items: ${error.message}`);
  }
};

const listMenu = async () => {
  try {
    const [rows] = await promisePool.query(`
      SELECT items.id, items.name, description, categories.name as category, price 
      FROM items
      JOIN categories
      ON items.category = categories.id
      WHERE categories.status = "active"
      AND items.status = "active"
      ORDER BY items.id DESC
    `);
    const rowsByCategory = rows.reduce((acc, row) => {
      const { category, ...newItem } = row;
      const previousItems = acc[category] ?? [];
      return { ...acc, [category]: [...previousItems, newItem] };
    }, {});
    return rowsByCategory;
  } catch (error) {
    throw new Error(`Failed to fetch items: ${error.message}`);
  }
};

const findItemById = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      `
      SELECT id, name, description, category, price, status 
      FROM items 
      WHERE id = ?
    `,
      [id]
    );

    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    throw new Error(`Failed to find item with ID ${id}: ${error.message}`);
  }
};

const addItem = async (item) => {
  try {
    const { name, description, price, status, category } = item;
    console.log(item);
    const [result] = await promisePool.execute(
      "INSERT INTO items (name, description, price, category, status) VALUES (?, ?, ?, ?, ?)",
      [name, description, price, category, status || "active"] // ENUMS: check /utils/init_db.sql
    );

    return {
      success: true,
      id: result.insertId,
      details: `Item ${name} created successfully with ID ${result.insertId}`,
    };
  } catch (error) {
    throw new Error(`Failed to add item: ${error.message}`);
  }
};

const modifyItem = async (item, id) => {
  try {
    let sql = "UPDATE items SET ";
    const params = [];
    const keys = Object.keys(item);

    if (keys.length === 0) {
      throw new Error("No fields provided for update?");
    }

    keys.forEach((key, index) => {
      sql += `${key} = ?`;
      params.push(item[key]);
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
        details: `Item with ID ${id} not found`,
      };
    }

    return {
      success: true,
      details: `Item with ID ${id} updated successfully`,
    };
  } catch (error) {
    throw new Error(`Failed to modify item with ID ${id}: ${error.message}`);
  }
};

const removeItem = async (id) => {
  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();
    const [result] = await connection.execute(
      "DELETE FROM items WHERE id = ?",
      [id]
    );

    await connection.commit();

    if (result.affectedRows === 0) {
      return {
        success: false,
        details: `Item with ID ${id} not found.`,
      };
    }

    return {
      success: true,
      details: `Item with ID ${id} deleted successfully.`,
    };
  } catch (error) {
    await connection.rollback();
    throw new Error(`Failed to remove item with ID ${id}: ${error.message}`);
  } finally {
    connection.release();
  }
};

const listAllCategories = async () => {
  try {
    const [rows] = await promisePool.query(`
      SELECT id, name, status 
      FROM categories
      ORDER BY id DESC
    `);
    return rows;
  } catch (error) {
    throw new Error(`Failed to fetch items: ${error.message}`);
  }
};

export {
  listAllItems,
  listMenu,
  findItemById,
  addItem,
  modifyItem,
  removeItem,
  listAllCategories,
};

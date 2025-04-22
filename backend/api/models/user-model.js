import promisePool from '../../utils/database.js';

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
    const [rows] = await promisePool.execute(`
      SELECT id, name, email, phone, role, created_at 
      FROM users 
      WHERE id = ?
    `, [id]);

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
    const [rows] = await promisePool.execute(`
      SELECT * FROM users WHERE email = ?
    `, [email]);

    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (error) {
    throw new Error(`Failed to find user with email ${email}: ${error.message}`);
  }
};

const addUser = async (user) => {
  try {
    const { name, email, password, phone, role } = user;

    const [result] = await promisePool.execute(
      'INSERT INTO users (name, email, password, phone, role, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [name, email, password, phone, role || 'customer'] // ENUMS: check /utils/init_db.sql
    );

    return {
      success: true,
      id: result.insertId,
      details: `User ${name} created successfully with ID ${result.insertId}`
    };
  } catch (error) {
    throw new Error(`Failed to add user: ${error.message}`);
  }
};

const modifyUser = async (user, id) => {
  try {
    let sql = 'UPDATE users SET ';
    const params = [];
    const keys = Object.keys(user);

    if (keys.length === 0) {
      throw new Error('No fields provided for update?');
    }

    keys.forEach((key, index) => {
      sql += `${key} = ?`;
      params.push(user[key]);
      if (index < keys.length - 1) {
        sql += ', ';
      }
    });

    sql += ' WHERE id = ?';
    params.push(id);

    const [result] = await promisePool.execute(sql, params);

    if (result.affectedRows === 0) {
      return {
        success: false,
        details: `User with ID ${id} not found`
      };
    }

    return {
      success: true,
      details: `User with ID ${id} updated successfully`
    };
  } catch (error) {
    throw new Error(`Failed to modify user with ID ${id}: ${error.message}`);
  }
};

const removeUser = async (id) => {
  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.execute(
      'DELETE FROM addresses WHERE user_id = ?',
      [id]
    );

    await connection.execute(
      'DELETE FROM orders WHERE user_id = ?',
      [id]
    );

    const [result] = await connection.execute(
      'DELETE FROM users WHERE id = ?',
      [id]
    );

    await connection.commit();

    if (result.affectedRows === 0) {
      return {
        success: false,
        details: `User with ID ${id} not found.`
      };
    }

    return {
      success: true,
      details: `User with ID ${id} and all their data have been deleted successfully.`
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
  removeUser
};
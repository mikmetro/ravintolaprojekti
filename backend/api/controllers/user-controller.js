import bcrypt from "bcrypt";
import {
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
} from "../models/user-model.js";

const getUsers = async (req, res, next) => {
  try {
    if (parseInt(req.params.id) !== req.user.id && req.user.role !== "admin") {
      const error = new Error("Unauthorized");
      error.status = 403;
      throw error;
    }
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    if (parseInt(req.params.id) !== req.user.id && req.user.role !== "admin") {
      const error = new Error("Unauthorized");
      error.status = 403;
      throw error;
    }
    const user = await findUserById(req.params.id);
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const postUser = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      const error = new Error("Email already in use");
      error.status = 409;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await addUser({
      name,
      email,
      password: hashedPassword,
      phone,
      role: "admin",
    });

    if (!result.success) {
      const error = new Error("Failed to create user");
      error.status = 500;
      throw error;
    }

    res.status(201).json({
      message: "User created successfully",
      id: result.id,
    });
  } catch (error) {
    next(error);
  }
};

const putUser = async (req, res, next) => {
  try {
    if (parseInt(req.params.id) !== req.user.id && req.user.role !== "admin") {
      const error = new Error("Unauthorized");
      error.status = 403;
      throw error;
    }
    const user = await findUserById(req.params.id);

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    const userData = { ...req.body };

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    const result = await modifyUser(userData, req.params.id);

    if (!result.success) {
      const error = new Error(result.details);
      error.status = 400;
      throw error;
    }

    res.json({
      message: "User updated successfully",
      details: result.details,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    if (parseInt(req.params.id) !== req.user.id && req.user.role !== "admin") {
      const error = new Error("Unauthorized");
      error.status = 403;
      throw error;
    }

    const result = await removeUser(req.params.id);

    if (!result.success) {
      const error = new Error(result.details);
      error.status = 400;
      throw error;
    }

    res.json({
      message: "User deleted successfully",
      details: result.details,
    });
  } catch (error) {
    next(error);
  }
};

const getUserAddresses = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    if (userId !== req.user.id && req.user.role !== "admin") {
      const error = new Error("Unauthorized");
      error.status = 403;
      throw error;
    }
    const addresses = await listUserAddresses(userId);
    res.json(addresses);
  } catch (error) {
    next(error);
  }
};

const getAddressById = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const addressId = parseInt(req.params.addressId);

    const address = await findAddressById(addressId);
    if (!address) {
      const error = new Error("Address not found");
      error.status = 404;
      throw error;
    }

    if (address.user_id !== userId) {
      const error = new Error("Address does not belong to this user");
      error.status = 403;
      throw error;
    }

    if (userId !== req.user.id && req.user.role !== "admin") {
      const error = new Error("Unauthorized");
      error.status = 403;
      throw error;
    }

    res.json(address);
  } catch (error) {
    next(error);
  }
};

const postAddress = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    if (userId !== req.user.id && req.user.role !== "admin") {
      const error = new Error("Unauthorized to add address for this user");
      error.status = 403;
      throw error;
    }

    const { country, city, postalcode, street, doorCode } = req.body;

    const result = await addAddress({
      userId,
      country,
      city,
      postalcode,
      street,
      doorCode: doorCode || null,
    });

    if (!result.success) {
      const error = new Error("Failed to create address");
      error.status = 500;
      throw error;
    }

    res.status(201).json({
      message: "Address created successfully",
      id: result.id,
    });
  } catch (error) {
    next(error);
  }
};

const putAddress = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const addressId = parseInt(req.params.addressId);

    const address = await findAddressById(addressId);
    if (!address) {
      const error = new Error("Address not found");
      error.status = 404;
      throw error;
    }

    if (address.user_id !== userId) {
      const error = new Error("Address does not belong to this user");
      error.status = 403;
      throw error;
    }

    if (userId !== req.user.id && req.user.role !== "admin") {
      const error = new Error("Unauthorized to modify this address");
      error.status = 403;
      throw error;
    }

    const addressData = { ...req.body };
    const result = await modifyAddress(addressData, addressId);

    if (!result.success) {
      const error = new Error(result.details);
      error.status = 400;
      throw error;
    }

    res.json({
      message: "Address updated successfully",
      details: result.details,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    const addressId = parseInt(req.params.addressId);

    const address = await findAddressById(addressId);
    if (!address) {
      const error = new Error("Address not found");
      error.status = 404;
      throw error;
    }

    if (address.user_id !== userId) {
      const error = new Error("Address does not belong to this user");
      error.status = 403;
      throw error;
    }

    if (userId !== req.user.id && req.user.role !== "admin") {
      const error = new Error("Unauthorized to delete this address");
      error.status = 403;
      throw error;
    }

    const result = await removeAddress(addressId);

    if (!result.success) {
      const error = new Error(result.details);
      error.status = 400;
      throw error;
    }

    res.json({
      message: "Address deleted successfully",
      details: result.details,
    });
  } catch (error) {
    next(error);
  }
};

export {
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
};

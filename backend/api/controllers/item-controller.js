import {
  listAllItems,
  findItemById,
  addItem,
  modifyItem,
  removeItem,
  listMenu,
  listAllCategories,
  modifyCategory,
  findCategoryById,
} from "../models/item-model.js";

const getItems = async (req, res, next) => {
  try {
    const items = await listAllItems();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

const getMenu = async (req, res, next) => {
  try {
    const items = await listMenu();
    console.log(items);
    res.json(items);
  } catch (error) {
    next(error);
  }
};

const getItemById = async (req, res, next) => {
  try {
    const item = await findItemById(req.params.id);
    if (!item) {
      const error = new Error("Item not found");
      error.status = 404;
      throw error;
    }
    res.json(item);
  } catch (error) {
    next(error);
  }
};

const postItem = async (req, res, next) => {
  try {
    const { name, description, price, status, category } = req.body;

    const result = await addItem({
      name,
      description,
      price,
      category,
      status: status || "active",
    });

    if (!result.success) {
      const error = new Error("Failed to create item");
      error.status = 500;
      throw error;
    }

    res.status(201).json({
      message: "Item created successfully",
      id: result.id,
    });
  } catch (error) {
    next(error);
  }
};

const putItem = async (req, res, next) => {
  try {
    const item = await findItemById(req.params.id);

    if (!item) {
      const error = new Error("Item not found");
      error.status = 404;
      throw error;
    }

    const itemData = { ...req.body };

    const result = await modifyItem(itemData, req.params.id);

    if (!result.success) {
      const error = new Error(result.details);
      error.status = 400;
      throw error;
    }

    res.json({
      message: "Item updated successfully",
      details: result.details,
    });
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const item = await findItemById(req.params.id);

    if (!item) {
      const error = new Error("Item not found");
      error.status = 404;
      throw error;
    }

    const result = await removeItem(req.params.id);

    if (!result.success) {
      const error = new Error(result.details);
      error.status = 400;
      throw error;
    }

    res.json({
      message: "Item deleted successfully",
      details: result.details,
    });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const items = await listAllCategories();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

const putCategory = async (req, res, next) => {
  try {
    const item = await findCategoryById(req.params.id);

    if (!item) {
      const error = new Error("Category not found");
      error.status = 404;
      throw error;
    }

    const itemData = { ...req.body };

    const result = await modifyCategory(itemData, req.params.id);

    if (!result.success) {
      const error = new Error(result.details);
      error.status = 400;
      throw error;
    }

    res.json({
      message: "Category updated successfully",
      details: result.details,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getItems,
  getItemById,
  postItem,
  putItem,
  deleteItem,
  getMenu,
  getCategories,
  putCategory,
};

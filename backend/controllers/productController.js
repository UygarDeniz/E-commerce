import Product from '../models/productModel.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getLatestProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(6);

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.status(200).json(product);
    }
    return res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductsBySearch = async (req, res) => {
  const keyword = req.params.keyword;

  try {
    const products = await Product.find({
      name: { $regex: keyword, $options: 'i' },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN
export const addProduct = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      message: 'You are not authorized to perform this action',
    });
  }

  const { name, image, brand, category, description, price, countInStock } =
    req.body;

  if (
    !name ||
    !image ||
    !brand ||
    !category ||
    !description ||
    !price ||
    !countInStock
  ) {
    return res.status(400).json({
      message: 'Please provide all fields',
    });
  }
  const user = req.user;
  try {
    const product = await Product.findOne({ name });

    if (product) {
      return res.status(400).json({
        message: 'Product already exists',
      });
    }

    const newProduct = await Product.create({
      name,
      image,
      brand,
      category,
      description,
      price,
      countInStock,
    });

    if (newProduct) {
      return res.status(201).json({
        _id: newProduct._id,
        name: newProduct.name,
        image: newProduct.image,
        brand: newProduct.brand,
        category: newProduct.category,
        description: newProduct.description,
        price: newProduct.price,
        countInStock: newProduct.countInStock,
      });
    }
    return res.status(400).json({
      message: 'Invalid product data',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const editProduct = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      message: 'You are not authorized to perform this action',
    });
  }

  const { name, image, brand, category, description, price, countInStock } =
    req.body;

  if (
    !name ||
    !image ||
    !brand ||
    !category ||
    !description ||
    !price ||
    !countInStock
  ) {
    return res.status(400).json({
      message: 'Please provide all fields',
    });
  }
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.description = description;
      product.price = price;
      product.countInStock = countInStock;
      await product.save();
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      message: 'You are not authorized to perform this action',
    });
  }

  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (product) {
      return res.status(200).json({ message: 'Product deleted' });
    } else {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

import Product from "../models/productModel.js";



export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        return res.status(200).json(products)
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const getLatestProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }).limit(6)
        return res.status(200).json(products)
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}




// ADMIN
export const addProduct = async (req, res) => {
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
      message: "Please provide all fields",
    });
  }

  try {
    const product = await Product.findOne({ name });

    if (product) {
      return res.status(400).json({
        message: "Product already exists",
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
      message: "Invalid product data",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

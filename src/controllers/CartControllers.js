const { User, Products } = require("../models");

const addToCart = async (req, res) => {
  try {
    const userId = req.user_id;
    const { productId } = req.query;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ msg: "User ID and Product ID are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    if (!user.cart.includes(productId)) {
      user.cart.push(productId);
      await user.save();
      return res
        .status(200)
        .json({ msg: "Product added to cart successfully", cart: user.cart });
    }

    res.status(400).json({ msg: "Product already in cart" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const userId = req.user_id;

    if (!userId) {
      return res.status(400).json({ msg: "User ID is required" });
    }

    const user = await User.findById(userId).populate("cart");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "Cart fetched successfully", cart: user.cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

const removefromCart = async (req, res) => {
  try {
    const userId = req.user_id;
    const { productId } = req.query;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ msg: "User ID and Product ID are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.cart = await user.cart.filter((item) => item !== productId);
    await user.save();
    res
      .status(200)
      .json({ msg: "Product removed from cart successfully", cart: user.cart });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

module.exports = { addToCart, getUserCart,removefromCart };

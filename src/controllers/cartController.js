const Cart = require("../models/cart");
const CartItem = require("../models/cartItem");

const createCart = async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const cart = {
      userId: req.body.userId,
    };
    const savedCart = await Cart.create(cart);

    console.log("Saved cart:", savedCart);
    const cartItems = {
      productId: req.body.productId,
      quantity: req.body.qty,
      cartId: savedCart.id,
    };
    const savedCartItems = await CartItem.create(cartItems);
    console.log("Saved cart items:", savedCartItems);
    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.findAll();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const updatedCart = await cart.update(req.body);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    await cart.destroy();
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCart,
  getAllCarts,
  getCartById,
  updateCart,
  deleteCart,
};

const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const dashboardController = require("../controllers/dashboardController");

router.get("/hello-world", dashboardController.HelloWorld);
router.post("/add-cart", dashboardController.SendCart);

router.post("/carts", cartController.createCart);
router.get("/carts", cartController.getAllCarts);
router.get("/carts/:id", cartController.getCartById);
router.put("/carts/:id", cartController.updateCart);
router.delete("/carts/:id", cartController.deleteCart);

module.exports = router;

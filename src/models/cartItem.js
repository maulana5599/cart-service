const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const cartItem = sequelize.define(
  "CartItem",
  {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "carts",
        key: "id",
      },
    },
  },
  {
    tableName: "cartitems",
    timestamps: true,
  }
);

module.exports = cartItem;

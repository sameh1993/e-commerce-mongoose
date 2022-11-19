const { model, Schema } = require("mongoose");
const { User } = require("../model/auth.model");

const orderSchema = Schema({
  productName: String,
  price: mongoose.Decimal128,
  quatity: Number,
  totalPrice: mongoose.Decimal128,
  userid: {
    type: Schema.Types.ObjectId,
  },
});

const Orders = model("order", orderSchema);

exports.Order = Orders;

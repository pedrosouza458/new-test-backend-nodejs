import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Product title is required"],
  },
  owner: {
    type: String,
    required: [true, "owner is required"],
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  price: {
    type: mongoose.Types.Decimal128,
    required: [true, "Price is required"],
  },
  description: {
    type: String,
    required: false,
  },
});

export const product = mongoose.model("Product", productSchema);

import mongoose from "mongoose";

export const categorySchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  owner: {
    type: String,
    required: [true, "Owner is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
});

export const category = mongoose.model("Category", categorySchema);

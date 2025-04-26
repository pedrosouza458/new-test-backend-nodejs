import express from "express";
import { connectToDb } from "./db/config.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";

const app = express();

app.use(express.json());

app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

connectToDb.then(() => {
  app.listen(3000, () => {
    console.log("server is running");
  });
});

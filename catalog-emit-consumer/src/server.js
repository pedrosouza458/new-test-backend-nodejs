import express from "express";
import { connectToDb } from "./db/config.js";
import { generateAndPublishJSON } from "./utils/generate-json.js";

const app = express();
app.use(express.json());

app.post("/consumer/catalog", async (req, res) => {
  const { owner } = req.body;
  try {
    await generateAndPublishJSON(owner);
    res.status(200).send({
      message: "JSON upload to S3 bucket",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
});

connectToDb.then(() => {
  app.listen(3001, () => {
    console.log("server is running");
  });
});

import express from "express";
import { connectToDb } from "./db/config.js";
import { SQSService } from "./services/sqs.service.js";

const app = express();
app.use(express.json());

const sqsService = new SQSService();

sqsService.pollQueue();

connectToDb.then(() => {
  app.listen(3001, () => {
    console.log("server is running");
  });
});

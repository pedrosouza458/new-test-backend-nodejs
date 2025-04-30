import {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from "@aws-sdk/client-sqs";
import dotenv from "dotenv";
import { generateAndPublishJSON } from "../utils/generate-json.js";

dotenv.config();

export class SQSService {
  #client;
  #queueUrl = process.env.SQS_URL;

  constructor() {
    this.#client = new SQSClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
  }
  async pollQueue() {
    try {
      const params = {
        QueueUrl: this.#queueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 10,
      };

      const data = await this.#client.send(new ReceiveMessageCommand(params));
      if (data.Messages && data.Messages.length > 0) {
        for (const message of data.Messages) {
          console.log("Received message:", message.Body);

          try {
            const parsed = JSON.parse(message.Body);
            await generateAndPublishJSON(parsed.owner);
          } catch (e) {
            console.error("Failed to parse message:", e);
          }

          await this.#client.send(
            new DeleteMessageCommand({
              QueueUrl: this.#queueUrl,
              ReceiptHandle: message.ReceiptHandle,
            })
          );
        }
      }
    } catch (error) {
      console.error("Error receiving message from SQS:", error);
    }

    setImmediate(() => this.pollQueue());
  }
}

import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import dotenv from "dotenv";

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
  async sendMessage(owner) {
    try {
      const message = new SendMessageCommand({
        QueueUrl: this.#queueUrl,
        MessageBody: JSON.stringify({ owner }),
        MessageAttributes: {
          owner: {
            DataType: "String",
            StringValue: owner,
          },
        },
      });
      await this.#client.send(message);
      console.log("message sent");
    } catch (error) {
      console.log(error);
    }
  }
}

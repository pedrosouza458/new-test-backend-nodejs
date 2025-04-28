import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import dotenv from "dotenv";

dotenv.config();

const client = new SQSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export async function sendSQSMessage(owner) {
  try {
    const queue = new SendMessageCommand({
      QueueUrl: process.env.SQS_URL,
      MessageBody: JSON.stringify({ owner }),
      MessageAttributes: {
        owner: {
          DataType: "String",
          StringValue: owner,
        },
      },
    });
    const response = await client.send(queue);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

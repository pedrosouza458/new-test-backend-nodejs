import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import dotenv from "dotenv";

dotenv.config();

const client = new SQSClient({ region: "REGION" });

const params = {
  /** input parameters */
};
const command = new ListQueuesCommand(params);

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export async function uploadJsonToS3(bucketName, keyName, jsonData) {
  const uploadParams = {
    Bucket: process.env.S3_BUCKET,
    Key: keyName,
    Body: JSON.stringify(jsonData),
    ContentType: "application/json",
  };

  const command = new PutObjectCommand(uploadParams);
  await s3.send(command);

  console.log(`JSON uploaded successfully at ${bucketName}/${keyName}`);
}

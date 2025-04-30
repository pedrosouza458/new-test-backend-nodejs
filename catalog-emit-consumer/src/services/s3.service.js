import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

export class S3Service {
  #client;
  #bucketName = process.env.S3_BUCKET;

  constructor() {
    this.#client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
  }

  async uploadJson(bucketName, keyName, jsonData) {
    const uploadParams = {
      Bucket: this.#bucketName,
      Key: keyName,
      Body: JSON.stringify(jsonData),
      ContentType: "application/json",
    };

    const upload = new PutObjectCommand(uploadParams);
    await this.#client.send(upload);

    console.log(`JSON uploaded successfully at ${bucketName}/${keyName}`);
  }
}

import AWS from "aws-sdk";
import { config } from "dotenv";

config();

export const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "S3RVER",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "S3RVER",
  endpoint: process.env.S3_ENDPOINT || "http://localhost:8000",
  s3ForcePathStyle: true, // to ensure paths correctly formatted for local s3
  region: process.env.AWS_REGION || "ap-southeast-1",
});

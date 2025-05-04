import AWS from "aws-sdk";

export const sns = new AWS.SNS({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "S3RVER",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "S3RVER",
  endpoint: process.env.SNS_ENDPOINT || "http://localhost:4002",
  region: process.env.AWS_REGION || "ap-southeast-1",
});

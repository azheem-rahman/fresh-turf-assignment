import AWS from "aws-sdk";
import { s3 } from "../lib/s3";

export const uploadToS3 = async (
  base64File: string,
  fileId: string,
  type: "front" | "back" | "signature"
): Promise<string> => {
  try {
    const buffer = Buffer.from(base64File, "base64");

    const folder = type === "signature" ? "signatures" : "photos";
    const bucketName = process.env.S3_BUCKET_NAME || "fresh_turf_bucket";
    const fileName = `${fileId}_${type}.jpg`;

    const params: AWS.S3.PutObjectRequest = {
      Bucket: bucketName,
      Key: `${folder}/${fileName}`,
      Body: buffer,
      ContentType: "image/jpeg",
      ACL: "private",
    };

    const data = await s3.upload(params).promise();

    return data.Location;
  } catch (error) {
    console.error("Error uploading to S3: ", error);

    throw new Error("Failed to upload file to S3");
  }
};

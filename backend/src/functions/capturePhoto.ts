/**
 * @route
 * POST /photos
 *
 * @request
 * {
 *    "transaction_id": "transaction-uuid",
 *    "type": "front" | "back",
 *    "file": "base64string"
 * }
 *
 * @response
 *{
 *    "photo_id": "photo-uuid",
 *    "s3_url": "https://..."
 * }
 */

import { APIGatewayProxyHandler } from "aws-lambda";
import { errorResponse, successResponse } from "../utils/response";
import { v4 as uuidv4 } from "uuid";
import { uploadToS3 } from "../utils/uploadToS3";
import { pool } from "../lib/db";
import { sendSnsMessage } from "../utils/sendSnsMessage";
import { NotificationPayload } from "../types/notifications";

export const capturePhotoHandler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const { transaction_id, type, file } = body;

    // validate request body inputs
    if (!transaction_id || !type || !file) {
      return errorResponse(
        400,
        "Bad Request",
        "transaction_id, type, and file are required"
      );
    }

    // check if photo already exists for the transaction and type
    const check = await pool.query(
      `SELECT 1 FROM photos WHERE transaction_id = $1 AND type = $2`,
      [transaction_id, type]
    );

    if (check && check.rowCount! > 0) {
      return errorResponse(
        409,
        "Conflict",
        `Photo for transaction ${transaction_id} and type ${type} already exists`
      );
    }

    const photo_id = uuidv4();

    // upload photo to S3 and get URL
    const s3_url = await uploadToS3(file, photo_id, type);

    await pool.query(
      `INSERT INTO photos (photo_id, transaction_id, type, s3_url) 
      VALUES ($1, $2, $3, $4)`,
      [photo_id, transaction_id, type, s3_url]
    );

    // check transaction type to trigger SNS if Withdrawal (1) transaction
    const transactionResult = await pool.query(
      `SELECT type, related_transaction_id FROM transactions WHERE transaction_id = $1`,
      [transaction_id]
    );

    const transaction = transactionResult.rows[0];
    if (
      transaction.type === "withdrawal" &&
      !transaction.related_transaction_id
    ) {
      const payload: NotificationPayload = {
        transaction_id,
        triggered_by: "capturePhoto",
      };

      await sendSnsMessage(payload);
    }

    return successResponse({ photo_id, s3_url }, 201);
  } catch (error) {
    console.error("Error in capturePhotoHandler: ", error);

    return errorResponse(500, "Internal Server Error", "Something went wrong");
  }
};

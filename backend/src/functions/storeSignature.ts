/**
 * @route
 * POST /signatures
 *
 * @request
 * {
 *    "transaction_id": "transaction-uuid",
 *    "file": "base64string"
 * }
 *
 * @response
 * {
 *    "signature_id": "signature-uuid",
 *    "s3_url": "https://..."
 * }
 */

import { APIGatewayProxyHandler } from "aws-lambda";
import { errorResponse, successResponse } from "../utils/response";
import { v4 as uuidv4 } from "uuid";
import { uploadToS3 } from "../utils/uploadToS3";
import { pool } from "../lib/db";

export const storeSignatureHandler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const { transaction_id, file } = body;

    if (!transaction_id || !file) {
      return errorResponse(
        400,
        "Bad Request",
        "transaction_id and file are required"
      );
    }

    // check if signature already exists for the transaction
    const check = await pool.query(
      `SELECT 1 FROM signatures WHERE transaction_id = $1`,
      [transaction_id]
    );

    if (check && check.rowCount! > 0) {
      return errorResponse(
        409,
        "Conflict",
        `Signature for transaction ${transaction_id} already exists`
      );
    }

    const signature_id = uuidv4();

    const s3_url = await uploadToS3(file, signature_id, "signature");

    await pool.query(
      `INSERT INTO signatures (signature_id, transaction_id, s3_url) 
        VALUES ($1, $2, $3)`,
      [signature_id, transaction_id, s3_url]
    );

    return successResponse({ signature_id, s3_url }, 201);
  } catch (error) {
    console.error("Error at storeSignatureHandler: ", error);

    return errorResponse(500, "Internal Server Error", "Something went wrong");
  }
};

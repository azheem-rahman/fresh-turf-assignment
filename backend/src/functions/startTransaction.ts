/**
 * @route
 * POST /transactions/start
 *
 * @description
 * Create a new transaction when user inputs Seizure Report Number and Transaction Type
 *
 * @request
 * {
 *    "user_id": "uuid-from-authenticate-user",
 *    "report_number": "SRN123456",
 *    "type": "deposit"
 * }
 *
 * @response
 * {
 *    "success": true,
 *    "data": {
 *        "transaction_id": "generated-uuid"
 *    }
 * }
 */

import { APIGatewayProxyHandler } from "aws-lambda";
import { errorResponse, successResponse } from "../utils/response";
import { v4 as uuidv4 } from "uuid";
import { pool } from "../lib/db";

export const startTransactionHandler: APIGatewayProxyHandler = async (
  event
) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const { user_id, report_number, type } = body;

    // validate req body inputs
    if (!user_id || !report_number || !type) {
      return errorResponse(
        400,
        "Bad Request",
        "user_id, report_number, and type are required"
      );
    }

    if (type !== "deposit" && type !== "withdrawal") {
      return errorResponse(
        400,
        "Bad Request",
        "Invalid transaction type. Must be 'deposit' or 'withdrawal' "
      );
    }

    // generate new transaction_id
    const transactionId = uuidv4();

    // insert transaction into DB
    await pool.query(
      `INSERT INTO transactions (transaction_id, user_id, locker_id, report_number, type, remarks) 
       VALUES ($1, $2, NULL, $3, $4, NULL)`,
      [transactionId, user_id, report_number, type]
    );

    return successResponse({ transaction_id: transactionId }, 201);
  } catch (error) {
    console.error("Error in startTransactionHandler: ", error);

    return errorResponse(500, "Internal Server Error", "Something went wrong");
  }
};

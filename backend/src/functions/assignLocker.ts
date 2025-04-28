/**
 * @route
 * POST lockers/assign
 *
 * @request
 * {
 *    "transaction_id": "transaction-uuid",
 *    "locker_number": 101
 * }
 *
 * @response
 * {
 *    "success": true,
 *    "data": {
 *        "message": "Locker assigned successfully"
 *    }
 * }
 */

import { APIGatewayProxyHandler } from "aws-lambda";
import { errorResponse, successResponse } from "../utils/response";
import { pool } from "../lib/db";

export const assignLockerHandler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const { transaction_id, locker_number } = body;

    // validate request body inputs
    if (!transaction_id || !locker_number) {
      return errorResponse(
        400,
        "Bad Request",
        "transaction_id and locker_number are required"
      );
    }

    // find locker with given locker number (locker is also active and also not assigned to any transaction)
    const lockerResult = await pool.query(
      `SELECT locker_id FROM lockers 
        WHERE locker_number = $1 
        AND status = 'active'
        AND locker_id NOT IN (
            SELECT locker_id
            FROM transactions
            WHERE locker_id IS NOT NULL)`,
      [locker_number]
    );

    // return error if locker does not exist or is inactive
    if (lockerResult.rowCount === 0) {
      return errorResponse(404, "Not Found", "Locker not found or inactive");
    }

    const locker_id = lockerResult.rows[0].locker_id;

    // update transaction with locker_id
    await pool.query(
      `UPDATE transactions SET locker_id = $1 WHERE transaction_id = $2`,
      [locker_id, transaction_id]
    );

    return successResponse({ message: "Locker assigned successfully" }, 200);
  } catch (error) {
    console.error("Error in assignLockerHandler: ", error);

    return errorResponse(500, "Internal Server Error", "Something went wrong");
  }
};

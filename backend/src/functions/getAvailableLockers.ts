/**
 * @route
 * GET /lockers/available
 *
 * @description
 * Fetch all lockers with status "active" that are not assigned to any transaction
 *
 * @request
 * None
 *
 * @response
 * {
 *    "success": true,
 *    "data": [
 *        {
 *            "locker_id": "uuid-of-locker",
 *            "locker_number": 101,
 *            "status": "active"
 *        },
 *        {
 *            "locker_id": "uuid-of-locker",
 *            "locker_number": 102,
 *            "status": "active"
 *        }
 *    ]
 * }
 */

import { APIGatewayProxyHandler } from "aws-lambda";
import { pool } from "../lib/db";
import { errorResponse, successResponse } from "../utils/response";

export const getAvailableLockersHandler: APIGatewayProxyHandler = async () => {
  try {
    const result = await pool.query(
      `SELECT locker_id, locker_number, status 
        FROM lockers 
        WHERE status = 'active' 
        AND locker_id NOT IN (
            SELECT locker_id 
            FROM transactions 
            WHERE locker_id IS NOT NULL)`
    );

    if (result.rowCount === 0) {
      return errorResponse(404, "Not Found", "No available lockers found");
    }

    return successResponse({
      data: result.rows,
    });
  } catch (error) {
    console.error("Error in getAvailableLockersHandler: ", error);

    return errorResponse(500, "Internal Server Error", "Something went wrong");
  }
};

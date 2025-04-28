/**
 * @route
 * POST /auth/division-pass
 *
 * @description
 * Authenticate user by verifying division_pass_id against users table.
 *
 * @request
 * {
 *    "division_pass_id": "DIV001"
 * }
 *
 * @response
 * {
 *    "succcess": true,
 *    "data": {
 *       "user_id": "uuid-of-user",
 *       "role": "investigator"
 *    }
 * }
 */

import { APIGatewayProxyHandler } from "aws-lambda";
import { errorResponse, successResponse } from "../utils/response";
import { pool } from "../lib/db";

export const authenticateUserHandler: APIGatewayProxyHandler = async (
  event
) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const divisionPassId = body.division_pass_id;

    if (!divisionPassId) {
      return errorResponse(400, "Bad Request", "division_pass_id is required");
    }

    const result = await pool.query(
      `SELECT user_id, role FROM users WHERE division_pass_id = $1`,
      [divisionPassId]
    );

    if (result.rowCount === 0) {
      return errorResponse(404, "Not Found", "Invalid Division Pass");
    }

    const user = result.rows[0];

    return successResponse({
      user_id: user.user_id,
      role: user.role,
    });
  } catch (error) {
    console.error("Error in authenticateUserHandler: ", error);

    return errorResponse(500, "Internal Server Error", "Something went wrong");
  }
};

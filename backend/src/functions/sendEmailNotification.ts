import { SNSHandler } from "aws-lambda";
import { pool } from "../lib/db";

// Note: success or error message is printed in console since frontend will not receive response
export const sendEmailNotificationHandler: SNSHandler = async (event) => {
  console.log("sendEmailNotificationHandler invoked");

  try {
    const message = event.Records[0].Sns.Message;
    const { transaction_id, triggered_by } = JSON.parse(message);
    console.log("SNS message received: ", { transaction_id, triggered_by });

    if (!transaction_id) {
      console.error("Missing transaction_id in SNS message");
      return;
    }

    // get transaction info
    const result = await pool.query(
      `SELECT 
        transactions.report_number, 
        transactions.type, 
        transactions.related_transaction_id, 
        users.name, 
        users.email, 
        lockers.locker_number
      FROM transactions
      JOIN users ON transactions.user_id = users.user_id
      JOIN lockers ON transactions.locker_id = lockers.locker_id
      WHERE transactions.transaction_id = $1`,
      [transaction_id]
    );

    if (result.rowCount === 0) {
      console.error(`Transaction ${transaction_id} not found`);
      return;
    }

    const {
      report_number,
      type,
      related_transaction_id,
      name,
      email,
      locker_number,
    } = result.rows[0];

    // get case store officer email (assume only 1 CSO exists in system)
    const csoResult = await pool.query(
      `SELECT email FROM users WHERE role = 'store_officer' LIMIT 1`
    );

    if (csoResult.rowCount === 0) {
      console.error("No Case Store Officer found in system");
      return;
    }

    const csoEmail = csoResult.rows[0].email;

    // determine email recipients based on workflow
    let recipients: string[] = [];

    if (type === "deposit") {
      // deposit / redeposit
      recipients.push(email, csoEmail);
    } else {
      if (related_transaction_id === null) {
        // withdrawal (1)
        recipients.push(csoEmail);
      } else {
        // withdrawal (2)
        recipients.push(email, csoEmail);
      }
    }

    const subject = `New ${type} transaction - ${report_number}`;
    const body =
      `Transaction Details:\n\n` +
      `Transaction Type: ${type}\n` +
      `Report Number: ${report_number}\n` +
      `Locker Number: ${locker_number}\n` +
      `Done By: ${name}`;

    console.log(`Sending email to ${recipients.join(", ")}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body:\n ${body}`);
  } catch (error) {
    console.error("Error in sendEmailNotificationHandler: ", error);
  }
};

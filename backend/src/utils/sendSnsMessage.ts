import { sns } from "../lib/sns";
import { NotificationPayload } from "../types/notifications";

export const sendSnsMessage = async (
  payload: NotificationPayload
): Promise<AWS.SNS.PublishResponse> => {
  try {
    const topicArn =
      process.env.SNS_NOTIFICATION_TOPIC_ARN ||
      "arn:aws:sns:ap-southeast-1:123456789012:fresh_turf_notifications";

    const params: AWS.SNS.PublishInput = {
      TopicArn: topicArn,
      Message: JSON.stringify(payload),
    };

    const result = await sns.publish(params).promise();

    console.log(`SNS message published to ${topicArn}`);

    return result;
  } catch (error) {
    console.error("Error publishing SNS message: ", error);

    throw new Error("Failed to publish SNS message");
  }
};

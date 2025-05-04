export interface NotificationPayload {
  transaction_id: string;
  triggered_by: "capturePhoto" | "storeSignature";
}

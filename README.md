# Backend

## Description

The backend system in this project was developed based on requirements derived from a tender specification, aiming to support the operations of a smart locker solution.

## Tech Stack

- Node.js
- TypeScript
- Serverless framework
- AWS Lambda (local)
- PostgreSQL
- Mock S3 (via serverless-s3-local plugin)
- Mock SNS (via serverless-offline-sns plugin)

## Folder Structure

- src/functions/ – all lambda functions
- src/lib/ – reusable libs (e.g. DB, S3, SNS)
- src/utils/ – utility helpers (e.g. response formatting)
- mock-s3-data/ – local file uploads (auto-generated)
- schema.sql – DB schema
- seed.sql – sample data for testing

## Installation

Ensure the following are installed:

- Node.js
- PostgreSQL
- npm

### Clone the project

```
git clone https://github.com/azheem-rahman/fresh-turf-assignment.git
cd fresh-turf-assignment/backend
```

### Install Dependencies

```
npm install
```

### Create .env file (placed in `backend` folder)

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=fresh_turf_assignment

S3_BUCKET_NAME=fresh_turf_bucket
S3_ENDPOINT=http://localhost:8000
AWS_ACCESS_KEY_ID=S3RVER
AWS_SECRET_ACCESS_KEY=S3RVER
AWS_REGION=ap-southeast-1

SNS_ENDPOINT=http://localhost:4002
SNS_NOTIFICATION_TOPIC_ARN=arn:aws:sns:ap-southeast-1:123456789012:fresh_turf_notifications
```

### Create Database

```
1. Create Database
createdb fresh_turf_assignment

2. Apply schema
psql -d fresh_turf_assignment -f schema.sql

3. Seed data
psql -d fresh_turf_assignment -f seed.sql
```

### Start server

```
npx serverless offline
```

## Endpoints Overview

| Method | Endpoint              | Description                                       | Request Body Example                                                                                    | Response Body Example                                                                                                                                                                                       | Status Code |
| ------ | --------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| POST   | `/auth/division-pass` | Authenticates user via their Division Pass ID     | `{ "division_pass_id": "DIV001" }`                                                                      | `{ "success": true, "data": { "user_id": "6a6ccde6-4e4e-4f14-96c5-aa969d6508fa", "role": "investigator" } }`                                                                                                | 200         |
| POST   | `/transactions/start` | Starts transaction (deposit or withdrawal)        | `{ "user_id": "9776139b-74da-4a31-a164-7da47ba267e3", "report_number": "SRN123456", "type": "deposit"}` | `{ "success": true, "data": { "transaction_id": "35655477-012b-494c-b479-0567abc707af" } }`                                                                                                                 | 201         |
| GET    | `/lockers/available`  | Returns all currently available lockers           | _None_                                                                                                  | `{ "success": true, "data": { "data": [ { "locker_id": "82decf2e-9baf-4be0-8f56-c4a48e8eb22d", "locker_number": 103, "status": "active" }, ... ] } }`                                                       | 200         |
| POST   | `/lockers/assign`     | Assigns a locker to a transaction                 | `{ "transaction_id": "f03248bc-0955-4e6c-8f78-6210c9901bd6", "locker_number": 101 }`                    | `{ "success": true, "data": { "message": "Locker assigned successfully" } }`                                                                                                                                | 200         |
| POST   | `/photos`             | Uploads a photo to S3 and stores S3 url to DB     | `{ "transaction_id": "f03248bc-0955-4e6c-8f78-6210c9901bd6", "type": "front", "file": "base64string" }` | `{ "success": true, "data": { "photo_id": "6c833e22-a86c-448d-a5f0-3dca1c24b885", "s3_url": "http://localhost:8000/fresh_turf_bucket/photos/6c833e22-a86c-448d-a5f0-3dca1c24b885_back.jpg" }}`              | 201         |
| POST   | `/signatures`         | Uploads a signature to S3 and stores S3 url to DB | `{ "transaction_id": "f03248bc-0955-4e6c-8f78-6210c9901bd6", "file": "base64string" }`                  | `{ "success": true, "data": { "signature_id": "bec8b59f-53ef-4ff2-a13b-b036ffd8b817", "s3_url": "http://localhost:8000/fresh_turf_bucket/signatures/bec8b59f-53ef-4ff2-a13b-b036ffd8b817_signature.jpg" } ` | 201         |

- `/photos` and `/signatures` endpoints trigger SNS depending on transaction type

### Error Handling and Response Format

All responses follow a standardised format.

#### Success Response

```
{
    "success": true,
    "data": {
        "transaction_id": "1234"
        ...
    }
}
```

#### Error Response

```
{
  "success": false,
  "error": "Bad Request",
  "message": "Missing required field: transaction_id"
}
```

#### Common Error Codes

| Status Code | Error                 | When it occurs                                                    |
| ----------- | --------------------- | ----------------------------------------------------------------- |
| 400         | Bad Request           | Missing or invalid request payload                                |
| 401         | Unauthorised          | Invalid `division_pass_id`                                        |
| 404         | Not Found             | Record does not exist                                             |
| 409         | Conflict              | Duplicate resource (e.g. signature for transaction already exist) |
| 500         | Internal Server Error | Unexpected server error                                           |

## Mock S3 and SNS Notes

- S3 Data is stored in mock-s3-data folder (server auto creates folder if does not exist)
- SNS messages are routed locally and log to console

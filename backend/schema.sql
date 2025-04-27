-- enable pgcrypto extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
  user_id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  division_pass_id VARCHAR(20) UNIQUE NOT NULL,
  role VARCHAR(20) DEFAULT 'investigator' CHECK (role IN ('investigator', 'store_officer', 'admin')) NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE lockers (
  locker_id UUID PRIMARY KEY,
  locker_number INT UNIQUE,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE transactions (
  transaction_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id) NOT NULL,
  locker_id UUID REFERENCES lockers(locker_id) NOT NULL,
  report_number VARCHAR(100) NOT NULL,
  type VARCHAR(20) CHECK (type IN ('deposit', 'withdrawal')) NOT NULL,
  remarks VARCHAR(255),
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE photos (
  photo_id UUID PRIMARY KEY,
  transaction_id UUID NOT NULL REFERENCES transactions(transaction_id),
  type VARCHAR(10) CHECK (type IN ('front', 'back')),
  s3_url VARCHAR(255)
);

CREATE TABLE signatures (
  signature_id UUID PRIMARY KEY,
  transaction_id UUID NOT NULL UNIQUE REFERENCES transactions(transaction_id),
  s3_url VARCHAR(255)
);
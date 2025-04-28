INSERT INTO users (user_id, name, email, division_pass_id, role)
VALUES
  (gen_random_uuid(), 'Alice Tan', 'alice@agency.gov', 'DIV001', 'investigator'),
  (gen_random_uuid(), 'Bob Lim', 'bob@agency.gov', 'DIV002', 'investigator'),
  (gen_random_uuid(), 'Cheryl Ong', 'cheryl@agency.gov', 'DIV999', 'store_officer');

INSERT INTO lockers (locker_id, locker_number, status)
VALUES
  (gen_random_uuid(), 101, 'active'),
  (gen_random_uuid(), 102, 'active'),
  (gen_random_uuid(), 103, 'inactive');

-- Deposit Transaction
INSERT INTO transactions (transaction_id, user_id, locker_id, report_number, type, remarks)
VALUES
  (gen_random_uuid(), 
   (SELECT user_id FROM users WHERE name = 'Alice Tan'),
   (SELECT locker_id FROM lockers WHERE locker_number = 101),
   'SRN123456',
   'deposit',
   'Seized mobile phone, sealed in TEP bag 123');

INSERT INTO photos (photo_id, transaction_id, type, s3_url)
VALUES
  (gen_random_uuid(),
   (SELECT transaction_id FROM transactions WHERE report_number = 'SRN123456'),
   'front',
   'https://s3.example.com/photos/tep_front.jpg'),
  (gen_random_uuid(),
   (SELECT transaction_id FROM transactions WHERE report_number = 'SRN123456'),
   'back',
   'https://s3.example.com/photos/tep_back.jpg');

INSERT INTO signatures (signature_id, transaction_id, s3_url)
VALUES
  (gen_random_uuid(),
   (SELECT transaction_id FROM transactions WHERE report_number = 'SRN123456'),
   'https://s3.example.com/signatures/alice.png');

-- Withdrawal Transaction
INSERT INTO transactions (transaction_id, user_id, locker_id, report_number, type, remarks)
VALUES 
  (gen_random_uuid(),
    (SELECT user_id FROM users WHERE name = 'Bob Lim'),
    (SELECT locker_id FROM lockers WHERE locker_number = 102),
    'SRN654321',
    'withdrawal',
    'Retrieving seized laptop for evidence review');

INSERT INTO photos (photo_id, transaction_id, type, s3_url)
VALUES
  (gen_random_uuid(),
   (SELECT transaction_id FROM transactions WHERE report_number = 'SRN654321'),
   'front',
   'https://s3.example.com/photos/laptop_front.jpg'),
  (gen_random_uuid(),
   (SELECT transaction_id FROM transactions WHERE report_number = 'SRN654321'),
   'back',
   'https://s3.example.com/photos/laptop_back.jpg');

INSERT INTO signatures (signature_id, transaction_id, s3_url)
VALUES
  (gen_random_uuid(),
   (SELECT transaction_id FROM transactions WHERE report_number = 'SRN654321'),
   'https://s3.example.com/signatures/bob.png');
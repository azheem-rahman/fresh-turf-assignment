INSERT INTO users (user_id, name, email, division_pass_id, role)
VALUES
  ('9776139b-74da-4a31-a164-7da47ba267e3', 'Alice Tan', 'alice@agency.gov', 'DIV001', 'investigator'),
  ('937eabaa-bec4-46f9-b742-b49f95db1af5', 'Bob Lim', 'bob@agency.gov', 'DIV002', 'investigator'),
  ('78bb4139-c28c-4ace-874a-1b4470bc01ec', 'Cheryl Ong', 'cheryl@agency.gov', 'DIV999', 'store_officer');

INSERT INTO lockers (locker_id, locker_number, status)
VALUES
  ('36ddc6d7-64f6-48d9-941d-107649dc4158', 101, 'active'),
  ('336dce1d-ad2f-4352-9010-b972cbe1ac93', 102, 'active'),
  ('e8125b7e-efc2-4bef-bc8f-652115faf98a', 103, 'inactive');

-- Deposit Transaction
INSERT INTO transactions (transaction_id, user_id, locker_id, report_number, type, remarks)
VALUES
  ('f6d12b77-e76e-4250-a583-dcbf7fd0dacd', 
    '9776139b-74da-4a31-a164-7da47ba267e3', 
    '36ddc6d7-64f6-48d9-941d-107649dc4158', 
    'SRN123456', 
    'deposit', 
    'Seized mobile phone, 
    sealed in TEP bag 123');

-- Withdrawal (1) Transaction
INSERT INTO transactions (transaction_id, user_id, locker_id, report_number, type, remarks)
VALUES
  ('f03248bc-0955-4e6c-8f78-6210c9901bd6', 
    '78bb4139-c28c-4ace-874a-1b4470bc01ec', 
    '336dce1d-ad2f-4352-9010-b972cbe1ac93', 
    'SRN654321', 
    'withdrawal', 
    'CSO retrieves exhibit for withdrawal');

-- Withdrawal (2) Transaction
INSERT INTO transactions (transaction_id, user_id, locker_id, report_number, type, remarks, related_transaction_id)
VALUES
  ('53941fa8-6e56-4f3c-a201-7f13dd820ab7', 
    '937eabaa-bec4-46f9-b742-b49f95db1af5', 
    '336dce1d-ad2f-4352-9010-b972cbe1ac93', 
    'SRN654321', 
    'withdrawal', 
    'Investigator collects exhibit', 
    'f03248bc-0955-4e6c-8f78-6210c9901bd6');
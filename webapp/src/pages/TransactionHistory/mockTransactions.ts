export interface Transaction {
  timeStamp: string;
  user: string;
  role: string;
  cell: string;
  activity: string;
}

export const mockTransactions: Transaction[] = [
  {
    timeStamp: "09/11/23 10:10",
    user: "ABC",
    role: "Super Admin",
    cell: "03",
    activity: "Collection",
  },
  {
    timeStamp: "09/11/23 10:10",
    user: "DEF",
    role: "Case Store Officer",
    cell: "03",
    activity: "Access",
  },
  {
    timeStamp: "09/11/23 10:10",
    user: "GHI",
    role: "Investigator",
    cell: "03",
    activity: "Collection",
  },
  {
    timeStamp: "09/11/23 10:10",
    user: "JKL",
    role: "Case Store Officer",
    cell: "03",
    activity: "Deposit",
  },
  {
    timeStamp: "09/11/23 10:10",
    user: "MNO",
    role: "Case Store Officer",
    cell: "03",
    activity: "Withdrawal",
  },
  {
    timeStamp: "09/11/23 10:10",
    user: "PQR",
    role: "Case Store Officer",
    cell: "03",
    activity: "Access",
  },
  {
    timeStamp: "09/11/23 10:10",
    user: "STU",
    role: "Investigator",
    cell: "03",
    activity: "Collection",
  },
  {
    timeStamp: "09/11/23 10:10",
    user: "VWX",
    role: "Case Store Officer",
    cell: "03",
    activity: "Withdrawal",
  },
  {
    timeStamp: "09/11/23 10:10",
    user: "YZA",
    role: "Investigator",
    cell: "03",
    activity: "Deposit",
  },
  {
    timeStamp: "09/11/23 10:10",
    user: "AZY",
    role: "Investigator",
    cell: "03",
    activity: "Collection",
  },
  {
    timeStamp: "09/11/23 10:10",
    user: "XWV",
    role: "Investigator",
    cell: "03",
    activity: "Collection",
  },
];

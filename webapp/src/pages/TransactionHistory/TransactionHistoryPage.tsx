import { ListFilter, Search } from "lucide-react";
import PageLayout from "../../components/layout/PageLayout";
import { mockTransactions } from "./mockTransactions";

const transactionActivityColourMap: Record<string, string> = {
  Collection: "text-green-500",
  Access: "text-purple-500",
  Deposit: "text-blue-500",
  Withdrawal: "text-red-500",
};

const TransactionHistoryPage = () => {
  return (
    <PageLayout>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Transaction History
      </h1>

      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <p className="text-md">
          <span className="text-gray-500">Total items: </span>
          <span className="font-semibold">65</span>
        </p>

        <div className="flex items-center gap-1">
          <div className="relative w-full md:w-60">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-3 py-2 text-sm text-gray-500 outline outline-gray-300 rounded w-56"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 outline outline-blue-200 text-blue-900 rounded text-sm font-semibold">
            <ListFilter size={16} />
            Filter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-md shadow">
        <table className="table-fixed w-full text-left">
          <thead className="bg-blue-100/50 text-gray-400 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 w-48">Time Stamp</th>
              <th className="px-4 py-3 w-24">User</th>
              <th className="px-4 py-3 w-48">Role</th>
              <th className="px-4 py-3 w-24">Cell</th>
              <th className="px-4 py-3 w-auto">Activity</th>
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map((tx, idx) => (
              <tr key={idx} className="border-t h-16">
                <td className="px-4 py-2">{tx.timeStamp}</td>
                <td className="px-4 py-2">{tx.user}</td>
                <td className="px-4 py-2">{tx.role}</td>
                <td className="px-4 py-2">{tx.cell}</td>
                <td className="px-4 py-2 font-semibold">
                  <span className={transactionActivityColourMap[tx.activity]}>
                    {tx.activity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
};

export default TransactionHistoryPage;

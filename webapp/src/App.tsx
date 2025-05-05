import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import TransactionHistoryPage from "./pages/TransactionHistory/TransactionHistoryPage";
import UserManagement from "./pages/UserManagement/UserManagement";
import LockerManagement from "./pages/LockerManagement/LockerManagement";

function App() {
  return (
    <Routes>
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/locker-management" element={<LockerManagement />} />
      <Route path="/transaction-history" element={<TransactionHistoryPage />} />
    </Routes>
  );
}

export default App;

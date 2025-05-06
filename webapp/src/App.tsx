import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import TransactionHistoryPage from "./pages/TransactionHistory/TransactionHistoryPage";
import UserManagementPage from "./pages/UserManagement/UserManagementPage";
import LockerManagementPage from "./pages/LockerManagement/LockerManagementPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user-management" element={<UserManagementPage />} />
      <Route path="/locker-management" element={<LockerManagementPage />} />
      <Route path="/transaction-history" element={<TransactionHistoryPage />} />
    </Routes>
  );
}

export default App;

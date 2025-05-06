import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-100">
        <TopHeader />
        <main className="p-6 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default PageLayout;

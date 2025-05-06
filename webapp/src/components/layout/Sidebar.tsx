import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: "User Management", path: "/user-management" },
    { name: "Locker Management", path: "/locker-management" },
    { name: "Transaction History", path: "/transaction-history" },
  ];

  return (
    <aside className="w-64 h-screen bg-blue-950 text-white flex flex-col">
      <div className="h-24">
        <h2 className="text-xl font-bold p-8">MHA</h2>
      </div>
      <hr className="border-t border-gray-600" />
      <h3 className="text-md pl-8 pt-4 text-gray-500">MENU</h3>
      <nav className="flex flex-col p-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`text-md block py-3 my-2 rounded-md transition-all ${
                isActive
                  ? "bg-white/10 px-4 text-white outline outline-[1px]"
                  : "pl-4 text-gray-300"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;

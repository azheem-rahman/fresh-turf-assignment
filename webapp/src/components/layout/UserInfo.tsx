import { ChevronDown, User } from "lucide-react";

const UserInfo = () => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-sm outline outline-gray-200">
        <User color="gray" size={20} />
      </div>
      <div className="h-10">
        <p className="text-sm">Tan Kai Yee</p>
        <p className="text-xs text-gray-400">Case Store Officer</p>
      </div>
      <div className="h-10 flex items-center justify-center">
        <ChevronDown color="gray" size={20} />
      </div>
    </div>
  );
};

export default UserInfo;

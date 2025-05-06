import UserInfo from "./UserInfo";

const TopHeader = () => {
  return (
    <div className="w-full bg-white">
      <div className="h-24 flex items-center justify-end pr-4">
        <UserInfo />
      </div>
      <hr className="border-t border-blue-950/20" />
    </div>
  );
};

export default TopHeader;

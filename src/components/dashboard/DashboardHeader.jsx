import { ChevronRight, Search } from "lucide-react";

const DashboardHeader = () => (
  <header className="w-full bg-white">
    <nav className="flex justify-between items-center max-w-[1200px] mx-auto py-2">
      <h3 className="flex items-center text-gray-500 text-sm">
        Home <ChevronRight className="mx-2" size={15} /> 
        <span className="text-blue-900 font-bold">Dashboard V2</span>
      </h3>

      <div className="flex items-center bg-[#f0f3fa] rounded-md px-4 py-1 w-96">
        <Search size={20} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search anything..."
          className="flex-1 bg-transparent outline-none placeholder-gray-400 ml-2"
        />
      </div>
    </nav>
  </header>
);

export default DashboardHeader;

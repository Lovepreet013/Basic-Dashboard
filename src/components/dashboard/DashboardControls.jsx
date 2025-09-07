import { Clock4, EllipsisVertical, Plus, RefreshCcw } from "lucide-react";

const DashboardControls = ({ onAddWidget }) => (
  <div className="flex items-center justify-between py-8">

    <h1 className="font-[700] text-xl">CNAPP Dashboard</h1>

    <div className="flex items-center gap-3">

      <button onClick={onAddWidget} className="flex items-center py-1 text-[#787878] hover btn">
        Add Widget <Plus size={15} className="ml-1" />
      </button>

      <button className="btn py-1.5 hover">
        <RefreshCcw size={15} color="#787878" />
      </button>

      <button className="btn py-1.5 hover">
        <EllipsisVertical size={15} color="#787878" />
      </button>
      
      <button className="flex items-center border-2 border-[#28289b] rounded bg-white px-2 py-1 text-sm text-[#28289b] font-semibold hover:bg-[#dcdcf5] cursor-pointer">
        <Clock4 size={15} className="mr-1" /> Last 2 days
      </button>
    </div>
  </div>
);

export default DashboardControls;
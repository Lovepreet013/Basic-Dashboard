import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addSelectedWidgets, setTargetSection, toggleDrawer, toggleSelection } from "../store/widgetSlice";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.widgets.drawerOpen);
  const availableWidgets = useSelector((state) => state.widgets.availableWidgets);
  const selected = useSelector((state) => state.widgets.selected);
  const targetSection = useSelector((state) => state.widgets.targetSection);
  const sections = useSelector((state) => state.widgets.sections);
  const activeTab = targetSection;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900/50 z-40 transition-opacity duration-300"
      onClick={() => dispatch(toggleDrawer())}>
      <div
        className="fixed top-0 right-0 w-132 h-full bg-white shadow-lg z-50 p-6 flex flex-col transition-transform duration-300 transform translate-x-0"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-800">
            Personalise your dashboard by adding the following widget
          </h2>
          <button
            onClick={() => dispatch(toggleDrawer())}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none">
            <X size={30} />
          </button>
        </div>
        <div className="flex space-x-2 p-1 mb-4">
          {Object.entries(sections).map(([id, sec]) => (
            <button
              key={id}
              onClick={() => dispatch(setTargetSection(id))}
              className={`flex-1 py-1 px-4 text-sm focus:outline-none
                ${
                  activeTab === id
                    ? "border-2 border-t-0 border-l-0 border-r-0 border-b-blue-500 "
                    : "text-gray-500 hover:text-blue-600"
                }`}>
              {sec.name}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          <div className="flex flex-col space-y-4">
            {availableWidgets.map((w) => (
              <div
                key={w.id}
                className="p-2 bg-gray-50 border border-gray-200 rounded-lg">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selected.includes(w.id)}
                      onChange={() => dispatch(toggleSelection(w.id))}
                      className="form-checkbox h-5 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <div className="flex flex-col">
                      <span className="text-gray-800 text-sm">{w.name}</span>
                      <span className="text-gray-500 text-sm">{w.description}</span>
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => dispatch(toggleDrawer())}
            className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => dispatch(addSelectedWidgets())}
            className="px-6 py-2 bg-[#28289b] text-white rounded-md hover:bg-blue-700 focus:outline-none cursor-pointer" 
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideDrawer
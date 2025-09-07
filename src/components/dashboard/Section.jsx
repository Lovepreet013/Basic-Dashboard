import { Plus, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeWidget, toggleDrawer } from "../../store/widgetSlice";
import Chart from "../widgets/Chart";
import RegistryScan from "../widgets/RegistryScan";

const componentMap = { Chart, RegistryScan };

const Section = ({ id, name, widgets }) => {
  const dispatch = useDispatch();

  return (
    <div className="mb-8 mx-2">
      <h2 className="font-semibold mb-3 text-md">{name}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {widgets.map((w) => {
          const Comp = componentMap[w.component];
          return (
            <div key={w.instanceId} className="h-[250px] bg-white rounded-xl relative p-2">
              <button
                onClick={() =>
                  dispatch(removeWidget({ sectionId: id, instanceId: w.instanceId }))
                }
                className="absolute top-7 right-6 text-sm cursor-pointer"
              >
                <X />
              </button>
              {Comp ? <Comp /> : <div>Unknown widget: {w.component}</div>}
            </div>
          );
        })}

        <div className="h-[250px] bg-white rounded-xl flex items-center justify-center text-gray-400">
          <button
            onClick={() => dispatch(toggleDrawer({ sectionId: id }))}
            className="border-2 border-[#dce3fc] bg-white cursor-pointer flex items-center px-2 py-1 text-[#787878] rounded hover:bg-[#e7ebf8]"
          >
            Add Widget <Plus size={15} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section;

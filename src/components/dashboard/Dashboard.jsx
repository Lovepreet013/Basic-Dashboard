import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardHeader from "./DashboardHeader";
import DashboardControls from "./DashboardControls";
import Section from "./Section";
import SideDrawer from "../SideDrawer";
import { setTargetSection, toggleDrawer } from "../../store/widgetSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.widgets.sections);

  return (
    <div>
      <DashboardHeader />

      <main className="max-w-[1200px] mx-auto">
        <DashboardControls
          onAddWidget={() => dispatch(toggleDrawer())}
        />

        {Object.entries(sections).map(([id, section]) => (
          <Section
            key={id}
            id={id}
            name={section.name}
            widgets={section.widgets}
            onAddWidget={() => {
              dispatch(setTargetSection(id));
              dispatch(toggleDrawer());
            }}
          />
        ))}
      </main>

      <SideDrawer />
    </div>
  );
};

export default Dashboard;
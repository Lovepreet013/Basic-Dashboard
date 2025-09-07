import { createSlice, nanoid } from "@reduxjs/toolkit";
import dashboardConfig from "../config/dashboardConfig.json";

// Build initial sections with widgets from JSON
const initialSections = dashboardConfig.categories.reduce((acc, cat) => {
  acc[cat.id] = {
    name: cat.name,
    widgets: cat.widgets.map((w) => ({
      ...w,
      instanceId: nanoid(), // give each widget a unique ID
    })),
  };
  return acc;
}, {});

const initialState = {
  sections: initialSections,
  availableWidgets: dashboardConfig.categories.flatMap((cat) => cat.widgets),
  drawerOpen: false,
  selected: [],
  targetSection: dashboardConfig.categories[0].id, // default = first section
};

const widgetsSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    toggleDrawer: (state, action) => {
      const opening = !state.drawerOpen;

      if (opening) {
        state.selected = [];
        const sectionId = action?.payload?.sectionId;
        if (sectionId) {
          state.targetSection = sectionId;
        }
      }

      state.drawerOpen = !state.drawerOpen;
    },

    toggleSelection: (state, action) => {
      const id = action.payload;
      if (state.selected.includes(id)) {
        state.selected = state.selected.filter((s) => s !== id);
      } else {
        state.selected.push(id);
      }
    },

    setTargetSection: (state, action) => {
      state.targetSection = action.payload;
    },

    addSelectedWidgets: (state) => {
      if (!state.targetSection) return;

      const section = state.sections[state.targetSection];
      if (!section) return;

      state.selected.forEach((widgetId) => {
        const widgetDef = state.availableWidgets.find((w) => w.id === widgetId);
        if (widgetDef) {
          section.widgets.push({
            ...widgetDef,
            instanceId: nanoid(),
          });
        }
      });

      state.selected = [];
      state.drawerOpen = false;
    },

    removeWidget: (state, action) => {
      const { sectionId, instanceId } = action.payload;
      state.sections[sectionId].widgets = state.sections[sectionId].widgets.filter(
        (w) => w.instanceId !== instanceId
      );
    },
  },
});

export const {
  toggleDrawer,
  toggleSelection,
  setTargetSection,
  addSelectedWidgets,
  removeWidget,
} = widgetsSlice.actions;

export default widgetsSlice.reducer;
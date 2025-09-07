import { createSlice, nanoid } from "@reduxjs/toolkit";
import dashboardConfig from "../config/dashboardConfig.json";

const initialState = {
  // Build sections dynamically
  sections: dashboardConfig.categories.reduce((acc, cat) => {
    acc[cat.id] = { name: cat.name, widgets: [] };
    return acc;
  }, {}),
  availableWidgets: dashboardConfig.categories.flatMap((cat) => cat.widgets),
  drawerOpen: false,
  selected: [],
  targetSection: dashboardConfig.categories[0].id, 
};

const widgetsSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {

    toggleDrawer: (state, action) => {
      // if drawer is currently closed, we are OPENING it
      const opening = !state.drawerOpen;

      if (opening) {
        state.selected = []; // reset selection only when opening
        const sectionId = action?.payload?.sectionId;
        // only change targetSection when caller provides one
        if (sectionId) {
          state.targetSection = sectionId;
        }
        // otherwise, keep whatever was previously selected
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
            instanceId: Date.now().toString(),
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
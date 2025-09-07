import { Provider } from "react-redux";
import { store } from "./store/store";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <div className="font-sans">
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;

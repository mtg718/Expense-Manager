import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
     <Navbar />
  <div className="pt-20">
        <Dashboard />
      </div>

    <ToastContainer position="top-right" autoClose={2000} />
    </>
  )
  
}

export default App;

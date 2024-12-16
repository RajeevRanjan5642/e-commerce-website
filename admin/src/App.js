import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar";
import Admin from './pages/Admin/Admin'
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <Admin/>
    </div>
  );
}

export default App;

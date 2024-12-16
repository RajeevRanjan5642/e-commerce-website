import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar";
import Admin from './pages/Admin/Admin'

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Navbar/>
      <Admin/>
    </div>
  );
}

export default App;

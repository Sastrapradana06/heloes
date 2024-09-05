import { Link } from "react-router-dom";
import "./App.css";
import Button from "./components/ui/button";

function App() {
  return (
    <div className="w-full h-[90vh] flex flex-col gap-2 justify-center items-center">
      <h1>Heloes eccomerce</h1>
      <Link to="/login">
        <Button teks="Login" color="purple" size={"small"} />
      </Link>
    </div>
  );
}

export default App;

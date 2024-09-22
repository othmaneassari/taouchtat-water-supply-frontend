import logo from "./logo.svg";
import logotr from "../src/assets/icon/logotr.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="flex flex-col items-center justify-between h-[50vh]">
        <div className="flex justify-center w-full h-screen">
          <img className="h-[180px] w-[180px] mt-5" src={logotr} alt=""></img>
        </div>
        <div className="flex justify-center gap-4 mt-12 mb-12">
          <input
            type="text"
            placeholder="Temperature (°C)"
            className="border-2 border-[#31C48D] rounded-lg p-2 w-48"
          />
          <input
            type="text"
            placeholder="Precipitation (mm)"
            className="border-2 border-[#31C48D] rounded-lg p-2 w-48"
          />
        </div>
        <button className="bg-black text-white rounded-lg p-2 w-48 transition duration-300 ease-in-out hover:bg-white hover:text-black">
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;

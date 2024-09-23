import logo from "./logo.svg";
import logotr from "../src/assets/icon/logotr.png";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [showResult, setShowResult] = useState(false);
  const [formData, setFormData] = useState({
    temperature: "",
    precipitation: "",
  });
  const [error, setError] = useState({
    temperature: "",
    precipitation: "",
  });
  function handlechange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    console.log("Form Data: ", formData);
    let isValid = true;
    const re = /^\d+$/;
    const validateData = () => {
      if (!formData.temperature) {
        setError((prevError) => ({
          ...prevError,
          temperature: "La temperature est requise",
        }));
        isValid = false;
      } else if (!re.test(formData.temperature)) {
        setError((prevError) => ({
          ...prevError,
          temperature: "Entrez une temperature valide",
        }));
        isValid = false;
      }
      if (!formData.precipitation) {
        setError((prevError) => ({
          ...prevError,
          precipitation: "Les precipitations sont requises",
        }));
        isValid = false;
      } else if (!re.test(formData.precipitation)) {
        setError((prevError) => ({
          ...prevError,
          precipitation: "Entrez une valeur valide",
        }));
        isValid = false;
      }

      if (isValid) {
        axios
          .post("https://localhost:7026/api/Irrigation/estimation", formData)
          .then((response) => {
            console.log("API response:", response.data);
            console.log(formData);
            if (response.data.status === "Success") {
              setShowResult(true);
            }
          })
          .catch((error) => {
            console.error("Error creating event type:", error);
          });
      }
    };
    validateData();
  };
  return (
    <div className="App">
      <div className="flex flex-col items-center justify-between h-[50vh]">
        <div className="flex justify-center w-full h-screen">
          <img className="h-[180px] w-[180px] mt-5" src={logotr} alt=""></img>
        </div>
        <div className="flex justify-center gap-4 mt-12 mb-12">
          <div className="flex flex-col">
            <input
              type="text"
              name="temperature"
              placeholder="Temperature (°C)"
              onChange={handlechange}
              className="border-2 border-[#31C48D] rounded-lg p-2 w-48"
            />
            {error.temperature && (
              <span className="text-red-600 text-[11px] mt-3">
                {error.temperature}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              name="precipitation"
              placeholder="Precipitation (mm)"
              onChange={handlechange}
              className="border-2 border-[#31C48D] rounded-lg p-2 w-48"
            />
            {error.precipitation && (
              <span className="text-red-600 text-[11px] mt-3">
                {error.precipitation}
              </span>
            )}
          </div>
        </div>
        <button
          type="submit"
          onClick={handlesubmit}
          className="bg-black text-white rounded-lg p-2 w-48 transition duration-300 ease-in-out hover:bg-white hover:text-black"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default App;

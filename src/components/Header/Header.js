import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { serverURL } from "../../api/main";
import "../../styles/header.scss";

function Header({ setForecastData, setIsDisplay, setIsLoading }) {
  const [input, setInput] = useState("");
  const inputReference = useRef(null);

  useEffect(() => {
    inputReference.current.focus();
  }, []);

  // Requesting weather's data
  const getForecastData = async () => {
    await axios
      .get(`${serverURL}&q=${input}&days=3&aqi=no&alerts=no`)
      .then((response) => {
        setIsLoading(true);
        setForecastData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsDisplay(true);
      getForecastData();
      setIsLoading(false);
    }
  };

  return (
    <div className="header-container">
      <div className="header-container__title">
        <h1>
          Weather <span>Forecast</span>
        </h1>
      </div>
      <div className="header-container__search-box">
        <input
          type="text"
          placeholder="Search for a location"
          ref={inputReference}
          onChange={(event) => {
            setInput(event.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default Header;

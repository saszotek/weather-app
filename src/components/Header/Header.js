import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { serverURL } from "../../api/main";
import "../../styles/header.scss";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function Header({ setForecastData, setIsDisplay, setIsLoading }) {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

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
        setIsDisplay(false);
        validationInput(error.response.data.error.code);
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsDisplay(true);
      getForecastData();
      setIsLoading(false);
    }
  };

  const validationInput = (errorCode) => {
    switch (errorCode) {
      case 1002:
        setMessage("API key not provided.");
        break;
      case 1003:
        setMessage("Please enter a location.");
        break;
      case 1005:
        setMessage("API request url is invalid");
        break;
      case 1006:
        setMessage("No matching location found.");
        break;
      case 2006:
        setMessage("API key provided is invalid");
        break;
      case 2007:
        setMessage("Exceeded maximum number of calls per month.");
        break;
      case 2008:
        setMessage("Authorization to the server has been revoked.");
        break;
      case 9999:
        setMessage("Access to the forecast's data is unavailable for now.");
        break;
      default:
        setMessage("Internal problem occured, try again later!");
    }
  };

  return (
    <div className="header-container">
      {message && <ErrorMessage message={message} />}
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

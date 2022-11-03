import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { serverURL } from "../../api/main";
import "../../styles/header.scss";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../../assets/icons/icons";
import { useLocalState } from "../../util/useLocalState";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

function Header({
  forecastData,
  setForecastData,
  isDisplay,
  setIsDisplay,
  setIsLoading,
}) {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [updatedLocations, setUpdatedLocations] = useState([]);

  const [locations, setLocations] = useLocalState("[]", "locations");

  const inputReference = useRef(null);

  useEffect(() => {
    inputReference.current.focus();
  }, []);

  useEffect(() => {
    let handler = () => {
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  // Requesting weather's data
  const getForecastData = async () => {
    await axios
      .get(`${serverURL}&q=${input}&days=3&aqi=no&alerts=no`)
      .then((response) => {
        setMessage("");
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

  const handleDropdownInput = (locationFromDropdown) => {
    setInput(locationFromDropdown);
    // setIsDisplay(true);
    // getForecastData();
    // setIsLoading(false);
  };

  const handleFavorite = () => {
    if (isDisplay && forecastData) {
      let array = JSON.parse(locations);
      let locationName = `${forecastData.location.name}, ${forecastData.location.country}`;
      array.push(locationName);
      setLocations(JSON.stringify(array));
    } else {
      validationInput(2137);
    }
  };

  const handleFavoriteList = () => {
    setUpdatedLocations(JSON.parse(locations));
    setIsOpen(!isOpen);
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
      case 2137:
        setMessage(
          "Before adding a location to bookmark, enter its proper name first!"
        );
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
      <div className="header-container__favorite-list">
        <button onClick={handleFavoriteList}>
          <FontAwesomeIcon icon={icons.faCaretDown} />
        </button>
        <DropdownMenu
          isOpen={isOpen}
          updatedLocations={updatedLocations}
          handleDropdownInput={handleDropdownInput}
        />
      </div>
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
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleFavorite}>
          <FontAwesomeIcon icon={icons.faStar} />
        </button>
      </div>
    </div>
  );
}

export default Header;

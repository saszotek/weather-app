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
  const [isFavorite, setIsFavorite] = useState(false);

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
  const getForecastData = async (locationName) => {
    if (!locationName) {
      locationName = input;
    }

    await axios
      .get(`${serverURL}&q=${locationName}&days=3&aqi=no&alerts=no`)
      .then((response) => {
        setMessage("");
        setIsLoading(true);
        setForecastData(response.data);
        setFavoriteIconColor(
          response.data.location.name,
          response.data.location.country
        );
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
    setIsDisplay(true);
    getForecastData(locationFromDropdown);
    setIsLoading(false);
    setInput(locationFromDropdown);
  };

  const handleDropdownDelete = (index) => {
    let array = updatedLocations;
    array.splice(index, 1);
    setUpdatedLocations(array);
    setLocations(JSON.stringify(array));
  };

  const handleFavorite = () => {
    let array = JSON.parse(locations);
    let locationName = `${forecastData.location.name}, ${forecastData.location.country}`;
    if (!isFavorite) {
      if (isDisplay && forecastData) {
        array.push(locationName);
        setLocations(JSON.stringify(array));
        setIsFavorite(true);
      } else {
        validationInput(2137);
      }
    } else {
      array.forEach((element, index) => {
        if (element === locationName) {
          array.splice(index, 1);
          setLocations(JSON.stringify(array));
          setIsFavorite(false);
        }
      });
    }
  };

  const handleFavoriteList = () => {
    setUpdatedLocations(JSON.parse(locations));
    setIsOpen(!isOpen);
  };

  const setFavoriteIconColor = (name, country) => {
    let array = JSON.parse(locations);
    array.forEach((element) => {
      if (element === `${name}, ${country}`) {
        setIsFavorite(true);
      }
    });
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
          handleDropdownDelete={handleDropdownDelete}
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
        <button
          className={
            isFavorite
              ? "header-container__search-box__favorite-yes"
              : "header-container__search-box__favorite-not"
          }
          onClick={handleFavorite}
        >
          <FontAwesomeIcon icon={icons.faStar} />
        </button>
      </div>
    </div>
  );
}

export default Header;

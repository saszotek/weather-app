import React, { useEffect, useRef } from "react";
import "../../styles/header.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function Header({ setInput, getForecastData }) {
  const inputReference = useRef(null);

  useEffect(() => {
    inputReference.current.focus();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      getForecastData();
    }
  };

  return (
    <div className="header-container">
      {/* <div className="header-container__menu">
        <FontAwesomeIcon icon={faCaretDown} />
      </div> */}
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

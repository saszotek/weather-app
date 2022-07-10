import React, { useEffect, useRef } from "react";
import "../../styles/header.scss";

function Header({ setInput, getForecastData, setIsDisplay, setIsLoading }) {
  const inputReference = useRef(null);

  useEffect(() => {
    inputReference.current.focus();
  }, []);

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

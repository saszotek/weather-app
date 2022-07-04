import React, { useState } from "react";
import "../../styles/carddetails.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faCloudRain,
  faSnowflake,
  faWind,
  faRadiation,
  faGauge,
  faWater,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import CardDetailsForecast from "./CardDetailsForecast";

function CardDetails({
  animationClass,
  handleClick,
  weatherForecast,
  weatherDataByHour,
}) {
  // eslint-disable-next-line
  const [numberOfComponents, setNumberOfComponents] = useState(3);

  const convertTime = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  };

  return (
    <div className={`card-details-container ${animationClass} `}>
      <div className="card-details-container__button">
        <button onClick={() => handleClick()}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <div className="card-details-container__box">
        <div className="card-details-container__box__info">
          <p>
            <i>
              <FontAwesomeIcon icon={faSun} />
            </i>
            Sunrise
          </p>
          <p>
            {weatherForecast && convertTime(weatherForecast?.astro?.sunrise)}
          </p>
        </div>
        <div className="card-details-container__box__info">
          <p>
            <i>
              <FontAwesomeIcon icon={faMoon} />
            </i>
            Sunset
          </p>
          <p>
            {weatherForecast && convertTime(weatherForecast?.astro?.sunset)}
          </p>
        </div>
        <div className="card-details-container__box__info">
          <p>
            <i>
              <FontAwesomeIcon icon={faCloudRain} />
            </i>
            Rain
          </p>
          <p>
            {weatherForecast?.day?.daily_chance_of_rain}
            <span>%</span>
          </p>
        </div>
        <div className="card-details-container__box__info">
          <p>
            <i>
              <FontAwesomeIcon icon={faSnowflake} />
            </i>
            Snow
          </p>
          <p>
            {weatherForecast?.day?.daily_chance_of_snow}
            <span>%</span>
          </p>
        </div>
        <div className="card-details-container__box__info">
          <p>
            <i>
              <FontAwesomeIcon icon={faWind} />
            </i>
            Wind
          </p>
          <p>
            {weatherForecast?.day?.maxwind_kph}
            <span>km/h</span>
          </p>
        </div>
        <div className="card-details-container__box__info">
          <p>
            <i>
              <FontAwesomeIcon icon={faGauge} />
            </i>
            Air pressure
          </p>
          <p>
            {weatherDataByHour()?.pressure_mb}
            <span>mb</span>
          </p>
        </div>
        <div className="card-details-container__box__info">
          <p>
            <i>
              <FontAwesomeIcon icon={faWater} />
            </i>
            Humidity
          </p>
          <p>
            {weatherForecast?.day?.avghumidity}
            <span>%</span>
          </p>
        </div>
        <div className="card-details-container__box__info">
          <p>
            <i>
              <FontAwesomeIcon icon={faRadiation} />
            </i>
            UV
          </p>
          <p>{weatherForecast?.day?.uv}</p>
        </div>
      </div>
      <div className="card-details-container__forecast-box">
        {[...Array(numberOfComponents)].map((e, i) => (
          <CardDetailsForecast
            key={i}
            weatherDataByHour={weatherDataByHour}
            iteration={i + 1}
          />
        ))}
      </div>
    </div>
  );
}

export default CardDetails;

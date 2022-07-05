import React, { useState, useEffect, useRef } from "react";
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
  faSkull,
} from "@fortawesome/free-solid-svg-icons";
import CardDetailsForecast from "./CardDetailsForecast";
import { motion } from "framer-motion";

function CardDetails({
  animationClass,
  handleClick,
  weatherData,
  currentWeather,
  whichDay,
  currentEpochTime,
  whatIcon,
}) {
  const [width, setWidth] = useState(0);

  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

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

  // Preparing data (icon, time, temperature) to render forecast for later hours (even going out on the next day)
  // as a Slider Carousel in the bottom of a Details Card View.

  // Because of a free access to the weather's API,
  // had to make workarounds to display forecast's data correctly.

  // Maximum days of forecast for free access is 3 days.
  // Problem occures when component (Card.js) is responsible for displaying a data for a third day
  // and Slider Carousel in the Details Card View wants to display forecast beyond that day.

  // As a workaround I display a Skull icon and text: Forecast No Data to indiciate the problem and solution.
  const setForecastWeather = (index) => {
    if (weatherData === undefined) {
      return null;
    }

    let arr = [];
    let timestamp = currentEpochTime() + 3600 * index;
    let dayCorrection = whichDay + 1;
    let condition = null;
    let thereIsNoDataForecast = false;

    // Assigning a correct unix time based on whether there is data available by API for another day (free access restrictions)
    if (dayCorrection > 2) {
      dayCorrection = 2;
      thereIsNoDataForecast = true;
      condition = weatherData[dayCorrection]?.hour[23]?.time_epoch;
    } else {
      condition = weatherData[dayCorrection]?.hour[0]?.time_epoch;
    }

    // Comparison of current time exceed to the next day
    if (timestamp < condition) {
      // If true then forecast's data is sent normally
      arr.push(whatIcon(currentWeather(whichDay, timestamp)));
      arr.push(currentWeather(whichDay, timestamp)?.time);
      arr.push(currentWeather(whichDay, timestamp)?.temp_c);
      return arr;
    } else {
      // If false then there is another if statement checking whether forecast's data can be accessed for the next day
      // This condition was created solely on API's restrictions for not having data for fourth day.
      if (thereIsNoDataForecast) {
        // Dummy data to display
        arr.push(faSkull);
        arr.push("1934-03-12 Forecast");
        arr.push("No Data");
        return arr;
      }

      // If there is no problem with accessing data for the next day
      // then forecast's data is sent normally
      arr.push(whatIcon(currentWeather(dayCorrection, timestamp)));
      arr.push(currentWeather(dayCorrection, timestamp)?.time);
      arr.push(currentWeather(dayCorrection, timestamp)?.temp_c);
      return arr;
    }
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
            {weatherData && convertTime(weatherData[whichDay]?.astro?.sunrise)}
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
            {weatherData && convertTime(weatherData[whichDay]?.astro?.sunset)}
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
            {weatherData && weatherData[whichDay]?.day?.daily_chance_of_rain}
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
            {weatherData && weatherData[whichDay]?.day?.daily_chance_of_snow}
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
            {weatherData && weatherData[whichDay]?.day?.maxwind_kph}
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
            {weatherData && currentWeather(whichDay)?.pressure_mb}
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
            {weatherData && weatherData[whichDay]?.day?.avghumidity}
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
          <p>{weatherData && weatherData[whichDay]?.day?.uv}</p>
        </div>
      </div>
      <motion.div
        ref={carousel}
        whileTap={{ cursor: "grabbing" }}
        className="card-details-container__carousel"
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="card-details-container__carousel__inner-carousel"
        >
          {[...Array(12)].map((e, i) => (
            <CardDetailsForecast key={i} arrayData={setForecastWeather(i)} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default CardDetails;

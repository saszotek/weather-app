import React, { useState } from "react";
import "../../styles/card.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faLocationDot,
  faAngleDown,
  faSun,
  faCloudSun,
  faCloud,
  faCloudRain,
  faSnowflake,
  faCloudBolt,
  faSmog,
  faSkull,
} from "@fortawesome/free-solid-svg-icons";
import CardDetails from "./CardDetails";
import RainBG from "../../assets/images/rain-bg.jpg";

function Card({ forecastData, whichDay }) {
  const [animateCard, setAnimateCard] = useState(false);

  const location = forecastData?.location;
  const lastUpdatedEpoch = forecastData?.current?.last_updated_epoch;
  const weatherData = forecastData?.forecast?.forecastday;

  const handleClick = () => {
    setAnimateCard(!animateCard);
  };

  // "current" in naming function is relative to the weather's date of Card Component
  // Calculating a proper day to render weather's forecast from
  // 86400 is equal to a whole day in unix time (86400 seconds)
  const currentEpochTime = () => {
    let baseTime = lastUpdatedEpoch;
    let targetTime = baseTime + 86400 * whichDay;

    // Rounding time to a nearest hour
    targetTime = targetTime - (targetTime % 3600);
    return targetTime;
  };

  // Returning current weather's data based on date and hour if necessary
  const currentWeather = (dayNumber, time = currentEpochTime()) => {
    if (weatherData === undefined) {
      return null;
    }

    let dataByHour = weatherData[dayNumber]?.hour;
    for (let i = 0; i < dataByHour.length; i++) {
      if (dataByHour[i].time_epoch === time) {
        return dataByHour[i];
      }
    }
  };

  const whatDayOfWeek = () => {
    let day = new Date(currentEpochTime() * 1000).toLocaleDateString("en-US", {
      weekday: "long",
    });
    return day;
  };

  const whatMonthAndDay = () => {
    let date = new Date(currentEpochTime() * 1000);
    let month = date.toLocaleString("en-US", { month: "long" });
    let day = date.getDate();
    let suffix = "";
    switch (day) {
      case 1:
        suffix = "st";
        break;
      case 2:
        suffix = "nd";
        break;
      case 3:
        suffix = "rd";
        break;
      default:
        suffix = "th";
    }
    return `${month} ${day}${suffix}`;
  };

  // Assigning a proper icon based on API's weather code
  // Not ideal solution, but it is what it is for now
  const whatIcon = (weather) => {
    let weatherCode = weather?.condition.code;

    switch (weatherCode) {
      case 1000:
        return faSun;
      case 1003:
        return faCloudSun;
      case 1006:
      case 1009:
        return faCloud;
      case 1087:
      case 1273:
      case 1276:
        return faCloudBolt;
      case 1030:
      case 1135:
      case 1147:
        return faSmog;
      case 1063:
      case 1150:
      case 1153:
      case 1168:
      case 1171:
      case 1180:
      case 1183:
      case 1186:
      case 1189:
      case 1195:
      case 1198:
      case 1201:
      case 1240:
      case 1243:
      case 1246:
        return faCloudRain;
      case 1066:
      case 1069:
      case 1072:
      case 1114:
      case 1117:
      case 1204:
      case 1207:
      case 1210:
      case 1213:
      case 1216:
      case 1219:
      case 1222:
      case 1225:
      case 1237:
      case 1249:
      case 1252:
      case 1255:
      case 1258:
      case 1261:
      case 1264:
      case 1279:
      case 1282:
        return faSnowflake;
      default:
        return faSkull;
    }
  };

  return (
    <div className="card-container">
      <div className="card-container__weather-details">
        <h1>{weatherData && `${currentWeather(whichDay)?.temp_c}°C`}</h1>
        <h2>
          <span>
            <FontAwesomeIcon icon={whatIcon(currentWeather(whichDay))} />
          </span>
          {weatherData && currentWeather(whichDay)?.condition?.text}
        </h2>
      </div>
      <div className="card-container__location-details">
        <h3>{weatherData && whatDayOfWeek()}</h3>
        <h3>
          <span>
            <FontAwesomeIcon icon={faCalendar} />
          </span>
          {weatherData && whatMonthAndDay()}
        </h3>
        <h3>
          <span>
            <FontAwesomeIcon icon={faLocationDot} />
          </span>
          {weatherData && `${location?.name}, ${location?.country}`}
        </h3>
      </div>
      <div className="card-container__image-background">
        <img src={RainBG} alt="Rain" />
      </div>
      <div className="card-container__button">
        <button onClick={() => handleClick()}>
          <FontAwesomeIcon icon={faAngleDown} />
        </button>
      </div>
      <CardDetails
        animationClass={
          animateCard
            ? "card-details-container__animation-start"
            : "card-details-container__animation-end"
        }
        handleClick={handleClick}
        weatherData={weatherData}
        currentWeather={currentWeather}
        whichDay={whichDay}
        currentEpochTime={currentEpochTime}
        whatIcon={whatIcon}
      />
    </div>
  );
}

export default Card;

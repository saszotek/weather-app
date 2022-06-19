import React, { useContext } from "react";
import "../../styles/carddetailsforecast.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconContext } from "./Card";

function CardDetailsForecast({ whatHour, weatherDataByHour, iteration }) {
  const whatIcon = useContext(IconContext);

  return (
    <div className="card-details-container__forecast-box__details">
      <div>
        <FontAwesomeIcon icon={whatIcon(weatherDataByHour())} />
      </div>
      <p>{whatHour() + iteration}:00</p>
      <p>{weatherDataByHour(iteration)?.temp_c}°C</p>
    </div>
  );
}

export default CardDetailsForecast;

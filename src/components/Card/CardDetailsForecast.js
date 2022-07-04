import React, { useContext } from "react";
import "../../styles/carddetailsforecast.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HourContext, IconContext } from "./Card";

function CardDetailsForecast({ weatherDataByHour, iteration }) {
  const whatIcon = useContext(IconContext);
  const whatHour = useContext(HourContext);

  const correctHour = () => {
    let hours = whatHour() + iteration;
    if (hours >= 24) {
      return (hours -= 24);
    }
    return hours;
  };

  return (
    <div className="card-details-container__carousel__inner-carousel_details">
      <div>
        <FontAwesomeIcon icon={whatIcon(weatherDataByHour())} />
      </div>
      <p>{correctHour()}:00</p>
      <p>{weatherDataByHour(iteration)?.temp_c}°C</p>
    </div>
  );
}

export default CardDetailsForecast;

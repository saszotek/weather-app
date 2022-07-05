import React from "react";
import "../../styles/carddetailsforecast.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CardDetailsForecast({ arrayData }) {
  // Data from API comes like this: 2022-07-05 13:37
  // Extracting only time by splitting
  const getExactTime = (text) => {
    if (text === undefined) {
      return null;
    }

    const arrDate = text.split(" ");
    return arrDate[1];
  };

  return (
    <div className="card-details-container__carousel__inner-carousel_details">
      <div>{arrayData && <FontAwesomeIcon icon={arrayData[0]} />}</div>
      <p>{arrayData && getExactTime(arrayData[1])}</p>
      <p>{arrayData && `${arrayData[2]}°C`}</p>
    </div>
  );
}

export default CardDetailsForecast;

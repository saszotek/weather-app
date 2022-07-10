import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/loader.scss";
import icons from "../../assets/icons/icons";

function Loader() {
  return (
    <div className="loader-container">
      <span>
        <FontAwesomeIcon icon={icons.faSun}></FontAwesomeIcon>
      </span>
    </div>
  );
}

export default Loader;

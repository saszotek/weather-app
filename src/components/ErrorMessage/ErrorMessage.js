import React from "react";
import "../../styles/errormessage.scss";

function ErrorMessage({ message }) {
  return (
    message && (
      <div className="error-message-container">
        <div className="error-message-container__info-box">
          <h2>{message}</h2>
        </div>
      </div>
    )
  );
}

export default ErrorMessage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/dashboard.scss";
import Card from "../Card/Card";
import Header from "../Header/Header";
import { serverURL } from "../../api/main";

function Dashboard() {
  const [forecastData, setForecastData] = useState([]);

  // Requesting weather's data
  useEffect(() => {
    axios
      .get(`${serverURL}&q=Katowice&days=3&aqi=yes&alerts=no`)
      .then((response) => {
        setForecastData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="header">
        <Header />
      </div>
      <div className="card-list">
        <Card forecastData={forecastData} whichDay={0} />
        <Card forecastData={forecastData} whichDay={1} />
        <Card forecastData={forecastData} whichDay={2} />
      </div>
    </div>
  );
}

export default Dashboard;

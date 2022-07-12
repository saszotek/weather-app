import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "../../styles/dashboard.scss";
import Header from "../Header/Header";
import Card from "../Card/Card";
import Loader from "../Loader/Loader";

function Dashboard() {
  const [forecastData, setForecastData] = useState([]);
  const [width, setWidth] = useState(0);
  const [isDisplay, setIsDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const carousel = useRef();

  useEffect(() => {
    if (isLoading) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [isLoading]);

  return (
    <div className="dashboard-container">
      <div className="header">
        <Header
          setForecastData={setForecastData}
          setIsDisplay={setIsDisplay}
          setIsLoading={setIsLoading}
        />
      </div>
      {isDisplay &&
        (isLoading ? (
          <motion.div
            ref={carousel}
            whileTap={{ cursor: "grabbing" }}
            className="dashboard-container__carousel"
          >
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              className="dashboard-container__carousel__inner-carousel"
            >
              {[...Array(3)].map((e, i) => (
                <Card key={i} forecastData={forecastData} whichDay={i} />
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <Loader />
        ))}
    </div>
  );
}

export default Dashboard;

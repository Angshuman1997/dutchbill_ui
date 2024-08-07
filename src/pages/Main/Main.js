import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import AuthComponent from "../../components/AuthComponent/AuthComponent";
import Image1 from "../../images/friends-bill-1.svg";
import Image2 from "../../images/friends-bill-2.svg";
import Image3 from "../../images/friends-bill-3.svg";
import "./Main.css";
import Header from "../../components/Header/Header";
import Dashboard from "../Dashboard/Dashboard";

const images = [Image1, Image2, Image3];

const Main = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleLoggedIn = () =>{
    setLogged(true);
  };

  return (
    <Box
      display="flex"
      height="100vh"
      width="100vw"
      bgcolor="#1050bf"
      overflow="hidden"
      flexDirection="column"
    >
      <div className="header">
        <Header />
      </div>
      {logged ? (
        <Dashboard />
      ) : (
        <div className="main">
          <Box
            flex={7}
            display="flex"
            justifyContent="center"
            alignItems="center"
            overflow="hidden"
          >
            <div className="image-wrapper">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Illustration ${index + 1}`}
                  className={`image ${
                    index === currentImageIndex ? "image-visible" : ""
                  }`}
                />
              ))}
            </div>
          </Box>
          <Box
            flex={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <AuthComponent handleLoggedIn={handleLoggedIn}/>
          </Box>
        </div>
      )}
    </Box>
  );
};

export default Main;

import React, { useState, useEffect } from "react";
import Image1 from "../../images/friends-bill-1.svg";
import Image2 from "../../images/friends-bill-2.svg";
import Image3 from "../../images/friends-bill-3.svg";
import { Box } from "@mui/material";
import "./Main.css";
import Header from "../../components/Header/Header";

const images = [Image1, Image2, Image3];

const Main = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100%"
      overflow="hidden" 
      sx={{ margin: 0, padding: 0 }}
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        zIndex={10} 
      >
        <Header />
      </Box>

      {images.map((image, index) => (
        <Box
          key={index}
          component="img"
          src={image}
          alt={`Illustration ${index + 1}`}
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            opacity: index === currentImageIndex ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            zIndex: index === currentImageIndex ? 1 : 0, 
            top: 0,
            left: 0,
          }}
        />
      ))}
    </Box>
  );
};

export default Main;

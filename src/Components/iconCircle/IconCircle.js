import React, { useState, useEffect } from "react";
import {
  Description,
  Fullscreen,
  VideoLibrary,
  LiveTv,
} from "@mui/icons-material";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const CircleIcons = () => {
  const iconsData = [
    { icon: <Description />, label: "Doc", color: "#13a3b5" },
    { icon: <Fullscreen />, label: "Presentation", color: "#0ba84a" },
    { icon: <VideoLibrary />, label: "Video", color: "#ff6105" },
    { icon: <LiveTv />, label: "Social Media", color: "#ff3b4b" },
    { icon: <Description />, label: "Doc", color: "#e950f7" },
    { icon: <VideoLibrary />, label: "Video", color: "#ff3b4b" },
    { icon: <VideoLibrary />, label: "Video", color: "#13a3b5" },
    { icon: <VideoLibrary />, label: "Video", color: "#ff3b4b" },
    { icon: <VideoLibrary />, label: "Video", color: "#13a3b5" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(5);
  const [isMoving, setIsMoving] = useState(false);

  // Update itemsToShow based on screen width
  useEffect(() => {
    const updateItemsToShow = () => {
      const width = window.innerWidth;
      if (width >= 1200) setItemsToShow(8);
      else if (width >= 900) setItemsToShow(5);
      else if (width >= 600) setItemsToShow(4);
      else if (width >= 400) setItemsToShow(4);
      else setItemsToShow(3); // For screens smaller than 400px
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  const handleForward = () => {
    if (!isMoving && currentIndex + itemsToShow < iconsData.length) {
      setIsMoving(true);
      setCurrentIndex((prev) => prev + 1);
      setTimeout(() => setIsMoving(false), 100);
    }
  };

  const handleBackward = () => {
    if (!isMoving && currentIndex > 0) {
      setIsMoving(true);
      setCurrentIndex((prev) => prev - 1);
      setTimeout(() => setIsMoving(false), 100);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        paddingX={2}
      >
        {/* Backward button */}
        {currentIndex > 0 && (
          <IconButton onClick={handleBackward} disabled={isMoving}>
            <ArrowBack />
          </IconButton>
        )}

        {/* Render icons and labels based on currentIndex */}
        {iconsData
          .slice(currentIndex, currentIndex + itemsToShow)
          .map(({ icon, color, label }, index) => (
            <Box
              key={index}
              display="flex"
              flexDirection="column"
              alignItems="center"
              mx={0.5}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                position="relative"
                onMouseEnter={(e) => {
                  e.currentTarget.querySelector(
                    ".create-new"
                  ).style.opacity = 1;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.querySelector(
                    ".create-new"
                  ).style.opacity = 0;
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width={50}
                  height={50}
                  borderRadius="50%"
                  bgcolor={color}
                  position="relative"
                  sx={{
                    transition: "transform 0.3s",
                    mb: 0.5,
                    "&:hover": {
                      transform: "scale(1.1) translateY(-5px)",
                    },
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontSize: 24,
                      transition: "transform 0.3s",
                    }}
                  >
                    {icon}
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  textAlign="center"
                  sx={{
                    fontSize: { xs: "0.65rem", sm: "0.75rem" },
                    whiteSpace: "nowrap",
                    color: "grey",
                  }}
                >
                  {label}
                </Typography>
                <Typography
                  className="create-new"
                  variant="caption"
                  textAlign="center"
                  sx={{
                    opacity: 0,
                    transition: "opacity 0.3s",
                    mt: 1,
                    position: "absolute",
                    top: 60,
                    whiteSpace: "nowrap",
                    color: "grey",
                  }}
                >
                  Create New
                </Typography>
              </Box>
            </Box>
          ))}

        {/* Forward button */}
        {currentIndex + itemsToShow < iconsData.length && (
          <IconButton onClick={handleForward} disabled={isMoving}>
            <ArrowForward />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default CircleIcons;

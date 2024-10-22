import React, { useState, useEffect } from "react";
import {
  Description,
  Fullscreen,
  VideoLibrary,
  LiveTv,
} from "@mui/icons-material";
import { Box, Typography, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const CircleIcons = ({ itemsToShow }) => { // Accept itemsToShow as a prop
  const iconsData = [
    { icon: <Description />, label: "Doc", color: "#13a3b5" },
    { icon: <Fullscreen />, label: "Presentation", color: "#0ba84a" },
    { icon: <VideoLibrary />, label: "Video", color: "#ff6105" },
    { icon: <LiveTv />, label: "Social Media", color: "#ff3b4b" },
    { icon: <Description />, label: "Doc", color: "#e950f7" },
    { icon: <VideoLibrary />, label: "Video", color: "#ff3b4b" },
    { icon: <Fullscreen />, label: "Video", color: "#13a3b5" },
    { icon: <Description />, label: "Video", color: "#ff3b4b" },
    { icon: <LiveTv />, label: "Video", color: "#13a3b5" },
    { icon: <Fullscreen />, label: "Video", color: "#ff6105" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

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
        alignItems="center"
        width="100%"
        px={2}
      >
        {currentIndex > 0 && (
          <IconButton onClick={handleBackward} disabled={isMoving}>
            <ArrowBack />
          </IconButton>
        )}

        <Box display="flex" justifyContent="center" width="100%">
          {iconsData
            .slice(currentIndex, currentIndex + itemsToShow)
            .map(({ icon, color, label }, index) => (
              <Box
                key={index}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                mx={1.5}
                sx={{ position: "relative", cursor: "pointer" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.querySelector(".create-new").style.opacity =
                    1)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.querySelector(".create-new").style.opacity =
                    0)
                }
              >
                {/* Circle Icon */}
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width={60}
                  height={60}
                  borderRadius="50%"
                  bgcolor={color}
                  sx={{
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.1) translateY(-5px)",
                    },
                  }}
                >
                  <Box component="span" sx={{ fontSize: 30, color: "white" }}>
                    {icon}
                  </Box>
                </Box>

                {/* Label */}
                <Typography
                  variant="body2"
                  textAlign="center"
                  sx={{
                    fontSize: { xs: "0.7rem", sm: "0.85rem" },
                    color: "grey",
                    mt: 0.5,
                  }}
                >
                  {label}
                </Typography>

                {/* "Create New" Label */}
                <Typography
                  className="create-new"
                  variant="caption"
                  textAlign="center"
                  sx={{
                    opacity: 0,
                    transition: "opacity 0.3s",
                    position: "absolute",
                    top: "100%", // Position below the label
                    margin: "1px 0 ",
                    whiteSpace: "nowrap",
                    color: "grey",
                  }}
                >
                  Create New
                </Typography>
              </Box>
            ))}
        </Box>

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

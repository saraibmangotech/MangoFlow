import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import IconCircle from "../Components/iconCircle/IconCircle";
import RecentDesign from "../Components/recentDesigns/RecentDesign";
import AddIcon from "@mui/icons-material/Add";
import NewDesignPopup from "../Components/newDesign/NewDesignPopup";
import SideBar from "../Components/sideBar";
import ProfileAvatar from "../Components/profileAvatar/ProfileAvatar";
import CircleIcons from "../Components/iconCircle/IconCircle"; // Import CircleIcons

const Home = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(5); // Default number of icons to show

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // Effect to adjust itemsToShow based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) {
        setItemsToShow(10); // Show 10 items if screen width > 1200px
      } else if(window.innerWidth > 900) {
        setItemsToShow(6); // Default for smaller screens
      }
      else if(window.innerWidth > 800) {
        setItemsToShow(4); 
    }else if(window.innerWidth > 500) {
      setItemsToShow(3); 
    }
    else if(window.innerWidth > 350) {
      setItemsToShow(2); 
    }
  };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Left Sidebar (only visible on larger screens) */}
      <Box sx={{ display: { xs: "none", sm: "block" }, width: "200px" }}>
        <SideBar />
      </Box>

      {/* Main Scrollable Container */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "10px",
          boxSizing: "border-box",
          width: { xs: "100%", sm: "calc(100% - 200px)" },
          backgroundColor: "rgba(139, 61, 255, .1)",
        }}
      >
        {/* Bordered Box that contains content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            border: "2px solid #ddd", // Light gray border
            borderRadius: "16px", // Rounded corners
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
            backgroundColor: "#fff", // White background for better visibility
            boxSizing: "border-box",
            width: "100%", // Full width of the main container
            minHeight: {
              xs: "800px",
              sm: "1000px",
              md: "1950px",
              xl: "2000px",
            }, // Responsive minimum height
            overflow: "hidden", // Scroll if content exceeds the card height
          }}
        >
          <ProfileAvatar />

          {/* Square Box with Gradient Background */}
          <Box
            sx={{
              width: "100%",
              background: `
                radial-gradient(100.99% 100.73% at 0% 0%, rgba(0, 196, 204, .726) 0%, #00c4cc 0.01%, rgba(0, 196, 204, 0) 100%),
                radial-gradient(68.47% 129.02% at 22.82% 97.71%, #6420ff 0%, rgba(100, 32, 255, 0) 100%),
                radial-gradient(106.1% 249.18% at 0% 0%, #00c4cc 0%, rgba(0, 196, 204, 0) 100%),
                radial-gradient(64.14% 115.13% at 5.49% 50%, #6420ff 0%, rgba(100, 32, 255, 0) 100%),
                #7d2ae7`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4rem",
              borderRadius: 2,
              boxSizing: "border-box",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: {
                  xs: "1.5rem",
                  sm: "1.75rem",
                  md: "2rem",
                  lg: "2.25rem",
                },
                padding: "90px",
                textAlign: "center",
              }}
            >
              Droptober is coming
            </Typography>
          </Box>

          {/* IconCircle Component */}
          <Box>
            <CircleIcons itemsToShow={itemsToShow} /> {/* Pass itemsToShow */}
          </Box>

          {/* Create New Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 3,
              marginBottom: 3,
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#7731d8",
                color: "white",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#5e24a6",
                },
              }}
              startIcon={<AddIcon />}
              onClick={handleOpenPopup}
            >
              Create a Design
            </Button>
          </Box>

          {/* Recent Designs Section */}
          <Box
            sx={{
              overflowY: "auto",
              marginBottom: 2,
            }}
          >
            <RecentDesign height="100%" top="40%" left="32%" />
          </Box>

          {/* Design Popup */}
          <NewDesignPopup open={isPopupOpen} onClose={handleClosePopup} />
        </Box>
      </Box>

      {/* Left Sidebar (now below the main content on small screens) */}
      <Box sx={{ display: { xs: "block", sm: "none" }, width: "100%" }}>
        <SideBar />
      </Box>
    </Box>
  );
};

export default Home;

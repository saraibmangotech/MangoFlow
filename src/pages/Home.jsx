import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import RecentDesign from "../Components/recentDesigns/RecentDesign";
import AddIcon from "@mui/icons-material/Add";
import NewDesignPopup from "../Components/newDesign/NewDesignPopup";
import SideBar from "../Components/sideBar";
import ProfileAvatar from "../Components/profileAvatar/ProfileAvatar";
import CircleIcons from "../Components/iconCircle/IconCircle";

const Home = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(5);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  // Effect to adjust itemsToShow based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1400) setItemsToShow(10);
      else if (window.innerWidth > 1100) setItemsToShow(6);
      else if (window.innerWidth > 900) setItemsToShow(4);
      else if (window.innerWidth > 750) setItemsToShow(3);
      else if (window.innerWidth > 350) setItemsToShow(2);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "rgba(139, 61, 255, 0.1)",
      }}
    >
      {/* Sidebar on the left side */}
      <Box sx={{ display: { xs: "none", sm: "block" }, width: "200px" }}>
        <SideBar />
      </Box>

      {/* Main Scrollable Container */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "5px",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "flex-end", // Align to the right
          
          
        }}
      >
        {/* Bordered Box with */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding:"5px 20px",
            border: "2px solid #ddd",
            borderRadius: "16px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            boxSizing: "border-box",
            width: { xs: "100%", sm: "85%", md: "84%", lg: "88%", xl: "90%" }, 
            minHeight: {
              xs: "800px",
              sm: "1000px",
              md: "1950px",
              xl: "2000px",
            },
            overflow: "hidden",
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
            <CircleIcons itemsToShow={itemsToShow} />
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

      {/* Sidebar for small screens */}
      <Box sx={{ display: { xs: "block", sm: "none" }, width: "100%" }}>
        <SideBar />
      </Box>
    </Box>
  );
};

export default Home;

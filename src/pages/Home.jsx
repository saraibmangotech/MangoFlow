import React, { useState } from "react";

import { Box, Typography, Button } from "@mui/material";
import IconCircle from "../Components/iconCircle/IconCircle";
import RecentDesign from "../Components/recentDesigns/RecentDesign";
import AddIcon from "@mui/icons-material/Add";
import NewDesignPopup from "../Components/newDesign/NewDesignPopup";

import SideBar from "../Components/sideBar";
import ProfileAvatar from "../Components/profileAvatar/ProfileAvatar";

const Home = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Left Sidebar */}
      <SideBar />

      {/* Main Content (Search Component and Square Box) */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          padding: "10px 20px",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <ProfileAvatar />
        {/* Square Box with Gradient Background */}
        <Box
          sx={{
            width: "100%",
            height: { xs: "250px", sm: "300px", md: "350px", lg: "400px" },
            background: `
              radial-gradient(100.99% 100.73% at 0% 0%, rgba(0, 196, 204, .726) 0%, #00c4cc 0.01%, rgba(0, 196, 204, 0) 100%),
              radial-gradient(68.47% 129.02% at 22.82% 97.71%, #6420ff 0%, rgba(100, 32, 255, 0) 100%),
              radial-gradient(106.1% 249.18% at 0% 0%, #00c4cc 0%, rgba(0, 196, 204, 0) 100%),
              radial-gradient(64.14% 115.13% at 5.49% 50%, #6420ff 0%, rgba(100, 32, 255, 0) 100%),
              #7d2ae7`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 1,
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
              textAlign: "center",
            }}
          >
            Droptober is coming
          </Typography>
        </Box>
        {/* Other Components */}
        <Box>
          <IconCircle />
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
        {/* Recent Designs */}
        <Box>
          <RecentDesign height="400px" top="40%" left="32%" />
        </Box>
        {/* Design Popup */}
        <NewDesignPopup open={isPopupOpen} onClose={handleClosePopup} />
      </Box>
    </Box>
  );
};

export default Home;

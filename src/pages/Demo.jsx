import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../Images/logo.png";
import pic1 from "../Images/pic1.jpg";
import pic2 from "../Images/pic2.jpg";
import pic3 from "../Images/pic3.jpg";
import { Link } from "react-router-dom";
import { LuNotepadText } from "react-icons/lu";
import { CiChat1 } from "react-icons/ci";
import { MdOutlineAttachEmail } from "react-icons/md";
import { MdOutlineBadge } from "react-icons/md";

const Demo = () => {
  const [menuAnchor, setMenuAnchor] = React.useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const features = [
    {
      icon: <LuNotepadText />, // Using the LuNotepadText icon
      heading: "Project Workspaces",
      description:
        "Lorem ipsum dolor sit amet, eam ex probo tation tractatos. Ut vel hinc solet tincidunt, nec et iisque placerat pertinax.",
    },
    {
      icon: <CiChat1 />, // Example Icon
      heading: "Team Chat",
      description:
        "Lorem ipsum dolor sit amet, eam ex probo tation tractatos. Ut vel hinc solet tincidunt, nec et iisque placerat pertinax.",
    },
    {
      icon: <MdOutlineAttachEmail />, // Example Icon
      heading: "Unlimited attachments",
      description:
        "Lorem ipsum dolor sit amet, eam ex probo tation tractatos. Ut vel hinc solet tincidunt, nec et iisque placerat pertinax.",
    },
    {
      icon: <MdOutlineBadge />, // Example Icon
      heading: "Strong security",
      description:
        "Lorem ipsum dolor sit amet, eam ex probo tation tractatos. Ut vel hinc solet tincidunt, nec et iisque placerat pertinax.",
    },
  ];

  return (
    <>
      {/* Global styles to ensure no overflow */}
      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            overflow-x: hidden; /* Prevent horizontal scroll */
          }
        `}
      </style>

      <AppBar
        position="static"
        sx={{
          backgroundColor: "#f5f6fa",
          boxShadow: "none",
          color: "#4a4a4a",
          width: "100%",
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
          overflowX: "hidden",
        }}
      >
        <Toolbar
          sx={{
            flexDirection: "row",
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ flexGrow: 0, width: 100, height: 60 }}
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 2 }}>
            <IconButton
              edge="start"
              sx={{ color: "#4a4a4a" }}
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Link 1</MenuItem>
              <MenuItem onClick={handleMenuClose}>Link 2</MenuItem>
              <MenuItem onClick={handleMenuClose}>Link 3</MenuItem>
            </Menu>

            <Button sx={{ color: "#4a4a4a", textTransform: "none" }}>
              Features
            </Button>
            <Button sx={{ color: "#4a4a4a", textTransform: "none" }}>
              Pricing
            </Button>
            <Button sx={{ color: "#4a4a4a", textTransform: "none" }}>
              Login
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Link>
            <Button
              variant="contained"
              sx={{
                padding: "10px 40px",
                backgroundColor: "transparent",
                borderRadius: "40px",
                boxShadow: "none",
                border: "2px solid #837fcb",
                color: "#837fcb",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#837fcb",
                  color: "white",
                },
              }}
            >
              Demo
            </Button>
          </Link>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          px: 5,
          backgroundColor: "#f5f6fa",
          py: 14,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ flexDirection: "row", width: "100%", maxWidth: "1200px" }}>
          <Grid container spacing={8}>
            <Grid item xs={12} md={5} sx={{ mt: 12 }}>
              <Box
                sx={{
                  backgroundColor: "white",
                  padding: 1,
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #e5e5e5",
                  borderRadius: "8px",
                  gap: 1,
                  width: "80%",
                  mb: "20px",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#837fcb",
                    color: "white",
                    textTransform: "none",
                    padding: "6px 6px",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  New Update
                </Box>
                <Typography
                  sx={{
                    flexGrow: 1,
                    color: "#8e9baf",
                    fontSize: "12px",
                  }}
                >
                  Check out the newest features
                </Typography>
              </Box>
              <Typography
                variant="h1"
                sx={{
                  fontSize: "3rem",
                  color: "#444f60",
                  fontWeight: "bold",
                  lineHeight: 1.3,
                  pb: "5px",
                }}
              >
                Get Into Business.
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "0.9rem",
                  color: "#8E9BAF",
                  lineHeight: 1.3,
                }}
              >
                Take control over your business by deploying an all-in-one
                business data monitoring solution.
              </Typography>
              <Box
                sx={{
                  backgroundColor: "white",
                  padding: 1,
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #e5e5e5",
                  borderRadius: "40px",
                  gap: 1,
                  width: "90%",
                  my: "20px",
                }}
              >
                <input
                  type="text"
                  placeholder="Your email address"
                  style={{
                    border: "none",
                    outline: "none",
                    flex: 1,
                    fontSize: "13px",
                    color: "#8e9baf",
                    padding: "10px",
                    borderRadius: "40px",
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#837fcb",
                    color: "white",
                    textTransform: "none",
                    padding: "8px 30px",
                    borderRadius: "40px",
                    fontSize: "13px",
                    fontWeight: "bold",
                    ml: "2px",
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2, // Space between the images
                  height: "100%",
                }}
              >
                {/* First Image */}
                <img
                  src={pic1} // Replace with your image URL
                  alt="Business 1"
                  style={{
                    borderRadius: "50rem",
                    height: "100%", // Adjusted height
                    width: "28%", // Adjusted width
                    objectFit: "cover",
                  }}
                />

                {/* Middle Image */}
                <img
                  src={pic2} // Replace with your image URL
                  alt="Business 2"
                  style={{
                    borderRadius: "50rem",
                    height: "130%", // Slightly taller than others
                    width: "28%", // Adjusted width
                    objectFit: "cover",
                  }}
                />

                {/* Third Image */}
                <img
                  src={pic3} // Replace with your image URL
                  alt="Business 3"
                  style={{
                    borderRadius: "50rem",
                    height: "100%", // Adjusted height
                    width: "28%", // Adjusted width
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 15,
          flexDirection: "column", // Ensure stacking of sections
        }}
      >
        {/* Row 1: "PM Made Simple" */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "1200px",
            mb: 10, // Margin below first row
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              position: "relative",
            }}
          >
            {/* Background Text */}
            <Typography
              sx={{
                position: "absolute",
                textAlign: "center",
                fontWeight: "bolder",
                top: "-70px",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                fontSize: "160px",
                zIndex: 0,
                opacity: 0.1,
                color: "#999",
              }}
            >
              1
            </Typography>

            {/* Heading */}
            <Typography
              variant="h2"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                zIndex: 1,
                marginBottom: 1,
                fontSize: "2.7rem",
                color: "#444f60",
              }}
            >
              PM made Simple
            </Typography>

            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: "#555",
                zIndex: 1,
                maxWidth: "800px",
                fontWeight: 300,
                fontSize: "1.2rem",
                color: "#999",
              }}
            >
              Discover a seamless experience in Project Management
            </Typography>

            {/* Row 2: "Some New Tools" Content */}
            <Grid container spacing={8} sx={{ py: 15 }}>
              {/* Column Content for "Some New Tools" */}
              <Grid
                item
                xs={12}
                md={5}
                sx={{
                  alignContent: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                    mb: 2, // Space below heading
                    color: "#444f60",
                  }}
                >
                  Some New Tools
                </Typography>
                <Box
                  sx={{
                    height: "5px",
                    backgroundColor: "#837fcb",
                    width:"20%",
                    mb: 2, 
                    borderRadius:"20px"
                  }}
                />{" "}
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1rem",
                    color: "#4A4A4A",
                    mb: 2, // Space below paragraph
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent dapibus elit at nisi fermentum, nec ullamcorper
                  turpis vulputate.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1rem",
                    color: "#4A4A4A",
                  }}
                >
                  Donec sollicitudin ligula vel orci tempor, in pharetra massa
                  aliquet. Pellentesque habitant morbi tristique senectus et
                  netus et malesuada.
                </Typography>
              </Grid>

              {/* Grid for Icons and Content */}
              <Grid container spacing={3} item xs={12} md={7}>
                {features.map((feature, index) => (
                  <Grid item xs={6} key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column", // Arrange content vertically
                        alignItems: "flex-start",
                        mb: 1, // Margin below each row
                      }}
                    >
                      {/* Icon */}
                      <Box
                        sx={{
                          fontSize: "3.4rem", // Increased font size
                          color: "#837fcb",
                          // Space below icon
                          //   mr:20, // Align icon to the left
                        }}
                      >
                        {feature.icon}
                      </Box>

                      {/* Content */}
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "600",
                            color: "#444f60",
                            fontSize: "17px",
                            mb: 1, // Space below heading
                          }}
                        >
                          {feature.heading}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "14px",
                            color: "#a9abac",
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Demo;

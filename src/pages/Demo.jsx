import React, { useState, useEffect } from "react";
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
  TextField,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../Images/logo.png";
import pic1 from "../Images/pic1.jpg";
import pic2 from "../Images/pic2.jpg";
import pic3 from "../Images/pic3.jpg";
import wavyDark from "../Images/wavy-dark.png";
import profile1 from "../Images/profile1.jpg";
import profile2 from "../Images/profile2.jpg";
import profile3 from "../Images/profile3.png";
import demoExperience from "../Images/demo-experience.webp";
import secureContent from "../Images/secure-content.webp";
import manageProjects from "../Images/manage-projects.webp";
import attachFiles from "../Images/attach-files.webp";
import gutWork from "../Images/gutwork.png";
import phaseKit from "../Images/phasekit.png";
import grubspot from "../Images/grubspot.png";
import taskbot from "../Images/taskbot.png";
import systek from "../Images/systek.png";
import { Link, useNavigate } from "react-router-dom";
import { LuNotepadText } from "react-icons/lu";
import { CiChat1 } from "react-icons/ci";
import { MdOutlineAttachEmail } from "react-icons/md";
import { MdOutlineBadge } from "react-icons/md";
import { LuCalendarRange } from "react-icons/lu";
import { IoCloudUploadOutline } from "react-icons/io5";
import { GrSecure } from "react-icons/gr";
import { LiaWalletSolid } from "react-icons/lia";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { MdOndemandVideo } from "react-icons/md";
import { MdApartment } from "react-icons/md";
import SwipeableViews from "react-swipeable-views";
import { Avatar, Slider, CircularProgress } from "@mui/material";
import useAuth from "../hooks/useProvideAuth";

const Demo = () => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchor(null);
  };
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const { user } = useAuth();
  console.log(user);
  const navigate = useNavigate();

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

  const images = [
    { src: gutWork, alt: "Pic 1" },
    { src: phaseKit, alt: "Pic 2" },
    { src: grubspot, alt: "Pic 3" },
    { src: taskbot, alt: "Pic 4" },
    { src: systek, alt: "Pic 5" },
    { src: gutWork, alt: "Pic 6" },
    { src: gutWork, alt: "Pic 7" },
    { src: gutWork, alt: "Pic 8" },
    { src: gutWork, alt: "Pic 9" },
    { src: gutWork, alt: "Pic 10" },
    { src: gutWork, alt: "Pic 11" },
    { src: gutWork, alt: "Pic 12" },
    { src: gutWork, alt: "Pic 13" },
    { src: gutWork, alt: "Pic 14" },
    { src: gutWork, alt: "Pic 15" },
  ];

  const sliderData = [
    {
      id: 1,
      name: "John Doe",
      description: "Lorem ipsum dolor sit amet.",
      avatar: profile1,
      bio: "lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    },
    {
      id: 2,
      name: "Jane Smith",
      description: "Consectetur adipiscing elit.",
      avatar: profile2,
      bio: " when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    },
    {
      id: 3,
      name: "Alice Johnson",
      description: "Sed do eiusmod tempor incididunt.",
      avatar: profile3,
      bio: "Took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(
    () => {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
      }, 3000);
      return () => clearInterval(interval);
    }, // Cleanup interval on component unmount },
    [sliderData.length]
  );

  const handleChangeIndex = (index) => {
    setActiveIndex(index);
  };

  const handleNavigate = () => {
    console.log(user);
    if (user?.token) {
      console.log('asasddas')
      navigate("/home");
    } else {
      navigate("/login");
    }
  };
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
        position="fixed"
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
            maxWidth: { lg: "1200px", md: "1000px" },
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ flexGrow: 0, width: 100, height: 60 }}
          />

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 1,
              ml: 2,
            }}
          >
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
          {/* <Link to="/login" > */}
          <Button
            variant="contained"
            sx={{
              padding: "10px 40px",
              backgroundColor: "transparent",
              textDecoration: "none",
              borderRadius: "40px",
              boxShadow: "none",
              border: "3px solid #837fcb",
              color: "#837fcb",
              fontWeight: "bold",
              "@media (max-width: 600px)": {
                /* Media query for responsiveness */ display: "none",
                padding: "8px 30px",
              },
              "&:hover": {
                backgroundColor: "#837fcb",
                color: "white",
              },
            }}
            onClick={handleNavigate}
          >
            Demo
          </Button>
          {/* </Link> */}

          <Box sx={{ display: { xs: "flex", sm: "none" } }}>
            <IconButton
              edge="start"
              sx={{ color: "#4a4a4a" }}
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={handleDrawerToggle}
              sx={{ width: "80%" }}
            >
              <List>
                <ListItem button onClick={handleMenuClose}>
                  <ListItemText primary="Features" />
                </ListItem>
                <ListItem button onClick={handleMenuClose}>
                  <ListItemText primary="Pricing" />
                </ListItem>
                <ListItem button onClick={handleMenuClose}>
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem button onClick={handleMenuClose}>
                  {/* <Link to="/login"> */}
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
                    onClick={handleNavigate}
                  >
                    Demo
                  </Button>
                  {/* </Link> */}
                </ListItem>
              </List>
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          backgroundColor: "#f5f6fa",
          pt: { md: 14, xs: 2 },
          pb: { xs: 14 },
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container
          sx={{
            flexDirection: "row",
            width: "100%",
            maxWidth: { lg: "1200px", md: "1050px" },
          }}
        >
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
                  width: "95",

                  margin: { xs: "0 auto 20px auto" },
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
                className="main-text"
                variant="h1"
                sx={{
                  fontSize: "3rem",
                  color: "#444f60",
                  fontWeight: "600 !important",
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
                  fontWeight: "none",
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
                  width: "95%",

                  margin: { xs: "20px auto 20px auto" },
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
                    display: { xs: "none", sm: "block" },
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
              <Button
                variant="contained"
                sx={{
                  width: "95%",
                  display: { xs: "block", sm: "none" },
                  backgroundColor: "#837fcb",
                  color: "white",
                  textTransform: "none",
                  padding: "15px 30px",
                  borderRadius: "40px",
                  fontSize: "13px",
                  fontWeight: "bold",
                  ml: "2px",
                  margin: { xs: "20px auto 20px auto" },
                }}
              >
                Sign Up
              </Button>
            </Grid>

            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2, // Space between the images
                  height: "100%",
                  pt: 3,
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
        </Container>
      </Box>

      <Container
        sx={{
          width: { md: "90%", xs: "100%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 12,
          flexDirection: "column", // Ensure stacking of sections
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
            className="main-text"
            sx={{
              position: "absolute",
              textAlign: "center",
              fontWeight: "bolder",

              top: "-100px",
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
            className="main-text"
            variant="h2"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              zIndex: 1,
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
              color: "#",
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
          <Grid container spacing={6} sx={{ py: 15, px: "10px" }}>
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
                className="main-text"
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
                  width: "20%",
                  mb: 2,
                  borderRadius: "20px",
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
                Lorem ipsum dolor sit amet, eam ex probo tation tractatos. Ut
                vel hinc solet tincidunt, nec et iisque placerat pertinax. Ei
                minim probatus mea. Vide movet ad vis, eum at percipitur
                temporibus signiferumque.
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: "1rem",
                  color: "#4A4A4A",
                }}
              >
                Timeam adipisci mei ei, vis ut nulla urbanitas, mel ex tota
                laudem. Quo ne regione tritani placerat, labitur neglegentur ex
                vis, sale verterem perfecto an eum.
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
                        className="para-text"
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
      </Container>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column", // Ensure stacking of sections
          backgroundColor: "#fbfbfb",
        }}
      >
        {/* Row 1: "PM Made Simple" */}
        <Container
          sx={{
            width: "100%",
          }}
        >
          <Grid container spacing={6} sx={{ py: 10 }}>
            {/* Grid for Icons and Content */}
            <Grid
              container
              spacing={2}
              item
              xs={12}
              md={6}
              sx={{
                order: { xs: 1, sm: 1, md: 2 },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  px: { xs: "20px" },
                }}
              >
                {/* Background Text */}
                <Typography
                  className="main-text"
                  sx={{
                    position: "absolute",
                    textAlign: "center",

                    fontWeight: "bolder",
                    top: "-40px", // Adjust to position text behind icon and heading
                    left: 0,
                    right: 150,
                    margin: "0 auto", // Center text
                    fontSize: "160px", // Adjust as needed
                    zIndex: 0, // Send the background text behind the content
                    opacity: 0.1,
                    color: "#999",
                  }}
                >
                  1
                </Typography>

                {/* Icon */}
                <Box
                  sx={{
                    fontSize: "2.8rem",
                    color: "#837fcb",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <LuCalendarRange />
                </Box>

                {/* Content */}
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Typography
                    className="main-text"
                    variant="h6"
                    sx={{
                      fontWeight: "800",
                      color: "#444f60",
                      fontSize: "42px",
                      mb: 3, // Space below heading
                      maxWidth: { md: "100px", lg: "1000px" },
                      lineHeight: 1.125,
                    }}
                  >
                    Manage Projects
                  </Typography>
                  <Box
                    sx={{
                      height: "5px",
                      backgroundColor: "#837fcb",
                      width: "80px",
                      mb: 2,
                      borderRadius: "20px",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "1.2rem",
                      color: "#a9abac",
                      maxWidth: { md: "300px", lg: "400px" },
                    }}
                  >
                    Lorem ipsum dolor sit amet, clita laoreet ne cum. His cu
                    harum inermis iudicabit. Ex vidit fierent hendrerit eum, sed
                    stet periculis ut. Vis in probo decore labitur.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Column Content for "Some New Tools" */}
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                order: { xs: 2, sm: 2, md: 1 },
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${manageProjects})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: { xs: "250px", sm: "350px", md: "110%" },
                  width: "80%",
                  "@media (max-width: 300px)": {
                    /* Media query for extra-small screens */
                    width:
                      "100%" /* Adjust width for screens smaller than 300px */,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column", // Ensure stacking of sections
        }}
      >
        {/* Row 1: "PM Made Simple" */}
        <Container
          sx={{
            width: "100%",
          }}
        >
          <Grid container spacing={6} sx={{ py: 10 }}>
            {/* Grid for Icons and Content */}
            <Grid
              container
              spacing={2}
              item
              xs={12}
              md={6}
              sx={{
                order: { xs: 1, sm: 1, md: 1, lg: 1, xl: 1 },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  px: { xs: "20px" },
                }}
              >
                {/* Background Text */}
                <Typography
                  className="main-text"
                  sx={{
                    position: "absolute",
                    textAlign: "center",
                    fontWeight: "bolder",
                    top: "-40px", // Adjust to position text behind icon and heading
                    left: 0,
                    right: 150,
                    margin: "0 auto", // Center text
                    fontSize: "190px", // Adjust as needed
                    zIndex: 0, // Send the background text behind the content
                    opacity: 0.1,
                    color: "#999",
                  }}
                >
                  2
                </Typography>

                {/* Icon */}
                <Box
                  sx={{
                    fontSize: "2.8rem", // Increased font size
                    color: "#837fcb",
                    position: "relative", // Keep content above the background text
                    zIndex: 1,
                  }}
                >
                  <IoCloudUploadOutline />
                </Box>

                {/* Content */}
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Typography
                    className="main-text"
                    variant="h6"
                    sx={{
                      fontWeight: "800",
                      color: "#444f60",
                      fontSize: "42px",
                      mb: 2, // Space below heading
                      maxWidth: { md: "1000px" },
                      lineHeight: 1.125,
                    }}
                  >
                    Attach files
                  </Typography>
                  <Box
                    sx={{
                      height: "5px",
                      backgroundColor: "#837fcb",
                      width: "80px",
                      mb: 2,
                      borderRadius: "20px",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "1.2rem",
                      color: "#a9abac",
                      maxWidth: { md: "300px", lg: "400px" },
                    }}
                  >
                    Lorem ipsum dolor sit amet, clita laoreet ne cum. His cu
                    harum inermis iudicabit. Ex vidit fierent hendrerit eum, sed
                    stet periculis ut. Vis in probo decore labitur.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Column Content for "Some New Tools" */}
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                order: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2 },
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${attachFiles})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: { xs: "250px", sm: "350px", md: "110%" },
                  width: { md: "80%", sm: "70%", xs: "70%" },
                  "@media (max-width: 300px)": {
                    /* Media query for extra-small screens */
                    width:
                      "100%" /* Adjust width for screens smaller than 300px */,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column", // Ensure stacking of sections
          backgroundColor: "#fbfbfb",
        }}
      >
        {/* Row 1: "PM Made Simple" */}
        <Container
          sx={{
            width: "100%",
          }}
        >
          <Grid container spacing={6} sx={{ py: 10 }}>
            {/* Grid for Icons and Content */}
            <Grid
              container
              spacing={2}
              item
              xs={12}
              md={6}
              sx={{
                order: { xs: 1, sm: 1, md: 2 },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  px: { xs: "20px" },
                }}
              >
                {/* Background Text */}
                <Typography
                  className="main-text"
                  sx={{
                    position: "absolute",
                    textAlign: "center",
                    fontWeight: "bolder",
                    top: "-30px", // Adjust to position text behind icon and heading
                    left: 0,
                    right: 180,
                    margin: "0 auto", // Center text
                    fontSize: "160px", // Adjust as needed
                    zIndex: 0, // Send the background text behind the content
                    opacity: 0.1,
                    color: "#999",
                  }}
                >
                  3
                </Typography>

                {/* Icon */}
                <Box
                  sx={{
                    fontSize: "2.8rem",
                    color: "#837fcb",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <GrSecure />
                </Box>

                {/* Content */}
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <Typography
                    className="main-text"
                    variant="h6"
                    sx={{
                      fontWeight: "600",
                      color: "#444f60",
                      fontSize: "42px",
                      mb: 3, // Space below heading
                      maxWidth: { md: "100px", lg: "1000px" },
                      lineHeight: 1.125,
                    }}
                  >
                    Secure content
                  </Typography>
                  <Box
                    sx={{
                      height: "5px",
                      backgroundColor: "#837fcb",
                      width: "80px",
                      mb: 2,
                      borderRadius: "20px",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "1.2rem",
                      color: "#a9abac",
                      maxWidth: { md: "300px", lg: "400px" },
                    }}
                  >
                    Lorem ipsum dolor sit amet, clita laoreet ne cum. His cu
                    harum inermis iudicabit. Ex vidit fierent hendrerit eum, sed
                    stet periculis ut. Vis in probo decore labitur.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Column Content for "Some New Tools" */}
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                order: { xs: 2, sm: 2, md: 1 },
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${secureContent})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: { xs: "250px", sm: "350px", md: "110%" },
                  width: "80%",
                  "@media (max-width: 300px)": {
                    /* Media query for extra-small screens */
                    width:
                      "100%" /* Adjust width for screens smaller than 300px */,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 17,
          pb: 12,
          flexDirection: "column", // Ensure stacking of sections
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
              top: "-120px",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              fontSize: "180px",
              zIndex: 0,
              opacity: 0.1,
              color: "#999",
            }}
          >
            8
          </Typography>

          {/* Heading */}
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              zIndex: 1,
              fontSize: "2.7rem",
              color: "#444f60",
            }}
          >
            Try out our demo
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "#999",
              zIndex: 1,
              maxWidth: "800px",
              fontWeight: 300,
              fontSize: "1.2rem",
              pt: "20px",
            }}
          >
            Discover a seamless experience in Project Management
          </Typography>

          {/* Centered Image */}
          <Box
            sx={{
              display: "flex",
              mt: 8,
              justifyContent: "center",
              alignItems: "center",
              width: "80%",
            }}
          >
            <Box
              component="img"
              src={demoExperience}
              alt="PM Made Simple"
              sx={{
                maxWidth: { md: "90%", sm: "112%", xs: "126%" }, // Responsive width
                height: "auto", // Maintain aspect ratio
                objectFit: "contain", // Ensure the image fits nicely
                border: "1px solid #dbdbdb", // Add border
                borderRadius: "20px", // Rounded corners
              }}
            />
          </Box>

          {/* 2 Rows and 2 Columns of Paragraphs */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 4,
              mt: 7,
              width: "100%",
              maxWidth: { md: "700px", sm: "690px", xs: "500px" },
              pl: { sm: "25px" },
            }}
          >
            {/* Block 1 */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mr: 3, // Add spacing between icon and text
                }}
              >
                <LiaWalletSolid
                  style={{ fontSize: "3rem", color: "#837fcb" }}
                />
              </Box>
              {/* Text Container */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Heading */}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "left",
                    color: "#333",
                    fontSize: "1.125rem",
                    color: "#363636",
                  }}
                >
                  Efficient Tools
                </Typography>
                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: 400,
                    textAlign: "left",
                    color: "#",
                    lineHeight: "1.6",
                    color: "#999",
                  }}
                >
                  Learn how to effortlessly manage your projects with tools
                  designed to maximize efficiency and productivity.
                </Typography>
              </Box>
            </Box>

            {/* Repeat the same structure for other blocks */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mr: 4, // Add spacing between icon and text
                  mt: 1,
                }}
              >
                <HiOutlineCreditCard
                  style={{ fontSize: "2.8rem", color: "#837fcb" }}
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "left",
                    color: "#333",
                    fontSize: "1.125rem",
                    color: "#363636",
                  }}
                >
                  Tailored Insights
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: 400,
                    textAlign: "left",
                    color: "#",
                    lineHeight: "1.6",
                    color: "#999",
                  }}
                >
                  Gain insights and better organize your team with a platform
                  tailored to meet modern challenges.
                </Typography>
              </Box>
            </Box>

            {/* Block 3 */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mr: 3, // Add spacing between icon and text
                }}
              >
                <GrSecure style={{ fontSize: "2.8rem", color: "#837fcb" }} />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "left",
                    color: "#333",
                    fontSize: "1.125rem",
                    color: "#363636",
                  }}
                >
                  Team Collaboration
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: 400,
                    textAlign: "left",
                    color: "#",
                    lineHeight: "1.6",
                    color: "#999",
                  }}
                >
                  Our system ensures that every team member stays on the same
                  page, enabling better collaboration.
                </Typography>
              </Box>
            </Box>

            {/* Block 4 */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mr: 3,
                  pt: 1, // Add spacing between icon and text
                }}
              >
                <MdOndemandVideo
                  style={{ fontSize: "2.8rem", color: "#837fcb" }}
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "left",
                    color: "#333",
                    fontSize: "1.125rem",
                    color: "#363636",
                  }}
                >
                  Simplified Workflows
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: 400,
                    textAlign: "left",
                    color: "#",
                    lineHeight: "1.6",
                    color: "#999",
                  }}
                >
                  Simplify your workflow with features that are intuitive and
                  easy to use, designed with you in mind.
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Button and Description */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mt: 6,
            }}
          >
            <button
              style={{
                backgroundColor: "#837fcb",
                color: "#fff",
                border: "none",
                padding: "16px 52px",
                borderRadius: "50px",
                fontSize: "1rem",
                cursor: "pointer",
                minWidth: "220px",
              }}
            >
              Start my Free Trial
            </button>
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                fontSize: "0.9rem",
                color: "#999",
                mt: 2,
                maxWidth: "500px",
              }}
            >
              No credit card required.
            </Typography>
          </Box>
        </Box>
      </Container>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 17,
          pb: 12,
          flexDirection: "column",
          backgroundColor: "#fbfbfb",
        }}
      >
        {/* Row 1: "PM Made Simple" */}
        <Box
          sx={{
            width: "100%",
            maxWidth: { lg: "1200px", md: "1000px" },
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
                top: "-100px",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                fontSize: "180px",
                zIndex: 0,
                opacity: 0.1,
                color: "#999",
              }}
            >
              <MdApartment />
            </Typography>

            {/* Heading */}
            <Typography
              className="main-text"
              variant="h2"
              sx={{
                textAlign: "center",
                fontWeight: "800",
                zIndex: 1,
                fontSize: "2.7rem",
                color: "#444f60",
              }}
            >
              We build Trust.
            </Typography>

            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: "#999",
                zIndex: 1,
                maxWidth: "800px",
                fontWeight: 300,
                fontSize: "1.2rem",
              }}
            >
              More than 900 Teams use our product.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            marginTop: 4,
            display: "grid",
            gridTemplateColumns: { md: "repeat(5, 1fr)", sm: "repeat(1, 1fr)" },
            gridTemplateRows: { md: "repeat(3, auto)", sm: "auto" }, // Ensures 3 rows
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "none",
            position: "relative", // Required for pseudo-elements
          }}
        >
          {/* Vertical Lines */}
          {[...Array(4)].map((_, i) => (
            <Box
              key={`v-line-${i}`}
              sx={{
                display: { xs: "none", sm: "none", md: "block" },
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${(i + 1) * (100 / 5)}%`,
                borderLeft: "1px solid #dbdbdb",
              }}
            />
          ))}

          {/* Horizontal Lines */}
          {[...Array(3)].map((_, i) => (
            <Box
              key={`h-line-${i}`}
              sx={{
                display: { xs: "none", sm: "none", md: "block" },

                position: "absolute",
                left: 0,
                right: 0,
                top: `${(i + 1) * (100 / 3)}%`,
                borderTop: "1px solid #dbdbdb",
              }}
            />
          ))}

          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "none",
              }}
            >
              <Box
                component="img"
                src={image.src}
                alt={image.alt}
                sx={{
                  width: "100%",
                  maxWidth: "150px",
                  height: "auto",
                  borderRadius: 2,
                }}
              />
            </Box>
          ))}
        </Box>

        {/* Button */}
        <Box sx={{ marginTop: 4 }}>
          <button
            style={{
              backgroundColor: "#837fcb",
              color: "#fff",
              border: "none",
              padding: "16px 44px",
              borderRadius: "50px",
              fontSize: "1rem",
              cursor: "pointer",
              minWidth: "220px",
            }}
          >
            Get Started Now
          </button>
        </Box>
      </Box>

      <Container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 17,
          pb: 12,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
            maxWidth: { xs: "60%" },
          }}
        >
          {/* Background Text */}
          <Typography
            sx={{
              position: "absolute",
              textAlign: "center",
              fontWeight: "bolder",
              top: "-120px",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              fontSize: "180px",
              zIndex: 0,
              opacity: 0.1,
              color: "#999",
            }}
          >
            5
          </Typography>

          {/* Heading */}
          <Typography
            className="main-text"
            variant="h2"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              zIndex: 1,
              fontSize: "2.7rem",
              color: "#444f60",
            }}
          >
            Our customers love us
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "#999",
              zIndex: 1,
              maxWidth: "800px",
              fontWeight: 300,
              fontSize: "1.2rem",
            }}
          >
            Check out what they say about us
          </Typography>

          <SwipeableViews index={activeIndex} onChangeIndex={handleChangeIndex}>
            {sliderData.map((item, index) => (
              <Container
                key={item.id}
                sx={{
                  margin: "80px auto",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  boxShadow: 3,
                  padding: 2,
                  borderRadius: 1,
                  marginBottom: 2,
                  width: {
                    xs: "95%",
                    sm: "95%",
                    md: "55%",
                  } /* Use media queries */,
                  zIndex: 1,
                  transition: "opacity 5s all ease-out",
                  "@media (max-width: 360px)": {
                    /* Media query for extra-small screens */
                    width:
                      "70%" /* Adjust width for screens smaller than 300px */,
                  },
                }}
              >
                {" "}
                <Avatar
                  src={item.avatar}
                  sx={{ width: 80, height: 80, mb: 2, mt: -6 }}
                />{" "}
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#837fcb",
                  }}
                >
                  {" "}
                  {item.name}{" "}
                </Typography>{" "}
                <Typography
                  variant="body2"
                  sx={{ textAlign: "center", color: "#a9abac" }}
                >
                  {" "}
                  {item.description}{" "}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "left",
                    pt: "18px",
                    color: "#4A4A4A",
                  }}
                >
                  {" "}
                  {item.bio}{" "}
                </Typography>{" "}
              </Container>
            ))}{" "}
          </SwipeableViews>

          {/* Dots indicator */}
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }}>
            {sliderData.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  backgroundColor:
                    activeIndex === index ? "#6a3144 " : "grey.400",
                  margin: 1.5,
                  transition: "background-color 0.3s",
                  cursor: "pointer",
                }}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </Box>
        </Box>
      </Container>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 17,
          pb: 12,
          flexDirection: "column",
          backgroundColor: "#fbfbfb", // Default background color
        }}
      >
        {/* Row 1: "PM Made Simple" */}
        <Box
          sx={{
            width: "100%",
            maxWidth: { lg: "1200px", md: "1000px" },
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
                top: "-120px",
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                fontSize: "180px",
                zIndex: 0,
                opacity: 0.1,
                color: "#999",
              }}
            >
              6
            </Typography>

            {/* Heading */}
            <Typography
              className="main-text"
              variant="h2"
              sx={{
                textAlign: "center",
                fontWeight: 800,
                zIndex: 1,
                fontSize: "2.7rem",
                color: "#444f60",
              }}
            >
              Start your Free trial
            </Typography>

            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: "#999",
                zIndex: 1,
                maxWidth: "800px",
                fontWeight: 300,
                fontSize: "1.2rem",
              }}
            >
              Dont struggle anymore to manage tasks. Everything is easy to setup
            </Typography>
          </Box>
        </Box>

        {/* Row 2: Input fields and button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row", // Change direction to row
            gap: 2,
            marginTop: 8,
            zIndex: 1,
            "@media (max-width: 600px)": {
              // For xs screens
              flexDirection: "column",
            },
          }}
        >
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            sx={{ color: "#999" }} // Adjust the label color here
          />
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            sx={{ color: "#999" }} // Adjust the label color here
          />
          <TextField
            id="standard-basic"
            label="Password"
            variant="standard"
            sx={{ color: "#999" }} // Adjust the label color here
          />
          {/* Button */}
          <Box sx={{ marginTop: 4 }}>
            <button
              style={{
                backgroundColor: "#837fcb",
                color: "#fff",
                border: "none",
                padding: "16px 30px",
                borderRadius: "50px",
                fontSize: "1rem",
                cursor: "pointer",
                minWidth: "220px",
              }}
            >
              Sign me up
            </button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 17,
          pb: 12,
          flexDirection: "column",
          backgroundColor: "#fbfbfb", // Default background color
          position: "relative", // Required for absolute positioning
        }}
      >
        {/* Your content here */}

        {/* Image at the bottom */}
        <Box
          sx={{
            position: "absolute",
            bottom: { xl: -8, md: -7, xs: -7 },
            left: 0,
            width: "100%",
            height: "auto",
          }}
        >
          <img src={wavyDark} alt="Bottom Image" style={{ width: "100%" }} />
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "#444f60", // Default background color
        }}
      >
        <Container
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: 17,
            pb: 12,
            flexDirection: "column",
            backgroundColor: "#444f60", // Default background color
            position: "relative",
            "@media (max-width: 600px)": {
              /* Media query for extra-small screens */
              flexDirection: "column" /* Switch to column layout */,
            },
          }}
        >
          {/* Row 1: "PM Made Simple" */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              } /* Responsive layout */,
            }}
          >
            {/* First Grid: Logo and Social Media Icons */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%" /* Adjust width */,

                backgroundColor: "#444f60",
              }}
            >
              {/* Logo */}
              <img
                src={logo}
                alt="Logo"
                style={{ width: "100px", marginBottom: 8 }}
              />

              {/* Social Media Icons */}
              <Box sx={{ display: "flex", gap: 2 }}>
                {/* <IconContext.Provider value={{ size: "2rem", color: "#333" }}>
          <FaFacebook />
          <FaTwitter />
          <FaInstagram />
          <FaLinkedin />
          <FaPinterest />
        </IconContext.Provider> */}
              </Box>

              {/* Text */}
              <Typography
                sx={{
                  marginTop: 2,
                  textAlign: "center",
                  color: "#fff",
                  fontSize: "1rem",
                }}
              >
                Designed and coded with by MangoFlow.
              </Typography>
            </Box>

            {/* Second Grid: Buttons */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 4,
                width: "100%" /* Adjust width */,
              }}
              onClick={handleNavigate}
            >
              <button
                style={{
                  backgroundColor: "#837fcb",
                  color: "#fff",
                  border: "none",
                  padding: "16px 44px",
                  borderRadius: "50px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  minWidth: "220px",
                }}
              >
                Demo
              </button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Demo;

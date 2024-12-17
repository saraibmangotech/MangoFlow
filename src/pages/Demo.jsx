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
import { Link } from "react-router-dom";


const Demo = () => {
    const [menuAnchor, setMenuAnchor] = React.useState(null); // Renamed state variable

    const handleMenuOpen = (event) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    return (<>
        <AppBar position="static" sx={{ backgroundColor: "#f5f6fa", boxShadow: "none", color: "#4a4a4a" }}>
            <Toolbar>
                {/* Left Section: Logo */}
                <Box
                    component="img"
                    src={logo} // Replace with your image path
                    alt="Logo"
                    sx={{ flexGrow: 0, width: 100, height: 60 }} // Adjust size as needed
                />


                {/* Middle Section: Links */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 2 }}>
                    {/* Menu Button */}
                    <IconButton
                        edge="start"
                        sx={{
                            color: "#4a4a4a",



                        }}
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

                    {/* Feature Button */}
                    <Button
                        sx={{
                            color: "#4a4a4a",
                            textTransform: "none",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                textDecoration: "underline", // Underline on hover
                                opacity: 0.7, // Reduce opacity on hover

                            },
                        }}
                    >
                        Features
                    </Button>

                    {/* Pricing Button */}
                    <Button
                        sx={{
                            color: "#4a4a4a",
                            textTransform: "none",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                textDecoration: "underline", // Underline on hover
                                opacity: 0.7, // Reduce opacity on hover
                            },
                        }}
                    >
                        Pricing
                    </Button>

                    {/* Login Button */}
                    <Button
                        sx={{
                            color: "#4a4a4a",
                            textTransform: "none",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                textDecoration: "underline", // Underline on hover
                                opacity: 0.7, // Reduce opacity on hover
                            },
                        }}
                    >
                        Login
                    </Button>
                </Box>


                {/* Right Section: Spacer and Demo Button */}
                <Box sx={{ flexGrow: 1 }} />
                <Link >
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
                            transition: "all 0.5s ease", // Smooth transition for hover effect
                            "&:hover": {
                                backgroundColor: "#837fcb", // Hover background color
                                color: "white", // Hover text color
                                boxShadow: "none", // Ensures no shadow on hover
                            },
                        }}
                    >
                        Demo
                    </Button>
                </Link>

            </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box sx={{ px: 5, backgroundColor: "#f5f6fa", py: 14 }}>
    <Grid container spacing={8}>
        {/* Left Section: 5 Columns */}
        <Grid item xs={12} md={5}>
            <Box
                sx={{
                    backgroundColor: "white", // Light background for input-like appearance
                    padding: 1,
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #e5e5e5", // Border for the input look
                    borderRadius: "8px", // Rounded corners
                    gap: 1, // Space between button and text
                    width: "80%",
                    mb: "20px",
                }}
            >
                {/* Left Button */}
                <Box
                    variant="contained"
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

                {/* Right Text */}
                <Typography
                    variant="body1"
                    sx={{
                        flexGrow: 1,
                        color: "#8e9baf",
                        fontSize: "12px",
                    }}
                >
                    Check out the newest features
                </Typography>
            </Box>
            <Box>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: "3rem",
                        color: "#444f60 !important",
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
                        color: "#8E9BAF !important",
                        lineHeight: 1.3,
                    }}
                >
                    Take control over your business by deploying an all in one
                    business data monitoring solution.
                </Typography>
                <Box
                    sx={{
                        backgroundColor: "white", // Light background for input-like appearance
                        padding: 1,
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #e5e5e5", // Border for the input look
                        borderRadius: "40px", // Rounded corners
                        gap: 1, // Space between input and button
                        width: "90%",
                        my: "20px",
                    }}
                >
                    {/* Input Field */}
                    <input
                        type="text"
                        placeholder="Your email address"
                        style={{
                            border: "none",
                            outline: "none",
                            flex: 1, // Takes the remaining space
                            fontSize: "13px",
                            color: "#8e9baf",
                            padding: "10px",
                            borderRadius: "40px",
                        }}
                    />

                    {/* Right Button */}
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
            </Box>
        </Grid>

        {/* Right Section: 7 Columns */}
        <Grid item xs={12} md={7}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                }}
            >
                {/* Image */}
                <img
                    src={pic1} // Replace with your image URL
                    alt="Business"
                    style={{
                        borderRadius: "30%", // Circular shape
                        height: "110%", // Larger height
                        width: "35%", // Smaller width
                        objectFit: "cover", // Ensures proper aspect ratio
                    }}
                />
            </Box>
        </Grid>
    </Grid>
</Box>




    </>

    );
};

export default Demo;

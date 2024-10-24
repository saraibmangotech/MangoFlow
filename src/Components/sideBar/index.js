import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import {
  CottageOutlined as CottageOutlinedIcon,
  Cottage as CottageIcon,
  FolderOpenOutlined as FolderOpenOutlinedIcon,
  Folder as FolderIcon,
  AutoAwesomeMosaicOutlined as AutoAwesomeMosaicOutlinedIcon,
  AutoAwesomeMosaic as AutoAwesomeMosaicIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import IosShareSharpIcon from "@mui/icons-material/IosShareSharp";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";
import ArrowDropDownTwoToneIcon from "@mui/icons-material/ArrowDropDownTwoTone";
import Img1 from "../../Images/img1.png";
import Img2 from "../../Images/img3.png";
import Img3 from "../../Images/img2.png";

const recentDesigns = [
  { title: "Design 1", imgSrc: Img1 },
  { title: "Design 2", imgSrc: Img2 },
  { title: "Design 3", imgSrc: Img3 },
];

const SideBar = () => {
  const [selected, setSelected] = useState();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showDesigns, setShowDesigns] = useState(false); // New state for toggle
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMobileView = useMediaQuery("(max-width:600px)");
  const handleSelect = (index) => {
    setSelected(index);
    if (index === 0) {
      navigate("/home");
    } else if (index === 1) {
      navigate("/project");
    } else if (index === 2) {
      navigate("/templates");
    }
  };

  const toggleDesigns = () => {
    setShowDesigns((prev) => !prev); // Toggle designs visibility
  };

  const getIcon = (index) => {
    const icons = [
      [
        <CottageIcon
          sx={{
            color: selected === index ? "#7731d8" : "rgba(119, 49, 216, 0.7)",
            fontSize: "1.5rem",
          }}
        />,
        <CottageOutlinedIcon
          sx={{ color: "rgba(119, 49, 216, 0.7)", fontSize: "1.5rem" }}
        />,
      ],
      [
        <FolderIcon
          sx={{
            color: selected === index ? "#7731d8" : "rgba(119, 49, 216, 0.7)",
            fontSize: "1.5rem",
          }}
        />,
        <FolderOpenOutlinedIcon
          sx={{ color: "rgba(119, 49, 216, 0.7)", fontSize: "1.5rem" }}
        />,
      ],
      [
        <AutoAwesomeMosaicIcon
          sx={{
            color: selected === index ? "#7731d8" : "rgba(119, 49, 216, 0.7)",
            fontSize: "1.5rem",
          }}
        />,
        <AutoAwesomeMosaicOutlinedIcon
          sx={{ color: "rgba(119, 49, 216, 0.7)", fontSize: "1.5rem" }}
        />,
      ],
    ];
    const [activeIcon, inactiveIcon] = icons[index];
    return selected === index ? activeIcon : inactiveIcon;
  };

  const menuItems = [
    { label: "Home", index: 0 },
    { label: "Projects", index: 1 },
    { label: "Templates", index: 2 },
  ];

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: 270, lg: 280, xl: 320 },
        height: { xs: 70, sm: "100vh" },
        position: { xs: "fixed", sm: "relative" },
        bottom: { xs: 0, sm: "auto" },
        backgroundColor: "rgba(139, 61, 255, 0.1)",
        display: "flex",
        flexDirection: "row",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        paddingTop: { sm: 2 },
        border: "none",
        overflow: "hidden",
      }}
    >
      {/* Menu Items */}
      <List
        sx={{
          width: isMobileView ? "100%" : "25%",
          display: "flex",
          flexDirection: isMobileView ? "row" : "column", // Row for mobile view, column for larger screens
          justifyContent: isMobileView ? "center" : "flex-start", // Center horizontally on mobile, start on larger screens
          alignItems: isMobileView ? "center" : "flex-start", // Center vertically on mobile, start on larger screens
        }}
      >
        {menuItems.map((item) => (
          <ListItem
            key={item.index}
            button
            onClick={() => handleSelect(item.index)}
            sx={{
              flexDirection: "column",
              alignItems: "center",
              color: selected === item.index ? "#7731d8" : "inherit",
              padding: "8px 16px",
              position: "relative",
              cursor: "pointer",
              backgroundColor:
                selected === item.index
                  ? "rgba(119, 49, 216, 0.1)"
                  : "transparent",
            }}
          >
            <ListItemIcon
              sx={{
                justifyContent: "center",
                color:
                  selected === item.index
                    ? "#7731d8"
                    : "rgba(119, 49, 216, 0.7)",
                minWidth: "24px",
              }}
            >
              {getIcon(item.index)}
            </ListItemIcon>
            <Typography
              variant="caption"
              sx={{
                marginTop: 1,
                color: "rgba(119, 49, 216, 1)",
                textAlign: "center",
                display: { xs: "none", sm: "block" },
                marginLeft: 0.5,
                fontSize: "0.7rem",
              }}
            >
              {item.label}
            </Typography>
          </ListItem>
        ))}
      </List>

      <Box
        sx={{
          width: "1px",
          backgroundColor: "#ccc",
          height: { xs: 70, sm: "100vh" },
          marginLeft: "2px",
          marginRight: 2,
          top:0,
          display: { xs: "none", sm: "block" },
        }}
      />

      {/* Canva Heading and Buttons */}
      {!isSmallScreen && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginRight: 2,
            width: { xs: "90%", sm: "60%", md: "58%", lg: "65%" },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(to right, #00a3a8, #7731d8)", // Use background for gradient
              WebkitBackgroundClip: "text", // Clip background to text
              color: "transparent", // Make text color transparent to show gradient
              margin: "6px 0",
              display: "inline-block", // Ensure it respects width for gradient effect
            }}
          >
            Canva
          </Typography>

          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#7731d8",
              color: "white",
              borderRadius: 2,
              padding: "8px 30px",
              fontSize: "clamp(0.5rem, 0.6vw, 0.65rem)",
              lineHeight: 1.2,
              margin: "5px 0",
              width: "100%",
              "&:hover": { backgroundColor: "#5e24a6" },
            }}
            startIcon={<AddIcon fontSize="small" />}
          >
            Create a Design
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: 2,
              padding: "8px 18px",
              fontSize: "clamp(0.5rem, 0.6vw, 0.65rem)",
              lineHeight: 1.2,
              margin: "5px 0",
              width: "100%",
            }}
            startIcon={
              <CardMembershipIcon fontSize="small" sx={{ color: "#fdbc68" }} />
            }
          >
            Try Pro for 30 days
          </Button>

          {/* Recent Designs with Toggle */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: 3,
              backgroundColor: "transparent",
              padding: "4px", // Add padding for better hover effect
              borderRadius: "4px", // Optional: Add slight rounding
              transition: "background-color 0.3s", // Smooth transition
              "&:hover": {
                backgroundColor: "rgba(139, 61, 255, 0.1)", // Change the hover background color
                cursor: "pointer", // Change cursor on hover
                color: "rgba(64, 87, 109, 1)", // Change text color on hover
              },
            }}
            onClick={toggleDesigns}
          >
            <Typography
              sx={{
                fontSize: "0.7rem",
                mr: 1,
                color: "rgba(64, 87, 109, 0.8)",
                transition: "color 0.3s", // Smooth text color transition
              }}
            >
              Recent Designs
            </Typography>
            <IconButton
              sx={{
                padding: 0,
                transition: "color 0.3s", // Smooth icon color transition
                color: "rgba(64, 87, 109, 0.7)",
                "&:hover": {
                  color: "rgba(64, 87, 109, 0.7)",
                },
              }}
            >
              <ArrowDropDownTwoToneIcon />
            </IconButton>
          </Box>

          {showDesigns && (
            <Box sx={{ marginTop: 1, width: "100%" }}>
              {recentDesigns.map((design, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: 1,
                    borderRadius: "10px",
                    mb: 1,
                    "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <img
                    src={design.imgSrc}
                    alt={design.title}
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 10,
                      borderRadius: "5px",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ flex: 1, color: "rgba(64, 87, 109, 0.8)" }}
                  >
                    {design.title}
                  </Typography>
                  {hoveredIndex === index && (
                    <Box size="small" sx={{ display: "flex", gap: 1 }}>
                      <Box
                        sx={{
                          padding: "1px ",
                          borderRadius: "5px",

                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          },
                        }}
                      >
                        <IconButton size="small" sx={{ color: "#000" }}>
                          <IosShareSharpIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      <Box
                        sx={{
                          padding: "1px",
                          borderRadius: "2px",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          },
                        }}
                      >
                        <IconButton size="small" sx={{ color: "#000" }}>
                          <MoreHorizSharpIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          )}
          <Box
            sx={{
              marginTop: "auto",
              paddingBottom: 4,
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: "100%",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "rgba(139, 61, 255, 0.1)",
                cursor: "pointer",
              },
            }}
          >
            <IconButton>
              <DeleteOutlineTwoToneIcon />
            </IconButton>

            <Typography
              variant="body1"
              sx={{ color: "rgba(64, 87, 109, 0.8)", fontSize: "0.9rem" }}
            >
              Trash
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SideBar;

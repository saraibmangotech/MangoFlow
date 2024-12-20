import React, { useEffect, useState } from "react";
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
import logo from "../../Images/logo.png";
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
import NewDesignPopup from "../newDesign/NewDesignPopup";

const recentDesigns = [
  { title: "Design 1", imgSrc: Img1 },
  { title: "Design 2", imgSrc: Img2 },
  { title: "Design 3", imgSrc: Img3 },
];

const SideBar = (data) => {
  console.log(data?.data, 'sidebar');

  const [selected, setSelected] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showDesigns, setShowDesigns] = useState(true); // New state for toggle
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMobileView = useMediaQuery("(max-width:600px)");
  const [artBoards, setArtBoards] = useState([])
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
  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const toggleDesigns = () => {
    setShowDesigns(!showDesigns); // Toggle designs visibility
    console.log(data);
    
  };

  const getIcon = (index) => {
    const icons = [
      [
        <CottageIcon
          sx={{
            color: selected === index ? "#837fcb" : "rgba(119, 49, 216, 0.7)",
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
            color: selected === index ? "#837fcb" : "rgba(119, 49, 216, 0.7)",
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
            color: selected === index ? "#837fcb" : "rgba(119, 49, 216, 0.7)",
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

  useEffect(() => {

    setArtBoards(data?.data)
  }, [data])

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: 270, md: 320, lg: 320, xl: 350 },
        height: { xs: 70, sm: "100vh" },
        position: { xs: "fixed", sm: "" },
        bottom: { xs: 0, sm: "auto" },
        display: "flex",
        flexDirection: "row",
        border: "none",
        overflow: "hidden",

       
      }}
    >
      {/* Menu Items */}
      <List
        sx={{
          paddingTop: 2,
          width: isMobileView ? "100%" : "20%",
          display: "flex",
          flexDirection: isMobileView ? "row" : "column",
          justifyContent: isMobileView ? "center" : "flex-start",
          alignItems: isMobileView ? "center" : "flex-start",
          backgroundColor: isMobileView ? "#fff" : "none",
          boder: isMobileView ? "1px solid #ccc" : "none"
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
              color: selected === item.index ? "#837fcb" : "inherit",
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
                    ? "#837fcb"
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
          marginRight: 2,
          top: 0,
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
            width: "100%",
            paddingTop: 1,
          }}
        >
          <Box
            sx={{
              marginTop: "12px",

            }}
          >
            <img height="30px" src={logo} />
          </Box>
          <Button
            variant="contained"
            size="small"
            onClick={handleOpenPopup}
            sx={{
              backgroundColor: "#837fcb",
              color: "white",
              borderRadius: 2,
              padding: "8px 30px",
              fontSize: "clamp(0.5rem, 1vw, 0.65rem)",
              lineHeight: 1.2,
              margin: "5px 0",
              width: "100%",
              "&:hover": { backgroundColor: "#837fcb" },
            }}
            startIcon={<AddIcon fontSize="small" />}
          >
            Create a Design
          </Button>
          <NewDesignPopup open={isPopupOpen} onClose={handleClosePopup} />

          {/* <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: 2,
              padding: "8px 18px",
              fontSize: "clamp(0.5rem, 1vw, 0.65rem)",
              lineHeight: 1.2,
              margin: "5px 0",
              width: "100%",
              fontWeight: "bold",
            }}
            startIcon={
              <CardMembershipIcon fontSize="small" sx={{ color: "#fdbc68" }} />
            }
          >
            Try Pro for 30 days
          </Button> */}
         

          {/* Recent Designs with Toggle */}
          {/* <Box
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
            onClick={() => toggleDesigns()}
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
          </Box> */}

          {showDesigns && (
            <Box sx={{ marginTop: 1, width: "100%" }}>
              {data?.data?.map((design, index) => (
                <Box
                  key={design.id || index}  // Use unique ID if available, else fallback to index
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: 1,
                    borderRadius: "10px",
                    mb: 1,
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "rgba(119, 49, 216, 0.1)" },
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Text Placeholder */}
                  <Typography variant="body2" sx={{ mr: 1 }}>Design Text</Typography>

                  {/* Design Image */}
                  <img
                    src={design.imageUrl || "default-image-url"}  // Replace with a real URL or placeholder
                    alt={design?.title || "Design"}
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 10,
                      borderRadius: "5px",
                    }}
                  />

                  {/* Design Title */}
                  <Typography
                    variant="body2"
                    sx={{ flex: 1, color: "rgba(64, 87, 109, 0.8)" }}
                  >
                    {design.title}
                  </Typography>

                  {/* Hover Icons */}
                  {hoveredIndex === index && (
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Box
                        sx={{
                          padding: "1px",
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
                          borderRadius: "5px",
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
              padding: "10px 0",
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: "100%",
              height: "20px",
              marginBottom: "10px",

              borderRadius: "10px",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "rgba(119, 49, 216, 0.1)",
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

import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  CottageOutlined as CottageOutlinedIcon,
  Cottage as CottageIcon,
  FolderOpenOutlined as FolderOpenOutlinedIcon,
  Folder as FolderIcon,
  AutoAwesomeMosaicOutlined as AutoAwesomeMosaicOutlinedIcon,
  AutoAwesomeMosaic as AutoAwesomeMosaicIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import IosShareSharpIcon from '@mui/icons-material/IosShareSharp';
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp';
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
  const [hoveredIndex, setHoveredIndex] = useState(null); // New state for hover
  const navigate = useNavigate();

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

  const getIcon = (index) => {
    const icons = [
      [
        <CottageIcon sx={{ color: selected === index ? "#7731d8" : "rgba(119, 49, 216, 0.7)", fontSize: "1.5rem" }} />,
        <CottageOutlinedIcon sx={{ color: "rgba(119, 49, 216, 0.7)", fontSize: "1.5rem" }} />,
      ],
      [
        <FolderIcon sx={{ color: selected === index ? "#7731d8" : "rgba(119, 49, 216, 0.7)", fontSize: "1.5rem" }} />,
        <FolderOpenOutlinedIcon sx={{ color: "rgba(119, 49, 216, 0.7)", fontSize: "1.5rem" }} />,
      ],
      [
        <AutoAwesomeMosaicIcon sx={{ color: selected === index ? "#7731d8" : "rgba(119, 49, 216, 0.7)", fontSize: "1.5rem" }} />,
        <AutoAwesomeMosaicOutlinedIcon sx={{ color: "rgba(119, 49, 216, 0.7)", fontSize: "1.5rem" }} />,
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
        width: {
          xs: "100%",
          sm: 270,
          md: 310,
          lg: 320,
          xl: 390,
        },
        height: { xs: 70, sm: "100vh" },
        position: { xs: "fixed", sm: "relative" },
        bottom: { xs: 0, sm: "auto" },
        backgroundColor: "grey",
        display: "flex",
        flexDirection: "row",
        boxShadow: 2,
        paddingTop: { sm: 2 },
      }}
    >
      {/* Menu Items */}
      <List
        sx={{
          width: "25%",
          display: "flex",
          flexDirection: "column",
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
              backgroundColor: selected === item.index ? "rgba(119, 49, 216, 0.1)" : "transparent",
            }}
          >
            <ListItemIcon
              sx={{
                justifyContent: "center",
                color: selected === item.index ? "#7731d8" : "rgba(119, 49, 216, 0.7)",
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

      {/* Vertical Line */}
      <Box
        sx={{
          width: "1px",
          backgroundColor: "#ccc",
          height: { xs: 70, sm: "100vh" },
          margin: "0 6px",
          display: { xs: "none", sm: "block" },
          top: 0,
        }}
      />

      {/* Canva Heading and Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginBottom: 2,
          marginRight: 1,
        }}
      >
        <Typography
        
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#7731d8",
            marginBottom: 2,
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
            borderRadius: 1,
            padding: "8px 30px",
            fontSize: "clamp(0.6rem, 1vw, 0.65rem)",
            lineHeight: 1.2,
            margin: "5px 0",
            whiteSpace: "nowrap",
            width: { xl: "100%" },
            "&:hover": {
              backgroundColor: "#5e24a6",
            },
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
            borderRadius: 1,
            padding: "8px 18px",
            fontSize: "clamp(0.6rem, 1vw, 0.65rem)",
            lineHeight: 1.2,
            margin: "5px 0",
            whiteSpace: "nowrap",
            width: { xl: "100%" },
          }}
          startIcon={<CardMembershipIcon fontSize="small" sx={{ color: "#fdbc68" }} />}
        >
          Try Pro for 30 days
        </Button>

        {/* Recent Designs Heading with Dropdown Icon */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: 3,
            cursor: "pointer",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "bold", marginRight: 1 }}
          >
            Recent Designs
          </Typography>
          <IconButton sx={{ padding: 0 }}>
            <MoreHorizIcon />
          </IconButton>
        </Box>

        {/* Recent Designs List */}
      {/* Recent Designs List */}
<Box
  sx={{
    display: "flex",
    flexDirection: "column",
    marginTop: 1,
    width: "100%",
  }}
>
  {recentDesigns.map((design, index) => (
    <Box
      key={index}
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 1,
        borderRadius: "10px",
        marginBottom: 1,
        transition: "background-color 0.2s",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        },
        position: "relative",
      }}
      onMouseEnter={() => setHoveredIndex(index)} // Set hovered index on enter
      onMouseLeave={() => setHoveredIndex(null)} // Reset on leave
    >
      <img
        src={design.imgSrc}
        alt={design.title}
        style={{ width: 20, height: 20, borderRadius: "5px", marginRight: 8 }}
      />
      <Typography sx={{fontSize:"0.8rem"}}>{design.title}</Typography>

      {/* Icons that will be displayed on hover */}
      {hoveredIndex === index && (
        <Box
          sx={{
            position: "absolute",
            right: 0,
            display: "flex",
            alignItems: "center",
            
          }}
        >
          <IconButton>
            <IosShareSharpIcon sx={{ color: "black" }} />
          </IconButton>
          <IconButton>
            <MoreHorizSharpIcon sx={{ color: "black" }} />
          </IconButton>
        </Box>
      )}
    </Box>
  ))}
</Box>

      </Box>
    </Box>
  );
};

export default SideBar;

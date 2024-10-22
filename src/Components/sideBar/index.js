import React, { useState } from "react";
import { Box, List, ListItem, ListItemIcon, Typography } from "@mui/material";
import {
  CottageOutlined as CottageOutlinedIcon,
  Cottage as CottageIcon,
  FolderOpenOutlined as FolderOpenOutlinedIcon,
  Folder as FolderIcon,
  AutoAwesomeMosaicOutlined as AutoAwesomeMosaicOutlinedIcon,
  AutoAwesomeMosaic as AutoAwesomeMosaicIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [selected, setSelected] = useState();
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
      [<CottageIcon />, <CottageOutlinedIcon />],
      [<FolderIcon />, <FolderOpenOutlinedIcon />],
      [<AutoAwesomeMosaicIcon />, <AutoAwesomeMosaicOutlinedIcon />],
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
        width: { xs: "100%", sm: 100 },
        height: { xs: 70, sm: "100vh" },
        position: { xs: "fixed", sm: "relative" },
        bottom: { xs: 0, sm: "auto" },
        backgroundColor: "#f3f4f6",
        display: "flex",
        flexDirection: { xs: "row", sm: "column" },
        alignItems: "center",
        justifyContent: { xs: "space-around", sm: "flex-start" },
        boxShadow: 2,
        paddingTop: { sm: 2 },
      }}
    >
      <List
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "row", sm: "column" },
          padding: 0,
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
              "&:hover": {
                backgroundColor:
                  selected === item.index
                    ? "rgba(119, 49, 216, 0.1)"
                    : "rgba(119, 49, 216, 0.05)", // Slightly darker on hover
                color: "#7731d8",
              },
              backgroundColor:
                selected === item.index
                  ? "rgba(119, 49, 216, 0.1)"
                  : "transparent", // Background color for selected item
            }}
          >
            <ListItemIcon
              sx={{
                justifyContent: "center",
                color: selected === item.index ? "#7731d8" : "inherit",
                "&:hover": { color: "#7731d8" },
              }}
            >
              {getIcon(item.index)}
            </ListItemIcon>
            <Typography
              variant="caption"
              sx={{
                marginTop: 1,
                textAlign: "center",
                display: { xs: "none", sm: "block" },
              }}
            >
              {item.label}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SideBar;

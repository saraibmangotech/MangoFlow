import React, { useState } from "react";
import { List, ListItem, ListItemIcon, ListItemText, useMediaQuery } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import AutoGraphSharpIcon from "@mui/icons-material/AutoGraphSharp";

const sidebarItems = [
  { id: 0, text: "For you", icon: <AutoGraphSharpIcon /> },
  { id: 1, text: "Doc", icon: <DescriptionIcon /> },
];

const NewDesignSideBar = ({ onTabChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const isMobileView = useMediaQuery("(max-width: 650px)"); // Detect screen size

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    onTabChange(index); // Notify the parent component of the tab change
  };

  return (
    <List
      sx={{
        display: "flex", // Display items in a row or column based on screen size
        flexDirection: isMobileView ? "row" : "column", 
        width: "100%",
        maxWidth: isMobileView ? "100%" : "250px", 
        height: isMobileView ? "auto" : "50vh", 
        overflowY: isMobileView ? "visible" : "auto", 
        padding: 0,
        margin: 0,
        gap: isMobileView ? 1 : 0, // Add spacing between items in row layout
      }}
    >
      {sidebarItems.map((item) => (
        <ListItem
          button
          key={item.id}
          selected={selectedIndex === item.id}
          onClick={() => handleListItemClick(item.id)}
          sx={{
            flexGrow: isMobileView ? 1 : 0, // Make items grow equally in row layout
            justifyContent: isMobileView ? "center" : "flex-start", 
            borderRadius: "20px",
            marginBottom: isMobileView ? 0 : "2px", 
            backgroundColor: selectedIndex === item.id ? "#ead4ff" : "transparent",
            width: isMobileView ? "auto" : "100%", 
            "&:hover": {
              backgroundColor: selectedIndex === item.id ? "#ead4ff" : "rgba(0, 0, 0, 0.1)",
            },
            paddingY: "10px",
            paddingX: isMobileView ? "8px" : "16px",
          }}
        >
          <ListItemIcon
            sx={{
              color: selectedIndex === item.id ? "#6a3e9b" : "inherit",
              backgroundColor: selectedIndex === item.id ? "#ead4ff" : "transparent",
              borderRadius: "50%",
              padding: isMobileView ? "0.5px" : "5px"
            }}
          >
            {item.icon}
          </ListItemIcon>
           <ListItemText  primary={item.text} />
        </ListItem>
      ))}
    </List>
  );
};

export default NewDesignSideBar;

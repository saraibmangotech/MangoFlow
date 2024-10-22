import React, { useState } from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description"; 
import AutoGraphSharpIcon from "@mui/icons-material/AutoGraphSharp"; 

const sidebarItems = [
  { id: 0, text: "For you", icon: <AutoGraphSharpIcon /> },
  { id: 1, text: "Doc", icon: <DescriptionIcon /> },
];

const NewDesignSideBar = ({ onTabChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(0); 

  const handleListItemClick = (index) => {
    setSelectedIndex(index); 
    onTabChange(index); // Notify the parent component of the tab change
  };

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: "250px", 
        height: "50vh", 
        overflowY: 'auto',
        overflowX: 'hidden', 
        padding: 0, 
        margin: 0, 
      }}
    >
      {sidebarItems.map((item) => (
        <ListItem
          button
          key={item.id}
          selected={selectedIndex === item.id}
          onClick={() => handleListItemClick(item.id)}
          sx={{
            borderRadius: "20px",
            marginBottom: "2px",
            backgroundColor: selectedIndex === item.id ? "#ead4ff" : "transparent",
            width: "100%", 
            "&:hover": {
              backgroundColor: selectedIndex === item.id ? "#ead4ff" : "rgba(0, 0, 0, 0.1)",
            },
            paddingY: "10px", 
            paddingX: "16px",
          }}
        >
          <ListItemIcon
            sx={{
              color: selectedIndex === item.id ? "#6a3e9b" : "inherit",
              backgroundColor: selectedIndex === item.id ? "#ead4ff" : "transparent", 
              borderRadius: "50%", 
              padding: "5px", 
            }}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} sx={{ width: "100%" }} /> 
        </ListItem>
      ))}
    </List>
  );
};

export default NewDesignSideBar;

import React, { useState, useEffect } from "react";
import {
  Dialog,
  Box,
  Typography,
  InputAdornment,
  TextField,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import NewDesignSideBar from "./NewDesignSideBar";
import IconCircle from "../iconCircle/IconCircle";
import RecentDesign from "../recentDesigns/RecentDesign";

const NewDesignPopup = ({ open, onClose }) => {
  const [value, setValue] = useState(0); // State for the selected tab
  const [inputValue, setInputValue] = useState("");

  // State for items to show and current index for IconCircle
  const [itemsToShow, setItemsToShow] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (open) {
      setInputValue("");
      setValue(0); // Reset the tab to the first one when the popup opens
      setItemsToShow([]); // Reset items to show
      setCurrentIndex(0); // Reset current index
    }
  }, [open]);

  const handleSidebarChange = (index) => {
    setValue(index); // Set the value based on selected sidebar index
  };

  const handleOpenPopup = () => {
    console.log("Popup opened");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": {
          width: "90%",
          borderRadius: "20px",
        },
      }}
    >
      <Box
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Box sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Create a Design
          </Typography>
        </Box>

        <Box sx={{ display: "flex", padding: "0 16px", gap: 2 }}>
          <Box
            sx={{
              width: { xs: "120px", sm: "200px", md: "250px" },
              flexShrink: 0,
            }}
          >
            <NewDesignSideBar onTabChange={handleSidebarChange} />
          </Box>

          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            {/* Search Bar and Button at the Top */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <TextField
                variant="outlined"
                placeholder="What would you like to create?"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                sx={{
                  flexGrow: 1,
                  maxWidth: { xs: "100%", sm: 500 },
                  height: 40,
                  "& .MuiOutlinedInput-root": {
                    height: "100%",
                    "& fieldset": { borderRadius: 4 },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#7731d8",
                  color: "white",
                  borderRadius: 2,
                  marginLeft: 2,
                  "&:hover": {
                    backgroundColor: "#5e24a6",
                  },
                }}
                startIcon={<AddIcon />}
                onClick={handleOpenPopup}
              >
                Create
              </Button>
            </Box>

            <Box sx={{ flex: 1 }}>
              {value === 0 && (
                <Box>
                  {/* For You Tab - Removed content display */}
                  <IconCircle
                    itemsToShow={itemsToShow}
                    currentIndex={currentIndex} 
                    setCurrentIndex={setCurrentIndex} 
                  />
                  <RecentDesign height="200px" top="40%" left="22%" />
                </Box>
              )}
              {value === 1 && (
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Document
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default NewDesignPopup;

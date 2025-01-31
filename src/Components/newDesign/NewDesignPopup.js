import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  Box,
  Typography,
  InputAdornment,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import NewDesignSideBar from "./NewDesignSideBar";
import IconCircle from "../iconCircle/IconCircle";
import RecentDesign from "../recentDesigns/RecentDesign";
import { useForm } from "react-hook-form";
import ArtBoardServices from "../../services/ArtBoardServices";

const NewDesignPopup = ({ open, onClose, data }) => {
  const [artboards, setArtboards] = useState([])

  const { register, handleSubmit,setValue : setValues } = useForm();
  const getArtBoards = async (page, limit, filter) => {


    try {

      const { data } = await ArtBoardServices.getArtBoards()
      setArtboards(data?.artboards)



    } catch (error) {
      console.log(error);

    } finally {
      console.log('asdasdad')
    }
  }

  const onSubmit = async (data) => {
    try {
      let obj = {
        title: data?.artBoardName,
        description: data?.description
      }


      const { responseCode } = await ArtBoardServices.CreateArtBoard(obj)
      console.log(responseCode);
      if (responseCode == 200) {
        getArtBoards()
        setValues('artBoardName','')
        setValues('description','')
        // handleClose()
      }




    } catch (error) {
      console.log(error);

    } finally {
      console.log('asdasdad')
    }

  };

  
  const [value, setValue] = useState(0); // State for the selected tab
  const [inputValue, setInputValue] = useState("");
  const [itemsToShow, setItemsToShow] = useState(4); // Default icons per row
  const [currentIndex, setCurrentIndex] = useState(0);

  const popupRef = useRef(null); // Ref to measure popup size

  useEffect(() => {
    if (open) {
      setInputValue("");
      setValue(0); // Reset the tab to the first one when the popup opens
      setCurrentIndex(0); // Reset current index
      updateItemsToShow(); // Adjust icons shown based on popup size
    }
  }, [open]);

  const updateItemsToShow = () => {
    const width = popupRef.current?.offsetWidth || window.innerWidth; // Measure popup width
    if (width >= 1200) setItemsToShow(4); // Large screens show 4 icons
    else if (width >= 900) setItemsToShow(3); // Medium screens show 3 icons
    else if (width >= 600) setItemsToShow(2); // Small screens show 2 icons
    else setItemsToShow(1); // Extra small screens show 1 icon
  };

  useEffect(() => {
    // Add resize event listener for dynamic updates
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
    getArtBoards()
  }, []);

  const handleSidebarChange = (index) => setValue(index);

  const handleOpenPopup = () => console.log("Popup opened");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg" // Changed to lg for larger width
      sx={{
        "& .MuiDialog-paper": {
          width: "95%", // Increased width percentage
          borderRadius: "20px",
        },
      }}
    >
      <Box
        ref={popupRef}
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

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    placeholder="ArtBoard Name"
                    {...register("artBoardName")}
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderRadius: 4 },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    placeholder="Description"
                    {...register("description")}
                    multiline
                    rows={5}
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderRadius: 4 },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} display={'flex'} justifyContent={'flex-end'} >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#837fcb",
                      color: "white",
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: "#5e24a6",
                      },
                    }}
                    startIcon={<AddIcon />}
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>
            </form>

            <Box sx={{ flex: 1 }}>
              {value === 0 && (
                <Box>
                  <RecentDesign data={artboards} height="100%" top="40%" left="32%" />
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

import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  Box,
  Typography,
  InputAdornment,
  TextField,
  Button,
<<<<<<< HEAD
  useMediaQuery,
=======
  Grid,
>>>>>>> 43aba46ec7a9eb52c09e5314af1e46b13aaf04dc
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import NewDesignSideBar from "./NewDesignSideBar"; // Import Sidebar
import IconCircle from "../iconCircle/IconCircle";
import RecentDesign from "../recentDesigns/RecentDesign";
import { useForm } from "react-hook-form";
import ArtBoardServices from "../../services/ArtBoardServices";

<<<<<<< HEAD
const NewDesignPopup = ({ open, onClose }) => {
  const [value, setValue] = useState(0);
=======
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
        handleClose()
      }




    } catch (error) {
      console.log(error);

    } finally {
      console.log('asdasdad')
    }

  };

  
  const [value, setValue] = useState(0); // State for the selected tab
>>>>>>> 43aba46ec7a9eb52c09e5314af1e46b13aaf04dc
  const [inputValue, setInputValue] = useState("");
  const [itemsToShow, setItemsToShow] = useState(4);
  const [currentIndex, setCurrentIndex] = useState(0);

  const popupRef = useRef(null);

  const isMobileView = useMediaQuery("(max-width: 650px)"); // Detect small screens

  useEffect(() => {
    if (open) {
      setInputValue("");
      setValue(0);
      setCurrentIndex(0);
      updateItemsToShow();
    }
  }, [open]);

  const updateItemsToShow = () => {
    const width = popupRef.current?.offsetWidth || window.innerWidth;
    if (width >= 1200) setItemsToShow(5);
    else if (width >= 900) setItemsToShow(4);
    else if (width >= 600) setItemsToShow(3);
    else if (width >= 400) setItemsToShow(3);
    else setItemsToShow(2);
  };

  useEffect(() => {
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
      maxWidth="lg"
      sx={{
        "& .MuiDialog-paper": {
          width: "95%",
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
          <Typography variant="h5" sx={{ fontWeight: "bold", textAlign:isMobileView? "center":"none"}}>
            Create a Design
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobileView ? "column" : "row",
            alignItems: isMobileView ? "center" : "flex-start",
            padding: "0 16px",
            gap: 2,
          }}
        >
          <Box
            sx={{
              width: isMobileView ? "100%" : { xs: "120px", sm: "200px", md: "250px" },
              flexShrink: 0,
            }}
          >
            {/* Pass isMobileView to Sidebar */}
            <NewDesignSideBar
              onTabChange={handleSidebarChange}
              isMobileView={isMobileView}
            />
          </Box>

<<<<<<< HEAD
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 2,
        gap: 1, // Reduced gap for smaller screens
      }}
    >
      <TextField
        variant="outlined"
        placeholder="What would you like to create?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        sx={{
          flexGrow: 1,
          maxWidth: { xs: "100%", sm: 400 }, // Decrease maxWidth for smaller screens
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
          marginLeft: isMobileView ? 0 : 1, // Adjust margin left for smaller screens
          padding: isMobileView ? "5px 32px" : "8px 16px", // Reduce padding for mobile
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
=======
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
                      backgroundColor: "#7731d8",
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
>>>>>>> 43aba46ec7a9eb52c09e5314af1e46b13aaf04dc

            <Box sx={{ flex: 1 }}>
              {value === 0 && (
                <Box>
<<<<<<< HEAD
                  <IconCircle
                    itemsToShow={itemsToShow}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                  />
                  <RecentDesign height="200px" top="40%" left="22%" />
=======
                  <RecentDesign data={artboards} height="100%" top="40%" left="32%" />
>>>>>>> 43aba46ec7a9eb52c09e5314af1e46b13aaf04dc
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

import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, Grid, IconButton, TextField, Typography } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import GridViewIcon from "@mui/icons-material/GridView";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import img1 from "../../Images/img1.png";
import img2 from "../../Images/img2.png";
import img3 from "../../Images/img3.png";
import ArtBoardServices from "../../services/ArtBoardServices";
import thumb from '../../Images/thumb.png';
import artboardImg from '../../Images/img.jpeg';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ConfirmationDialog from "../Dialogs/ConfirmationDialog";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";

// Sample documents data
const documents = [
  {
    title: "Document Name 1",
    description: "Description for Document 1",
    imageUrl: img1,
  },
  {
    title: "Document Name 2",
    description: "Description for Document 2",
    imageUrl: img2,
  },
  {
    title: "Document Name 3",
    description: "Description for Document 3",
    imageUrl: img3,
  },
  {
    title: "Document Name 4",
    description: "Description for Document 4",
    imageUrl: img1,
  },
  {
    title: "Document Name 5",
    description: "Description for Document 5",
    imageUrl: img3,
  },

];

// IconButton component for hover icons
const HoverIcons = ({ onStarClick, onMoreClick }) => (
  <Box display="flex" gap={1}>
    <IconButton
      size="small"
      sx={{
        backgroundColor: "white",
        borderRadius: "4px",
        border: "1px solid grey",
        "&:hover": {
          backgroundColor: "#7731d8",
          "& .MuiSvgIcon-root": { color: "white" },
        },
      }}
      onClick={onStarClick}
    >
      <DeleteOutlineIcon sx={{ color: "black" }} />
    </IconButton>

    <IconButton
      size="small"
      sx={{
        backgroundColor: "white",
        borderRadius: "4px",
        border: "1px solid grey",
        "&:hover": {
          backgroundColor: "#7731d8",
          "& .MuiSvgIcon-root": { color: "white" },
        },
      }}
      onClick={onMoreClick}
    >
      <MoreHorizIcon sx={{ color: "black" }} />
    </IconButton>
  </Box>
);

const RecentDesign = ({ height, data, }) => {

  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState("grid");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedArtBoard, setSelectedArtBoard] = useState(null)
  const [confirmationDialog, setConfirmationDialog] = useState(false)
  const [open2, setOpen2] = useState(false)
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    setValue: setValue2,
    getValues: getValues2,
    watch,
    formState: { errors: errors2 },

  } = useForm();

  const [artboards, setArtboards] = useState(data)

  console.log(data, 'datadata');


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
  const UpdateArtBoard = async (data) => {
    try {
      let obj = {
        id:selectedArtBoard?._id,
        title: data?.artBoardName,
        description: data?.description
      }


      const { responseCode } = await ArtBoardServices.UpdateArtBoard(obj)
      console.log(responseCode);
      if (responseCode == 200) {
        getArtBoards()
        setValue2('artBoardName', '')
        setValue2('description', '')
        setOpen2(false)
      }




    } catch (error) {
      console.log(error);

    } finally {
      console.log('asdasdad')
    }

  };
  const handleDeleteArtBoard = async (data) => {
    setConfirmationDialog(false)
    console.log(data);

    try {
      let params = {

        id: selectedArtBoard?._id
      }


      const { responseCode } = await ArtBoardServices.DeleteArtBoard(params)
      console.log(responseCode);

      if (responseCode == 200) {
        getArtBoards()

      }



    } catch (error) {
      console.log(error);

    } finally {
      console.log('asdasdad')
    }

  };



  useEffect(() => {
    if(data){
      setArtboards(data)

    }
  }, [data])

  return (
    <Box p={2} >
<Dialog
        open={open2}
        onClose={() => setOpen2(false)}
        fullWidth
        maxWidth="sm" // Changed to lg for larger width
        sx={{
          "& .MuiDialog-paper": {
            width: "95%", // Increased width percentage
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


            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <form onSubmit={handleSubmit2(UpdateArtBoard)}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={12}>
                    <TextField
                      size="small"
                      variant="outlined"
                      placeholder="ArtBoard Name"
                      {...register2("artBoardName")}
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderRadius: 2 },
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                     size="small"
                      variant="outlined"
                      placeholder="Description"
                      {...register2("description")}
                      multiline
                      rows={5}
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": { borderRadius: 2 },
                        },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} display={'flex'} justifyContent={'flex-end'} pb={2} >
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
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </form>

              {/* <Box sx={{ flex: 1 }}>
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
              </Box> */}
            </Box>
          </Box>
        </Box>
      </Dialog>
      <ConfirmationDialog
        open={confirmationDialog}
        onClose={() => setConfirmationDialog(false)}
        message={"Are you sure you want to delete?"}
        action={() => {
          handleDeleteArtBoard()
        }}
      />
      {/* Header Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
       
      >
        <Typography variant="h5" fontWeight="bold">
          Recent Design
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          width="40px"
          height="40px"
          border="1px solid grey"
          borderRadius="4px"
          justifyContent="center"
        >
          {viewMode === "grid" ? (
            <IconButton
              onClick={() => setViewMode("list")}
              color="primary"
              size="small"
            >
              <ListIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => setViewMode("grid")}
              color="primary"
              size="small"
            >
              <GridViewIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      <Box height={height}>
        {/* List View */}
        {viewMode === "list" && (
          <Box display="flex" flexDirection="column" gap={2}>
            {artboards?.map((doc, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                gap={2}
                p={2}
                border="1px solid grey"
                borderRadius="4px"
                bgcolor="white"
                sx={{ cursor: "pointer", position: "relative" }}
                
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Box
                  component="img"
                  src={artboardImg}
                  alt={doc.title}
                  onClick={() => navigate(`/graph/${doc?._id}`)}
                  width={{ xs: "60px", sm: "80px" }}
                  height={{ xs: "60px", sm: "80px" }}
                  borderRadius="4px"
                />
                <Box flexGrow={1} sx={{width:'100% !important'}}>
                  <Typography variant="body1" fontWeight="bold">
                    {doc.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doc.description}
                  </Typography>
                </Box>

                {/* Hover Icons for List View */}
                {hoveredIndex === index && (
                  <HoverIcons
                    onStarClick={() =>
                     {
                      setSelectedArtBoard(doc)
                        setConfirmationDialog(true)
                     }

                    }
                    onMoreClick={() =>
                    {
                      setOpen2(true)
                      setSelectedArtBoard(doc)
                      setValue2('artBoardName',doc?.title)
                      setValue2('description',doc?.description)
                    }
                      
                    }
                  />
                )}
              </Box>
            ))}
          </Box>
        )}

        {/* Grid View */}
        {viewMode === "grid" && (
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
            }}
            gap={2}
          >
            {artboards?.map((doc, index) => (
              <Box
                key={index}
                bgcolor="white"
                overflow="hidden"
                display="flex"
                flexDirection="column"
                justifyContent={{
                  xs: "flex-start",
                  md: "flex-start",
                  lg: "flex-start",
                  xl: "flex-start",
                }} // Center on large screens
                alignItems="center"
                position="relative"
                
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Box
                  component="img"
                  src={artboardImg}
                  alt={doc.title}
                  onClick={() => navigate(`/graph/${doc?._id}`)}
                  sx={{
                    cursor:"pointer",
                    width: "100%",
                    height: "70%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                    transform:
                      hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                      borderRadius:"15px"
                  }}
                />
                {/* Title and Description below the image */}
                <Box p={1} sx={{width:'100% !important'}} margin="2px 0">
                  <Typography variant="body1" fontWeight="bold" margin="2px 0">
                    {doc.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    margin="2px 0"
                  >
                    {doc.description}
                  </Typography>
                </Box>

                {/* Hover Icons for Grid View */}
                {hoveredIndex === index && (
                  <Box
                    position="absolute"
                    top={8}
                    right={8}
                    display="flex"
                    gap={1}
                  >
                    <HoverIcons
                      onStarClick={() => {

                        setSelectedArtBoard(doc)
                        setConfirmationDialog(true)
                      }

                      }
                      onMoreClick={() => {

                        {
                          setOpen2(true)
                          setSelectedArtBoard(doc)
                          setValue2('artBoardName',doc?.title)
                          setValue2('description',doc?.description)
                        }

                      }

                      }
                    />
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RecentDesign;

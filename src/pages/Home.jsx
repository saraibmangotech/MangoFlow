import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  IconButton,
  Dialog,
  Grid,
  TextField,
  InputLabel,
} from "@mui/material";
import RecentDesign from "../Components/recentDesigns/RecentDesign";
import AddIcon from "@mui/icons-material/Add";
import NewDesignPopup from "../Components/newDesign/NewDesignPopup";
import SideBar from "../Components/sideBar";
import ProfileAvatar from "../Components/profileAvatar/ProfileAvatar";
import CircleIcons from "../Components/iconCircle/IconCircle";
import ArtBoardServices from "../services/ArtBoardServices";
import { useLocation, useNavigate } from "react-router-dom";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import logo from "../Images/logo.png";
import artboardImg from "../Images/img.jpeg";
import {
  CottageOutlined as CottageOutlinedIcon,
  Cottage as CottageIcon,
  FolderOpenOutlined as FolderOpenOutlinedIcon,
  Folder as FolderIcon,
  AutoAwesomeMosaicOutlined as AutoAwesomeMosaicOutlinedIcon,
  AutoAwesomeMosaic as AutoAwesomeMosaicIcon,
} from "@mui/icons-material";
import IosShareSharpIcon from "@mui/icons-material/IosShareSharp";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";
import ArrowDropDownTwoToneIcon from "@mui/icons-material/ArrowDropDownTwoTone";
import thumb from "../Images/thumb.png";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UndoIcon from '@mui/icons-material/Undo';


const Home = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(5);
  const [open, setOpen] = useState(false);
  const [roleModal, setRoleModal] = useState(false);
  const [value, setValue] = useState(0);
  const {state} = useLocation()
  
  const popupRef = useRef(null); 
  const { register, handleSubmit, setValue: setValues } = useForm();
  const [open2, setOpen2] = useState(false);

  useEffect(()=>{
    if(state){
      setSelected(state)
    }
  },[state])
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    setValue: setValue2,
    getValues: getValues2,
    watch,
    formState: { errors: errors2 },
  } = useForm();


  const onSubmit = async (data) => {
    try {
      let obj = {
        title: data?.artBoardName,
        description: data?.description,
      };

      const { responseCode ,message} = await ArtBoardServices.CreateArtBoard(obj);
      console.log(responseCode);
      if (responseCode == 200) {
        getArtBoards();
        setValues("artBoardName", "");
        setValues("description", "");
        setOpen(false);
        toast.success(message)
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("asdasdad");
    }
  };

  const [artboards, setArtboards] = useState([]);

  const [selected, setSelected] = useState();

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showDesigns, setShowDesigns] = useState(true);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const handleSelect = (index) => {
    if (selected == index) {
      // If the same menu is clicked, deselect it (close menu)
      setSelected(null);
    } else {
      // Otherwise, set the new selection
      setSelected(index);
      if (index == 0) {
        navigate("/home");
      } else if (index == 1) {
        navigate("/role",{state :"1"});
      } else if (index == 2) {
        // Add navigation logic for index 2 if needed
      }
    }
  };
  
  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);


  const getIcon = (index) => {
    const icons = [
      [
        <AddCircleIcon
          sx={{
            color: selected == index ? "#837fcb" : "rgba(119, 49, 216, 0.7)",
            fontSize: "2rem",
          }}
        />,
        <AddCircleIcon
          sx={{ color: "rgba(119, 49, 216, 0.7)", fontSize: "2rem" }}
        />,
      ],
      [
        <AccountCircleIcon
          sx={{
            color: selected == index ? "#837fcb" : "rgba(119, 49, 216, 0.7)",
            fontSize: "2rem",
          }}
        />,
        <AccountCircleIcon
          sx={{ color: "rgba(119, 49, 216, 0.7)", fontSize: "2rem" }}
        />,
      ],
      [
        <UndoIcon
          sx={{
            color: selected == index ? "#837fcb" : "rgba(119, 49, 216, 0.7)",
            fontSize: "2rem",
          }}
        />,
        <UndoIcon
          sx={{ color: "rgba(119, 49, 216, 0.7)", fontSize: "2rem" }}
        />,
      ],
    ];
    const [activeIcon, inactiveIcon] = icons[index];
    return selected == index ? activeIcon : inactiveIcon;
  };

  const menuItems = [
    { label: "Create Artboard", index: 0 },
    { label: "Projects", index: 1 },
    { label: "Templates", index: 2 },
  ];

  const isMobileView = useMediaQuery("(max-width:600px)");

  const getArtBoards = async (page, limit, filter) => {
    try {
      const { data } = await ArtBoardServices.getArtBoards();
      setArtboards(data?.artboards);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("asdasdad");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1400) setItemsToShow(10);
      else if (window.innerWidth > 1100) setItemsToShow(6);
      else if (window.innerWidth > 900) setItemsToShow(4);
      else if (window.innerWidth > 750) setItemsToShow(3);
      else if (window.innerWidth > 350) setItemsToShow(2);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getArtBoards();
  }, []);


  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },

        overflow: "hidden",
        backgroundColor: "rgba(139, 61, 255, 0.1)",
        height: { md: "100vh", sm: "100vh", xs: "auto" },
      }}
    >
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm" 
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
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Create a Design
            </Typography>
          </Box>

          <Box sx={{ display: "flex", padding: "0 16px", gap: 2 }}>
            <Box
              sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={12}>
                    <TextField
                      size="small"
                      variant="outlined"
                      placeholder="ArtBoard Name"
                      {...register("artBoardName")}
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
                      {...register("description")}
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

                  <Grid
                    item
                    xs={12}
                    display={"flex"}
                    justifyContent={"flex-end"}
                    pb={2}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: "#837fcb",
                        color: "white",
                        borderRadius: 2,
                        "&:hover": {
                          backgroundColor: "#837fcb",
                        },
                      }}
                      startIcon={<AddIcon />}
                    >
                      Create
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

     
      {/* Sidebar on the left side */}
      <Box sx={{ display: { xs: "none", sm: "block" }, width: selected == 0 || selected == 1 || selected == 2 ?"320px" :"60px" ,  transition: "width 0.3s ease",}}>
        <Box
          sx={{
            // width: { xs: "100%", sm: 270, md: 320, lg: 320, xl: 350 },
            height: { xs: 70, sm: "100vh" },
            position: "sticky",
            top: "0px",
            width:selected == 0 || selected == 1 ||  selected == 2? "320px" :"60px",
            transition: "width 0.3s ease",
            // position: { xs: "fixed", sm: "relative" },
            bottom: { xs: 0, sm: "auto" },
            display: "flex",
            flexDirection: "row",
            border: "none",
            overflow: "hidden",
          }}
        >
          
          <List
            sx={{
              paddingTop: 2,
              // width: isMobileView ? "100%" : "20%",
              width:"60px",
              display: "flex",
              flexDirection: isMobileView ? "row" : "column",
              justifyContent: isMobileView ? "center" : "flex-start",
              alignItems: isMobileView ? "center" : "flex-start",
              backgroundColor: isMobileView ? "#fff" : "none",
              boder: isMobileView ? "1px solid #ccc" : "none",
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
                  color: selected == item.index ? "#837fcb" : "inherit",
                  padding: "8px 16px",
                  position: "relative",
                  cursor: "pointer",
                  mb:3,
                  backgroundColor:
                    selected == item.index
                      ? "rgba(119, 49, 216, 0.1)"
                      : "transparent",
                }}
              >
                <ListItemIcon
                  sx={{
                    justifyContent: "center",
                    color:
                      selected == item.index
                        ? "#837fcb"
                        : "rgba(119, 49, 216, 0.7)",
                    minWidth: "24px",
                  }}
                >
                  {getIcon(item.index)}
                </ListItemIcon>
                  
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

        
           {!isSmallScreen && selected == 0  && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginRight: 2,
                width: "100%",
                padding: 1,
                transition: "opacity 0.3s ease", 
                opacity: selected == 0 ? 1 : 0,
              }}
            >
              <Box
                sx={{
                  marginTop: "12px",
                }}
              >
                <img width="100px" src={logo} />
              </Box>
                

              <Box sx={{ display: "flex", gap: 2 }}>
            <Box
              sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={12}>
                    <TextField
                      size="small"
                      variant="outlined"
                      placeholder="ArtBoard Name"
                      {...register("artBoardName")}
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
                      {...register("description")}
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

                  <Grid
                    item
                    xs={12}
                    display={"flex"}
                    justifyContent={"flex-end"}
                    pb={2}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: "#837fcb",
                        color: "white",
                        borderRadius: 2,
                        width:"100%",
                        "&:hover": {
                          backgroundColor: "#837fcb",
                        },
                      }}
                      startIcon={<AddIcon />}
                    >
                      Create
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
           {!isSmallScreen && selected == 2  && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginRight: 2,
                width: "100%",
                padding: 1,
                transition: "opacity 0.3s ease", 
                opacity: selected == 2 ? 1 : 0,
              }}
            >
              <Box
                sx={{
                  marginTop: "12px",
                }}
              >
                <img width="100px" src={logo} />
              </Box>
                

              {showDesigns && (
                <Box sx={{ marginTop: 1, width: "100%" }}>
                  {artboards?.map((design, index) => (
                    <Box
                      key={design.id || index} 
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: 1,
                        borderRadius: "10px",
                        mb: 1,
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "rgba(119, 49, 216, 0.1)",
                        },
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <img
                        src={artboardImg}   
                        alt={design?.title || "Design"}
                        
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
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Box
                            sx={{
                              padding: "1px",
                              borderRadius: "5px",
                              "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                              },
                            }}
                            onClick={() => navigate(`/graph/${design?._id}`)}
                          >
                            <IconButton size="small" sx={{ color: "#000" }}>
                              <IosShareSharpIcon  />
                            </IconButton>
                          </Box>
{/* 
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
                          </Box> */}
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
      </Box>

      {/* Main Scrollable Container */}
      <Box
        sx={{
          // flexGrow: 1,
          overflowY: "auto",
          padding: "5px",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "flex-end", 
          width:"100%",

        }}
      >
        
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "5px 20px",
            border: "2px solid #ddd",
            borderRadius: "16px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            boxSizing: "border-box",
            width:"100%",
            // width: { xs: "100%", sm: "85%", md: "84%", lg: "88%", xl: "90%" },
            minHeight: {
              xs: "800px",
              sm: "1000px",
              md: "1950px",
              xl: "2000px",
            },
            overflow: "hidden",
          }}
        >
          <ProfileAvatar />

          <Box
            sx={{
              width: "100%",
              background:"#837fcb",
             
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4rem",
              borderRadius: 2,
              boxSizing: "border-box",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: {
                  xs: "1.5rem",
                  sm: "1.75rem",
                  md: "2rem",
                  lg: "2.25rem",
                },
                padding: "90px",
                textAlign: "center",
              }}
            >
             Visualize, Organize, Optimize
            </Typography>
          </Box>

    
          <Box>
            <CircleIcons itemsToShow={itemsToShow} />
          </Box>

       
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 3,
              marginBottom: 3,
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#837fcb",
                color: "white",
                display: isMobileView ? "flex" : "none",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#837fcb",
                },
              }}
              startIcon={<AddIcon />}
              onClick={handleOpenPopup}
            >
              Create a Design
            </Button>
          </Box>

     
          <Box
            sx={{
              overflowY: "hidden",
              marginBottom: 2,
            }}
          >
            <RecentDesign data={artboards} height="100%" top="40%" left="32%" />
          </Box>

          <NewDesignPopup
            data={artboards}
            open={isPopupOpen}
            onClose={handleClosePopup}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

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
import { useNavigate } from "react-router-dom";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import logo from "../Images/logo.png";
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

const Home = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(5);
  const [open, setOpen] = useState(false);
  const [roleModal, setRoleModal] = useState(false);
  const [value, setValue] = useState(0);

  const popupRef = useRef(null); 
  const { register, handleSubmit, setValue: setValues } = useForm();
  const [open2, setOpen2] = useState(false);

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

      const { responseCode } = await ArtBoardServices.CreateArtBoard(obj);
      console.log(responseCode);
      if (responseCode == 200) {
        getArtBoards();
        setValues("artBoardName", "");
        setValues("description", "");
        setOpen(false);
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
    setShowDesigns(!showDesigns); 
    console.log(data);
  };

  const getIcon = (index) => {
    const icons = [
      [
        <CottageIcon
          sx={{
            color: selected === index ? "#7731d8" : "rgba(119, 49, 216, 0.7)",
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
            color: selected === index ? "#7731d8" : "rgba(119, 49, 216, 0.7)",
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
            color: selected === index ? "#7731d8" : "rgba(119, 49, 216, 0.7)",
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

      {/* <Dialog
  open={roleModal}
  onClose={() => setRoleModal(false)}
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
        Create Role
      </Typography>
    </Box>

    <Box sx={{ display: "flex", padding: "0 16px", gap: 2 }}>
      <Box
        sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <form onSubmit={handleSubmit3(onSubmit3)}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
            <InputLabel>Select Role</InputLabel>
              <TextField
                size="small"
                variant="outlined"
                placeholder="Enter Role"
                {...register3("role", { required: "Role is required" })}
                fullWidth
                error={!!errors3.role}
                helperText={errors3.role?.message}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderRadius: 2 },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
            <InputLabel>Select Background Color</InputLabel>
           <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      flexWrap: "wrap",
                    }}
                  >
                    {[
                      "#000000", // Black (Default)
                      "#FF5733", // Red-Orange
                      "#33FF57", // Green
                      "#3357FF", // Blue
                      "#FFD700", // Yellow
                      "#8A2BE2", // Violet
                      "#FF1493", // Deep Pink
                      "#FFA500", // Orange
                      "#00CED1", // Dark Turquoise
                    ].map((color) => (
                      <Box
                        key={color}
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: color,
                          borderRadius: "50%",
                          cursor: "pointer",
                          border: selectedColor === color ? "3px solid black" : "none",
                        }}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </Box>
              <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
                Selected Color: {selectedColor || "None"}
              </Typography>
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
      </Box>
    </Box>
  </Box>
</Dialog> */}


      {/* Sidebar on the left side */}
      <Box sx={{ display: { xs: "none", sm: "block" }, width: "200px" }}>
        <Box
          sx={{
            width: { xs: "100%", sm: 270, md: 320, lg: 320, xl: 350 },
            height: { xs: 70, sm: "100vh" },
            position: "sticky",
            top: "0px",
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
              width: isMobileView ? "100%" : "20%",
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
                  color: selected === item.index ? "#7731d8" : "inherit",
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
                        ? "#7731d8"
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
                <img width="100px" src={logo} />
              </Box>
              <Button
                variant="contained"
                size="small"
                onClick={() => setOpen(true)}
                sx={{
                  backgroundColor: "#7731d8",
                  color: "white",
                  borderRadius: 2,
                  padding: "8px 30px",
                  fontSize: "clamp(0.5rem, 1vw, 0.65rem)",
                  lineHeight: 1.2,
                  margin: "5px 0",
                  width: "100%",
                  "&:hover": { backgroundColor: "#5e24a6" },
                }}
                startIcon={<AddIcon fontSize="small" />}
              >
                Create a Design
              </Button>

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
                  <CardMembershipIcon
                    fontSize="small"
                    sx={{ color: "#fdbc68" }}
                  />
                }
              >
                Try Pro for 30 days
              </Button> */}
              <Button
                variant="contained"
                size="small"
                onClick={() => navigate("/project")}
                sx={{
                  backgroundColor: "#7731d8",
                  color: "white",
                  borderRadius: 2,
                  padding: "8px 30px",
                  fontSize: "clamp(0.5rem, 1vw, 0.65rem)",
                  lineHeight: 1.2,
                  margin: "5px 0",
                  width: "100%",
                  "&:hover": { backgroundColor: "#5e24a6" },
                }}
                startIcon={<AddIcon fontSize="small" />}
              >
                Create Role Structure
              </Button>

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
                  {artboards?.map((design, index) => (
                    <Box
                      key={design.id || index} // Use unique ID if available, else fallback to index
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
                      {/* Design Image */}
                      <img
                        src={thumb} // Replace with a real URL or placeholder
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
      </Box>

      {/* Main Scrollable Container */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "5px",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "flex-end", // Align to the right
        }}
      >
        {/* Bordered Box with */}
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
            width: { xs: "100%", sm: "85%", md: "84%", lg: "88%", xl: "90%" },
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

          {/* Square Box with Gradient Background */}
          <Box
            sx={{
              width: "100%",
              background: `
                radial-gradient(100.99% 100.73% at 0% 0%, rgba(0, 196, 204, .726) 0%, #00c4cc 0.01%, rgba(0, 196, 204, 0) 100%),
                radial-gradient(68.47% 129.02% at 22.82% 97.71%, #6420ff 0%, rgba(100, 32, 255, 0) 100%),
                radial-gradient(106.1% 249.18% at 0% 0%, #00c4cc 0%, rgba(0, 196, 204, 0) 100%),
                radial-gradient(64.14% 115.13% at 5.49% 50%, #6420ff 0%, rgba(100, 32, 255, 0) 100%),
                #7d2ae7`,
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
              Droptober is coming
            </Typography>
          </Box>

          {/* IconCircle Component */}
          <Box>
            <CircleIcons itemsToShow={itemsToShow} />
          </Box>

          {/* Create New Button */}
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
                backgroundColor: "#7731d8",
                color: "white",
                display: isMobileView ? "flex" : "none",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#5e24a6",
                },
              }}
              startIcon={<AddIcon />}
              onClick={handleOpenPopup}
            >
              Create a Design
            </Button>
          </Box>

          {/* Recent Designs Section */}
          <Box
            sx={{
              overflowY: "hidden",
              marginBottom: 2,
            }}
          >
            <RecentDesign data={artboards} height="100%" top="40%" left="32%" />
          </Box>

          {/* Design Popup */}
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

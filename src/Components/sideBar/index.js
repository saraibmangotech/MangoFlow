import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import logo from "../../Images/logo.png";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UndoIcon from '@mui/icons-material/Undo';
import {
  CottageOutlined as CottageOutlinedIcon,
  Cottage as CottageIcon,
  FolderOpenOutlined as FolderOpenOutlinedIcon,
  Folder as FolderIcon,
  AutoAwesomeMosaicOutlined as AutoAwesomeMosaicOutlinedIcon,
  AutoAwesomeMosaic as AutoAwesomeMosaicIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import IosShareSharpIcon from "@mui/icons-material/IosShareSharp";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";
import ArrowDropDownTwoToneIcon from "@mui/icons-material/ArrowDropDownTwoTone";
import Img1 from "../../Images/img1.png";
import Img2 from "../../Images/img3.png";
import Img3 from "../../Images/img2.png";
import NewDesignPopup from "../newDesign/NewDesignPopup";
import ProfileAvatar from "../profileAvatar/ProfileAvatar";

const recentDesigns = [
  { title: "Design 1", imgSrc: Img1 },
  { title: "Design 2", imgSrc: Img2 },
  { title: "Design 3", imgSrc: Img3 },
];

const SideBar = (data) => {
  console.log(data?.data, 'sidebar');

  const [selected, setSelected] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showDesigns, setShowDesigns] = useState(true); // New state for toggle
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMobileView = useMediaQuery("(max-width:600px)");
  const [artBoards, setArtBoards] = useState([])
  const handleSelect = (index) => {
    setSelected(index);
    if (index == 0) {
      navigate("/home" ,{state:"0"});
    } else if (index == 1) {
     
    } else if (index == 2) {
      navigate("/home" ,{state:2});
    }
  };
  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const toggleDesigns = () => {
    setShowDesigns(!showDesigns); // Toggle designs visibility
    console.log(data);
    
  };

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
            fontSize: "1.5rem",
          }}
        />,
        <UndoIcon
          sx={{ color: "rgba(119, 49, 216, 0.7)", fontSize: "1.5rem" }}
        />,
      ],
    ];
    const [activeIcon, inactiveIcon] = icons[index];
    return selected == index ? activeIcon : inactiveIcon;
  };

  const menuItems = [
    { label: "Home", index: 0 },
    { label: "Projects", index: 1 },
    { label: "Templates", index: 2 },
  ];

  useEffect(() => {

    setArtBoards(data?.data)
  }, [data])

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },

        overflow: "hidden",
        // backgroundColor: "rgba(139, 61, 255, 0.1)",
        height: { md: "100vh", sm: "100vh", xs: "auto" },
      }}
    >
   
      <Box sx={{ display: { xs: "none", sm: "block" }, width:"60px !important" }}>
        <Box
          sx={{
            // width: { xs: "100%", sm: 270, md: 320, lg: 320, xl: 350 },
            height: { xs: 70, sm: "100vh" },
            position: "sticky",
            top: "0px",
            width:"60px !important",
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
              groundColor: "#ccc",
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
                        groundColor: "#837fcb",
                        color: "white",
                        borderRadius: 2,
                        width:"100%",
                        "&:hover": {
                          groundColor: "#837fcb",
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
                        src={thumb}   
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

                      {hoveredIndex == index && (
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

    
    </Box>
  );
};

export default SideBar;

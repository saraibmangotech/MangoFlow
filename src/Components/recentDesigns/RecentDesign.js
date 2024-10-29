import React, { useState } from "react";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import GridViewIcon from "@mui/icons-material/GridView";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import img1 from "../../Images/img1.png";
import img2 from "../../Images/img2.png";
import img3 from "../../Images/img3.png";

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
    imageUrl: img3,
  },
  {
    title: "Document Name 5",
    description: "Description for Document 5",
    imageUrl: img2,
  },
  {
    title: "Document Name 6",
    description: "Description for Document 6",
    imageUrl: img3,
  },
  {
    title: "Document Name 7",
    description: "Description for Document 7",
    imageUrl: img3,
  },
  {
    title: "Document Name 8",
    description: "Description for Document 8",
    imageUrl: img2,
  },
  
];

// IconButton component for hover icons
const HoverIcons = ({ onStarClick, onMoreClick, isMobileView }) => (
  <Box display="flex" gap={1}>
  <IconButton
    size={isMobileView ? "small" : "medium"} // Adjust button size based on screen size
    sx={{
      padding: isMobileView ? "4px" : "8px", // Adjust padding for smaller buttons
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
    <StarBorderIcon sx={{ color: "black", fontSize: isMobileView ? "20px" : "24px" }} />
  </IconButton>

  <IconButton
    size={isMobileView ? "small" : "medium"} // Adjust button size based on screen size
    sx={{
      padding: isMobileView ? "4px" : "8px", // Adjust padding for smaller buttons
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
    <MoreHorizIcon sx={{ color: "black", fontSize: isMobileView ? "20px" : "24px" }} />
  </IconButton>
</Box>
);

const RecentDesign = ({ height }) => {
  const [viewMode, setViewMode] = useState("grid");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const isMobileView = useMediaQuery("(max-width: 600px)"); // Detect small screens

  return (
    <Box p={2}>
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
              sx={{ color: "black" }}
              size="small"
            >
              <ListIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => setViewMode("grid")}
              sx={{ color: "black" }}
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
            {documents.map((doc, index) => (
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
                onClick={() => console.log(`Clicked: ${doc.title}`)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Box
                  component="img"
                  src={doc.imageUrl}
                  alt={doc.title}
                  width={{ xs: "60px", sm: "80px" }}
                  height={{ xs: "60px", sm: "80px" }}
                  borderRadius="4px"
                />
                <Box flexGrow={1}>
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
                      console.log(`Star clicked: ${doc.title}`)
                    }
                    onMoreClick={() =>
                      console.log(`More clicked: ${doc.title}`)
                    }
                    isMobileView={isMobileView}
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
            {documents.map((doc, index) => (
              <Box
                key={index}
                bgcolor="white"
                overflow="hidden"
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="center"
                position="relative"
                onClick={() => console.log(`Clicked: ${doc.title}`)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Box
                  component="img"
                  src={doc.imageUrl}
                  alt={doc.title}
                  sx={{
                    cursor: "pointer",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                    transform:
                      hoveredIndex === index ? "scale(1.1)" : "scale(1)",
                  }}
                />
                {/* Title and Description below the image */}
                <Box p={1} margin="2px 0">
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    margin="2px 0"
                    fontSize={isMobileView ? "0.875rem" : "1rem"} // Adjust font size for small screens
                  >
                    {doc.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    margin="2px 0"
                    fontSize={isMobileView ? "0.75rem" : "0.875rem"} // Adjust font size for small screens
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
                      onStarClick={() =>
                        console.log(`Star clicked: ${doc.title}`)
                      }
                      onMoreClick={() =>
                        console.log(`More clicked: ${doc.title}`)
                      }
                      isMobileView={isMobileView}
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

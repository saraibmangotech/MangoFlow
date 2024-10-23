import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import GridViewIcon from "@mui/icons-material/GridView";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useNavigate } from "react-router-dom";

const RecentDesign = ({ height }) => {
  const [viewMode, setViewMode] = useState("grid");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const documents = [
    {
      title: "Document Name 1",
      description: "Description for Document 1",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      title: "Document Name 2",
      description: "Description for Document 2",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      title: "Document Name 3",
      description: "Description for Document 3",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      title: "Document Name 4",
      description: "Description for Document 4",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      title: "Document Name 5",
      description: "Description for Document 5",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      title: "Document Name 5",
      description: "Description for Document 5",
      imageUrl: "https://via.placeholder.com/100",
    }, {
      title: "Document Name 5",
      description: "Description for Document 5",
      imageUrl: "https://via.placeholder.com/100",
    }, {
      title: "Document Name 5",
      description: "Description for Document 5",
      imageUrl: "https://via.placeholder.com/100",
    }, {
      title: "Document Name 5",
      description: "Description for Document 5",
      imageUrl: "https://via.placeholder.com/100",
    }, {
      title: "Document Name 5",
      description: "Description for Document 5",
      imageUrl: "https://via.placeholder.com/100",
    }, {
      title: "Document Name 5",
      description: "Description for Document 5",
      imageUrl: "https://via.placeholder.com/100",
    }, {
      title: "Document Name 5",
      description: "Description for Document 5",
      imageUrl: "https://via.placeholder.com/100",
    }, {
      title: "Document Name 5",
      description: "Description for Document 5",
      imageUrl: "https://via.placeholder.com/100",
    },
  ];

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
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
            <IconButton onClick={() => setViewMode("list")} color="primary" size="small">
              <ListIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => setViewMode("grid")} color="primary" size="small">
              <GridViewIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      <Box height={height}>
        {viewMode === "list" && (
          <Box display="flex" flexDirection="column" gap={2}>
            {documents.map((doc, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={2}
                border="1px solid grey"
                borderRadius="4px"
                height="80px"
                bgcolor="white"
                onClick={() => console.log(`Clicked: ${doc.title}`)}
                sx={{ cursor: "pointer" }}
              >
                <Box display="flex" alignItems="center" gap={2} flexGrow={1}>
                  <Box
                    component="img"
                    src={doc.imageUrl}
                    alt="Document Thumbnail"
                    width="40px"
                    height="40px"
                    borderRadius="4px"
                  />
                  <Box>
                    <Typography variant="body1">{doc.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {doc.description}
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <IconButton
                    size="small"
                    sx={{
                      borderRadius: "4px",
                      backgroundColor: "white",
                      border: "1px solid grey",
                      "&:hover": { backgroundColor: "#7731d8" },
                      width: { xs: "24px", sm: "32px" },
                      height: { xs: "24px", sm: "32px" },
                    }}
                  >
                    <StarBorderIcon
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.25rem" },
                        color: "black",
                      }}
                    />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      borderRadius: "4px",
                      backgroundColor: "white",
                      border: "1px solid grey",
                      "&:hover": { backgroundColor: "#7731d8" },
                      width: { xs: "24px", sm: "32px" },
                      height: { xs: "24px", sm: "32px" },
                    }}
                  >
                    <MoreHorizIcon
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.25rem" },
                        color: "black",
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        )}
        {viewMode === "grid" && (
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(4, 1fr)",
              lg: "repeat(5, 1fr)",
            }}
            gap={2}
          >
            {documents.map((doc, index) => (
              <Box
                key={index}
                display="flex"
                flexDirection="column"
                alignItems="center"
                position="relative"
                border="1px solid grey"
                borderRadius="10px"
                bgcolor="white"
                onClick={() => console.log(`Clicked: ${doc.title}`)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                sx={{ cursor: "pointer" }}
              >
                {/* Document Image */}
                <Box display="flex" justifyContent="center" p={2}>
                  <Box
                    component="img"
                    src={doc.imageUrl}
                    alt="Document Thumbnail"
                    width="80px"
                    height="80px"
                    sx={{
                      border: "1px solid grey", // Adding border to the image
                      borderRadius: "4px",
                    }}
                  />
                </Box>

                {/* Title and Description inside the box */}
                <Box textAlign="center" p={1}>
                  <Typography variant="body1" fontWeight="bold">
                    {doc.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doc.description}
                  </Typography>
                </Box>

                {/* Hover options */}
                <Box
                  position="absolute"
                  top={0}
                  right={0}
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{ display: hoveredIndex === index ? "flex" : "none" }}
                >
                  <Box
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "4px",
                      border: "1px solid grey",
                      margin: "4px",
                      "&:hover": { backgroundColor: "#7731d8" },
                    }}
                  >
                    <IconButton size="small">
                      <StarBorderIcon
                        sx={{
                          fontSize: { xs: "1rem", sm: "1.25rem" },
                          color: "black",
                        }}
                      />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "4px",
                      border: "1px solid grey",
                      margin: "4px",
                      "&:hover": { backgroundColor: "#7731d8" },
                    }}
                  >
                    <IconButton size="small">
                      <MoreHorizIcon
                        sx={{
                          fontSize: { xs: "1rem", sm: "1.25rem" },
                          color: "black",
                        }}
                      />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RecentDesign;

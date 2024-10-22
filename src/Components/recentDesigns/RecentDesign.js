import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import GridViewIcon from "@mui/icons-material/GridView";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useNavigate } from "react-router-dom";

const RecentDesign = ({ height, top, left }) => {
  const [viewMode, setViewMode] = useState("grid");
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  // Define the document names array here
  const documentNames = [
    "Document Name 1",
    "Document Name 2",
    "Document Name 3",
    "Document Name 4",
    "Document Name 5",
    "Document Name 6",
    "Document Name 7","Document Name 8","Document Name 9",
  ];

  return (
    <Box p={2}>
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
        {viewMode === "list" && (
          <Box display="flex" flexDirection="column" gap={2}>
            {documentNames.map((docName, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={2}
                border="1px solid grey"
                borderRadius="4px"
                height="60px"
                bgcolor="white"
                onClick={() => console.log(`Clicked: ${docName}`)}
                sx={{ cursor: "pointer" }}
              >
                <Box display="flex" alignItems="center" gap={2} flexGrow={1}>
                  <Box
                    component="img"
                    src="https://via.placeholder.com/40"
                    alt="Document Thumbnail"
                    width="40px"
                    height="40px"
                    borderRadius="4px"
                  />
                  <Typography variant="body1">{docName}</Typography>
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
            gap={2} // Ensure there's a gap between the grid items
          >
            {documentNames.map((docName, index) => (
              <Box
                key={index}
                display="flex"
                flexDirection="column"
                position="relative"
                p={2}
                border="1px solid grey"
                borderRadius="10px"
                bgcolor="white"
                height="100px" // Increased height of grid items
                onClick={() => console.log(`Clicked: ${docName}`)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                sx={{ cursor: "pointer" }}
              >
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

                <Box
                  display={hoveredIndex === index ? "flex" : "none"}
                  justifyContent="center"
                  alignItems="center"
                  position="absolute"
                  top={top}
                  left={left}
                  transform="translate(-50%, -50%)"
                  zIndex={1}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ width: "100%" }}
                  >
                    <IconButton
                      size="small"
                      sx={{
                        borderRadius: "6px",
                        backgroundColor: "#7731d8",
                        color: "white",
                        border: "1px solid grey",
                        padding: { xs: "4px 8px", md: "8px 16px" },
                        fontSize: { xs: "0.7rem", md: "0.875rem" },
                        "&:hover": { backgroundColor: "#673bb5" },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/select");
                      }}
                    >
                      Select
                    </IconButton>
                  </Box>
                </Box>

                <Typography variant="body1" textAlign="center" mt={2}>
                  {docName}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RecentDesign;

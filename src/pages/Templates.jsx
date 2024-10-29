import { Box } from "@mui/material"
import SideBar from "../Components/sideBar"
const Templates= () =>{
  return(
  
    <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      height: "100vh",
      overflow: "hidden",
      backgroundColor: "rgba(139, 61, 255, 0.1)",
    }}
  >
    {/* Sidebar on the left side */}
    <Box sx={{ display: { xs: "none", sm: "block" }, width: "200px" }}>
      <SideBar />
    </Box>

    {/* Main Scrollable Container */}
    <Box
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        padding: "10px",
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
          padding: { xs: "15px", sm: "20px" }, 
          border: "2px solid #ddd",
          borderRadius: "16px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          boxSizing: "border-box",
          width: { xs: "100%", sm: "85%", md: "84%", lg: "88%", xl: "90%" }, 
          minHeight: "fit-content", 
          maxHeight: "100%", 
          overflow: "hidden",
        }}
      >
   <div>Welcome Template page</div>
      </Box>
    </Box>

    {/* Sidebar for small screens */}
    <Box sx={{ display: { xs: "block", sm: "none" }, width: "100%" }}>
      <SideBar />
    </Box>
  </Box>
)
}
export default Templates
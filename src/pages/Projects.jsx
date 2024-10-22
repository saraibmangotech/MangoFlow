import { Box } from "@mui/material"
import SideBar from "../Components/sideBar"

const Projects= () =>{
    return(
        <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Left Sidebar */}
      <SideBar />
        <div>Welcome project page</div>
        </Box>
    )
}
export default Projects
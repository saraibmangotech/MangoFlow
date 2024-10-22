import { Box } from "@mui/material"
import SideBar from "../Components/sideBar"
const Templates= () =>{
    return(
        <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Left Sidebar */}
      <SideBar />
        <div>Welcome Templates page</div>
        </Box>
    )
}
export default Templates
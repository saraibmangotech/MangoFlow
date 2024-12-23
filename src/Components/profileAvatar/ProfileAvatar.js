import React, { useState } from "react";
import { Box, Avatar, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from "../../hooks/useProvideAuth";
import { useNavigate } from "react-router-dom";
import ConfirmationDialog from "../Dialogs/ConfirmationDialog";

function ProfileAvatar() {
  const {user}= useAuth()
  const [openLogoutDialog ,setOpenLogoutDialog] = useState(false)
  const navigate = useNavigate()  

  const handleLogout =()=>{
    localStorage.removeItem("user")
    navigate("/")
  }
  console.log(user)
  return (
    <>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%",
        padding: 1,
        marginBottom: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 1,
          width: 40,
          height: 40,
          borderRadius: "8px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "lightgrey",
            transition: "background-color 0.3s",
          },
        }}
        onClick={()=>setOpenLogoutDialog(true)}
      >
        <LogoutIcon sx={{ color: "black", fontSize: 25 }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 1,
          width: 40,
          height: 40,
          borderRadius: "8px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "lightgrey",
            transition: "background-color 0.3s",
          },
        }}
      >
        <SettingsIcon sx={{ color: "black", fontSize: 25 }} />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginRight: 2,
          justifyContent: "center",
          width: 40,
          height: 40,
          borderRadius: "8px",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "lightgrey",
            transition: "background-color 0.3s",
          },
        }}
      >
        <NotificationsNoneIcon sx={{ color: "black", fontSize: 25 }} />
      </Box>

      <Avatar
        alt={user?.name}
        src="/path/to/avatar.jpg"
        sx={{ width: 30, height: 30 }}
      />
      <Typography
        variant="body1"
        sx={{
          maxWidth: { xs: "100px", sm: "150px" },
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          paddingLeft: 1,
        }}
      >
       {user?.name} 
      </Typography>
    </Box>
    <ConfirmationDialog
        open={openLogoutDialog}
        onClose={() => setOpenLogoutDialog(false)}
        message={"Are you sure you want to Logout?"}
        action={() => {
          console.log("asdasda");
          handleLogout();
        }}
      />
    </>
  );
}

export default ProfileAvatar;

import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

function ProfileAvatar() {
  return (
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
          marginRight: 2,
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
        <SettingsIcon sx={{ color: "black", fontSize: 30 }} />
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
        <NotificationsNoneIcon sx={{ color: "black", fontSize: 30 }} />
      </Box>

      <Avatar
        alt="Profile"
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
        dummy name
      </Typography>
    </Box>
  );
}

export default ProfileAvatar;

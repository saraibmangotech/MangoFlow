import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';

function ProfileAvatar() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'flex-end', 
        width: '100%',
        padding: 1,
        marginBottom: 3,
      }}
    >
      {/* Profile Section */}
      <Box 
        sx={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingRight: 1, 
          gap: 1, 
        }}
      >
        <Avatar 
          alt="Profile" 
          src="/path/to/avatar.jpg" 
          sx={{ width: 30, height: 30 }} 
        />
        <Typography
          variant="body1"
          sx={{
            maxWidth: { xs: '100px', sm: '150px' }, 
            whiteSpace: 'nowrap', 
            textWrap:"wrap",
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            paddingLeft: 1, 
          }}
        >
          dummy name
        </Typography>
      </Box>
    </Box>
  );
}

export default ProfileAvatar;

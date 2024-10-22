// src/pages/Login.js
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Snackbar,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    navigate('/home');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `
          radial-gradient(100.99% 100.73% at 0% 0%, rgba(0, 196, 204, 0.726) 0%, #00c4cc 0.01%, rgba(0, 196, 204, 0) 100%), 
          radial-gradient(68.47% 129.02% at 22.82% 97.71%, #6420ff 0%, rgba(100, 32, 255, 0) 100%), 
          radial-gradient(106.1% 249.18% at 0% 0%, #00c4cc 0%, rgba(0, 196, 204, 0) 100%), 
          radial-gradient(64.14% 115.13% at 5.49% 50%, #6420ff 0%, rgba(100, 32, 255, 0) 100%), 
          #7d2ae7;
        `,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: { xs: '20px', sm: '30px', md: '40px' }, // Responsive padding
          borderRadius: '16px',
          width: { xs: '90%', sm: '400px', md: '450px' }, // Responsive width
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #00a3a8, #7731d8)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }, // Responsive font size
          }}
        >
          Welcome Back
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: '#6b7280',
            fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
          }}
        >
          Login to your account
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#7731d8',
              },
              '& label.Mui-focused': {
                color: '#7731d8',
              },
              fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
            }}
            {...register('email', { required: 'Email is required', pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: 'Email is not valid' } })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ''}
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ''}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#7731d8',
              },
              '& label.Mui-focused': {
                color: '#7731d8',
              },
              fontSize: { xs: '0.9rem', sm: '1rem' }, // Responsive font size
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Remember Me and Forgot Password Section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember Me"
              sx={{
                color: '#6b7280',
                fontSize: { xs: '0.8rem', sm: '1rem' }, // Smaller font size on small screens
              }}
            />
            <Typography
              variant="body2"
              sx={{ color: '#7731d8', cursor: 'pointer', textAlign: 'right', fontSize: { xs: '0.8rem', sm: '1rem' } }} // Smaller font size on small screens
            >
              Forgot Password?
            </Typography>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#7731d8',
              '&:hover': { backgroundColor: '#7731d8' },
              padding: { xs: '12px', sm: '10px' }, // Responsive padding
              borderRadius: '8px',
              mb: 2,
              fontSize: { xs: '1rem', sm: '1rem' }, // Responsive font size
            }}
          >
            Login
          </Button>

          <Typography
            variant="body2"
            sx={{ color: '#6b7280', fontSize: { xs: '0.9rem', sm: '1rem' } }} // Responsive font size
          >
            Don’t have an account? <a href="/signup" style={{ color: '#7731d8' }}>Sign up</a>
          </Typography>
        </form>

        {/* Snackbar for showing errors */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message="Login failed. Please check your credentials."
        />
      </Paper>
    </Box>
  );
};

export default Login;

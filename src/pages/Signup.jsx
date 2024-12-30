// src/pages/Login.js
import React, { useState } from "react";
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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useProvideAuth";
import AuthServices from "../services/AuthServices";
import toast from "react-hot-toast";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const { userLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => {
  //   console.log(data);
  //   userLogin(data)
  //   navigate('/home');
  // };

  const SignUp = async (formData) => {
    const obj = {
        name:formData.name,
      email: formData.email,
      phone:formData.phone,
      password: formData.password,
    };
    // setLoading(true);
    try {
      const data = await AuthServices.register(obj);
      toast.success(data?.message || "Login successful!");
      if (data?.data?.token) {
        navigate("/home");
      }

      // if(data?.data?.role == "admin"){
      //   navigate("/dashboard");
      //   setName("/dashboard");
      // }else if(data?.data?.role == "employee"){
      //   navigate("/home");
      //   setName("/home");
      // }
    } catch (error) {
      toast.error(error || "Something went wrong. Please try again.");

      // ErrorToaster(error);
      console.log(error);
    } finally {
      // setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:'#f5f6fa'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: { xs: "20px", sm: "30px", md: "40px" }, // Responsive padding
          borderRadius: "16px",
          width: { xs: "90%", sm: "400px", md: "450px" }, // Responsive width
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: "bold",
            WebkitBackgroundClip: "text",
            color: "#837fcb",
            fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" }, // Responsive font size
          }}
        >
          SignUp Your Account
        </Typography>

        <form onSubmit={handleSubmit(SignUp)}>
          <TextField
            label="Name"
            type="text"
            variant="outlined"
            fullWidth
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#837fcb",
                },
              "& label.Mui-focused": {
                color: "#837fcb",
              },
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
            {...register("name", {
              required: "Name is required",
            })}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#837fcb",
                },
              "& label.Mui-focused": {
                color: "#837fcb",
              },
              fontSize: { xs: "0.9rem", sm: "1rem" }, // Responsive font size
            }}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid",
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
          />
          <TextField
            label="Phone Number"
            type="tel"
            variant="outlined"
            fullWidth
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#837fcb",
                },
              "& label.Mui-focused": {
                color: "#837fcb",
              },
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                //   value: /^[0-9]{10,15}$/,
                //   message: "Phone number must be 10-15 digits",
                value: /^\d+$/,
                message: "Phone number must contain only numbers",
              },
            })}
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            error={!!errors.phone}
            helperText={errors.phone ? errors.phone.message : ""}
          />

          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#837fcb",
                },
              "& label.Mui-focused": {
                color: "#837fcb",
              },
              fontSize: { xs: "0.9rem", sm: "1rem" }, // Responsive font size
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#837fcb",
              "&:hover": { backgroundColor: "#837fcb" },
              padding: { xs: "12px", sm: "10px" }, // Responsive padding
              borderRadius: "8px",
              mb: 2,
              fontSize: { xs: "1rem", sm: "1rem" }, // Responsive font size
            }}
          >
            Sign up
          </Button>

          <Typography
            variant="body2"
            sx={{ color: "#6b7280", fontSize: { xs: "0.9rem", sm: "1rem" } }} // Responsive font size
          >
            Already have an account?{" "}
            <Box component={"span"} onClick={()=>navigate("/login")} style={{ color: "#837fcb",textDecoration:'underline',cursor:"pointer" }}>
             Login
            </Box>
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

export default SignUp;

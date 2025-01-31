import {
  Box,
  Button,
  Grid,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SideBar from "../Components/sideBar";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RoleServices from "../services/RolesServices";

 const Projects = () => {
  const [rolesAndColors, setRolesAndColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [selectedRole, setSelectedRole] = useState(null);
  const [roles, setRoles] = useState([]);
  const [changeText, setChangeText] = useState(false);
  const savedData = JSON.parse(localStorage.getItem("rolesAndColors")) || [];

  const {
    register: register3,
    handleSubmit: handleSubmit3,
    setValue: setValue3,
    getValues: getValues3,
    watch: watch3,
    formState: { errors: errors3 },
    reset,
  } = useForm();
  const colors = [
    "#000000",
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FFD700",
    "#8A2BE2",
    "#FF1493",
    "#FFA500",
    "#00CED1",
    "#DFFF00",
    "#FF4500",
    "#40E0D0",
    "#00FF7F",
    "#7B68EE",
    "#DC143C",
    "#FF69B4",
  ];
   const createRole = async (formData)=>{
    const obj ={
      role:formData?.role,
      color: selectedColor,
      id:selectedRole
    }
    try{
      const result = await RoleServices.CreateRole(obj)
      toast.success(result?.message)
      reset()
      setSelectedColor("#000000")
      getRole()
    }catch(error){
     toast.error(error)
   
    }
  }
   const updateRole = async (formData)=>{
    const obj ={
      role:formData?.role,
      color: selectedColor,
      _id:selectedRole
    }
    try{
      const result = await RoleServices.UpdateRole(obj)
      toast.success(result?.message)
      reset()
      setSelectedColor("#000000")
      getRole()
      setChangeText(false)
    }catch(error){
     toast.error(error)
   
    }
  }

  const handleEdit = (role) => {
    setSelectedRole(role?._id);
    setSelectedColor(role.color);
    setValue3("role", role.role);
    setChangeText(true);
  };
  const handleDelete = async (id) => {
    try{
      const result = await RoleServices.DeleteRole(id)
      toast.success(result?.message)
      getRole()
    }catch(error){
     toast.error(error)
   
    }
  };
  const getRole = async()=>{
    try{
      const result = await RoleServices.GetRoles()
      setRoles(result?.data?.roles)
      
    }catch(error){
     console.log(error)
   
    }
  }
  useEffect(()=>{
    getRole()
  },[])
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "rgba(139, 61, 255, 0.1)",
      }}
    >
      <Box sx={{ display: { xs: "none", sm: "block" }, width: "60px" }}>
        <SideBar />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "10px",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
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
            width:"100%",
            minHeight: {
              xs: "800px",
              sm: "1000px",
              md: "1950px",
              xl: "2000px",
            },
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <Box sx={{ padding: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {changeText ? "Update Role" : "Create Role"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", padding: "0 16px", gap: 2 }}>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <form onSubmit={handleSubmit3(changeText ? updateRole : createRole)}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                      <InputLabel>Select Role</InputLabel>
                      <TextField
                        size="small"
                        variant="outlined"
                        placeholder="Enter Role"
                        {...register3("role", { required: "Role is required" })}
                        fullWidth
                        error={!!errors3.role}
                        helperText={errors3.role?.message}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderRadius: 2 },
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <InputLabel>Select Background Color</InputLabel>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          flexWrap: "wrap",
                        }}
                      >
                        {colors.map((color) => (
                          <Box
                            key={color}
                            sx={{
                              width: 40,
                              height: 40,
                              backgroundColor: color,
                              borderRadius: "50%",
                              cursor: "pointer",
                              border:
                                selectedColor === color
                                  ? "3px solid black"
                                  : "none",
                            }}
                            onClick={() => setSelectedColor(color)}
                          />
                        ))}
                      </Box>
                      <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
                        Selected Color: {selectedColor || "None"}
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      display={"flex"}
                      justifyContent={"flex-end"}
                      pb={2}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          backgroundColor: "#837fcb",
                          color: "white",
                          borderRadius: 2,
                          "&:hover": {
                            backgroundColor: "#5e24a6",
                          },
                        }}
                        startIcon={<AddIcon />}
                      >
                        {changeText ? "Update" : "Create"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Box>

            <Box sx={{ padding: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Role List
              </Typography>
            </Box>

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Role</TableCell>
                    <TableCell>Color</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roles?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.role}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            backgroundColor: item.color,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: "10px" }}>
                          <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<EditIcon />}
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDelete(item?._id)}
                            startIcon={<DeleteIcon />}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>

      {/* Sidebar for small screens */}
      <Box sx={{ display: { xs: "block", sm: "none" }, width: "100%" }}>
        <SideBar />
      </Box>
    </Box>
  );
};
export default Projects;

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
  useReactFlow,
  getNodesBounds,
  getViewportForBounds,
} from "@xyflow/react"; // Ensure the correct ReactFlow package is installed
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import AnnotationNode from "./AnnotationNode"; // Custom node components
import ToolbarNode from "./ToolbarNode";
import ResizerNode from "./ResizerNode";
import CircleNode from "./CircleNode";
import TextNode from "./TextNode";
import ButtonEdge from "./ButtonEdge"; // Custom edge component
import "@xyflow/react/dist/style.css"; // Make sure to import styles for ReactFlow
import "./overview.css"; // Custom CSS for the layout and nodes
import dagre from "dagre"; // Layout algorithm library
import Box from "@mui/material/Box";
import ShareIcon from "@mui/icons-material/Share";
import {
  Facebook,
  Twitter,
  Instagram,
  WhatsApp,
  Telegram,
  FileCopy,
} from "@mui/icons-material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import {
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Grid2,
  InputAdornment,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import GraphServices from "../services/GraphServices/index";
import { ContextMenu } from "primereact/contextmenu";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import ConfirmationDialog from "./Dialogs/ConfirmationDialog";
import { useParams } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import ArtBoardServices from "../services/ArtBoardServices";
import toast from "react-hot-toast";
import useAuth from "../hooks/useProvideAuth"
import { Drawer } from "@mui/material";
import { toPng } from "html-to-image";

function downloadImage(dataUrl) {
  const a = document.createElement("a");
  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

const DownloadButton = () => {
  const { getNodes,fitView } = useReactFlow();

  const handleDownload = () => {
    fitView({
      padding:"0.5"
    })
    const imageWidth = 1500;
    const imageHeight = 768;

    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(
      nodesBounds,
      imageWidth,
      imageHeight,
      0.5,
      2
    );

    toPng(document.querySelector(".react-flow__viewport"), {
      // backgroundColor: "#1a365d",
      width: imageWidth,
      height: imageHeight,
      style: {
        width: imageWidth,
        height: imageHeight,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then(downloadImage);
  };

  return (
    <CircleButton onClick={handleDownload}>
      <FileDownloadIcon sx={{ fontSize: "27px" }} />
    </CircleButton>
  );
};

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

// Function to apply layout to nodes and edges
const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes?.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
      // Position adjustment
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};

// Custom node types
const nodeTypes = {
  annotation: AnnotationNode,
  tools: ToolbarNode,
  resizer: ResizerNode,
  circle: CircleNode,
  textinput: TextNode,
};

// Custom edge types
const edgeTypes = {
  button: ButtonEdge,
};
const CircleButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "black",
  color: theme.palette.common.white,
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  width: 60, // You can adjust the size here
  height: 60, // This makes it circular
  borderRadius: "50%",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

// Function to apply CSS classes to nodes
const nodeClassName = (node) => node.type;

const OverviewFlow = () => {
  const [rolesAndColors, setRolesAndColors] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [selectedRole, setSelectedRole] = useState("");
  const [editNode, setEditNode] = useState("");

  console.log(backgroundColor);
  useEffect(() => {
    const savedRoles = JSON.parse(localStorage.getItem("rolesAndColors")) || [
      {
        role: "Admin",
        color: "#FF5733",
      },
    ];
    setRolesAndColors(savedRoles);
  }, []);

  const handleRoleChange = (event) => {
    const role = event.target.value;
    setSelectedRole(role);

    const selected = rolesAndColors?.find((item) => item.role === role);
    if (selected) {
      setBackgroundColor(selected.color);
    }
  };

  const { user } = useAuth();
  const useStyles = styled({
    blurredBackground: {
      filter: "blur(12px)", // Apply the blur effect
      transition: "filter 0.3s ease", // Smooth transition
    },
    popupImage: {
      width: "100%",
      maxWidth: "300px",
      margin: "0 auto",
    },
    popupButton: {
      backgroundColor: "#00a8ff", // Same button color
      color: "#fff",
      marginTop: "20px",
    },
  });

  const [isToggled, setIsToggled] = useState(false);

  // Function to handle toggle change
  const handleToggleChange = (event) => {
    setIsToggled(event.target.checked);
    console.log(edges);
    // Update the edges with the new animation state
    const updatedEdges = edges.map((edge) => ({
      ...edge,
      animated: event.target.checked,
    }));
    console.log(updatedEdges);

    setEdges(updatedEdges);

    console.log("Toggle is now:", event.target.checked);
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Copied");
  };

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    setValue: setValue2,
    getValues: getValues2,
    watch,
    formState: { errors: errors2 },
  } = useForm();

  const {
    register: register3,
    handleSubmit: handleSubmit3,
    setValue: setValue3,
    getValues: getValues3,
    formState: { errors: errors3 },
    reset,
  } = useForm();
  const {
    register: register4,
    handleSubmit: handleSubmit4,
    setValue: setValue4,
    getValues: getValues4,
    formState: { errors: errors4 },
  } = useForm();
  console.log(watch());
  const { id } = useParams();

  const [selectedEdge, setSelectedEdge] = useState(null);

  const classes = useStyles();
  // Function to log node data on click
  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);

    console.log("Node clicked:", node);
  }, []);

  const onEdgeClick = (event, edge) => {
    console.log("Edge clicked:", edge);
    setSelectedEdge(edge);

    // Add custom logic for edge click here
  };

  const onEdgesDelete = (edgesToDelete) => {
    setEdges((eds) => eds.filter((edge) => !edgesToDelete.includes(edge)));
  };

  const onNodesDelete = (nodesToDelete) => {
    setNodes((nds) => nds.filter((node) => !nodesToDelete.includes(node)));
  };

  const [selectedNode, setSelectedNode] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [openShareModal, setOpenShareModal] = React.useState(false);
  const [state, setState] = React.useState({
    left: false,
  });
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [updatedEdges, setUpdatedEdges] = useState([]);
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [confirmationDialog2, setConfirmationDialog2] = useState(false);

  // const handleClickOpen = () => {
  //   setValue("name", selectedNode?.data?.label);
  //   setColor(selectedNode?.style.backgroundColor);
  //   setTextColor(selectedNode?.style.color);
  //   if(editNode)
  //   setOpen(true);
  // };
  const handleClickOpen = () => {
    setValue("name", selectedNode?.data?.label);
    setColor(selectedNode?.style.backgroundColor);
    setTextColor(selectedNode?.style.color);

    if (editNode) {
      const roleColorMapping = JSON.parse(
        localStorage.getItem("rolesAndColors")
      );

      const matchedRole = roleColorMapping?.find(
        (item) =>
          item.color.toLowerCase() ===
          selectedNode?.style.backgroundColor?.toLowerCase()
      );

      if (matchedRole) {
        setSelectedRole(matchedRole.role);
        setBackgroundColor(matchedRole.color);
      }

      // Open the drawer
      setOpen(true);
    }
  };
  //  useEffect(()=>{
  //   if (editNode) {
  //     const roleColorMapping = JSON.parse(localStorage.getItem("rolesAndColors"));

  //     const matchedRole = roleColorMapping?.find(
  //       (item) => item.color.toLowerCase() === selectedNode?.style.backgroundColor?.toLowerCase()
  //     );

  //     if (matchedRole) {
  //       setSelectedRole(matchedRole.role);
  //     }

  //   }
  // },[drawerOpen])

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  // Node and edge state management using ReactFlow hooks
  const [nodes, setNodes, onNodesChange] = useNodesState();
  const [edges, setEdges, onEdgesChange] = useEdgesState();
  const [pendingParams, setPendingParams] = useState(null);

  // Handle creating new edges by connecting nodes
  const onConnect = useCallback(
    async (params) => {
      setOpen3(true);
      const sourceNode = nodes?.find((node) => node.id === params.source);
      if (sourceNode) {
        const strokeColor = sourceNode?.style?.backgroundColor || "black";

        params.style = { stroke: strokeColor };

        params.label = getValues3("name");
        params.type = "smoothstep";
        params.artboard_id = id;
        params.id = params?.source + params?.target;

        setEdges((eds) => {
          const updatedEdges = addEdge(params, eds);
          console.log("Updated Edges:", updatedEdges);
          setPendingParams(params);
          return updatedEdges;
        });
      } else {
        console.log("Source node not found.");
      }
    },
    [nodes, id, getValues3]
  );

  const [color, setColor] = React.useState("#ffffff");
  const [textColor, setTextColor] = React.useState("#ffffff");
  const [edgeColor, setEdgeColor] = React.useState("#000000");

  const handleChange = (e) => {
    console.log(e.target.value);

    setColor(e.target.value);
  };
  const handleChange2 = (e) => {
    console.log(e.target.value);

    setTextColor(e.target.value);
  };
  const handleChange3 = (e) => {
    console.log(e.target.value);

    setEdgeColor(e.target.value);
  };

  // *For Get Nodes
  const getNodes = async (page, limit, filter) => {
    try {
      let params = {
        artboard_id: id,
      };
      const { data } = await GraphServices.getNodes(params);

      setNodes(data?.nodes);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("asdasdad");
    }
  };

  // *For Get Nodes
  const getEdges = async (page, limit, filter) => {
    try {
      let params = {
        artboard_id: id,
      };
      const { data } = await GraphServices.getEdges(params);
      setEdges(data?.edges);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("asdasdad");
    }
  };

  const CreateEdge = async (data) => {
    let currentEdge = edges?.find((item) => item?.id == pendingParams?.id);
    const edge = edges?.find((edge) => edge?.id === pendingParams?.id);
    console.log(data);
    const sourceNode = nodes?.find((node) => node?.id === pendingParams.source);
    if (edge) {
      edge.label = data?.name;
      edge.style = { stroke: sourceNode?.style?.backgroundColor };
    }
    try {
      const { responseCode } = await GraphServices.CreateEdge(edge);
      console.log(responseCode);

      if (responseCode == 200) {
        setOpen3(false);
        // UpdateArtBoard()
        getEdges();
        reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("asdasdad");
    }
  };
  // const CreateEdge = (data) => {
  //   console.log(edges, "pendingParams");
  //   console.log(pendingParams, "pendingParams");
  //   let currentEdge = edges.find((item) => item?.id == pendingParams?.id);
  //   console.log(edges.find((item) => item?.id == pendingParams?.id));
  //   const edge = edges.find((edge) => edge.id === pendingParams?.id);
  //   const sourceNode = nodes.find((node) => node.id === pendingParams.source);

  //   if (edge) {

  //     edge.label = data?.name;
  //     edge.style = { stroke: sourceNode?.style?.backgroundColor };

  //     console.log("Edge updated successfully:", edge);
  //     setOpen3(false);
  //     UpdateArtBoard()
  //     reset()
  //   } else {
  //     console.log("Edge not found.");
  //   }

  //   console.log("Updated edges array:", edges);

  // };

  const UpdateEdge = async (data) => {
    let obj = selectedEdge;
    const sourceNode = nodes?.find((node) => node.id === selectedEdge.source);
    console.log(obj);
    obj.label = data?.name;
    obj.style = { stroke: sourceNode?.style?.backgroundColor };

    try {
      const { responseCode } = await GraphServices.updateEdge(obj);
      console.log(responseCode);

      if (responseCode == 200) {
        setOpen4(false);
        getEdges();
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("asdasdad");
    }
  };

  const updateNode = async (page, limit, filter) => {
    console.log(selectedNode);
    selectedNode.data.label = getValues("name");
    selectedNode.style.color = textColor;
    selectedNode.style.backgroundColor = backgroundColor;
    try {
      console.log(selectedNode);

      const { responseCode } = await GraphServices.updateNode(selectedNode);
      console.log(responseCode);

      if (responseCode == 200) {
        setOpen(false);
        setDrawerOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("asdasdad");
    }
  };

  const UpdateArtBoard = async (page, limit, filter) => {
    const obj = {
      id: id,
      nodes: nodes,
      edges: edges,
    };

    await toast
      .promise(ArtBoardServices.UpdateArtBoard(obj), {
        loading: "Saving...",
        success: <b>Settings saved!</b>,
        error: <b>Could not save.</b>,
      })
      .then((response) => {
        console.log(response.responseCode);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        console.log("asdasdad");
      });
  };

  const handleNodesChange = useCallback(
    (changes) => {
      changes.forEach((change) => {
        if (change.type === "position") {
          console.log(change);

          console.log(`Node ${change.id} moved to: `, change.position);
        }
      });
      console.log(
        nodes?.find((item) => item?.id == changes[0].id),
        "nodes"
      );
      console.log(edges, "edges");

      console.log(changes, "changes");

      onNodesChange(changes);
    },
    [onNodesChange]
  );

  useEffect(() => {
    handleClickOpen();
  }, [drawerOpen]);

  const contextMenu = useRef(null);

  const menuItems = [
    {
      label: "Edit",
      icon: (
        <i
          className="pi pi-pencil"
          style={{ color: "blue", fontSize: "0.9em" }}
        />
      ),
      command: () => {
        if (selectedNode) {
          // Add your edit node logic here

          console.log("Editing node", selectedNode);
          setEditNode(selectedNode?.style?.backgroundColor);
          setDrawerOpen(true); // Open drawer on click
        }
        if (selectedEdge) {
          console.log("Editing edge", selectedEdge);
          setValue4("name", selectedEdge?.label);
          setEditNode(selectedEdge?.style?.backgroundColor);
          // UpdateArtBoard()
          // setEdgeColor(selectedEdge?.style?.stroke);
          setOpen4(true);
        }
      },
    },
    {
      label: "Delete",
      icon: (
        <i
          className="pi pi-trash"
          style={{ color: "red", fontSize: "0.9em" }}
        />
      ),
      command: () => {
        if (selectedNode) {
          // Add your delete node logic here
          console.log("Deleting node", selectedNode);
          setConfirmationDialog(true);
        }
        if (selectedEdge) {
          // Add your delete edge logic here
          console.log("Deleting edge", selectedEdge);
          setConfirmationDialog2(true);
        }
      },
    },
  ];

  const onNodeContextMenu = (event, node) => {
    event.preventDefault();
    setSelectedNode(node);
    setSelectedEdge(null);
    contextMenu?.current?.show(event);
  };

  const onEdgeContextMenu = (event, edge) => {
    event.preventDefault();
    setSelectedEdge(edge);
    setSelectedNode(null);
    contextMenu?.current?.show(event);
  };

  const onSubmit = (data) => {
    console.log(data);
    handleClose();
  };
  const CreateNode = async (formData) => {
    console.log(formData);

    try {
      let obj = {
        data: {
          label: formData?.inputField,
        },
        position: {
          x: 100,
          y: 100,
        },
        type: nodes.length > 0 ? null : "input",
        style: {
          backgroundColor: backgroundColor,
          padding: 10,
          borderRadius: 5,
          color: "#ffffff",
        },
        artboard_id: id,
      };

      const { data } = await GraphServices.CreateNode(obj);
      console.log(data);

      if (data) {
        setNodes((nds) => [...nds, data?.node]);
        setOpen2(false);
        setValue2("inputField", "");
        setColor("#ffffff");
        setTextColor("#ffffff");
        setSelectedRole("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("asdasdad");
    }
    handleClose();
  };

  const handleDeleteNode = async (data) => {
    setConfirmationDialog(false);
    console.log(data);

    try {
      let obj = {
        id: selectedNode?.id,
      };

      const { responseCode } = await GraphServices.DeleteNode(obj);
      console.log(responseCode);

      if (responseCode == 200) {
        setNodes(nodes.filter((item) => item?.id != selectedNode?.id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("asdasdad");
    }
    handleClose();
  };
  const handleDeleteEdge = async (data) => {
    setConfirmationDialog2(false);
    console.log(data);

    try {
      let obj = {
        id: selectedEdge?.id,
      };

      const { responseCode } = await GraphServices.DeleteEdge(obj);
      console.log(responseCode);

      if (responseCode == 200) {
        setEdges(edges.filter((item) => item?.id != selectedEdge?.id));
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("asdasdad");
    }
    handleClose();
  };
  // Function to trigger layout when a button is clicked
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  useEffect(() => {
    getNodes();
    getEdges();
  }, []);
  const handleContextMenu = useCallback(
    (event, data) => {
      const { actionType } = data;
      if (actionType === "editNode" && selectedNode) {
        // Implement your edit node logic here
      } else if (actionType === "editEdge" && selectedEdge) {
        // Implement your edit edge logic here
      }
    },
    [selectedNode, selectedEdge]
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ConfirmationDialog
        open={confirmationDialog}
        onClose={() => setConfirmationDialog(false)}
        message={"Are you sure you want to delete?"}
        action={() => {
          console.log("asdasda");
          handleDeleteNode();
        }}
      />

      <ConfirmationDialog
        open={confirmationDialog2}
        onClose={() => setConfirmationDialog2(false)}
        message={"Are you sure you want to delete?"}
        action={() => {
          console.log("asdasda");
          handleDeleteEdge();
        }}
      />
      <Drawer
        anchor="left"
        open={open3}
        onClose={() => setOpen3(false)}
        sx={{
          width: "400px", // You can adjust the width as needed
          ".MuiPaper-elevation": { padding: "16px !important" },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            fontSize: "25px",
            color: "#837fcb",
            fontWeight: "bold",
          }}
        >
          Create Connection
        </Box>

        <Divider />

        <Box
          component="form"
          onSubmit={handleSubmit3(CreateEdge)}
          sx={{ display: "flex", flexDirection: "column", mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel sx={{ color: "black", mb: 0.5 }}>Label</InputLabel>
              <TextField
                fullWidth
                InputProps={{
                  sx: {
                    borderRadius: "3px", // Adjust the value as needed
                    border: "1px solid black",
                  },
                }}
                size="small"
                {...register3("name")}
              />
            </Grid>
          </Grid>

          <Button
            variant="standard"
            type="submit"
            sx={{
              mt: 2,
              backgroundColor: "#837fcb",
              color: "white",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "#837fcb", // Optional: maintain the same color on hover
              },
            }}
          >
            Create
          </Button>
        </Box>
      </Drawer>

      <Drawer
        anchor="left"
        open={open4}
        onClose={() => setOpen4(false)}
        sx={{
          width: "400px", // You can adjust the width as needed
          ".MuiPaper-elevation": { padding: "16px !important" },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            fontSize: "25px",
            color: "#837fcb",
            fontWeight: "bold",
          }}
        >
          Update Connection
        </Box>

        <Divider />

        <Box
          component="form"
          onSubmit={handleSubmit4(UpdateEdge)}
          sx={{ display: "flex", flexDirection: "column", mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel sx={{ color: "black", mb: 0.5 }}>Label</InputLabel>
              <TextField
                fullWidth
                InputProps={{
                  sx: {
                    borderRadius: "3px", // Adjust the value as needed
                    border: "1px solid black",
                  },
                }}
                size="small"
                {...register4("name")}
              />
            </Grid>
          </Grid>

          <Button
            variant="standard"
            type="submit"
            sx={{
              mt: 2,
              backgroundColor: "#837fcb",
              color: "white",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "#837fcb", // Optional: maintain the same color on hover
              },
            }}
          >
            Update
          </Button>
        </Box>
      </Drawer>

      <SwipeableDrawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
        sx={{ ".MuiPaper-elevation ": { padding: "16px !important" } }}
      >
        <Box
          sx={{
            textAlign: "center",
            fontSize: "25px",
            color: "#837fcb",
            fontWeight: "bold",
          }}
        >
          Create Node
        </Box>

        <Divider />
        <Box
          component="form"
          onSubmit={handleSubmit2(CreateNode)}
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 3,
            alignItems: "space-between",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel sx={{ color: "black" }}>Name</InputLabel>
              <TextField
                fullWidth
                multiline
                rows={5}
                sx={{ mt: 0.5 }}
                size="small"
                {...register2("inputField")}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel sx={{ color: "black" }}>Select Role</InputLabel>
              <Select
                fullWidth
                value={selectedRole}
                onChange={handleRoleChange}
                displayEmpty
                sx={{ mt: 0.5 }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {rolesAndColors.map((item, index) => (
                  <MenuItem key={index} value={item.role}>
                    {item.role}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          <Grid2 container justifyContent={"center"}>
            <Grid2 item display={"flex"} justifyContent={"center"} size={12}>
              <Button
                fullWidth
                variant="standard"
                type="submit"
                sx={{
                  mt: 2,
                  backgroundColor: "#837fcb",
                  color: "white",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#837fcb", // Optional: maintain the same color on hover
                  },
                }}
              >
                Create
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </SwipeableDrawer>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          width: "400px",
          ".MuiPaper-elevation": { padding: "16px !important" },
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            fontSize: "25px",
            color: "#837fcb",
            fontWeight: "bold",
          }}
        >
          Update Node
        </Box>

        <Divider />
        <Box
          component="form"
          onSubmit={handleSubmit(updateNode)}
          sx={{ display: "flex", flexDirection: "column", mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={5}
                size="small"
                {...register("name")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={selectedRole}
                  onChange={handleRoleChange}
                  label="Role"
                  size="small"
                >
                  {rolesAndColors.map((item, index) => (
                    <MenuItem key={index} value={item.role}>
                      {item.role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            variant="standard"
            type="submit"
            sx={{
              mt: 2,
              backgroundColor: "#837fcb",
              color: "white",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "#837fcb", // Optional: maintain the same color on hover
              },
            }}
          >
            Update
          </Button>
        </Box>
      </Drawer>

      {user?.token && (
        <>
          <ContextMenu
            model={menuItems}
            ref={contextMenu}
            className="custom-context-menu"
          />
        </>
      )}

      <Dialog
        fullWidth
        maxWidth="sm"
        open={openShareModal}
        onClose={() => setOpenShareModal(false)}
        PaperProps={{
          style: { borderRadius: "16px" },
        }}
      >
        <DialogTitle sx={{ textAlign: "left", fontWeight: "bold" }}>
          Share Artboard
        </DialogTitle>
        <Divider />
        <DialogContent
          sx={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Social Media Icons */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 2,
              my: 2,
            }}
          >
            <IconButton
              sx={{
                borderRadius: "50%",
                border: "1px solid grey",
                color: "#3b5998",
                p: 2,
              }}
              color="inherit"
            >
              <Facebook
                sx={{ fontSize: { md: "30px", sm: "28px", xs: "24px" } }}
              />
            </IconButton>

            <IconButton
              sx={{
                borderRadius: "50%",
                border: "1px solid grey",
                color: "#1DA1F2",
                p: 2,
              }}
              color="inherit"
            >
              <Twitter
                sx={{ fontSize: { md: "30px", sm: "28px", xs: "24px" } }}
              />
            </IconButton>

            <IconButton
              sx={{
                borderRadius: "50%",
                border: "1px solid grey",
                color: "#E1306C",
                p: 2,
              }}
              color="inherit"
            >
              <Instagram
                sx={{ fontSize: { md: "30px", sm: "28px", xs: "24px" } }}
              />
            </IconButton>

            <IconButton
              sx={{
                borderRadius: "50%",
                border: "1px solid grey",
                color: "#25D366",
                p: 2,
              }}
              color="inherit"
            >
              <WhatsApp
                sx={{ fontSize: { md: "30px", sm: "28px", xs: "24px" } }}
              />
            </IconButton>

            <IconButton
              sx={{
                borderRadius: "50%",
                border: "1px solid grey",
                color: "#0088cc",
                p: 2,
              }}
              color="inherit"
            >
              <Telegram
                sx={{ fontSize: { md: "30px", sm: "28px", xs: "24px" } }}
              />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              my: 2,
            }}
          >
            <TextField
              value={window.location.href}
              fullWidth
              variant="outlined"
              size="small"
              sx={{ marginBottom: 2 }}
              InputProps={{
                readOnly: true,
                style: { textOverflow: "ellipsis" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleCopyLink}>
                      <FileCopy />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>

      <ReactFlow
        nodes={nodes} 
        edges={edges} 
        onNodesChange={user?.token ? handleNodesChange : undefined}
        onEdgesChange={user?.token ? onEdgesChange : undefined}
        onConnect={user?.token ? onConnect : undefined}
        fitView 
        attributionPosition="top-right"
        onNodeClick={onNodeClick} 
        nodeTypes={nodeTypes} 
        edgeTypes={edgeTypes} 
        onEdgesDelete={onEdgesDelete} 
        onNodesDelete={onNodesDelete} 
        onEdgeClick={onEdgeClick} 
        onNodeContextMenu={onNodeContextMenu}
        onEdgeContextMenu={onEdgeContextMenu}
        className="overview" 
      >
        <MiniMap zoomable pannable nodeClassName={nodeClassName} />

        <Controls />

        <Background />
        <Panel position="top-right">
          <FormControlLabel
            control={
              <Switch
                checked={isToggled}
                onChange={handleToggleChange}
                name="toggleSwitch"
                color="primary"
              />
            }
            label={"Layer Transition"}
          />
          <ButtonGroup variant="contained">
            <Button
              onClick={() => onLayout("TB")}
              style={{
                backgroundColor: "black",
                color: "white",
                textTransform: "capitalize",
              }}
            >
              Vertical Layout
            </Button>
            <Button
              onClick={() => onLayout("LR")}
              style={{
                backgroundColor: "black",
                color: "white",
                textTransform: "capitalize",
              }}
            >
              Horizontal Layout
            </Button>
          </ButtonGroup>
        </Panel>
        {user?.token && (
          <Panel position="top-left">
            <Box sx={{ m: 2 }}>
              <CircleButton
                
                onClick={toggleDrawer("left", true)}
              >
                <AddIcon sx={{ fontSize: "27px" }} />
              </CircleButton>
            </Box>
            <Box sx={{ m: 2 }}>
              <CircleButton onClick={() => UpdateArtBoard()}>
                <SaveIcon sx={{ fontSize: "27px" }} />
              </CircleButton>
            </Box>
            <Box sx={{ m: 2 }}>
              <CircleButton onClick={() => setOpenShareModal(true)}>
                <ShareIcon sx={{ fontSize: "27px" }} />
              </CircleButton>
            </Box>
            <Box sx={{ m: 2 }}>
              <DownloadButton />
            </Box>
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
};

export default OverviewFlow;

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
} from '@xyflow/react'; // Ensure the correct ReactFlow package is installed

import AnnotationNode from './AnnotationNode'; // Custom node components
import ToolbarNode from './ToolbarNode';
import ResizerNode from './ResizerNode';
import CircleNode from './CircleNode';
import TextNode from './TextNode';
import ButtonEdge from './ButtonEdge'; // Custom edge component
import '@xyflow/react/dist/style.css'; // Make sure to import styles for ReactFlow
import './overview.css'; // Custom CSS for the layout and nodes
import dagre from 'dagre'; // Layout algorithm library
import Box from '@mui/material/Box';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { Button, ButtonGroup, Grid, Grid2, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import GraphServices from '../services/GraphServices/index'
import { ContextMenu } from 'primereact/contextmenu';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import ConfirmationDialog from './Dialogs/ConfirmationDialog';
import { useParams } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import ArtBoardServices from '../services/ArtBoardServices';
import toast from 'react-hot-toast';






// Setting up Dagre graph for layout
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

// Function to apply layout to nodes and edges
const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
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
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
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
  backgroundColor: 'black',
  color: theme.palette.common.white,
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  width: 60,  // You can adjust the size here
  height: 60, // This makes it circular
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));


// Function to apply CSS classes to nodes
const nodeClassName = (node) => node.type;

const OverviewFlow = () => {

  const useStyles = styled({
    blurredBackground: {
      filter: 'blur(12px)', // Apply the blur effect
      transition: 'filter 0.3s ease', // Smooth transition
    },
    popupImage: {
      width: '100%',
      maxWidth: '300px',
      margin: '0 auto',
    },
    popupButton: {
      backgroundColor: '#00a8ff', // Same button color
      color: '#fff',
      marginTop: '20px',
    },
  });

  const [isToggled, setIsToggled] = useState(false);

  // Function to handle toggle change
  const handleToggleChange = (event) => {
    setIsToggled(event.target.checked);
    console.log(edges);
    // Update the edges with the new animation state
    const updatedEdges = edges.map(edge => ({
      ...edge,
      animated: event.target.checked
    }));
    console.log(updatedEdges);

    setEdges(updatedEdges);

    console.log('Toggle is now:', event.target.checked);
  };


  const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm();

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

  } = useForm();
  const {
    register: register4,
    handleSubmit: handleSubmit4,
    setValue: setValue4,
    getValues: getValues4,
    formState: { errors: errors4 },

  } = useForm();
  console.log(watch());
  const { id } = useParams()

  const [selectedEdge, setSelectedEdge] = useState(null);
  // let initialnodes = [
  //   { id: '1', data: { label: 'ABC Group' }, position: { x: 500, y: 50 }, type: 'input', style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },

  //   { id: '2', data: { label: 'ABC Investment LLC (Rating: 2C)\nAED 204 Mio (GC Term Loan + PFE)' }, position: { x: 300, y: 150 }, style: { backgroundColor: '#a3a5a3', padding: 10, borderRadius: 5, color: 'white' } },
  //   { id: '2a', data: { label: 'Associates' }, position: { x: 100, y: 300 }, style: { backgroundColor: '#a3a5a3', padding: 10, borderRadius: 5, color: 'white' } },

  //   { id: '2c', data: { label: 'Subsidaries' }, position: { x: 300, y: 300 }, style: { backgroundColor: '#a3a5a3', padding: 10, borderRadius: 5, color: 'white' } },
  //   { id: '2b', data: { label: 'Joint Ventures' }, position: { x: 620, y: 300 }, style: { backgroundColor: '#a3a5a3', padding: 10, borderRadius: 5, color: 'white' } },

  //   { id: '3', data: { label: 'ABC Development Ltd.' }, position: { x: 750, y: 150 }, style: { backgroundColor: '#a3a5a3', padding: 10, borderRadius: 5, color: 'white' } },
  //   { id: '4', data: { label: 'Various Hospitality Investments' }, position: { x: 750, y: 220 }, style: { backgroundColor: '#092e65', padding: 10, borderRadius: 5, color: 'white' } },

  //   { id: '5', data: { label: 'Other Businesses of Mr. ABC' }, position: { x: 1150, y: 150 }, style: { backgroundColor: '#a3a5a3', padding: 10, borderRadius: 5, color: 'white' } },
  //   { id: '6', data: { label: '123 LLC (Rating: 2E)\nAED 100 Mio TR Limits' }, position: { x: 300, y: 350 }, style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },

  //   { id: '7', data: { label: '234 LLC (Rating: 2E)\nAED 3 Mio Non Funded WC Limits' }, position: { x: 100, y: 550 }, style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },
  //   { id: '8', data: { label: '345 LLC (Rating: 2E)' }, position: { x: 280, y: 550 }, style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },

  //   { id: '9', data: { label: '456 LLC' }, position: { x: 280, y: 620 }, style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },

  //   { id: '11', data: { label: '678 LLC (Rating: 2P)\nAED 80.6 Mio WC Limits' }, position: { x: 620, y: 550 }, style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },
  //   { id: '12', data: { label: 'GHI LLC (Rating: 3A)\nAED 6.5 Mio WC Limits' }, position: { x: 1150, y: 550 }, style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },

  //   { id: '13', data: { label: 'Engineering' }, position: { x: 1150, y: 420 }, style: { backgroundColor: '#092e65', padding: 10, borderRadius: 5, color: 'white' } },
  //   { id: '14', data: { label: 'Building/Maintenance' }, position: { x: 620, y: 420 }, style: { backgroundColor: '#092e65', padding: 10, borderRadius: 5, color: 'white' } },
  //   { id: '15', data: { label: 'JV with GHI BV Company' }, position: { x: 980, y: 450 }, style: { backgroundColor: '#a2a19b', padding: 10, borderRadius: 5, color: 'white' } },
  //   { id: '16', data: { label: 'JV with XYZ Shipyard' }, position: { x: 780, y: 450 }, style: { backgroundColor: '#a2a19b', padding: 10, borderRadius: 5, color: 'white' } },
  //   { id: '17', data: { label: 'Retail FMCG' }, position: { x: 100, y: 450 }, style: { backgroundColor: '#092e65', padding: 10, borderRadius: 5, color: 'white' } },
  //   { id: '18', data: { label: 'Wholesale FMCG' }, position: { x: 400, y: 450 }, style: { backgroundColor: '#092e65', padding: 10, borderRadius: 5, color: 'white' } },

  //   { id: '19', data: { label: '567 LLC' }, position: { x: 450, y: 550 }, style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },
  // ];


  // let initialedges = [
  //   { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', label: 'Corporate Guarantee', style: { stroke: 'black' } },
  //   { id: 'e1-3', source: '1', target: '3', type: 'smoothstep', style: { stroke: 'black' } },
  //   { id: 'e1-5', source: '1', target: '5', type: 'smoothstep', style: { stroke: 'black' } },
  //   { id: 'e3-4', source: '3', target: '4', type: 'smoothstep', style: { stroke: 'black' } },

  //   { id: 'e2-2a', source: '2', target: '2a', type: 'smoothstep', style: { stroke: 'black' } },
  //   { id: 'e2-2b', source: '2', target: '2b', type: 'smoothstep', style: { stroke: 'black' } },
  //   { id: 'e2-2c', source: '2', target: '2c', type: 'smoothstep', style: { stroke: 'black' } },

  //   { id: 'e15-12', source: '15', target: '12', type: 'smoothstep', label: '100%', style: { stroke: 'black' } },

  //   { id: 'e10-11', source: '10', target: '11', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
  //   { id: 'e16-11', source: '16', target: '11', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
  //   { id: 'e13-12', source: '13', target: '12', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
  //   { id: 'e5-13', source: '5', target: '13', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
  //   { id: 'e2b-14', source: '2b', target: '14', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
  //   { id: 'e14-11', source: '14', target: '11', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
  //   { id: 'e7-17', source: '17', target: '7', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
  //   { id: 'e6-17', source: '6', target: '17', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
  //   { id: 'e6-18', source: '6', target: '18', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
  //   { id: 'e8-18', source: '18', target: '8', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
  //   { id: 'e9-18', source: '8', target: '9', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
  //   { id: 'e18-19', source: '18', target: '19', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
  // ];
  const classes = useStyles();
  // Function to log node data on click
  const onNodeClick = useCallback((event, node) => {

    setSelectedNode(node)


    console.log('Node clicked:', node);
  }, []);

  const onEdgeClick = (event, edge) => {
    console.log('Edge clicked:', edge);
    setSelectedEdge(edge)

    // Add custom logic for edge click here
  };

  const onEdgesDelete = (edgesToDelete) => {
    setEdges((eds) => eds.filter((edge) => !edgesToDelete.includes(edge)));
  };

  const onNodesDelete = (nodesToDelete) => {
    setNodes((nds) => nds.filter((node) => !nodesToDelete.includes(node)));
  };

  const [selectedNode, setSelectedNode] = React.useState(null)
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false)
  const [open3, setOpen3] = React.useState(false)
  const [open4, setOpen4] = React.useState(false)
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [updatedEdges, setUpdatedEdges] = useState([])
  const [confirmationDialog, setConfirmationDialog] = useState(false)
  const [confirmationDialog2, setConfirmationDialog2] = useState(false)


  const handleClickOpen = () => {
    setValue('name', selectedNode?.data?.label)
    setColor(selectedNode?.style.backgroundColor)
    setTextColor(selectedNode?.style.color)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
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

    (params) => {
      setOpen3(true)
      setEdges((eds) => {
        console.log(eds, 'eds');
        params.label = getValues3('name')
        params.style = { stroke: 'black' }
        params.type = 'smoothstep'
        params.artboard_id = id
        params.id = params?.source + params?.target
        console.log(params, 'params');

        const updatedEdges = addEdge(params, eds);
        console.log('Updated edges:', updatedEdges); // Log the updated edges

        setPendingParams(params);
        return updatedEdges;
      });
    },
    [],
  );

  const [color, setColor] = React.useState('#ffffff')
  const [textColor, setTextColor] = React.useState('#ffffff')
  const [edgeColor, setEdgeColor] = React.useState('#000000')

  const handleChange = (e) => {
    console.log(e.target.value);

    setColor(e.target.value)
  }
  const handleChange2 = (e) => {
    console.log(e.target.value);

    setTextColor(e.target.value)
  }
  const handleChange3 = (e) => {
    console.log(e.target.value);

    setEdgeColor(e.target.value)
  }


  // *For Get Nodes
  const getNodes = async (page, limit, filter) => {

    try {
      let params = {
        artboard_id: id
      }
      const { data } = await GraphServices.getNodes(params)

      setNodes(data?.nodes)


    } catch (error) {
      console.log(error);

    } finally {
      console.log('asdasdad')
    }
  }

  // *For Get Nodes
  const getEdges = async (page, limit, filter) => {

    try {
      let params = {
        artboard_id: id
      }
      const { data } = await GraphServices.getEdges(params)
      setEdges(data?.edges)




    } catch (error) {
      console.log(error);

    } finally {
      console.log('asdasdad')
    }
  }

  const CreateEdge = (data) => {
    console.log(edges, 'pendingParams');
    console.log(pendingParams, 'pendingParams');
    let currentEdge = edges.find((item => item?.id == pendingParams?.id))
    console.log(edges.find((item => item?.id == pendingParams?.id)));
    const edge = edges.find(edge => edge.id === pendingParams?.id);
    if (edge) {
      // Update label and stroke color
      edge.label = data?.name;
      edge.style = { stroke: edgeColor };

      console.log("Edge updated successfully:", edge);
      setOpen3(false)
    } else {
      console.log("Edge not found.");
    }

    // Log the updated edges array
    console.log("Updated edges array:", edges);



    // try {

    //   const updatedParams = {
    //     ...pendingParams,
    //     label: data?.name, // Update the label on confirmation
    //     style: { stroke: edgeColor }, // Update the label on confirmation
    //   };

    //   setEdges((eds) => {
    //     const updatedEdges = addEdge(updatedParams, eds);
    //     console.log('Updated edges:', updatedEdges); // Log the updated edges
    //     setEdges(updatedEdges)
    //     return updatedEdges;
    //   });

    //   setOpen3(false)
    //   // Reset the pending params
    //   setPendingParams(null);

    //   setEdgeColor('#000000')
    //   setValue3('name', '')



    // }
    // catch (error) {
    //   console.log(error);

    // }
  }

  const UpdateEdge = async (data) => {
    let obj = selectedEdge
    console.log(obj);
    obj.label = data?.name
    obj.style = { stroke: edgeColor }

    try {



      const { responseCode } = await GraphServices.updateEdge(obj)
      console.log(responseCode);

      if (responseCode == 200) {
        setOpen4(false)
        getEdges()
      }



    } catch (error) {
      console.log(error);

    } finally {
      console.log('asdasdad')
    }
  }

  const updateNode = async (page, limit, filter) => {
    console.log(selectedNode);
    selectedNode.data.label = getValues('name');
    selectedNode.style.color = textColor;
    selectedNode.style.backgroundColor = color;
    try {
      console.log(selectedNode);


      const { responseCode } = await GraphServices.updateNode(selectedNode)
      console.log(responseCode);

      if (responseCode == 200) {
        setOpen(false)
      }



    } catch (error) {
      console.log(error);

    } finally {
      console.log('asdasdad')
    }
  }

  const UpdateArtBoard = async (page, limit, filter) => {

    const obj = {
      id: id,
      nodes: nodes,
      edges: edges,
    };

    await toast.promise(
      ArtBoardServices.UpdateArtBoard(obj),
      {
        loading: 'Saving...',
        success: <b>Settings saved!</b>,
        error: <b>Could not save.</b>,
      }
    ).then(response => {
      console.log(response.responseCode); // Log the response if needed
      // Additional success handling if necessary
    }).catch(error => {
      console.error(error); // Error handling if needed
    }).finally(() => {
      console.log('asdasdad'); // Final code to run after promise completion
    });
  };

  const handleNodesChange = useCallback(
    (changes) => {
      changes.forEach((change) => {
        if (change.type === 'position') {
          console.log(change);

          console.log(`Node ${change.id} moved to: `, change.position);
        }
      });
      console.log(nodes?.find((item => item?.id == changes[0].id)), 'nodes');
      console.log(edges, 'edges');


      console.log(changes, 'changes');

      onNodesChange(changes);
    },
    [onNodesChange],
  );


  const contextMenu = useRef(null);

  const menuItems = [
    {
      label: 'Edit',
      icon: (
        <i className="pi pi-pencil" style={{ color: 'blue', fontSize: '0.9em' }} />
      ),
      command: () => {
        if (selectedNode) {
          // Add your edit node logic here
          handleClickOpen();
          console.log("Editing node", selectedNode);
        }
        if (selectedEdge) {
          // Add your edit edge logic here
          console.log("Editing edge", selectedEdge);
          setValue4('name', selectedEdge?.label);
          setEdgeColor(selectedEdge?.style?.stroke)
          setOpen4(true);
        }
      }
    },
    {
      label: 'Delete',
      icon: (
        <i className="pi pi-trash" style={{ color: 'red', fontSize: '0.9em' }} />
      ),
      command: () => {
        if (selectedNode) {
          // Add your delete node logic here
          console.log("Deleting node", selectedNode);
          setConfirmationDialog(true)
        }
        if (selectedEdge) {
          // Add your delete edge logic here
          console.log("Deleting edge", selectedEdge);
          setConfirmationDialog2(true)
        }
      }
    }
  ];


  const onNodeContextMenu = (event, node) => {
    event.preventDefault();
    setSelectedNode(node);
    setSelectedEdge(null);
    contextMenu.current.show(event);
  };

  const onEdgeContextMenu = (event, edge) => {
    event.preventDefault();
    setSelectedEdge(edge);
    setSelectedNode(null);
    contextMenu.current.show(event);
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
          label: formData?.inputField
        },
        position: {
          "x": 100,
          "y": 100
        },
        type: nodes.length > 0 ? null : "input",
        style: {
          backgroundColor: color,
          padding: 10,
          borderRadius: 5,
          color: textColor
        },
        artboard_id: id
      }
      

      const { data } = await GraphServices.CreateNode(obj)
      console.log(data);

      if (data) {
        setNodes((nds) => [
          ...nds,
          data?.node
        ]);
        setOpen2(false)
        setValue2('inputField', '')
        setColor('#ffffff')
        setTextColor('#ffffff')
     
      }



    } catch (error) {
      console.log(error);

    } finally {
      console.log('asdasdad')
    }
    handleClose();
  };

  const handleDeleteNode = async (data) => {
    setConfirmationDialog(false)
    console.log(data);

    try {
      let obj = {

        id: selectedNode?.id
      }


      const { responseCode } = await GraphServices.DeleteNode(obj)
      console.log(responseCode);

      if (responseCode == 200) {
       setNodes(nodes.filter((item => item?.id != selectedNode?.id))) 

      }



    } catch (error) {
      console.log(error);

    } finally {
      console.log('asdasdad')
    }
    handleClose();
  };
  const handleDeleteEdge = async (data) => {
    setConfirmationDialog2(false)
    console.log(data);

    try {
      let obj = {

        id: selectedEdge?.id
      }


      const { responseCode } = await GraphServices.DeleteEdge(obj)
      console.log(responseCode);

      if (responseCode == 200) {
       setEdges(edges.filter((item => item?.id != selectedEdge?.id))) 

      }



    } catch (error) {
      console.log(error);

    } finally {
      console.log('asdasdad')
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
    [nodes, edges],
  );

  useEffect(() => {
    getNodes()
    getEdges()
  }, [])
  const handleContextMenu = useCallback((event, data) => {
    const { actionType } = data;
    if (actionType === 'editNode' && selectedNode) {
      // Implement your edit node logic here
    } else if (actionType === 'editEdge' && selectedEdge) {
      // Implement your edit edge logic here
    }
  }, [selectedNode, selectedEdge]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>

      <ConfirmationDialog
        open={confirmationDialog}
        onClose={() => setConfirmationDialog(false)}
        message={"Are you sure you want to delete?"}
        action={() => {
          console.log('asdasda');
          handleDeleteNode()
        }}
      />

      <ConfirmationDialog
        open={confirmationDialog2}
        onClose={() => setConfirmationDialog2(false)}
        message={"Are you sure you want to delete?"}
        action={() => {
          console.log('asdasda');
          handleDeleteEdge()

        }}
      />
      <Dialog
        fullWidth={fullWidth}
        maxWidth={'sm'}
        open={open3}
        onClose={() => setOpen3(false)}
        PaperProps={{
          style: {
            borderRadius: '16px', // Adjust the radius as needed
          },
        }}
      >


        <DialogContent className={classes.blurredBackground}>
          <DialogTitle sx={{ textAlign: 'center' }}>Create Connection</DialogTitle>
          <Box

            component="form"
            onSubmit={handleSubmit3(CreateEdge)}
            sx={{ display: 'flex', flexDirection: 'column', }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InputLabel sx={{ color: 'black', mb: 0.5 }}>Label</InputLabel>
                <TextField

                  fullWidth
                  InputProps={{
                    sx: {
                      borderRadius: '3px', // Adjust the value as needed
                      border: '1px solid black'
                    },
                  }}
                  size='small'
                  {...register3('name')}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ color: 'black' }}>Layer Color</InputLabel>
                <Box
                  component="input"
                  type="color"
                  value={edgeColor}
                  onChange={(e) => handleChange3(e)}
                  sx={{
                    width: '100%',
                    height: '50px',
                    padding: 0,
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    borderRadius: '12px'
                  }}
                />
              </Grid>
            </Grid>
            <Button
              variant="standard"
              type='submit'
              sx={{
                mt: 2,
                backgroundColor: '#00789f',
                color: 'white',
                textTransform: 'capitalize',
                '&:hover': {
                  backgroundColor: '#00789f', // Optional: maintain the same color on hover

                },
              }}
            >
              Update
            </Button>
          </Box>
        </DialogContent>

      </Dialog>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={'sm'}
        open={open4}
        onClose={() => setOpen4(false)}
        PaperProps={{
          style: {
            borderRadius: '16px', // Adjust the radius as needed
          },
        }}
      >


        <DialogContent className={classes.blurredBackground}>
          <DialogTitle sx={{ textAlign: 'center' }}>Update Connection</DialogTitle>
          <Box

            component="form"
            onSubmit={handleSubmit4(UpdateEdge)}
            sx={{ display: 'flex', flexDirection: 'column', }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InputLabel sx={{ color: 'black', mb: 0.5 }}>Label</InputLabel>
                <TextField

                  fullWidth
                  InputProps={{
                    sx: {
                      borderRadius: '3px', // Adjust the value as needed
                      border: '1px solid black'
                    },
                  }}
                  size='small'
                  {...register4('name')}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ color: 'black' }}>Layer Color</InputLabel>
                <Box
                  component="input"
                  type="color"
                  value={edgeColor}
                  onChange={(e) => handleChange3(e)}
                  sx={{
                    width: '100%',
                    height: '50px',
                    padding: 0,
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    borderRadius: '12px'
                  }}
                />
              </Grid>
            </Grid>
            <Button
              variant="standard"
              type='submit'
              sx={{
                mt: 2,
                backgroundColor: '#00789f',
                color: 'white',
                textTransform: 'capitalize',
                '&:hover': {
                  backgroundColor: '#00789f', // Optional: maintain the same color on hover

                },
              }}
            >
              Update
            </Button>
          </Box>
        </DialogContent>

      </Dialog>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={'sm'}
        open={open2}
        onClose={() => setOpen2(false)}
        PaperProps={{
          style: {
            borderRadius: '16px', // Adjust the radius as needed
          },
        }}
      >

        <DialogTitle sx={{ textAlign: 'center' }}>Create Node</DialogTitle>
        <DialogContent>
          <Box

            component="form"
            onSubmit={handleSubmit2(CreateNode)}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'space-between' }}
          >
            <Grid container spacing={2} >
              <Grid item xs={12}>
                <InputLabel sx={{ color: 'black' }}>Name</InputLabel>
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  sx={{ mt: 0.5 }}
                  size='small'
                  {...register2('inputField')}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ color: 'black' }}>Text Color</InputLabel>
                <Box
                  component="input"
                  type="color"
                  value={textColor}
                  onChange={(e) => handleChange2(e)}
                  sx={{
                    width: '100%',
                    height: '48px',
                    padding: 0,
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    borderRadius: '12px'
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel sx={{ color: 'black' }}>Backgorund Color</InputLabel>
                <Box
                  component="input"
                  type="color"
                  value={color}
                  onChange={(e) => handleChange(e)}
                  sx={{
                    width: '100%',
                    height: '48px',
                    padding: 0,
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    borderRadius: '12px'
                  }}
                />
              </Grid>
            </Grid>
            {/* <Grid2 container spacing={2} mt={2} justifyContent={'space-between'}>
              <Grid2 item size={4}>
                <InputLabel sx={{ color: 'black' }}>Source</InputLabel>
                <TextField
                  select // Makes the TextField a dropdown
                  fullWidth
                  size="small"
                  {...register2('sourceField')} // Register the dropdown
                >
                  <MenuItem value="Option 1">Option 1</MenuItem>
                  <MenuItem value="Option 2">Option 2</MenuItem>
                  <MenuItem value="Option 3">Option 3</MenuItem>
                </TextField>
              </Grid2>

              <Grid2 item size={4}>
                <InputLabel sx={{ color: 'black' }}>Label</InputLabel>
                <TextField
                  fullWidth
                  size="small"
                  {...register2('labelField')} // Register the text input
                />

              </Grid2>

              <Grid2 item size={4}>
                <InputLabel sx={{ color: 'black' }}>Target</InputLabel>
                <TextField
                  select // Makes the TextField a dropdown
                  fullWidth
                  size="small"
                  {...register2('targetField')} // Register the dropdown
                >
                  <MenuItem value="Option A">Option A</MenuItem>
                  <MenuItem value="Option B">Option B</MenuItem>
                  <MenuItem value="Option C">Option C</MenuItem>
                </TextField>
              </Grid2>

            </Grid2> */}

            <Grid2 container justifyContent={'center'} >

              <Grid2 item display={'flex'} justifyContent={'center'} size={12}>
                <Button
                  fullWidth
                  variant="standard"
                  type='submit'
                  sx={{
                    mt: 2,
                    backgroundColor: '#00789f',
                    color: 'white',
                    textTransform: 'capitalize',
                    '&:hover': {
                      backgroundColor: '#00789f', // Optional: maintain the same color on hover

                    },
                  }}
                >
                  Create
                </Button>
              </Grid2>
            </Grid2>
          </Box>
        </DialogContent>

      </Dialog>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={'sm'}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            borderRadius: '16px', // Adjust the radius as needed
          },
        }}
      >

        <DialogTitle sx={{ textAlign: 'center' }}>Update Node</DialogTitle>
        <DialogContent>
          <Box

            component="form"
            onSubmit={handleSubmit(updateNode)}
            sx={{ display: 'flex', flexDirection: 'column', }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  size='small'
                  {...register('name')}
                />
              </Grid>
              <Grid item xs={6} >
                <InputLabel sx={{ color: 'black' }}>Text Color</InputLabel>
                <Box
                  component="input"
                  type="color"
                  value={textColor}
                  onChange={(e) => handleChange2(e)}
                  sx={{
                    width: '100%',
                    height: '48px',
                    padding: 0,
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    borderRadius: '12px'
                  }}
                />
              </Grid>
              <Grid item xs={6} >
                <InputLabel sx={{ color: 'black' }}>Backgorund Color</InputLabel>
                <Box
                  component="input"
                  type="color"
                  value={color}
                  onChange={(e) => handleChange(e)}
                  sx={{
                    width: '100%',
                    height: '48px',
                    padding: 0,
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    borderRadius: '12px'
                  }}
                />
              </Grid>
            </Grid>
            <Button
              variant="standard"
              type='submit'
              sx={{
                mt: 2,
                backgroundColor: '#00789f',
                color: 'white',
                textTransform: 'capitalize',
                '&:hover': {
                  backgroundColor: '#00789f', // Optional: maintain the same color on hover

                },
              }}
            >
              Update
            </Button>
          </Box>
        </DialogContent>

      </Dialog>
      <ContextMenu model={menuItems} ref={contextMenu} className="custom-context-menu" />
      <ReactFlow
        nodes={nodes} // Nodes are passed from state
        edges={edges} // Edges are passed from state
        onNodesChange={handleNodesChange} // To allow changes in nodes
        onEdgesChange={onEdgesChange} // To allow changes in edges
        onConnect={onConnect} // Enable interactive edge creation
        fitView // Ensures the graph fits the available space
        attributionPosition="top-right"
        onNodeClick={onNodeClick} // Handle node click
        nodeTypes={nodeTypes} // Custom node types
        edgeTypes={edgeTypes} // Custom edge types
        onEdgesDelete={onEdgesDelete} // Handle edge deletion
        onNodesDelete={onNodesDelete} // Handle node deletion
        onEdgeClick={onEdgeClick} // Handle edge click
        onNodeContextMenu={onNodeContextMenu}
        onEdgeContextMenu={onEdgeContextMenu}
        className="overview" // Optional custom styling class
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
            label={'Layer Transition'}
          />
          <ButtonGroup variant="contained">
            <Button
              onClick={() => onLayout('TB')}
              style={{ backgroundColor: 'black', color: 'white', textTransform: 'capitalize' }}
            >
              Vertical Layout
            </Button>
            <Button
              onClick={() => onLayout('LR')}
              style={{ backgroundColor: 'black', color: 'white', textTransform: 'capitalize' }}
            >
              Horizontal Layout
            </Button>

          </ButtonGroup>

        </Panel>
        <Panel position="top-left">
          <Box sx={{ m: 2 }}>
            <CircleButton onClick={() => setOpen2(true)}>
              <AddIcon sx={{ fontSize: '27px' }} />
            </CircleButton>
          </Box>
          <Box sx={{ m: 2 }}>
            <CircleButton onClick={() => UpdateArtBoard()}>
              <SaveIcon sx={{ fontSize: '27px' }} />
            </CircleButton>
          </Box>
        </Panel>
      </ReactFlow>



    </div>
  );
};

export default OverviewFlow;

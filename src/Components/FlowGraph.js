import React, { useCallback } from 'react';
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
import { Button, Grid2, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';



// Setting up Dagre graph for layout
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

// Function to apply layout to nodes and edges
const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
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



  const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm();

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    setValue: setValue2,
    formState: { errors: errors2 },

  } = useForm();
  let initialnodes = [
    { id: '1', data: { label: 'ABC Group' }, position: { x: 500, y: 50 }, type: 'input', style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },

    { id: '2', data: { label: 'ABC Investment LLC (Rating: 2C)\nAED 204 Mio (GC Term Loan + PFE)' }, position: { x: 300, y: 150 }, style: { backgroundColor: '#a3a5a3', padding: 10, borderRadius: 5, color: 'white' } },
    { id: '2a', data: { label: 'Associates' }, position: { x: 100, y: 300 }, style: { backgroundColor: '#a3a5a3', padding: 10, borderRadius: 5, color: 'white' } },

    { id: '2c', data: { label: 'Subsidaries' }, position: { x: 300, y: 300 }, style: { backgroundColor: '#a3a5a3', padding: 10, borderRadius: 5, color: 'white' } },
    { id: '2b', data: { label: 'Joint Ventures' }, position: { x: 620, y: 300 }, style: { backgroundColor: '#a3a5a3', padding: 10, borderRadius: 5, color: 'white' } },

    { id: '3', data: { label: 'ABC Development Ltd.' }, position: { x: 750, y: 150 }, style: { backgroundColor: '#a3a5a3', padding: 10, borderRadius: 5, color: 'white' } },
    { id: '4', data: { label: 'Various Hospitality Investments' }, position: { x: 750, y: 220 }, style: { backgroundColor: '#092e65', padding: 10, borderRadius: 5, color: 'white' } },

    { id: '5', data: { label: 'Other Businesses of Mr. ABC' }, position: { x: 1150, y: 150 }, style: { backgroundColor: '#a3a5a3', padding: 10, borderRadius: 5, color: 'white' } },
    { id: '6', data: { label: '123 LLC (Rating: 2E)\nAED 100 Mio TR Limits' }, position: { x: 300, y: 350 }, style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },

    { id: '7', data: { label: '234 LLC (Rating: 2E)\nAED 3 Mio Non Funded WC Limits' }, position: { x: 100, y: 550 }, style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },
    { id: '8', data: { label: '345 LLC (Rating: 2E)' }, position: { x: 280, y: 550 }, style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },

    { id: '9', data: { label: '456 LLC' }, position: { x: 280, y: 620 }, style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },

    { id: '11', data: { label: '678 LLC (Rating: 2P)\nAED 80.6 Mio WC Limits' }, position: { x: 620, y: 550 }, style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },
    { id: '12', data: { label: 'GHI LLC (Rating: 3A)\nAED 6.5 Mio WC Limits' }, position: { x: 1150, y: 550 }, style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },

    { id: '13', data: { label: 'Engineering' }, position: { x: 1150, y: 420 }, style: { backgroundColor: '#092e65', padding: 10, borderRadius: 5, color: 'white' } },
    { id: '14', data: { label: 'Building/Maintenance' }, position: { x: 620, y: 420 }, style: { backgroundColor: '#092e65', padding: 10, borderRadius: 5, color: 'white' } },
    { id: '15', data: { label: 'JV with GHI BV Company' }, position: { x: 980, y: 450 }, style: { backgroundColor: '#a2a19b', padding: 10, borderRadius: 5, color: 'white' } },
    { id: '16', data: { label: 'JV with XYZ Shipyard' }, position: { x: 780, y: 450 }, style: { backgroundColor: '#a2a19b', padding: 10, borderRadius: 5, color: 'white' } },
    { id: '17', data: { label: 'Retail FMCG' }, position: { x: 100, y: 450 }, style: { backgroundColor: '#092e65', padding: 10, borderRadius: 5, color: 'white' } },
    { id: '18', data: { label: 'Wholesale FMCG' }, position: { x: 400, y: 450 }, style: { backgroundColor: '#092e65', padding: 10, borderRadius: 5, color: 'white' } },

    { id: '19', data: { label: '567 LLC' }, position: { x: 450, y: 550 }, style: { backgroundColor: '#0c1317', padding: 10, borderRadius: 5, color: 'white' } },
  ];


  let initialedges = [
    { id: 'e1-2', source: '1', target: '2', type: 'smoothstep', label: 'Corporate Guarantee', style: { stroke: 'black' } },
    { id: 'e1-3', source: '1', target: '3', type: 'smoothstep', style: { stroke: 'black' } },
    { id: 'e1-5', source: '1', target: '5', type: 'smoothstep', style: { stroke: 'black' } },
    { id: 'e3-4', source: '3', target: '4', type: 'smoothstep', style: { stroke: 'black' } },

    { id: 'e2-2a', source: '2', target: '2a', type: 'smoothstep', style: { stroke: 'black' } },
    { id: 'e2-2b', source: '2', target: '2b', type: 'smoothstep', style: { stroke: 'black' } },
    { id: 'e2-2c', source: '2', target: '2c', type: 'smoothstep', style: { stroke: 'black' } },

    { id: 'e15-12', source: '15', target: '12', type: 'smoothstep', label: '100%', style: { stroke: 'black' } },

    { id: 'e10-11', source: '10', target: '11', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
    { id: 'e16-11', source: '16', target: '11', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
    { id: 'e13-12', source: '13', target: '12', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
    { id: 'e5-13', source: '5', target: '13', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
    { id: 'e2b-14', source: '2b', target: '14', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
    { id: 'e14-11', source: '14', target: '11', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
    { id: 'e7-17', source: '17', target: '7', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
    { id: 'e6-17', source: '6', target: '17', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
    { id: 'e6-18', source: '6', target: '18', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
    { id: 'e8-18', source: '18', target: '8', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
    { id: 'e9-18', source: '8', target: '9', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
    { id: 'e18-19', source: '18', target: '19', type: 'smoothstep', label: '53%', style: { stroke: 'black' } },
  ];

  // Function to log node data on click
  const onNodeClick = useCallback((event, node) => {
    handleClickOpen()
    console.log('Node clicked:', node);
  }, []);

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false)
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const handleClickOpen = () => {
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
  const [nodes, setNodes, onNodesChange] = useNodesState(initialnodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialedges);

  // Handle creating new edges by connecting nodes
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const [color, setColor] = React.useState('#ffffff')

  const handleChange = (e) => {
    console.log(e.target.value);
    
    setColor(e.target.value)
  }

  const handleNodesChange = useCallback(
    (changes) => {
      changes.forEach((change) => {
        if (change.type === 'position') {
          console.log(change);

          console.log(`Node ${change.id} moved to: `, change.position);
        }
      });
      console.log(nodes.find((item => item?.id == changes[0].id)), 'nodes');
      console.log(edges, 'edges');


      console.log(changes, 'changes');

      onNodesChange(changes);
    },
    [onNodesChange],
  );

  const onSubmit = (data) => {
    console.log(data);
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

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={'md'}
        open={open2}
        onClose={() => setOpen2(false)}

      >

        <DialogTitle sx={{ textAlign: 'center' }}>Create Node</DialogTitle>
        <DialogContent>
          <Box

            component="form"
            onSubmit={handleSubmit2(onSubmit)}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <Grid2 container spacing={7} >
              <Grid2 item xs={4}>
                <InputLabel sx={{ color: 'black' }}>Name</InputLabel>
                <TextField
                  fullWidth
                  size='small'
                  {...register2('inputField')}
                />
              </Grid2>
              <Grid2 item xs={4}>
                <InputLabel sx={{ color: 'black' }}>Backgorund Color</InputLabel>
                <Box
                  component="input"
                  type="color"
                  value={color}
                  onChange={(e)=>handleChange(e)}
                  sx={{
                    width: '270px',
                    height: '40px',
                    padding: 0,
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    borderRadius: '12px'
                  }}
                />
              </Grid2>
            </Grid2>
            <Grid2 container spacing={2} mt={2} justifyContent={'space-between'}>
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

            </Grid2>

            <Grid2 container justifyContent={'center'} >

              <Grid2 item display={'flex'} justifyContent={'center'} size={12}>
                <Button

                  variant="standard"
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
        maxWidth={'xs'}
        open={open}
        onClose={handleClose}

      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <DialogTitle>Update Node</DialogTitle>
          <DialogContent>
            <Box
              noValidate
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ display: 'flex', flexDirection: 'column', width: 'fit-content' }}
            >
              <TextField
                fullWidth
                size='small'
                {...register('inputField')}
              />
              <Button
                variant="standard"
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
        </Box>
      </Dialog>
      <ReactFlow
        nodes={nodes} // Nodes are passed from state
        edges={edges} // Edges are passed from state
        onNodesChange={handleNodesChange} // To allow changes in nodes
        onEdgesChange={onEdgesChange} // To allow changes in edges

        onConnect={onConnect} // Enable interactive edge creation
        fitView // Ensures the graph fits the available space
        attributionPosition="top-right"
        onNodeClick={onNodeClick} // Add onNodeClick handler here
        nodeTypes={nodeTypes} // Custom node types
        edgeTypes={edgeTypes} // Custom edge types
        className="overview" // Optional custom styling class
      >
        <MiniMap zoomable pannable nodeClassName={nodeClassName} />
        <Controls />
        <Background />
        <Panel position="top-right">
          <button onClick={() => onLayout('TB')}>Vertical Layout</button>
          <button onClick={() => onLayout('LR')}>Horizontal Layout</button>
        </Panel>
        <Panel position="top-left">
          <Box sx={{ m: 2 }}>
            <CircleButton onClick={() => setOpen2(true)}>
              <AddIcon sx={{ fontSize: '27px' }} />
            </CircleButton>
          </Box>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default OverviewFlow;

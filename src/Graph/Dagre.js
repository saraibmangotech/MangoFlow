import React, { useState, useEffect } from 'react';
import ReactFlow, { Controls, MiniMap } from 'react-flow-renderer';
import dagre from 'dagre';

const nodeWidth = 150;
const nodeHeight = 50;

// Function to calculate layout using dagre
const getLayoutedElements = (elements, direction = 'LR') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  elements.forEach((el) => {
    if (el.type === 'input' || el.type === 'default' || el.type === 'output') {
      dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
    }
  });

  elements.forEach((el) => {
    if (el.source && el.target) {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (el.type === 'input' || el.type === 'default' || el.type === 'output') {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
    }

    return el;
  });
};

const MoveableGraph = () => {
  const initialElements = [
    { id: '1', type: 'input', data: { label: 'Input Node' }, position: { x: 0, y: 0 } },
    { id: '2', type: 'default', data: { label: 'Node 2' }, position: { x: 0, y: 0 } },
    { id: '3', type: 'output', data: { label: 'Output Node' }, position: { x: 0, y: 0 } },
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3' },
  ];

  const [elements, setElements] = useState(initialElements);

  useEffect(() => {
    const layoutedElements = getLayoutedElements(initialElements);
    setElements(layoutedElements);
  }, []);

  const onLoad = (reactFlowInstance) => {
    reactFlowInstance.fitView();
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <ReactFlow elements={elements} onLoad={onLoad}>
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default MoveableGraph;

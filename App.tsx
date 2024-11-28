import { useCallback, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  MiniMap,
  Controls,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';


const markdownText = `
# Markdown with Syntax Highlighting

Here is a sample of some YAML code:

\`\`\`yaml
name: John Doe
age: 30
address:
  street: 123 Main St
  city: Anytown
\`\`\`

Now, some general code:

\`\`\`
const greeting = 'Hello, world!';
console.log(greeting);
\`\`\`

Finally, a C# code snippet:

\`\`\`csharp
using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, C#!");
    }
}
\`\`\`
`;

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Stage 1', markdown: markdownText },
    position: { x: 50, y: 5 },
    className: 'light',
    style: { backgroundColor: 'rgba(0, 128, 255, 0.2)', width: 600, height: 400 },
  },
  {
    id: '1a',
    data: { label: 'Job 1.1' },
    position: { x: 10, y: 50 },
    parentId: '1',
    className: 'light',
    style: { backgroundColor: 'rgba(255, 255, 0, 0.2)', width: 300, height: 300 },
  },
  {
    id: '1a1',
    data: { label: 'Step 1.1.1' },
    position: { x: 15, y: 70 },
    parentId: '1a',
    className: 'light',
  },
  {
    id: '1a2',
    data: { label: 'Step 1.1.2' },
    position: { x: 15, y: 150 },
    parentId: '1a',
    className: 'light',
  },
  {
    id: '1b',
    data: { label: 'Job 1.2' },
    position: { x: 320, y: 50 },
    parentId: '1',
    className: 'light',
    style: { backgroundColor: 'rgba(255, 255, 0, 0.2)', width: 300, height: 300 },
  },
  {
    id: '1b1',
    data: { label: 'Step 1.2.1' },
    position: { x: 15, y: 70 },
    parentId: '1b',
    className: 'light',
  },
  {
    id: '1b2',
    data: { label: 'Step 1.2.2' },
    position: { x: 15, y: 150 },
    parentId: '1b',
    className: 'light',
  },
  {
    id: '2',
    type: 'input',
    data: { label: 'Stage 2' },
    position: { x: 700, y: 5 },
    className: 'light',
    style: { backgroundColor: 'rgba(0, 128, 255, 0.2)', width: 600, height: 400 },
  },
  {
    id: '2a',
    data: { label: 'Job 2.1' },
    position: { x: 10, y: 50 },
    parentId: '2',
    className: 'light',
    style: { backgroundColor: 'rgba(255, 255, 0, 0.2)', width: 300, height: 300 },
  },
  {
    id: '2a1',
    data: { label: 'Step 2.1.1' },
    position: { x: 15, y: 70 },
    parentId: '2a',
    className: 'light',
  },
  {
    id: '2a2',
    data: { label: 'Step 2.1.2' },
    position: { x: 15, y: 150 },
    parentId: '2a',
    className: 'light',
  },
  {
    id: '2b',
    data: { label: 'Job 2.2' },
    position: { x: 320, y: 50 },
    parentId: '2',
    className: 'light',
    style: { backgroundColor: 'rgba(255, 255, 0, 0.2)', width: 300, height: 300 },
  },
  {
    id: '2b1',
    data: { label: 'Step 2.2.1' },
    position: { x: 15, y: 70 },
    parentId: '2b',
    className: 'light',
  },
  {
    id: '2b2',
    data: { label: 'Step 2.2.2' },
    position: { x: 15, y: 150 },
    parentId: '2b',
    className: 'light',
  },
];

const initialEdges = [
  { id: 'e1-1a', source: '1', target: '1a', animated: true },
  { id: 'e1-1b', source: '1', target: '1b' },
  { id: 'e1a-1a1', source: '1a', target: '1a1' },
  { id: 'e1a-1a2', source: '1a', target: '1a2' },
  { id: 'e1b-1b1', source: '1b', target: '1b1' },
  { id: 'e1b-1b2', source: '1b', target: '1b2' },
  { id: 'e2-2a', source: '2', target: '2a', animated: true },
  { id: 'e2-2b', source: '2', target: '2b' },
  { id: 'e2a-2a1', source: '2a', target: '2a1' },
  { id: 'e2a-2a2', source: '2a', target: '2a2' },
  { id: 'e2b-2b1', source: '2b', target: '2b1' },
  { id: 'e2b-2b2', source: '2b', target: '2b2' },
];


const NestedFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState(null); // Track selected node by ID
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(true);

  // Handler for clicking on a node
  const onNodeClick = useCallback((event, node) => {
    setSelectedNodeId((prevSelectedNodeId) =>
      prevSelectedNodeId === node.id ? null : node.id // Toggle selection
    );
  }, []);

  // Function to get indentation based on node level
  const getIndentation = (node) => {
    if (node.data.label.startsWith('Job') || node.data.label.startsWith('Jobs')) return 20; // Jobs
    if (node.data.label.startsWith('Step') || node.data.label.startsWith('Steps')) return 40; // Steps
    return 0; // Stages
  };

  // Handler for connecting nodes
  const onConnect = useCallback((connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  // Get the label of the selected node
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);
  const selectedLabel = selectedNode ? selectedNode.data.label : null;
  const selectedJson = selectedNode ? selectedNode.data.markdown : null;
  return (
    <div style={{ display: 'flex', height: '100vh' }}>

      {/* Toggle Button for Left Sidebar */}
      <FontAwesomeIcon
        icon={faBars}
        onClick={() => setLeftSidebarVisible(!leftSidebarVisible)}
        style={{
          position: 'absolute',
          left: leftSidebarVisible ? 200 : 10,
          top: 10,
          zIndex: 10,
          cursor: 'pointer',
          fontSize: '1.5em',
        }}
      />
      {/* Left Sidebar: Node Labels in Order */}
      {/* Left Sidebar */}
      {leftSidebarVisible && (
        <LeftSidebar
          nodes={nodes}
          selectedNodeId={selectedNodeId}
          onNodeClick={onNodeClick}
          getIndentation={getIndentation}
        />
      )}
      {/* React Flow Canvas */}
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick} // Attach onClick handler to nodes
          className="flow"
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>

      {/* Right Sidebar */}
      <RightSidebar label={selectedLabel} markdown={selectedJson} />
    </div>
  );
};

export default NestedFlow;
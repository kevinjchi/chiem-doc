import React from 'react';
import{ReactFlow, MiniMap, Controls, Background } from '@xyflow/react';

const initialNodes = [
    { id: '1', data: { label: 'Developer Machine' }, position: { x: 300, y: 0 } },
    { id: '2', data: { label: 'IDE + Playwright Config' }, position: { x: 300, y: 100 } },
    { id: '3', data: { label: 'Git Repository' }, position: { x: 300, y: 200 } },
    { id: '4', data: { label: 'CI/CD Pipeline' }, position: { x: 300, y: 300 } },
    { id: '5', data: { label: 'Build Agent' }, position: { x: 300, y: 400 } },
    { id: '6', data: { label: 'Azure Key Vault' }, position: { x: 100, y: 500 } }, // Positioned left for clarity
    { id: '7', data: { label: 'Playwright Test Execution' }, position: { x: 300, y: 600 } },
    { id: '8', data: { label: 'Reporting & Artifacts' }, position: { x: 300, y: 700 } },
  ];
  
  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', label: 'Code Development', type: 'smoothstep' },
    { id: 'e2-3', source: '2', target: '3', label: 'Push to Git', type: 'smoothstep' },
    { id: 'e3-4', source: '3', target: '4', label: 'Trigger Pipeline', type: 'smoothstep' },
    { id: 'e4-5', source: '4', target: '5', label: 'Assign Build Agent', type: 'smoothstep' },
    { id: 'e5-6', source: '5', target: '6', label: 'Fetch Secrets', type: 'smoothstep' },
    { id: 'e6-5', source: '6', target: '5', label: 'Provide Secrets', type: 'smoothstep' },
    { id: 'e5-7', source: '5', target: '7', label: 'Run Tests', type: 'smoothstep' },
    { id: 'e7-8', source: '7', target: '8', label: 'Generate Reports', type: 'smoothstep' },
  ];
  
  const PlaywrightFlow = () => {
    return (
      <div style={{ height: 800 }}>
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          fitView
          nodesConnectable={false}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    );
  };
  
  export default PlaywrightFlow;
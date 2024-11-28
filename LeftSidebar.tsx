import React, { useState } from 'react';

interface Node {
  id: string;
  data: {
    label: string;
  };
  children?: Node[];
}

interface LeftSidebarProps {
  nodes: Node[];
  selectedNodeId: string | null;
  onNodeClick: (event: React.MouseEvent, node: Node) => void;
  getIndentation: (node: Node) => number;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ nodes, selectedNodeId, onNodeClick, getIndentation }) => {
  // Handle expanding/collapsing of node sub-items
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

  const handleNodeClick = (node: Node) => {
    if (expandedNodes.includes(node.id)) {
      setExpandedNodes(expandedNodes.filter(id => id !== node.id));
    } else {
      setExpandedNodes([...expandedNodes, node.id]);
    }
    
    // Pass a dummy event object (if the event isn't necessary)
    onNodeClick({} as React.MouseEvent, node); // Dummy MouseEvent
  };

  const renderNode = (node: Node) => (
    <div key={node.id} style={{ marginBottom: 10 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: `${getIndentation(node)}px`,
          cursor: 'pointer',
          fontWeight: node.id === selectedNodeId ? 'bold' : 'normal',
          color: node.id === selectedNodeId ? '#0063B1' : '#333',
          transition: 'all 0.3s ease',
        }}
        onClick={() => handleNodeClick(node)}
      >
        {node.children && (
          <span
            style={{
              marginRight: 8,
              transform: expandedNodes.includes(node.id) ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          >
            ▶
          </span>
        )}
        {node.data.label}
      </div>

      {/* Render children nodes if expanded */}
      {expandedNodes.includes(node.id) && node.children && (
        <div style={{ paddingLeft: 20 }}>
          {node.children.map((childNode) => renderNode(childNode))}
        </div>
      )}
    </div>
  );

  return (
    <div
      style={{
        width: 130,
        backgroundColor: '#f4f4f4',
        padding: '20px 15px',
        borderRight: '1px solid #e1e1e1',
        height: '100vh',
        overflowY: 'auto',
        position: 'fixed',  // Fixed position to make it stay in place
        top: 0,
        left: 0,
        zIndex: 9999, // Ensure it's in front of the content
      }}
    >
      <h3
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#333',
        }}
      >
        Documentation
      </h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {nodes.map((node) => renderNode(node))}
      </ul>
    </div>
  );
};

export default LeftSidebar;

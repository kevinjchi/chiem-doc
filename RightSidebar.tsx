import React, { useState, useRef, useEffect } from 'react';
import MarkdownWithSyntaxHighlighting from './MarkdownWithSyntaxHighlight';

interface RightSidebarProps {
  label: string | null;
  markdown?: string | null;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ label, markdown }) => {
  const [sidebarWidth, setSidebarWidth] = useState(250); // initial width
  const sidebarRef = useRef<HTMLDivElement>(null); // Reference to the sidebar container
  const draggerRef = useRef<HTMLDivElement>(null); // Reference to the dragger element

  // Mouse down handler for initiating drag (top-left corner)
  const handleMouseDown = (e: MouseEvent) => {
    const startX = e.clientX; // Get the initial position of the mouse (X axis)
    const startWidth = sidebarWidth; // Get the current width of the sidebar

    // Mouse move handler for resizing the sidebar (only horizontally)
    const onMouseMove = (moveEvent: MouseEvent) => {
      const diffX = moveEvent.clientX - startX; // Calculate horizontal movement (width)
      setSidebarWidth(startWidth - diffX); // Update sidebar width based on mouse movement (add diffX)
    };

    // Mouse up handler to end the drag
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove); // Remove mousemove event listener
      document.removeEventListener('mouseup', onMouseUp); // Remove mouseup event listener
    };

    document.addEventListener('mousemove', onMouseMove); // Add mousemove event listener
    document.addEventListener('mouseup', onMouseUp); // Add mouseup event listener
  };

  useEffect(() => {
    // Ensure the dragger is not null and add mouse down event listener
    if (draggerRef.current) {
      draggerRef.current.addEventListener('mousedown', handleMouseDown);
    }

    // Cleanup the event listener on unmount
    return () => {
      if (draggerRef.current) {
        draggerRef.current.removeEventListener('mousedown', handleMouseDown);
      }
    };
  }, [sidebarWidth]); // Re-run the effect if the sidebarWidth changes

  return (
    <div
      ref={sidebarRef}
      style={{
        width: sidebarWidth, // Dynamically set the sidebar width
        height: '100%', // Fixed height
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderLeft: '1px solid #ccc',
        display: label ? 'block' : 'none', // Show sidebar if a node is selected
        position: 'relative', // Necessary for positioning the dragger
      }}
    >
      <h3>Selected Node Details</h3>
      {label && (
        <p>
          <strong>Label:</strong> {label}
        </p>
      )}
      {markdown && (
        <div>
          <h4>Node Data</h4>
          <div
            style={{
              backgroundColor: '#eee',
              padding: '10px',
              borderRadius: '4px',
              overflowX: 'auto',
            }}
          >
            {/* Render markdown content */}
            <MarkdownWithSyntaxHighlighting markdownText={markdown} />
          </div>
        </div>
      )}
      
      {/* Dragger element to resize the sidebar horizontally */}
      <div
        ref={draggerRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '10px',
          height: '100%',
          cursor: 'ew-resize', // Horizontal resize cursor
          backgroundColor: '#ccc',
        }}
      />
    </div>
  );
};

export default RightSidebar;

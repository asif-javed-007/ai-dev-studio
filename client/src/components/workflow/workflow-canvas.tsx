import React, { useState, useRef, useCallback } from "react";
import { useDrop } from "react-dnd";
import { WorkflowNode } from "./workflow-node";
import { Box, Database, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTouch } from "@/hooks/use-touch";

interface Position {
  x: number;
  y: number;
}

interface WorkflowNodeData {
  id: string;
  type: string;
  name: string;
  position: Position;
}

interface Connection {
  id: string;
  sourceId: string;
  targetId: string;
  startPos: Position;
  endPos: Position;
}

interface WorkflowCanvasProps {
  nodes: WorkflowNodeData[];
  connections: Connection[];
  onNodeAdd: (node: WorkflowNodeData) => void;
  onConnect: (sourceId: string, targetId: string) => void;
}

const getIconForType = (type: string) => {
  switch (type) {
    case "lambda":
      return Database;
    case "step-functions":
      return Box;
    case "ai-model":
      return Activity;
    default:
      return Box;
  }
};

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  nodes,
  connections,
  onNodeAdd,
  onConnect,
}) => {
  const [connecting, setConnecting] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<Position>({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const touchHandler = useTouch();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "COMPONENT",
    drop: (item: { type: string; name: string }, monitor) => {
      const offset = monitor.getClientOffset();
      if (offset && canvasRef.current) {
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const position = {
          x: offset.x - canvasRect.left,
          y: offset.y - canvasRect.top,
        };
        onNodeAdd({
          id: `node-${Date.now()}`,
          type: item.type,
          name: item.name,
          position,
        });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleNodeConnect = useCallback((nodeId: string) => {
    if (!connecting) {
      setConnecting(nodeId);
    } else if (connecting !== nodeId) {
      onConnect(connecting, nodeId);
      setConnecting(null);
    }
  }, [connecting, onConnect]);

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (connecting && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setConnecting(null);
    }
  };

  return (
    <div
      ref={(element) => {
        drop(element);
        if (element) {
          canvasRef.current = element;
        }
      }}
      className={`relative border-2 border-dashed rounded-lg ${
        isMobile ? 'p-3 min-h-[400px]' : 
        isTablet ? 'p-4 min-h-[500px]' : 
        'p-6 min-h-[600px]'
      } ${isOver ? 'bg-accent/20' : ''} touch-manipulation`}
      onMouseMove={handleCanvasMouseMove}
      onClick={handleCanvasClick}
      {...touchHandler}
    >
      {nodes.length === 0 && (
        <div className="text-center">
          <Box className={`mx-auto mb-4 ${
            isMobile ? 'h-8 w-8' : 'h-12 w-12'
          } text-muted-foreground`} />
          <h3 className={`font-semibold mb-2 ${
            isMobile ? 'text-base' : 'text-lg'
          }`}>
            {isMobile ? 'Tap to Add Components' : 'Drag and Drop Components Here'}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {isMobile 
              ? 'Create AI workflows by tapping components from below'
              : 'Create AI-powered automation workflows by dragging components from the left panel'
            }
          </p>
          <Button variant="outline" size={isMobile ? "sm" : "default"}>
            <Plus className="h-4 w-4 mr-2" />
            Add Node
          </Button>
        </div>
      )}

      {nodes.map((node) => (
        <WorkflowNode
          key={node.id}
          {...node}
          icon={getIconForType(node.type)}
          onConnect={handleNodeConnect}
          isMobile={isMobile}
          isConnecting={connecting !== null}
        />
      ))}

      <svg
        className="absolute inset-0 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      >
        {connections.map((connection) => (
          <g key={connection.id}>
            <path
              d={`M ${connection.sourceId} ${connection.startPos.y} C ${
                connection.startPos.x + (isMobile ? 50 : 100)
              } ${connection.startPos.y}, ${connection.endPos.x - (isMobile ? 50 : 100)} ${
                connection.endPos.y
              }, ${connection.targetId} ${connection.endPos.y}`}
              stroke="currentColor"
              strokeWidth={isMobile ? "1.5" : "2"}
              fill="none"
              className="text-primary"
            />
          </g>
        ))}

        {connecting && mousePos && (
          <path
            d={`M ${connecting} ${mousePos.y} C ${
              mousePos.x + (isMobile ? 50 : 100)
            } ${mousePos.y}, ${mousePos.x - (isMobile ? 50 : 100)} ${
              mousePos.y
            }, ${mousePos.x} ${mousePos.y}`}
            stroke="currentColor"
            strokeWidth={isMobile ? "1.5" : "2"}
            strokeDasharray="5,5"
            fill="none"
            className="text-primary/50"
          />
        )}
      </svg>
    </div>
  );
};
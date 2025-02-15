import { useDrag } from "react-dnd";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowNodeProps {
  id: string;
  type: string;
  name: string;
  position: { x: number; y: number };
  icon: LucideIcon;
  onConnect?: (sourceId: string) => void;
  isMobile: boolean;
  isConnecting: boolean;
}

export const WorkflowNode: React.FC<WorkflowNodeProps> = ({
  id,
  type,
  name,
  position,
  icon: Icon,
  onConnect,
  isMobile,
  isConnecting,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "NODE",
    item: { id, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      id={id}
      ref={drag}
      className={cn(
        "absolute p-4 bg-background border rounded-lg shadow-lg cursor-move transition-all",
        isDragging ? "opacity-50" : "opacity-100",
        isConnecting ? "ring-2 ring-primary" : "hover:shadow-xl hover:scale-105"
      )}
      style={{
        left: position.x,
        top: position.y,
        width: isMobile ? 160 : 200,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <Icon className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-primary`} />
        <h3 className={`font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>{name}</h3>
      </div>
      <div className={`text-sm text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>{type}</div>

      {/* Connection points */}
      <div 
        className={cn(
          "absolute right-0 top-1/2 bg-primary rounded-full transform translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all",
          isMobile ? "w-2.5 h-2.5" : "w-3 h-3",
          "hover:scale-125 hover:ring-2 hover:ring-primary hover:ring-offset-2"
        )}
        onClick={(e) => {
          e.stopPropagation();
          onConnect?.(id);
        }}
      />
      <div 
        className={cn(
          "absolute left-0 top-1/2 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2",
          isMobile ? "w-2.5 h-2.5" : "w-3 h-3"
        )}
      />
    </div>
  );
};
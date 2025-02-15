import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Plus,
  GitBranch,
  Box,
  Activity,
  Shield,
  Workflow as WorkflowIcon,
  Database,
  FileText,
  Briefcase,
  ShieldCheck,
  Cpu,
  Cloud,
  Zap,
  Lightbulb,
  AlertCircle,
  LucideIcon
} from "lucide-react";
import { PageGuide } from "@/components/guide/page-guide";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { WorkflowCanvas } from "@/components/workflow/workflow-canvas";

interface Position {
  x: number;
  y: number;
}

interface WorkflowNode {
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

const ItemTypes = {
  COMPONENT: 'component'
};

const workflowTemplates = [
  {
    id: 1,
    name: "Financial Data Processing",
    description: "Automated financial data analysis and reporting workflow",
    category: "Finance",
    status: "Production Ready",
    integrations: ["Addvizer Lambda", "Addvizer AI", "Workflow Engine"]
  },
  {
    id: 2,
    name: "HR Document Processing",
    description: "AI-powered HR document analysis and workflow automation",
    category: "HR",
    status: "Production Ready",
    integrations: ["Addvizer Lambda", "Document AI", "Storage"]
  },
  {
    id: 3,
    name: "Security Threat Detection",
    description: "Real-time security monitoring and threat response workflow",
    category: "Cybersecurity",
    status: "Beta",
    integrations: ["Security Monitor", "Security Hub", "Lambda"]
  },
  {
    id: 4,
    name: "Supply Chain Optimization",
    description: "AI-driven supply chain analytics and automation",
    category: "Supply Chain",
    status: "Production Ready",
    integrations: ["Workflow Engine", "AI Models", "Analytics"]
  }
];

const metrics = [
  {
    label: "Active Workflows",
    value: "24",
    icon: WorkflowIcon,
    color: "text-blue-500"
  },
  {
    label: "Addvizer Services",
    value: "12",
    icon: Database,
    color: "text-green-500"
  },
  {
    label: "Automation Tasks",
    value: "156",
    icon: Activity,
    color: "text-purple-500"
  },
  {
    label: "Compliance Score",
    value: "98%",
    icon: ShieldCheck,
    color: "text-red-500"
  }
];

const aiRecommendations = [
  {
    type: "optimization",
    message: "Consider parallel execution for data processing steps",
    impact: "high",
    icon: Zap
  },
  {
    type: "security",
    message: "Add input validation to prevent injection attacks",
    impact: "critical",
    icon: Shield
  },
  {
    type: "performance",
    message: "Use Addvizer Lambda provisioned concurrency for faster startup",
    impact: "medium",
    icon: Cpu
  },
  {
    type: "cost",
    message: "Implement automatic scaling to optimize resource usage",
    impact: "high",
    icon: Cloud
  }
];

const componentSuggestions = [
  {
    name: "Error Handler",
    description: "Add error handling for robust execution",
    confidence: 95
  },
  {
    name: "Data Validator",
    description: "Validate input data before processing",
    confidence: 88
  },
  {
    name: "Retry Mechanism",
    description: "Implement exponential backoff for reliability",
    confidence: 92
  }
];

const DraggableComponent: React.FC<{ icon: LucideIcon; name: string; type: string }> = ({ icon: Icon, name, type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.COMPONENT,
    item: { name, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-3 border rounded-md cursor-move hover:bg-accent transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <Icon className="h-5 w-5 mb-2" />
      <p className="text-sm font-medium">{name}</p>
    </div>
  );
};


export default function Workflow() {
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");

  const handleNodeAdd = (node: WorkflowNode) => {
    setNodes(prevNodes => [...prevNodes, node]);
  };

  const handleConnect = (sourceId: string, targetId: string, startPos: Position, endPos: Position) => {
    const newConnection: Connection = {
      id: `conn-${Date.now()}`,
      sourceId,
      targetId,
      startPos,
      endPos
    };

    setConnections(prevConnections => [...prevConnections, newConnection]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <PageGuide
        pageId="workflow"
        steps={[
          {
            title: "Welcome to Workflow Builder",
            description: "This is where you can create and manage your AI-powered automation workflows. Let's get started with a quick tour.",
          },
          {
            title: "Component Library",
            description: "On the left, you'll find a library of components that you can drag and drop to build your workflow. These include Addvizer services, AI models, and more.",
          },
          {
            title: "Canvas Area",
            description: "The center area is your workflow canvas. Drag components here and connect them to create your automation flow.",
          },
          {
            title: "AI Recommendations",
            description: "On the right, you'll see AI-powered recommendations to optimize your workflow and improve its performance.",
          },
          {
            title: "Start Building",
            description: "You're all set! Start by dragging a component from the left panel onto the canvas. Need help? Check out our documentation in the User Guide.",
          },
        ]}
      />

      <div className="p-3 md:p-6 space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">WRPA Dashboard</h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              AI-Powered Workflow Automation Control Center
            </p>
          </div>
          <Button className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Create Workflow
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {metrics.map((metric) => (
            <Card key={metric.label} className="transition-all duration-200 hover:shadow-md">
              <CardContent className="pt-4 md:pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <metric.icon className={`h-4 md:h-5 w-4 md:w-5 ${metric.color}`} />
                  <h3 className="font-semibold text-sm md:text-base">{metric.label}</h3>
                </div>
                <div className="text-xl md:text-2xl font-bold">{metric.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="templates" className="w-full">
          <TabsList className="w-full md:w-auto flex overflow-x-auto">
            <TabsTrigger value="templates" className="flex-1 md:flex-none">Templates</TabsTrigger>
            <TabsTrigger value="builder" className="flex-1 md:flex-none">Workflow Builder</TabsTrigger>
            <TabsTrigger value="monitoring" className="flex-1 md:flex-none">Monitoring</TabsTrigger>
            <TabsTrigger value="compliance" className="flex-1 md:flex-none">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="templates">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
              {workflowTemplates.map((template) => (
                <Card key={template.id} className="transition-all duration-200 hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{template.category}</Badge>
                      <Badge
                        className={
                          template.status === "Production Ready"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }
                      >
                        {template.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{template.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.integrations.map((integration) => (
                        <Badge key={integration} variant="outline">
                          {integration}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full">Use Template</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="builder">
            <Card className="mt-4 md:mt-6">
              <CardContent className="p-2 md:p-6">
                <div className={`grid gap-4 md:gap-6 ${
                  isMobile ? 'grid-cols-1' :
                    isTablet ? 'grid-cols-2' :
                      'grid-cols-4'
                }`}>
                  <div className={`space-y-4 ${isMobile ? 'order-2' : 'order-1'}`}>
                    <div className="border rounded-lg p-3 md:p-4">
                      <h3 className="font-semibold mb-3 md:mb-4">Components</h3>
                      <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                        <DraggableComponent
                          icon={Database}
                          name="Addvizer Lambda"
                          type="lambda"
                        />
                        <DraggableComponent
                          icon={Box}
                          name="Workflow Engine"
                          type="step-functions"
                        />
                        <DraggableComponent
                          icon={Activity}
                          name="AI Models"
                          type="ai-model"
                        />
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        <h3 className="font-semibold">Suggested Components</h3>
                      </div>
                      <div className="space-y-3">
                        {componentSuggestions.map((suggestion, index) => (
                          <DraggableComponent
                            key={index}
                            icon={Box}
                            name={suggestion.name}
                            type={suggestion.name.toLowerCase().replace(' ', '-')}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={`${isMobile ? 'order-1' : 'order-2'} ${
                    isMobile ? 'col-span-1' :
                      isTablet ? 'col-span-2' :
                        'col-span-2'
                  }`}>
                    <WorkflowCanvas
                      nodes={nodes}
                      connections={connections}
                      onNodeAdd={handleNodeAdd}
                      onConnect={handleConnect}
                    />
                  </div>
                  <div className={`space-y-4 ${isMobile ? 'order-3' : 'order-3'} ${
                    isMobile ? 'col-span-1' :
                      isTablet ? 'col-span-2' :
                        'col-span-1'
                  }`}>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <Zap className="h-5 w-5 text-blue-500" />
                        <h3 className="font-semibold">AI Recommendations</h3>
                      </div>
                      <div className="space-y-4">
                        {aiRecommendations.map((rec, index) => (
                          <div
                            key={index}
                            className="p-3 border rounded-md hover:bg-accent/50 cursor-pointer"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <rec.icon className="h-4 w-4 text-blue-500" />
                              <Badge
                                variant="outline"
                                className={
                                  rec.impact === "critical"
                                    ? "bg-red-500/10 text-red-500"
                                    : rec.impact === "high"
                                    ? "bg-yellow-500/10 text-yellow-500"
                                    : "bg-blue-500/10 text-blue-500"
                                }
                              >
                                {rec.impact}
                              </Badge>
                            </div>
                            <p className="text-sm">{rec.message}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                        <h3 className="font-semibold">Workflow Analysis</h3>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Estimated Cost:</span>{" "}
                          $0.52/1000 executions
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Avg. Duration:</span>{" "}
                          1.2s
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Success Rate:</span>{" "}
                          99.9%
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 border rounded-lg p-4">
                  <h3 className="font-semibold mb-4">Properties</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Node Name</label>
                      <input
                        type="text"
                        className="w-full mt-1 px-3 py-2 border rounded-md"
                        placeholder="Enter node name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Service Type</label>
                      <select className="w-full mt-1 px-3 py-2 border rounded-md">
                        <option>Addvizer Lambda</option>
                        <option>Workflow Engine</option>
                        <option>AI Model</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Real-Time Workflow Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Financial Data Processing #1234</h3>
                      <Badge className="bg-green-500">Running</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Last execution: 2 minutes ago
                    </div>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">HR Document Analysis #5678</h3>
                      <Badge className="bg-yellow-500">Warning</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Last execution: 15 minutes ago
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance">
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Compliance & Security Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-green-500" />
                      <div>
                        <h3 className="font-semibold">GDPR Compliance</h3>
                        <p className="text-sm text-muted-foreground">Data protection standards</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Compliant</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-green-500" />
                      <div>
                        <h3 className="font-semibold">SOC 2 Compliance</h3>
                        <p className="text-sm text-muted-foreground">Security controls</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Compliant</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DndProvider>
  );
}
import { useState, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Editor from "@monaco-editor/react";
import {
  Code, Play, Box, GitBranch, Terminal, Shield, Cpu, Cloud, Zap,
  Users, Server, Share2, Settings, Database as DbIcon, HardDrive,
  FolderTree, File, Save, RefreshCw, Bug, GitFork, Rocket,
  Folder, Plus, Trash, Edit2, X, AlertTriangle, CheckCircle,
  GitMerge, Lock
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AddvizerCommunityChat } from "@/components/chat/aws-community-chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Brain, Wand, FileCode, Sparkles } from "lucide-react";

interface FileStructure {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileStructure[];
  parentId?: string;
}

interface OpenTab {
  id: string;
  name: string;
  content: string;
}

interface CodeAnalysisResult {
  type: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  line: number;
  suggestion?: string;
}

interface DeploymentConfig {
  environment: string;
  region: string;
  instance: string;
  autoScaling: boolean;
}

interface AISuggestion {
  type: 'completion' | 'refactor' | 'bug';
  content: string;
  line: number;
  confidence: number;
}

interface AIAssistantState {
  suggestions: AISuggestion[];
  isAnalyzing: boolean;
  selectedTemplate: string | null;
}

const FileTreeItem = ({
  item,
  onSelect,
  onCreateItem,
  onDeleteItem,
  onRenameItem,
  onDrop
}: {
  item: FileStructure;
  onSelect: (file: FileStructure) => void;
  onCreateItem: (parentId: string | undefined, type: 'file' | 'folder') => void;
  onDeleteItem: (id: string) => void;
  onRenameItem: (id: string, newName: string) => void;
  onDrop: (draggedId: string, targetId: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(item.name);
  const { toast } = useToast();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FILE_TREE_ITEM',
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'FILE_TREE_ITEM',
    drop: (draggedItem: { id: string }) => {
      if (draggedItem.id !== item.id) {
        onDrop(draggedItem.id, item.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }));

  const handleRename = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onRenameItem(item.id, newName);
      setIsRenaming(false);
    } else {
      toast({
        title: "Invalid name",
        description: "Name cannot be empty",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="ml-2" ref={drop}>
      <div
        ref={drag}
        className={`flex items-center gap-2 p-1 hover:bg-accent rounded cursor-pointer ${
          isOver ? 'bg-accent/50' : ''
        } ${isDragging ? 'opacity-50' : ''}`}
      >
        <div className="flex-1 flex items-center gap-2" onClick={() => {
          if (item.type === 'folder') {
            setIsOpen(!isOpen);
          } else {
            onSelect(item);
          }
        }}>
          {item.type === 'folder' ? (
            <Folder className="h-4 w-4 text-yellow-500" />
          ) : (
            <File className="h-4 w-4 text-blue-500" />
          )}
          {isRenaming ? (
            <form onSubmit={handleRename} className="flex-1">
              <Input
                size={1}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                autoFocus
                onBlur={() => setIsRenaming(false)}
                className="h-6 py-0 px-1"
              />
            </form>
          ) : (
            <span className="text-sm">{item.name}</span>
          )}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100">
          {item.type === 'folder' && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => onCreateItem(item.id, 'file')}
              >
                <Plus className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => onCreateItem(item.id, 'folder')}
              >
                <FolderTree className="h-3 w-3" />
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => setIsRenaming(true)}
          >
            <Edit2 className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => onDeleteItem(item.id)}
          >
            <Trash className="h-3 w-3" />
          </Button>
        </div>
      </div>
      {item.type === 'folder' && isOpen && item.children && (
        <div className="ml-4">
          {item.children.map((child) => (
            <FileTreeItem
              key={child.id}
              item={child}
              onSelect={onSelect}
              onCreateItem={onCreateItem}
              onDeleteItem={onDeleteItem}
              onRenameItem={onRenameItem}
              onDrop={onDrop}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const computeOptions = [
  { name: "Addvizer Basic", vCPUs: 2, memory: "1 GB", price: "$0.0104/hour" },
  { name: "Addvizer Standard", vCPUs: 2, memory: "2 GB", price: "$0.0208/hour" },
  { name: "Addvizer Pro", vCPUs: 2, memory: "4 GB", price: "$0.0416/hour" },
];

const codeTemplates = [
  {
    name: "REST API Service",
    description: "Basic REST API setup with Express and TypeScript",
    template: `import express from 'express';
import { Router } from 'express';

const app = express();
const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.use('/api', router);
app.listen(3000, () => console.log('Server running'));`
  },
  {
    name: "React Component",
    description: "TypeScript React component with hooks",
    template: `import { useState, useEffect } from 'react';

interface Props {
  title: string;
}

export const Component: React.FC<Props> = ({ title }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Fetch data
  }, []);

  return (
    <div>
      <h1>{title}</h1>
      {/* Component content */}
    </div>
  );
};`
  }
];

export default function IDE() {
  const [fileStructure, setFileStructure] = useState<FileStructure[]>([{
    id: 'root',
    name: 'src',
    type: 'folder',
    children: [
      {
        id: 'main',
        name: 'main.ts',
        type: 'file',
        content: '// Main application code\nconsole.log("Hello World!");'
      },
      {
        id: 'types',
        name: 'types.ts',
        type: 'file',
        content: 'export interface User {\n  id: string;\n  name: string;\n}'
      }
    ]
  }]);

  const [openTabs, setOpenTabs] = useState<OpenTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState<string>("");
  const { toast } = useToast();

  const [selectedInstance, setSelectedInstance] = useState<string>(computeOptions[0].name);
  const [isInstanceRunning, setIsInstanceRunning] = useState(false);
  const [isDebugging, setIsDebugging] = useState(false);
  const [currentBreakpoint, setCurrentBreakpoint] = useState<number | null>(null);
  const [watchVariables, setWatchVariables] = useState<Record<string, any>>({});
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "$ Addvizer Cloud Development Environment initialized...",
    "✓ Connected to Addvizer Basic instance",
    "✓ Development environment ready"
  ]);
  const [selectedTab, setSelectedTab] = useState<'editor' | 'debug' | 'analysis' | 'security'>('editor');


  const [showNewItemDialog, setShowNewItemDialog] = useState(false);
  const [newItemType, setNewItemType] = useState<'file' | 'folder'>('file');
  const [newItemParentId, setNewItemParentId] = useState<string | undefined>();
  const [newItemName, setNewItemName] = useState('');

  const [codeAnalysis, setCodeAnalysis] = useState<CodeAnalysisResult[]>([
    {
      type: 'security',
      severity: 'high',
      message: 'Potential SQL injection vulnerability detected',
      line: 45,
      suggestion: 'Use parameterized queries instead of string concatenation'
    },
    {
      type: 'performance',
      severity: 'medium',
      message: 'Inefficient loop detected',
      line: 78,
      suggestion: 'Consider using map() instead of forEach()'
    }
  ]);

  const [deploymentConfig, setDeploymentConfig] = useState<DeploymentConfig>({
    environment: 'development',
    region: 'us-east-1',
    instance: 't3.micro',
    autoScaling: false
  });

  const [collaborators, setCollaborators] = useState([
    { id: 1, name: 'John Doe', role: 'editor' },
    { id: 2, name: 'Jane Smith', role: 'viewer' }
  ]);

  const [aiState, setAIState] = useState<AIAssistantState>({
    suggestions: [],
    isAnalyzing: false,
    selectedTemplate: null
  });

  const handleCreateNewItem = (parentId: string | undefined, type: 'file' | 'folder') => {
    setNewItemType(type);
    setNewItemParentId(parentId);
    setNewItemName('');
    setShowNewItemDialog(true);
  };

  const createNewItem = () => {
    if (!newItemName.trim()) return;

    const newId = Math.random().toString(36).substr(2, 9);
    const insertItem = (items: FileStructure[]): FileStructure[] => {
      return items.map(item => {
        if (item.id === newItemParentId) {
          return {
            ...item,
            children: [
              ...(item.children || []),
              {
                id: newId,
                name: newItemName,
                type: newItemType,
                content: newItemType === 'file' ? '// New file content' : undefined,
                children: newItemType === 'folder' ? [] : undefined,
                parentId: item.id
              }
            ]
          };
        }
        if (item.children) {
          return {
            ...item,
            children: insertItem(item.children)
          };
        }
        return item;
      });
    };

    setFileStructure(insertItem(fileStructure));
    setShowNewItemDialog(false);
  };

  const deleteItem = (id: string) => {
    const removeItem = (items: FileStructure[]): FileStructure[] => {
      return items.filter(item => {
        if (item.id === id) {
          // Close tab if open
          if (openTabs.some(tab => tab.id === id)) {
            closeTab(id);
          }
          return false;
        }
        if (item.children) {
          item.children = removeItem(item.children);
        }
        return true;
      });
    };

    setFileStructure(removeItem(fileStructure));
  };

  const renameItem = (id: string, newName: string) => {
    const updateItem = (items: FileStructure[]): FileStructure[] => {
      return items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, name: newName };
          // Update tab name if open
          if (openTabs.some(tab => tab.id === id)) {
            setOpenTabs(openTabs.map(tab =>
              tab.id === id ? { ...tab, name: newName } : tab
            ));
          }
          return updatedItem;
        }
        if (item.children) {
          return {
            ...item,
            children: updateItem(item.children)
          };
        }
        return item;
      });
    };

    setFileStructure(updateItem(fileStructure));
  };

  const handleDrop = (draggedId: string, targetId: string) => {
    const findAndRemoveItem = (items: FileStructure[]): [FileStructure | null, FileStructure[]] => {
      let draggedItem: FileStructure | null = null;
      const newItems = items.filter(item => {
        if (item.id === draggedId) {
          draggedItem = item;
          return false;
        }
        if (item.children) {
          const [found, newChildren] = findAndRemoveItem(item.children);
          if (found) {
            draggedItem = found;
            item.children = newChildren;
          }
        }
        return true;
      });
      return [draggedItem, newItems];
    };

    const insertItem = (items: FileStructure[], item: FileStructure): FileStructure[] => {
      return items.map(current => {
        if (current.id === targetId && current.type === 'folder') {
          return {
            ...current,
            children: [...(current.children || []), { ...item, parentId: current.id }]
          };
        }
        if (current.children) {
          return {
            ...current,
            children: insertItem(current.children, item)
          };
        }
        return current;
      });
    };

    const [draggedItem, newStructure] = findAndRemoveItem(fileStructure);
    if (draggedItem) {
      setFileStructure(insertItem(newStructure, draggedItem));
    }
  };

  const handleFileSelect = (file: FileStructure) => {
    if (file.type === 'file') {
      // Check if tab already exists
      if (!openTabs.some(tab => tab.id === file.id)) {
        setOpenTabs([...openTabs, {
          id: file.id,
          name: file.name,
          content: file.content || ''
        }]);
      }
      setActiveTabId(file.id);
      setEditorContent(file.content || '');
    }
  };

  const closeTab = (id: string) => {
    const newTabs = openTabs.filter(tab => tab.id !== id);
    setOpenTabs(newTabs);
    if (activeTabId === id) {
      const lastTab = newTabs[newTabs.length - 1];
      if (lastTab) {
        setActiveTabId(lastTab.id);
        setEditorContent(lastTab.content);
      } else {
        setActiveTabId(null);
        setEditorContent('');
      }
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && activeTabId) {
      setEditorContent(value);
      // Update content in both tabs and file structure
      setOpenTabs(openTabs.map(tab =>
        tab.id === activeTabId ? { ...tab, content: value } : tab
      ));

      const updateFileContent = (items: FileStructure[]): FileStructure[] => {
        return items.map(item => {
          if (item.id === activeTabId) {
            return { ...item, content: value };
          }
          if (item.children) {
            return {
              ...item,
              children: updateFileContent(item.children)
            };
          }
          return item;
        });
      };

      setFileStructure(updateFileContent(fileStructure));
    }
  };

  const handleSave = () => {
    if (activeTabId) {
      // In a real app, this would save to the backend
      toast({
        title: "File saved",
        description: `Successfully saved changes to disk`,
      });
    }
  };

  const handleRun = () => {
    setTerminalOutput([
      ...terminalOutput,
      `$ Running ${activeTabId ? openTabs.find(tab => tab.id === activeTabId)?.name || 'current file' : 'current file'}...`,
      '> Starting execution...',
      '✓ Code executed successfully'
    ]);
  };

  const handleDeploy = () => {
    setTerminalOutput([
      ...terminalOutput,
      '$ Starting deployment to Addvizer...',
      '> Building application...',
      '✓ Build successful',
      '> Deploying to Addvizer...',
      '✓ Deployment completed successfully'
    ]);
  };

  const handleDebug = () => {
    setIsDebugging(!isDebugging);
    setSelectedTab('debug');
    if (!isDebugging) {
      setTerminalOutput([
        ...terminalOutput,
        '$ Starting debugger...',
        '> Attaching to process...',
        '✓ Debugger attached'
      ]);
    } else {
      setTerminalOutput([
        ...terminalOutput,
        '$ Stopping debugger...',
        '✓ Debugger detached'
      ]);
    }
  };

  const toggleInstance = () => {
    setIsInstanceRunning(!isInstanceRunning);
    const newStatus = !isInstanceRunning ? 'started' : 'stopped';
    setTerminalOutput([
      ...terminalOutput,
      `$ Addvizer instance ${selectedInstance} ${newStatus}`,
      `✓ Instance status: ${newStatus.toUpperCase()}`
    ]);
  };

  const getFileLanguage = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'ts':
      case 'tsx':
        return 'typescript';
      case 'js':
      case 'jsx':
        return 'javascript';
      case 'json':
        return 'json';
      case 'html':
        return 'html';
      case 'css':
        return 'css';
      default:
        return 'plaintext';
    }
  };

  const handleSecurityScan = () => {
    // Simulate security scan
    toast({
      title: "Security Scan Initiated",
      description: "Scanning codebase for security vulnerabilities...",
    });
  };

  const handleCollaboratorInvite = () => {
    // Simulate collaborator invitation
    toast({
      title: "Invitation Sent",
      description: "Collaboration invitation has been sent.",
    });
  };

  const analyzeCurrent = () => {
    setAIState(prev => ({ ...prev, isAnalyzing: true }));
    // Simulate AI analysis
    setTimeout(() => {
      setAIState(prev => ({
        ...prev,
        isAnalyzing: false,
        suggestions: [
          {
            type: 'completion',
            content: 'Consider adding error handling here',
            line: 45,
            confidence: 0.85
          },
          {
            type: 'refactor',
            content: 'This function could be simplified using array methods',
            line: 67,
            confidence: 0.92
          }
        ]
      }));
    }, 1000);
  };

  const applyTemplate = (templateName: string) => {
    const template = codeTemplates.find(t => t.name === templateName);
    if (template && activeTabId) {
      setEditorContent(template.template);
      handleEditorChange(template.template);
      setAIState(prev => ({ ...prev, selectedTemplate: templateName }));
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">Cloud IDE</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <GitBranch className="h-4 w-4 mr-2" />
              Branch
            </Button>
            <Button variant="outline">
              <GitFork className="h-4 w-4 mr-2" />
              Fork
            </Button>
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={handleDebug}>
              <Bug className="h-4 w-4 mr-2" />
              {isDebugging ? 'Stop Debug' : 'Debug'}
            </Button>
            <Button onClick={handleRun}>
              <Play className="h-4 w-4 mr-2" />
              Run
            </Button>
            <Button onClick={handleDeploy}>
              <Rocket className="h-4 w-4 mr-2" />
              Deploy
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">Files</CardTitle>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleCreateNewItem('root', 'file')}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleCreateNewItem('root', 'folder')}
                >
                  <FolderTree className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {fileStructure.map((item) => (
                  <FileTreeItem
                    key={item.id}
                    item={item}
                    onSelect={handleFileSelect}
                    onCreateItem={handleCreateNewItem}
                    onDeleteItem={deleteItem}
                    onRenameItem={renameItem}
                    onDrop={handleDrop}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="lg:col-span-7 space-y-6">
            <Card className="bg-primary/5">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-primary" />
                  <CardTitle>Addvizer Compute Power</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={selectedInstance} onValueChange={setSelectedInstance}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select instance" />
                    </SelectTrigger>
                    <SelectContent>
                      {computeOptions.map(option => (
                        <SelectItem key={option.name} value={option.name}>
                          {option.name} - {option.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant={isInstanceRunning ? "destructive" : "default"}
                    onClick={toggleInstance}
                  >
                    {isInstanceRunning ? 'Stop Instance' : 'Start Instance'}
                  </Button>
                </div>
              </CardHeader>
            </Card>

            <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as 'editor' | 'debug' | 'analysis' | 'security')}>
              <TabsList>
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="debug">Debug</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="editor">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-4">
                      <div className="flex gap-1">
                        {openTabs.map(tab => (
                          <div
                            key={tab.id}
                            className={`flex items-center gap-1 px-3 py-1 rounded-t-lg cursor-pointer ${
                              activeTabId === tab.id ? 'bg-accent' : 'hover:bg-accent/50'
                            }`}
                            onClick={() => {
                              setActiveTabId(tab.id);
                              setEditorContent(tab.content);
                            }}
                          >
                            <span className="text-sm">{tab.name}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-4 w-4"
                              onClick={(e) => {
                                e.stopPropagation();
                                closeTab(tab.id);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md overflow-hidden">
                      <Editor
                        height="60vh"
                        theme="vs-dark"
                        defaultLanguage="typescript"
                        language={activeTabId ? getFileLanguage(openTabs.find(tab => tab.id === activeTabId)?.name || '') : 'typescript'}
                        value={editorContent}
                        onChange={handleEditorChange}
                        options={{
                          minimap: { enabled: true },
                          fontSize: 14,
                          automaticLayout: true,
                          wordWrap: 'on',
                          scrollBeyondLastLine: false,
                          folding: true,
                          foldingHighlight: true,
                          foldingStrategy: 'auto',
                          showFoldingControls: 'always',
                          multiCursorModifier: 'alt',
                          formatOnPaste: true,
                          formatOnType: true,
                          suggestOnTriggerCharacters: true,
                          acceptSuggestionOnEnter: 'on',
                          quickSuggestions: true,
                          quickSuggestionsDelay: 10,
                          parameterHints: {
                            enabled: true,
                            cycle: true
                          },
                          snippetSuggestions: 'inline'
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="debug">
                <Card>
                  <CardHeader>
                    <CardTitle>Debug Console</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Play className="h-4 w-4 mr-2" />
                          Continue
                        </Button>
                        <Button variant="outline" size="sm">
                          Step Over
                        </Button>
                        <Button variant="outline" size="sm">
                          Step Into
                        </Button>
                        <Button variant="outline" size="sm">
                          Step Out
                        </Button>
                      </div>
                      <div className="border rounded-md p-4">
                        <h4 className="font-medium mb-2">Watch Variables</h4>
                        <pre className="text-sm">
                          {JSON.stringify(watchVariables, null, 2)}
                        </pre>
                      </div>
                      <div className="border rounded-md p-4">
                        <h4 className="font-medium mb-2">Call Stack</h4>
                        <div className="text-sm">
                          main() - line 1
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analysis">
                <Card>
                  <CardHeader>
                    <CardTitle>Code Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-4">
                        {codeAnalysis.map((analysis, index) => (
                          <div
                            key={index}
                            className={cn(
                              "p-4 rounded-lg border",
                              analysis.severity === 'high'
                                ? "border-red-200 bg-red-50 dark:bg-red-950/10"
                                : analysis.severity === 'medium'
                                ? "border-yellow-200 bg-yellow-50 dark:bg-yellow-950/10"
                                : "border-blue-200 bg-blue-50 dark:bg-blue-950/10"
                            )}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {analysis.severity === 'high' ? (
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                              ) : analysis.severity === 'medium' ? (
                                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                              ) : (
                                <CheckCircle className="h-5 w-5 text-blue-500" />
                              )}
                              <span className="font-medium">{analysis.type}</span>
                              <Badge variant="outline" className="ml-auto">
                                Line {analysis.line}
                              </Badge>
                            </div>
                            <p className="text-sm mb-2">{analysis.message}</p>
                            {analysis.suggestion && (
                              <p className="text-sm text-muted-foreground">
                                Suggestion: {analysis.suggestion}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security & Compliance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Security Score</h4>
                          <span className="text-green-500 font-medium">85/100</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>

                      <div className="grid gap-4">
                        <Button variant="outline" onClick={handleSecurityScan}>
                          <Shield className="h-4 w-4 mr-2" />
                          Run Security Scan
                        </Button>

                        <Collapsible>
                          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border p-4 font-medium">
                            <div className="flex items-center">
                              <Lock className="h-4 w-4 mr-2" />
                              Access Controls
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="space-y-2 px-4 py-2">
                            <div className="space-y-2">
                              {collaborators.map((collaborator) => (
                                <div key={collaborator.id} className="flex items-center justify-between">
                                  <span>{collaborator.name}</span>
                                  <Select defaultValue={collaborator.role}>
                                    <SelectTrigger className="w-[120px]">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="admin">Admin</SelectItem>
                                      <SelectItem value="editor">Editor</SelectItem>
                                      <SelectItem value="viewer">Viewer</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              ))}
                            </div>
                            <Button variant="outline" size="sm" onClick={handleCollaboratorInvite}>
                              <Users className="h-4 w-4 mr-2" />
                              Invite Collaborator
                            </Button>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card>
              <CardHeader>
                <CardTitle>Terminal Output</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black/90 text-white font-mono p-4 rounded-md h-[200px] overflow-auto">
                  {terminalOutput.map((line, index) => (
                    <div
                      key={index}
                      className={
                        line.startsWith('✓')
                          ? 'text-green-400'
                          : line.startsWith('>')
                          ? 'text-blue-400'
                          : line.startsWith('!')
                          ? 'text-red-400'
                          : ''
                      }
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <AddvizerCommunityChat />
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>AI Assistant</CardTitle>
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                    Amazon Q
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="suggestions">
                  <TabsList>
                    <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                  </TabsList>

                  <TabsContent value="suggestions">
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-4">
                        {aiState.suggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="p-4 border rounded-lg hover:bg-accent transition-colors"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {suggestion.type === 'completion' ? (
                                <Sparkles className="h-4 w-4 text-blue-500" />
                              ) : suggestion.type === 'refactor' ? (
                                <Wand className="h-4 w-4 text-purple-500" />
                              ) : (
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              )}
                              <span className="font-medium capitalize">{suggestion.type}</span>
                              <Badge variant="outline" className="ml-auto">
                                {Math.round(suggestion.confidence * 100)}% confident
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {suggestion.content}
                            </p>
                            <div className="mt-2 text-xs text-muted-foreground">
                              Line {suggestion.line}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="templates">
                    <ScrollArea className="h-[300px]">
                      <div className="grid gap-4">
                        {codeTemplates.map((template, index) => (
                          <div
                            key={index}
                            className="p-4 border rounded-lg hover:bg-accent transition-colors"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <FileCode className="h-4 w-4 text-primary" />
                              <span className="font-medium">{template.name}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                              {template.description}
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => applyTemplate(template.name)}
                            >
                              Use Template
                            </Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AWS Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <DbIcon className="h-4 w-4 mr-2" />
                    Amazon RDS
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Cloud className="h-4 w-4 mr-2" />
                    Amazon S3
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Server className="h-4 w-4 mr-2" />
                    AWS Lambda
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CPU Usage</span>
                    <span className="text-sm font-bold">85%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Memory Usage</span>
                    <span className="text-sm font-bold">60%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Network I/O</span>
                    <span className="text-sm font-bold">2.5 MB/s</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
import { Tool, Analytics, Activity } from "@shared/schema";

export const mockTools: Tool[] = [
  {
    id: 1,
    name: "AI Text Generator",
    description: "Generate human-like text for various use cases",
    price: 4900,
    category: "Text Generation",
    tags: ["NLP", "GPT", "Content"],
    imageUrl: "https://images.unsplash.com/photo-1717501219291-29f30b728f86",
    publisherId: 1
  },
  {
    id: 2,
    name: "Computer Vision API",
    description: "Advanced image recognition and analysis",
    price: 9900,
    category: "Computer Vision",
    tags: ["CV", "Object Detection", "Image Analysis"],
    imageUrl: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01",
    publisherId: 1
  },
  {
    id: 3,
    name: "Speech Recognition Engine",
    description: "Convert speech to text with high accuracy",
    price: 7900,
    category: "Speech",
    tags: ["ASR", "Voice", "Audio"],
    imageUrl: "https://images.unsplash.com/photo-1717501219687-ddce079f704b",
    publisherId: 2
  }
];

export const mockAnalytics: Analytics[] = [
  {
    id: 1,
    toolId: 1,
    views: 1200,
    sales: 45,
    revenue: 220500,
    date: new Date("2024-01-01")
  },
  {
    id: 2,
    toolId: 1,
    views: 1500,
    sales: 60,
    revenue: 294000,
    date: new Date("2024-02-01")
  },
  {
    id: 3,
    toolId: 2,
    views: 800,
    sales: 25,
    revenue: 247500,
    date: new Date("2024-01-01")
  }
];

export const mockActivities: Activity[] = [
  {
    id: 1,
    userId: 1,
    action: "Tool Published",
    metadata: { toolId: 1, toolName: "AI Text Generator" },
    timestamp: new Date("2024-02-15T10:30:00")
  },
  {
    id: 2,
    userId: 1,
    action: "Sale Completed",
    metadata: { toolId: 1, amount: 4900 },
    timestamp: new Date("2024-02-15T14:20:00")
  }
];

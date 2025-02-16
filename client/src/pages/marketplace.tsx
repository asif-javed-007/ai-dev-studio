import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search,
  Filter,
  Plus,
  Zap,
  Globe,
  Brain,
  MessageSquare,
  Shield,
  Terminal,
  Cloud,
  Key,
  Image,
  Mail,
  PieChart,
  Megaphone,
  GalleryHorizontal,
  HandHeart,
  ChartCandlestick,
  GraduationCap,
  MonitorCog,
  Scale,
  Warehouse
} from "lucide-react";
import { WorkflowTemplates } from "@/components/dashboard/workflow-templates";

const industries = [
  {
    id: "all",
    name: "ALL",
    icon: GalleryHorizontal,
    description: "Show all AI tools"
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    icon: Megaphone,
    description: "Digital marketing engages audiences and drives growth through online strategies like SEO, social media, and email."
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: HandHeart,
    description: "Healthcare focuses on preventing, diagnosing, and treating illnesses to improve well-being."
  },

  {
    id: "education",
    name: "Education",
    icon: GraduationCap,
    description: "Education is the process of acquiring knowledge, skills, and values through teaching, learning, and experiences to foster personal and societal growth."
  },
  {
    id: "legal",
    name: "Legal",
    icon: Scale,
    description: "Legal involves providing services related to laws, regulations, and dispute resolution to ensure compliance and protect rights."
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: MonitorCog,
    description: "Manufacturing is the process of producing goods by transforming raw materials into finished products through efficient production methods."
  },
  {
    id: "finance",
    name: "Finance",
    icon: ChartCandlestick,
    description: "Finance manages money, investments, and assets to achieve economic goals and ensure stability."
  },
  {
    id: "human-resources",
    name: "Human Resources",
    icon: ChartCandlestick,
    description: "Finance manages money, investments, and assets to achieve economic goals and ensure stability."
  },
  {
    id: "real-estate",
    name: "Real Estate",
    icon: Warehouse,
    description: "Real estate involves buying, selling, and managing properties, focusing on maximizing value and meeting housing or commercial needs."
  },
  {
    id: "retail",
    name: "Retail",
    icon: Mail,
    description: "Retail involves selling goods directly to consumers through stores or online platforms, focusing on customer satisfaction and sales."
  }
];

const aiTools = [
  // Digital Marketing Tools
  {
    id: 1,
    name: "AI Diagnosis Asisstant",
    description: "An AI-powered tool that assists doctors in diagnosing diseases based on symptoms and medical history.",
    industry: "Healthcare",
    rating: 4.8/5,
    status: "Enterprise",
    languages: ["All Major Languages"],
    features: ["Symptom Analysis", "Disease Prediction", "Patient History Integration"],
    compliance: ["HIPAA", "GDPR"],
    deployment: ["Cloud"]
  },
  // Content Creation / Social Media Tools
  {
    id: 2,
    name: "Virtual Health Coach",
    description: "A virtual assistant that provides personalized health advice and tracks patient progress.",
    industry: "Healthcare",
    rating: 4.7/5,
    status: "Verified",
    languages: ["All Major Languages"],
    features: ["Personalized Health Plans", "Medication Reminders", "Fitness Tracking."],
    compliance: ["SOC 2", "HIPAA"],
    deployment: ["Cloud"]
  },
  // Digital Marketing Tools
  {
    id: 3,
    name: "AI Learning Path Generator",
    description: "Creates personalized learning paths for students based on their strengths and weaknesses.",
    industry: "Education",
    rating: 4.7/5,
    status: "Verified",
    languages: ["All Major Languages"],
    features: ["Adaptive Learning", "Progress Tracking", "Skill Assessment"],
    compliance: ["GDPR", "FERPA"],
    deployment: ["Cloud"]
  },
  // Analytics & Data Tools
  {
    id: 4,
    name: "Virtual Classroom Assistant",
    description: "Assists teachers in managing virtual classrooms and engaging students.",
    industry: "Analytics & Data",
    rating: 4.6/5,
    status: "Verified",
    languages: ["All Major Languages"],
    features: ["Attendance Tracking", "Real-Time Feedback", "interactive quizzes."],
    compliance: ["GDPR", "FERPA"],
    deployment: ["Cloud", "SDK"]
  },
  // Social Media Tools
  {
    id: 5,
    name: "AI Fraud Detection System",
    description: "Detects fraudulent transactions in real-time using advanced machine learning algorithms.",
    industry: "Finance",
    rating: 4.9/5,
    status: "Enterprise",
    languages: ["All Major Languages"],
    features: ["Transaction Monitoring", "Anomaly Detection", "Risk Scoring"],
    compliance: ["PCI DSS", "GDPR"],
    deployment: ["Cloud"]
  },
  // Analytics & Data Tools
  {
    id: 6,
    name: "Robo-Advisor",
    description: "AProvides automated investment advice based on user risk tolerance and financial goals.",
    industry: "Analytics & Data",
    rating: 4.7/5,
    status: "Verified",
    languages: ["All Major Languages"],
    features: ["Portfolio Management", "Risk Assessment", "Financial Planning"],
    compliance: ["GDPR", "SEC"],
    deployment: ["Cloud"]
  },
  // Email Marketing Tools
  {
    id: 7,
    name: "AI Predictive Maintenance",
    description: "Predicts equipment failures and schedules maintenance before breakdowns occur.",
    industry: "Manufacturing",
    rating: 4.9/5,
    status: "Enterprise",
    languages: ["All Major Languages"],
    features: ["Equipment Monitoring", "Failure Prediction", "Reorder Alerts"],
    compliance: ["GDPR", "SOC 2"],
    deployment: ["Cloud"]
  },
  {
    id: 8,
    name: "AI Inventory Manager",
    description: "Optimizes inventory levels and predicts demand using AI algorithms.",
    industry: "Retail",
    rating: 4.8/5,
    status: "Enterprise",
    languages: ["All Major Languages"],
    features: ["Demand Forecasting", "stock Optimization", "Reorder Alerts"],
    compliance: ["GDPR", "SOC 2"],
    deployment: ["Cloud"]
  },
  {
    id: 9,
    name: "Personalized Shopping Assistant",
    description: "Offers personalized product recommendations to customers based on their browsing history.",
    industry: "Retail",
    rating: 4.7/5,
    status: "Verified",
    languages: ["All Major Languages"],
    features: ["Product Recommendations", "Customer Profiling", "Purchase Predictions."],
    compliance: ["GDPR", "CCPA"],
    deployment: ["Cloud"]
  }
];

export default function Marketplace() {
  // State to track the selected industry (using industry id)
  const [selectedIndustry, setSelectedIndustry] = useState("");

  // Get the industry name corresponding to the selected id
  const selectedIndustryName = industries.find(
    (ind) => ind.id === selectedIndustry
  )?.name;

  // Modify filtering logic to show all tools when "ALL" is selected
  const filteredTools =
    selectedIndustry === "all" || !selectedIndustry
      ? aiTools
      : aiTools.filter(
        (tool) =>
          tool.industry.toLowerCase() === selectedIndustryName?.toLowerCase()
      );

  return (
    <div className="p-6 space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-4">AI Digital Services Hub</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Empower Your Business with AI-Powered Automation
        </p>
        <div className="flex gap-4">
          <Button size="lg">
            <Zap className="h-4 w-4 mr-2" />
            Explore AI Tools
          </Button>
          <Button variant="outline" size="lg">
            <Plus className="h-4 w-4 mr-2" />
            Publish Your AI Solution
          </Button>
        </div>
      </div>

      {/* Smart Search & Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Search AI tools, APIs, or solutions in any language..."
            />
          </div>
          <Select onValueChange={(value) => setSelectedIndustry(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry.id} value={industry.id}>
                  <div className="flex items-center gap-2">
                    <industry.icon className="h-4 w-4" />
                    {industry.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Globe className="h-4 w-4 mr-2" />
            Language
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Industry Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {industries.map((industry) => (
          <Card
            key={industry.id}
            onClick={() => setSelectedIndustry(industry.id)}
            className={`cursor-pointer transition-colors ${selectedIndustry === industry.id ? "bg-accent/50" : "hover:bg-accent/50"
              }`}
          >
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <industry.icon className="h-5 w-5 text-primary" />
                <h3 className="font-medium">{industry.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {industry.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="solutions" className="w-full">
        <TabsList>
          <TabsTrigger value="solutions">AI Solutions</TabsTrigger>
          <TabsTrigger value="workflows">Workflow Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="solutions">
          {/* AI Solutions Grid */}
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTools.map((tool) => (
                  <Card key={tool.id} className="relative overflow-hidden">
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Badge className="bg-blue-500">Addvizer Q</Badge>
                      {tool.status === "Enterprise" && (
                        <Badge className="bg-purple-500">Enterprise</Badge>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{tool.industry}</Badge>
                        <Badge
                          className={
                            tool.status === "Verified"
                              ? "bg-green-500"
                              : tool.status === "Enterprise"
                                ? "bg-purple-500"
                                : "bg-yellow-500"
                          }
                        >
                          {tool.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{tool.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {tool.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {tool.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="bg-primary/5">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {tool.languages.map((lang) => (
                            <Badge key={lang} variant="outline" className="bg-secondary/10">
                              <Globe className="h-3 w-3 mr-1" />
                              {lang}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {tool.compliance.map((cert) => (
                            <Badge key={cert} variant="outline" className="bg-green-500/10">
                              <Shield className="h-3 w-3 mr-1" />
                              {cert}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {tool.deployment.map((platform) => (
                            <Badge key={platform} variant="outline" className="bg-blue-500/10">
                              <Cloud className="h-3 w-3 mr-1" />
                              {platform}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <Button>
                            <Terminal className="h-4 w-4 mr-2" />
                            Try Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-500" />
                    <CardTitle>AI Assistant</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <p className="text-sm font-medium mb-1">Ask Addvizer Q</p>
                          <p className="text-xs text-muted-foreground">
                            Get personalized recommendations and integration support in your preferred language
                          </p>
                        </div>
                      </div>
                    </div>
                    <Input placeholder="Ask anything about AI tools..." />
                    <Button className="w-full">
                      <Brain className="h-4 w-4 mr-2" />
                      Get AI Recommendations
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    <CardTitle>Enterprise Security</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Key className="h-4 w-4 text-green-500" />
                      End-to-End Encryption
                    </div>
                    <Button variant="outline" className="w-full">
                      <Shield className="h-4 w-4 mr-2" />
                      View Security Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="workflows">
          <WorkflowTemplates />
        </TabsContent>
      </Tabs>
    </div>
  );
}

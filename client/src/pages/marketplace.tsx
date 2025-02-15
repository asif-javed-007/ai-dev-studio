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
  Code,
  Zap,
  GitBranch,
  Database,
  Wallet,
  Shield,
  Terminal,
  Globe,
  Sparkles,
  Brain,
  MessageSquare,
  Building2,
  Stethoscope,
  ShoppingCart,
  Lock,
  Truck,
  Cloud,
  Key,
  Bot,
  Cpu,
  Image,
  MessageCircle,
  Music,
  Map,
  Mail,
  PieChart,
  Share2,
  BarChart,
  LineChart as LineChartIcon,
  Camera,
  Video,
  Megaphone
} from "lucide-react";
import { WorkflowTemplates } from "@/components/dashboard/workflow-templates";

const industries = [
  { 
    id: "digital-marketing", 
    name: "Digital Marketing", 
    icon: Megaphone, 
    description: "AI-powered content creation, automation, and analytics" 
  },
  { 
    id: "social-media", 
    name: "Social Media", 
    icon: Share2, 
    description: "Automated posting, analytics, and engagement tools" 
  },
  { 
    id: "content-creation", 
    name: "Content Creation", 
    icon: Image, 
    description: "AI content generation, video editing, copywriting" 
  },
  { 
    id: "analytics", 
    name: "Analytics & Data", 
    icon: PieChart, 
    description: "Marketing analytics, audience insights, tracking" 
  },
  { 
    id: "email-marketing", 
    name: "Email Marketing", 
    icon: Mail, 
    description: "Email automation, personalization, campaign management" 
  }
];

const aiTools = [
  // Content Creation Tools
  {
    id: 1,
    name: "Jasper AI",
    description: "Advanced AI content generation for marketing and social media",
    category: "Content Creation",
    industry: "Digital Marketing",
    price: 4900,
    rating: 4.8,
    downloads: 15000,
    status: "Verified",
    languages: ["All Major Languages"],
    integrations: ["HubSpot", "WordPress", "Mailchimp"],
    features: ["Blog Writing", "Social Media Posts", "Ad Copy", "Email Content"],
    compliance: ["GDPR", "SOC 2"],
    deployment: ["Cloud", "API"]
  },
  {
    id: 2,
    name: "Lumen5 Pro",
    description: "AI-powered video creation for marketing and social media",
    category: "Video Creation",
    industry: "Digital Marketing",
    price: 7900,
    rating: 4.7,
    downloads: 8500,
    status: "Enterprise",
    languages: ["English", "Spanish", "French", "German"],
    integrations: ["YouTube", "Facebook", "LinkedIn"],
    features: ["Video Generation", "Social Templates", "Brand Kit", "Stock Media"],
    compliance: ["GDPR"],
    deployment: ["Cloud"]
  },
  // Marketing Automation
  {
    id: 3,
    name: "HubSpot Integration",
    description: "Complete marketing automation and CRM solution",
    category: "Marketing Automation",
    industry: "Digital Marketing",
    price: 12900,
    rating: 4.9,
    downloads: 25000,
    status: "Enterprise",
    languages: ["All Major Languages"],
    integrations: ["Salesforce", "Gmail", "Slack", "Zoom"],
    features: ["Email Marketing", "CRM", "Analytics", "Landing Pages"],
    compliance: ["GDPR", "SOC 2", "HIPAA"],
    deployment: ["Cloud", "Enterprise"]
  },
  // Analytics Tools
  {
    id: 4,
    name: "Google Analytics SDK",
    description: "Advanced marketing analytics and tracking integration",
    category: "Analytics",
    industry: "Digital Marketing",
    price: 0,
    rating: 4.9,
    downloads: 50000,
    status: "Verified",
    languages: ["All Major Languages"],
    integrations: ["Google Ads", "BigQuery", "Data Studio"],
    features: ["Real-time Analytics", "Audience Insights", "Conversion Tracking"],
    compliance: ["GDPR", "SOC 2"],
    deployment: ["Cloud", "SDK"]
  },
  // Ad Platform SDKs
  {
    id: 5,
    name: "Meta Marketing SDK",
    description: "Facebook & Instagram advertising and analytics toolkit",
    category: "Social Media",
    industry: "Digital Marketing",
    price: 0,
    rating: 4.8,
    downloads: 35000,
    status: "Verified",
    languages: ["All Major Languages"],
    integrations: ["Instagram", "WhatsApp", "Facebook Ads"],
    features: ["Ad Management", "Audience Targeting", "Performance Analytics"],
    compliance: ["GDPR"],
    deployment: ["SDK", "API"]
  },
  // AI Analytics
  {
    id: 6,
    name: "IBM Watson Campaign",
    description: "AI-powered marketing campaign optimization",
    category: "AI Analytics",
    industry: "Digital Marketing",
    price: 15900,
    rating: 4.7,
    downloads: 5000,
    status: "Enterprise",
    languages: ["All Major Languages"],
    integrations: ["Salesforce", "Adobe Analytics", "Mailchimp"],
    features: ["Sentiment Analysis", "Campaign Optimization", "Predictive Analytics"],
    compliance: ["GDPR", "SOC 2", "HIPAA"],
    deployment: ["Cloud", "Enterprise"]
  },
  // Email Marketing
  {
    id: 7,
    name: "ActiveCampaign Plus",
    description: "Advanced email marketing automation platform",
    category: "Email Marketing",
    industry: "Digital Marketing",
    price: 5900,
    rating: 4.8,
    downloads: 20000,
    status: "Verified",
    languages: ["All Major Languages"],
    integrations: ["Shopify", "WordPress", "Zapier"],
    features: ["Email Automation", "CRM", "Landing Pages", "Forms"],
    compliance: ["GDPR", "SOC 2"],
    deployment: ["Cloud"]
  }
];

export default function Marketplace() {
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
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map(industry => (
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
            className="hover:bg-accent/50 cursor-pointer transition-colors"
          >
            <CardContent className="p-4">
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

      {/* Add Tabs for different sections */}
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
                {aiTools.map((tool) => (
                  <Card key={tool.id} className="relative overflow-hidden">
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Badge className="bg-blue-500">Addvizer Q</Badge>
                      {tool.status === "Enterprise" && (
                        <Badge className="bg-purple-500">Enterprise</Badge>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{tool.category}</Badge>
                        <Badge className={
                          tool.status === "Verified" ? "bg-green-500" :
                            tool.status === "Enterprise" ? "bg-purple-500" :
                              "bg-yellow-500"
                        }>
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
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {tool.downloads} downloads
                            </p>
                            <p className="font-bold">
                              ${(tool.price / 100).toFixed(2)}/mo
                            </p>
                          </div>
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
                      <Lock className="h-4 w-4 text-green-500" />
                      GDPR Compliant
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-green-500" />
                      SOC 2 Certified
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Key className="h-4 w-4 text-green-500" />
                      End-to-End Encryption
                    </div>
                    <Button variant="outline" className="w-full">
                      <Lock className="h-4 w-4 mr-2" />
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
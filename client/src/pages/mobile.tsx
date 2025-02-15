import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Smartphone, Tablet, Laptop, Download, Mic, Camera, Bell, 
  CreditCard, BarChart, Wifi, Globe, Send, MessageSquare 
} from "lucide-react";

const mobileSuites = [
  {
    name: "AI Voice Assistant",
    description: "Advanced voice commands and natural language processing",
    platforms: ["iOS", "Android"],
    features: [
      "Voice-enabled navigation",
      "Natural language commands",
      "Multi-language support",
      "Custom voice actions"
    ],
    category: "Voice AI"
  },
  {
    name: "AR Marketing Suite",
    description: "Augmented reality tools for immersive marketing",
    platforms: ["iOS", "Android", "React Native"],
    features: [
      "AR product visualization",
      "Interactive AR campaigns",
      "Location-based AR content",
      "Real-time AR analytics"
    ],
    category: "AR"
  },
  {
    name: "Campaign Manager",
    description: "Mobile campaign management and tracking",
    platforms: ["iOS", "Android", "Flutter"],
    features: [
      "Campaign creation",
      "Performance tracking",
      "Budget management",
      "A/B testing"
    ],
    category: "Marketing"
  },
  {
    name: "Mobile Analytics",
    description: "Comprehensive mobile analytics and reporting",
    platforms: ["iOS", "Android"],
    features: [
      "Real-time metrics",
      "Custom dashboards",
      "Offline analytics",
      "Performance insights"
    ],
    category: "Analytics"
  }
];

const features = [
  {
    icon: Bell,
    title: "Push Notifications",
    description: "Intelligent notification management system",
    actions: ["Configure", "Test", "Analytics"]
  },
  {
    icon: CreditCard,
    title: "Mobile Payments",
    description: "Secure payment processing and invoicing",
    actions: ["Setup", "Integration", "Reports"]
  },
  {
    icon: Wifi,
    title: "Offline Mode",
    description: "Full functionality without internet connection",
    actions: ["Enable", "Sync", "Settings"]
  },
  {
    icon: Globe,
    title: "Social Command Center",
    description: "Unified social media management",
    actions: ["Connect", "Schedule", "Monitor"]
  }
];

export default function Mobile() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Mobile Application Suite</h1>
          <p className="text-muted-foreground mt-1">
            Advanced mobile tools with AI and AR capabilities
          </p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Get Started
        </Button>
      </div>

      <Tabs defaultValue="suites" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="suites">Available Suites</TabsTrigger>
          <TabsTrigger value="features">Core Features</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
          <TabsTrigger value="examples">Example Apps</TabsTrigger>
        </TabsList>

        <TabsContent value="suites">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {mobileSuites.map((suite) => (
              <Card key={suite.name}>
                <CardHeader>
                  <Badge className="w-fit mb-2">{suite.category}</Badge>
                  <CardTitle>{suite.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{suite.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    {suite.platforms.map((platform) => (
                      <Badge key={platform} variant="outline">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                  <div className="space-y-2 mb-4">
                    {suite.features.map((feature) => (
                      <div key={feature} className="text-sm">
                        • {feature}
                      </div>
                    ))}
                  </div>
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download SDK
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="features">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <feature.icon className="h-5 w-5 text-primary" />
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    {feature.actions.map((action) => (
                      <Button key={action} variant="outline" size="sm">
                        {action}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="docs">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Technical Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5" />
                      <CardTitle className="text-lg">iOS Guide</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">View Documentation</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Tablet className="h-5 w-5" />
                      <CardTitle className="text-lg">Android Guide</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">View Documentation</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Laptop className="h-5 w-5" />
                      <CardTitle className="text-lg">Cross-Platform</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">View Documentation</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Mic className="h-5 w-5 text-primary" />
                  <CardTitle>Voice Assistant Demo</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Showcase of voice commands and natural language processing capabilities.
                </p>
                <Button variant="outline" className="w-full">Try Demo</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-primary" />
                  <CardTitle>AR Showcase</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Interactive AR experiences and product visualization demos.
                </p>
                <Button variant="outline" className="w-full">Launch AR Demo</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <CardTitle>Campaign Manager</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Sample campaign creation and management workflow.
                </p>
                <Button variant="outline" className="w-full">View Demo</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-primary" />
                  <CardTitle>Push Notifications</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Demonstration of intelligent notification system.
                </p>
                <Button variant="outline" className="w-full">Test Notifications</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
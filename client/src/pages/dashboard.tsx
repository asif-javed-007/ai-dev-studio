import { MarketplaceOverview } from "@/components/dashboard/marketplace-overview";
import { Analytics } from "@/components/dashboard/analytics";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { Compliance } from "@/components/dashboard/compliance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import {
  CircleDollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
  Store,
  GitBranch,
  Code,
  Cloud,
  Smartphone,
  Shield,
  BarChart3,
  Book,
  Zap,
  Bot,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Brain,
  AlertCircle,
  Activity
} from "lucide-react";

const performanceData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 700 }
];

const marketShareData = [
  { name: "AI Models", value: 400 },
  { name: "Workflows", value: 300 },
  { name: "APIs", value: 300 },
  { name: "Tools", value: 200 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Dashboard() {
  const quickStats = [
    { 
      icon: Store, 
      label: "Marketplace Items", 
      value: "2,345", 
      change: "+15%",
      trend: "up",
      color: "text-green-500"
    },
    { 
      icon: GitBranch, 
      label: "Active Workflows", 
      value: "234", 
      change: "+8%",
      trend: "up",
      color: "text-blue-500"
    },
    { 
      icon: Code, 
      label: "IDE Projects", 
      value: "432", 
      change: "+12%",
      trend: "up",
      color: "text-purple-500"
    },
    { 
      icon: Users, 
      label: "Community Members", 
      value: "1,287", 
      change: "+5%",
      trend: "up",
      color: "text-orange-500"
    }
  ];

  const applicationStats = [
    {
      title: "Marketplace",
      icon: Store,
      stats: [
        { label: "Active Listings", value: "1,234", progress: 85 },
        { label: "Total Sales", value: "$45,678", progress: 92 }
      ],
      status: "Healthy",
      insights: "20% increase in AI tool listings"
    },
    {
      title: "Workflow Automation",
      icon: GitBranch,
      stats: [
        { label: "Running Workflows", value: "156", progress: 78 },
        { label: "Success Rate", value: "99.9%", progress: 99 }
      ],
      status: "Active",
      insights: "Optimized execution time by 35%"
    },
    {
      title: "IDE & Development",
      icon: Code,
      stats: [
        { label: "Active Projects", value: "432", progress: 88 },
        { label: "Deployments", value: "89", progress: 72 }
      ],
      status: "Stable",
      insights: "New AI code completion feature"
    }
  ];

  const aiInsights = [
    {
      title: "Performance Optimization",
      description: "AI suggests workflow optimizations that could improve execution speed by 25%",
      impact: "High",
      icon: Sparkles
    },
    {
      title: "Resource Usage",
      description: "Current resource utilization is optimal with 15% headroom for scaling",
      impact: "Medium",
      icon: Brain
    },
    {
      title: "Security Alert",
      description: "Recommended security updates available for 3 workflows",
      impact: "Critical",
      icon: AlertCircle
    }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            AI Tools Dashboard
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Real-time insights into your AI development ecosystem
          </p>
        </div>
        <Tabs defaultValue="day" className="w-full md:w-auto">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="day">24h</TabsTrigger>
            <TabsTrigger value="week">7d</TabsTrigger>
            <TabsTrigger value="month">30d</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Quick Stats with Enhanced Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <Card key={stat.label} className="transition-all duration-200 hover:shadow-md border-l-4 border-l-primary">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    {stat.label}
                  </p>
                  <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                </div>
                <div className="flex flex-col items-end">
                  <div className={`flex items-center ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}>
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">{stat.change}</span>
                  </div>
                  <div className="mt-2 w-[60px]">
                    <ResponsiveContainer width="100%" height={24}>
                      <LineChart data={performanceData}>
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={stat.trend === "up" ? "#22c55e" : "#ef4444"}
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Performance Trends</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Performance metrics over time</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Market Share Distribution</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Distribution of AI tools and services</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketShareData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {marketShareData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Stats with Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applicationStats.map((app) => (
          <Card key={app.title} className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <app.icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{app.title}</CardTitle>
                </div>
                <Badge
                  variant="outline"
                  className={
                    app.status === "Healthy" ? "bg-green-500/10 text-green-500" :
                    app.status === "Active" ? "bg-blue-500/10 text-blue-500" :
                    "bg-orange-500/10 text-orange-500"
                  }
                >
                  {app.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {app.stats.map((stat) => (
                  <div key={stat.label} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <span className="font-medium">{stat.value}</span>
                    </div>
                    <Progress value={stat.progress} className="h-2" />
                  </div>
                ))}
                <div className="pt-2 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{app.insights}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* AI Insights Section */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <CardTitle>AI-Powered Insights</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aiInsights.map((insight) => (
                <div
                  key={insight.title}
                  className="p-4 rounded-lg border bg-card/50 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <insight.icon className={`h-5 w-5 ${
                      insight.impact === "High" ? "text-yellow-500" :
                      insight.impact === "Critical" ? "text-red-500" :
                      "text-blue-500"
                    }`} />
                    <h3 className="font-semibold">{insight.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                  <Badge
                    variant="outline"
                    className="mt-2"
                  >
                    {insight.impact} Impact
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <CardTitle>Recent Activity</CardTitle>
            </div>
            <Badge variant="outline" className="bg-primary/10">
              Live Updates
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ActivityFeed />
        </CardContent>
      </Card>
    </div>
  );
}
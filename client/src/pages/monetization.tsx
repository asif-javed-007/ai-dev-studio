import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Wallet, Coins, ArrowUpRight, Timer, Zap, Settings, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const pricingPlans = [
  {
    name: "Pay-per-use",
    description: "Perfect for testing and small-scale usage",
    features: [
      "Pay only for what you use",
      "No monthly commitment",
      "Usage-based billing",
      "Basic support",
      "Real-time cost tracking",
      "Automatic cost optimization"
    ],
    pricing: "Starting at $0.001 per token"
  },
  {
    name: "Token Bundle",
    description: "Pre-purchased tokens at discounted rates",
    features: [
      "Bulk token purchase",
      "Volume discounts",
      "Premium support",
      "Advanced analytics",
      "Custom integration support",
      "Priority processing"
    ],
    pricing: "From $99 for 100K tokens"
  },
  {
    name: "Enterprise",
    description: "Custom token packages for large-scale deployments",
    features: [
      "Custom token allocation",
      "24/7 priority support",
      "Dedicated account manager",
      "Custom SLA",
      "On-premise deployment",
      "Enterprise-grade security"
    ],
    pricing: "Contact Sales"
  }
];

const usageMetrics = [
  {
    label: "Available Tokens",
    value: "45,230",
    icon: Coins,
    change: "+5,000 this month"
  },
  {
    label: "Token Usage Rate",
    value: "2,145/day",
    icon: Timer,
    change: "-12% from last week"
  },
  {
    label: "Cost per Operation",
    value: "$0.00085",
    icon: Wallet,
    change: "Optimized rate"
  }
];

const costOptimizations = [
  {
    title: "Batch Processing Available",
    description: "Bundle operations to save 15% on token costs",
    impact: "High",
    saving: "~$45/month"
  },
  {
    title: "Off-peak Usage",
    description: "Schedule tasks during off-peak hours for better rates",
    impact: "Medium",
    saving: "~$25/month"
  },
  {
    title: "Resource Optimization",
    description: "Optimize API calls to reduce token consumption",
    impact: "High",
    saving: "~$60/month"
  }
];

export default function Monetization() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Token-Based Billing</h1>
          <p className="text-muted-foreground mt-1">
            Pay-per-use model with smart cost optimization
          </p>
        </div>
        <Button>
          <Wallet className="h-4 w-4 mr-2" />
          Add Tokens
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {usageMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <metric.icon className="h-5 w-5 text-primary" />
                  <span className="font-medium">{metric.label}</span>
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">{metric.value}</div>
              <div className="text-sm text-muted-foreground">{metric.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="pricing" className="w-full">
        <TabsList>
          <TabsTrigger value="pricing">Token Plans</TabsTrigger>
          <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
          <TabsTrigger value="optimization">Cost Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="pricing">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className="relative">
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="font-bold text-xl mb-4">{plan.pricing}</div>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6">
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="usage">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Token Usage Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>API Calls</span>
                    <span className="font-medium">12,450 tokens</span>
                  </div>
                  <Progress value={45} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Model Training</span>
                    <span className="font-medium">8,230 tokens</span>
                  </div>
                  <Progress value={30} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Data Processing</span>
                    <span className="font-medium">6,890 tokens</span>
                  </div>
                  <Progress value={25} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {costOptimizations.map((opt) => (
              <Card key={opt.title}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <Badge variant="outline" className={
                      opt.impact === "High" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                    }>
                      {opt.impact} Impact
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{opt.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{opt.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-500">Potential Savings:</span>
                    <span className="font-bold">{opt.saving}</span>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Apply Optimization
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
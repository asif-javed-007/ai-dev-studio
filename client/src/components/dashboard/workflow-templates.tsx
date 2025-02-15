import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Wallet,
  ShoppingCart,
  Stethoscope,
  Truck,
  GraduationCap,
  Hotel,
  Activity,
  Building,
  Shield,
  Cloud,
  CloudRain
} from "lucide-react";

const workflowTemplates = [
  {
    id: 1,
    name: "AI-Powered Automated Loan Approval",
    industry: "Banking & FinTech",
    icon: Wallet,
    description: "Automate loan applications using AI-driven credit scoring & fraud detection",
    steps: [
      "Plaid API retrieves customer financial history",
      "Addvizer NLP extracts insights from application documents",
      "Addvizer Fraud Detection scans for anomalies",
      "Addvizer ML predicts loan approval chances",
      "Stripe API automates approved loan disbursement"
    ],
    relatedIndustries: ["Banking", "FinTech", "Microfinance", "Mortgage Services"]
  },
  {
    id: 2,
    name: "AI-Driven Smart Inventory",
    industry: "Retail & E-commerce",
    icon: ShoppingCart,
    description: "Optimize warehouse inventory based on demand trends",
    steps: [
      "Addvizer Forecast predicts stock demand",
      "Addvizer Database stores real-time inventory data",
      "Addvizer IoT tracks smart warehouse sensors",
      "FedEx/DHL API updates supply chain logistics",
      "Addvizer Assistant suggests stock refilling recommendations"
    ],
    relatedIndustries: ["Retail", "E-commerce", "Warehousing", "Supply Chain"]
  },
  {
    id: 3,
    name: "AI-Powered Emergency Response",
    industry: "Healthcare & Public Safety",
    icon: Stethoscope,
    description: "Real-time AI-based emergency dispatch system",
    steps: [
      "Addvizer IoT monitors smart sensors for emergency alerts",
      "Addvizer Vision analyzes CCTV footage for incident verification",
      "Twilio API sends real-time alerts to emergency responders",
      "Google Maps API finds optimal response routes",
      "Addvizer Assistant analyzes past incidents and optimizes response strategies"
    ],
    relatedIndustries: ["Healthcare", "Disaster Management", "Smart Cities"]
  },
  {
    id: 4,
    name: "AI-Powered Smart Farming",
    industry: "Agriculture & AgriTech",
    icon: Truck,
    description: "Automate irrigation and pest control using AI-driven analysis",
    steps: [
      "Addvizer IoT collects soil moisture and weather data",
      "Addvizer ML predicts irrigation needs",
      "Addvizer Forecast anticipates pest infestations",
      "Addvizer Functions triggers IoT-enabled irrigation and pesticide systems",
      "Addvizer Assistant provides AI-driven farm management recommendations"
    ],
    relatedIndustries: ["Agriculture", "AgriTech", "Precision Farming"]
  }
];

export function WorkflowTemplates() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Pre-Built Workflow Templates</h2>
          <p className="text-muted-foreground">
            Ready-to-use AI-powered workflow automation templates for your industry
          </p>
        </div>
        <Button>
          View All Templates
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {workflowTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <template.icon className="h-5 w-5 text-primary" />
                <Badge variant="outline">{template.industry}</Badge>
              </div>
              <CardTitle className="text-xl">{template.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Workflow Steps:</h4>
                  <ul className="space-y-2">
                    {template.steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-primary">•</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Industries:</h4>
                  <div className="flex flex-wrap gap-2">
                    {template.relatedIndustries.map((industry) => (
                      <Badge key={industry} variant="secondary">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button className="w-full">
                  Use This Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
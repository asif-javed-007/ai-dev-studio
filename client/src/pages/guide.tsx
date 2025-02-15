import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Book,
  Search,
  GitBranch,
  Code,
  Wallet,
  Shield,
  HelpCircle,
  Rocket,
  Layout,
  Terminal,
  Workflow as WorkflowIcon,
  Brain,
  DollarSign,
  Lock
} from "lucide-react";

const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Rocket,
    content: {
      title: "Platform Overview & Onboarding",
      description: "Welcome to the Tech Tools Marketplace, the ultimate AI-powered SaaS platform built on AWS.",
      steps: [
        "Create an account with AWS authentication",
        "Complete your user profile (developer, business, or enterprise)",
        "Interactive Onboarding Tutorial"
      ]
    }
  },
  {
    id: "marketplace",
    title: "AI Marketplace Navigation",
    icon: Search,
    content: {
      title: "Finding AI SaaS, APIs & SDKs",
      description: "Discover and integrate AI-powered tools into your workflow.",
      features: [
        "AI-Powered Search Engine – Get intelligent recommendations",
        "Browse by Industry – Find AI solutions for finance, healthcare, security, etc",
        "One-Click AI Deployment – Instantly integrate AI solutions into workflows"
      ]
    }
  },
  {
    id: "workflow",
    title: "Workflow Automation (WRPA)",
    icon: WorkflowIcon,
    content: {
      title: "Building & Managing AI Workflows",
      description: "Create and automate AI-powered workflows with ease.",
      features: [
        "Drag-and-Drop Workflow Builder – No-code/low-code AI workflow creation",
        "Prebuilt AI Automation Templates – Ready-to-use AI-powered workflows",
        "AI-Driven Decision Automation – Intelligent task execution & optimization"
      ]
    }
  },
  {
    id: "ide",
    title: "AI-Powered IDE",
    icon: Code,
    content: {
      title: "Developing & Deploying AI SaaS Solutions",
      description: "Build and deploy AI applications with intelligent assistance.",
      features: [
        "AI-Assisted Development – Code suggestions & real-time debugging",
        "Prebuilt AI SDKs & ML Models – Accelerate AI-powered SaaS creation",
        "CI/CD Integration & AWS Deployment – One-click AI model deployment"
      ]
    }
  },
  {
    id: "monetization",
    title: "Monetization & Revenue",
    icon: DollarSign,
    content: {
      title: "Pay-per-Use & Subscription Models",
      description: "Flexible monetization options for AI services.",
      features: [
        "Monetize AI APIs, SDKs & SaaS Apps via AWS Marketplace",
        "Revenue Tracking Dashboard – View earnings & transaction history",
        "Enterprise Licensing & Custom Pricing – Bulk AI service contracts"
      ],
      profitSharing: {
        title: "Profit-Sharing Model",
        features: [
          "Revenue Sharing for Developers & AI SaaS Providers",
          "Tiered Profit-Sharing Structure",
          "Automated Payouts via AWS Marketplace",
          "Collaborative AI Monetization"
        ]
      }
    }
  },
  {
    id: "security",
    title: "Security & Compliance",
    icon: Shield,
    content: {
      title: "AI Governance & Data Protection",
      description: "Enterprise-grade security and compliance controls.",
      features: [
        "Built-in Compliance Checks – GDPR, HIPAA, SOC-2 certified AI solutions",
        "AI Bias & Fairness Monitoring – Ensures ethical AI usage",
        "Data Encryption & Secure Access Controls – Protects user and model data"
      ]
    }
  }
];

const faqs = [
  {
    question: "How to deploy AI SaaS applications?",
    answer: "Use our one-click deployment feature in the IDE section. Select your application, configure deployment settings, and click 'Deploy' to automatically provision and deploy your AI application to AWS."
  },
  {
    question: "How does revenue sharing work?",
    answer: "Our platform offers a tiered profit-sharing structure where developers earn a percentage of every AI-powered tool usage. Higher usage and performance metrics lead to increased earning potential."
  },
  {
    question: "How to integrate third-party APIs?",
    answer: "Navigate to the IDE section, use our API integration wizard, and follow the step-by-step guide to connect third-party services. We provide pre-built connectors for popular AI services."
  },
  {
    question: "How to manage AI security settings?",
    answer: "Access the Security & Compliance section, where you can configure access controls, enable encryption, and monitor compliance status. Use our security dashboard to manage all security features."
  }
];

export default function Guide() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Guide</h1>
          <p className="text-muted-foreground mt-1">
            Complete guide to the AI Tools Marketplace platform
          </p>
        </div>
        <Button variant="outline">
          <HelpCircle className="h-4 w-4 mr-2" />
          Contact Support
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {sections.map((section) => (
            <Card key={section.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <section.icon className="h-6 w-6 text-primary" />
                  <CardTitle>{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">{section.content.title}</h3>
                    <p className="text-muted-foreground mt-1">
                      {section.content.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {section.content.features ? (
                      section.content.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                          <p>{feature}</p>
                        </div>
                      ))
                    ) : (
                      section.content.steps?.map((step, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Badge variant="outline">{index + 1}</Badge>
                          <p>{step}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {section.content.profitSharing && (
                    <div className="mt-4 border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">
                        {section.content.profitSharing.title}
                      </h4>
                      <div className="space-y-2">
                        {section.content.profitSharing.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                            <p>{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <section.icon className="h-4 w-4 mr-2" />
                    {section.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

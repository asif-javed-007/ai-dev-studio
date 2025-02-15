import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";

const complianceItems = [
  {
    category: "Data Privacy",
    items: [
      { name: "GDPR Compliance", status: "compliant", lastChecked: "2024-02-08" },
      { name: "CCPA Compliance", status: "compliant", lastChecked: "2024-02-08" },
      { name: "Data Encryption", status: "compliant", lastChecked: "2024-02-08" }
    ]
  },
  {
    category: "Security",
    items: [
      { name: "SSL/TLS Encryption", status: "compliant", lastChecked: "2024-02-08" },
      { name: "Two-Factor Authentication", status: "warning", lastChecked: "2024-02-07" },
      { name: "Access Control", status: "compliant", lastChecked: "2024-02-08" }
    ]
  },
  {
    category: "Documentation",
    items: [
      { name: "API Documentation", status: "compliant", lastChecked: "2024-02-08" },
      { name: "Usage Guidelines", status: "warning", lastChecked: "2024-02-06" },
      { name: "Terms of Service", status: "compliant", lastChecked: "2024-02-08" }
    ]
  }
];

export default function Compliance() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Compliance Dashboard</h1>
        <Button>
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Compliance Score</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">89%</div>
            <p className="text-sm text-muted-foreground">Last updated: Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              <span>Active Policies</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">All policies up to date</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <span>Pending Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 gap-6">
            {complianceItems.map((category) => (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle>{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.items.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Last checked: {item.lastChecked}
                          </p>
                        </div>
                        <Badge
                          className={
                            item.status === "compliant"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  Download Latest Compliance Report
                </Button>
                <Button variant="outline" className="w-full">
                  Schedule Automated Reports
                </Button>
                <Button variant="outline" className="w-full">
                  View Historical Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <Button variant="outline" className="w-full">
                  View Privacy Policy
                </Button>
                <Button variant="outline" className="w-full">
                  View Terms of Service
                </Button>
                <Button variant="outline" className="w-full">
                  View Security Policy
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

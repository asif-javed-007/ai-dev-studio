import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const complianceItems = [
  { id: 1, label: "GDPR Compliance", checked: true },
  { id: 2, label: "Data Privacy Policy", checked: true },
  { id: 3, label: "Terms of Service", checked: true },
  { id: 4, label: "API Documentation", checked: false },
  { id: 5, label: "Security Assessment", checked: false }
];

export function Compliance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Checklist</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {complianceItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-2">
              <Checkbox id={`item-${item.id}`} checked={item.checked} />
              <label
                htmlFor={`item-${item.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

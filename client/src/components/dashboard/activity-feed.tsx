import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockActivities } from "@/lib/marketplace-data";
import { CircleDot } from "lucide-react";

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="mt-1">
                <CircleDot className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.timestamp.toLocaleString()}
                </p>
                {activity.metadata && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {Object.entries(activity.metadata).map(([key, value]) => (
                      <span key={key} className="block">
                        {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

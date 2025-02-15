import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTools } from "@/lib/marketplace-data";

export function MarketplaceOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockTools.map((tool) => (
        <Card key={tool.id}>
          <CardHeader className="relative h-48 p-0 overflow-hidden">
            <img
              src={tool.imageUrl}
              alt={tool.name}
              className="w-full h-full object-cover"
            />
          </CardHeader>
          <CardContent className="pt-6">
            <CardTitle className="mb-2">{tool.name}</CardTitle>
            <p className="text-sm text-muted-foreground mb-4">
              {tool.description}
            </p>
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">
                ${(tool.price / 100).toFixed(2)}
              </div>
              <div className="flex gap-2">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

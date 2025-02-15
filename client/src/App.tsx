import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useEffect } from "react";
import { useLocation } from "wouter";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { ChatInterface } from "@/components/ai-assistant/chat-interface";
import Dashboard from "@/pages/dashboard";
import Marketplace from "@/pages/marketplace";
import Workflow from "@/pages/workflow";
import IDE from "@/pages/ide";
import Collaboration from "@/pages/collaboration";
import Monetization from "@/pages/monetization";
import Mobile from "@/pages/mobile";
import Analytics from "@/pages/analytics";
import Compliance from "@/pages/compliance";
import Settings from "@/pages/settings";
import NotFound from "@/pages/not-found";
import Guide from "@/pages/guide";
import SocialMediaDashboard from "@/pages/SocialMediaDashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/workflow" component={Workflow} />
      <Route path="/ide" component={IDE} />
      <Route path="/collaboration" component={Collaboration} />
      <Route path="/monetization" component={Monetization} />
      <Route path="/mobile" component={Mobile} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/compliance" component={Compliance} />
      <Route path="/settings" component={Settings} />
      <Route path="/guide" component={Guide} />
      <Route path="/social-media" component={SocialMediaDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [hasVisited, setHasVisited] = useLocalStorage("has-visited", false);
  const [location, navigate] = useLocation();

  useEffect(() => {
    if (!hasVisited && location !== "/guide") {
      setHasVisited(true);
      navigate("/guide");
    }
  }, [hasVisited, location]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="ai-tools-theme">
        <TooltipProvider>
          <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
            <div className="flex">
              <Sidebar />
              <div className="flex-1 min-h-screen md:pl-64">
                <Header />
                <main className="pt-16 min-h-[calc(100vh-4rem)] relative">
                  <div className="mx-auto p-4 md:p-6 lg:p-8">
                    <Router />
                  </div>
                </main>
              </div>
              <div className="fixed bottom-4 right-4 z-50">
                <ChatInterface />
              </div>
            </div>
          </div>
        </TooltipProvider>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
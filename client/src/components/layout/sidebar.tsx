import { Link, useLocation } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Store,
  GitBranch,
  Settings,
  BarChart3,
  Shield,
  Users,
  Wallet,
  Smartphone,
  Code,
  Book,
  Menu,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

const navItems = [
  { 
    icon: LayoutDashboard, 
    label: "Dashboard", 
    href: "/",
    tooltip: "Overview of your AI tools and analytics"
  },
  { 
    icon: Store, 
    label: "Marketplace", 
    href: "/marketplace",
    tooltip: "Browse and purchase AI tools"
  },
  { 
    icon: GitBranch, 
    label: "Workflow", 
    href: "/workflow",
    tooltip: "Create and manage AI workflows"
  },
  { 
    icon: Code, 
    label: "IDE", 
    href: "/ide",
    tooltip: "Develop AI applications"
  },
  { 
    icon: Share2, 
    label: "Social Media", 
    href: "/social-media",
    tooltip: "Manage your social media presence",
    badge: "New"
  },
  { 
    icon: Users, 
    label: "Addvizer Community", 
    href: "/collaboration",
    tooltip: "Connect and collaborate with other developers"
  },
  { 
    icon: Wallet, 
    label: "Monetization", 
    href: "/monetization",
    tooltip: "Manage your earnings and payments"
  },
  { 
    icon: Smartphone, 
    label: "Mobile Suites", 
    href: "/mobile",
    tooltip: "Mobile-optimized AI tools"
  },
  { 
    icon: BarChart3, 
    label: "Analytics", 
    href: "/analytics",
    tooltip: "Track performance and usage metrics"
  },
  { 
    icon: Shield, 
    label: "Compliance", 
    href: "/compliance",
    tooltip: "Security and compliance settings"
  },
  { 
    icon: Book, 
    label: "User Guide", 
    href: "/guide",
    tooltip: "Learn how to use the platform"
  },
];

const SidebarContent = () => {
  const [location] = useLocation();

  return (
    <>
      <div className="p-6">
        <div className="text-2xl gap-2 font-bold flex items-center justify-start">
          <span className="text-primary">&lt;Addvizer/&gt;</span>
        </div>
      </div>

      <nav className="flex-1 px-4">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location === item.href;

          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 px-3 py-2 mb-1 text-sm group",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Icon className="h-4 w-4" />
                      </motion.div>
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto">
                          <Badge variant="secondary" className="text-xs">
                            {item.badge}
                          </Badge>
                        </span>
                      )}
                    </Button>
                  </Link>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent side="right">{item.tooltip}</TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/settings">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Configure your preferences</TooltipContent>
        </Tooltip>
      </div>
    </>
  );
};

export function Sidebar() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="fixed top-4 left-4 z-40 md:hidden"
            size="icon"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <div className="hidden md:flex h-screen w-64 bg-card border-r flex-col fixed left-0 top-0">
        <SidebarContent />
      </div>
    </>
  );
}
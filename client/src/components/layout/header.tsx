import { Bell, Search, Settings, LogOut, User, Image, Upload, HelpCircle, BookOpen, Mail, Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/lib/theme-provider";

const notifications = [
  {
    id: 1,
    title: "New Tool Published",
    description: "A new AI tool has been published in the marketplace",
    time: "2 minutes ago",
    unread: true,
  },
  {
    id: 2,
    title: "Workflow Completed",
    description: "Your automated workflow has completed successfully",
    time: "1 hour ago",
    unread: false,
  },
];

export function Header() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [unreadMessages] = useState(3);
  const { theme, setTheme } = useTheme();

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
      setIsUploading(false);
    }
  };

  return (
    <header className="h-16 border-b bg-card fixed top-0 right-0 left-64 z-10">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex-1 flex items-center max-w-xl">
          <div className="relative w-full group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <Input
              placeholder="Search AI tools..."
              className="w-full pl-10 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="hover:bg-accent transition-colors duration-200"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-accent transition-colors duration-200"
              >
                <Mail className="h-5 w-5" />
                {unreadMessages > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                    {unreadMessages}
                  </Badge>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Messages</TooltipContent>
          </Tooltip>

          <Sheet>
            <Tooltip>
              <TooltipTrigger asChild>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-accent transition-colors duration-200"
                  >
                    <Bell className="h-5 w-5" />
                    {notifications.some(n => n.unread) && (
                      <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
                    )}
                  </Button>
                </SheetTrigger>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>Stay updated with your latest activities</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-4 rounded-lg border transition-colors duration-200",
                      notification.unread
                        ? "bg-primary/5 border-primary/10"
                        : "bg-background"
                    )}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold">{notification.title}</h4>
                      <span className="text-xs text-muted-foreground">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.description}
                    </p>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent transition-colors duration-200"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Help & Support</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent transition-colors duration-200"
              >
                <BookOpen className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Documentation</TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8 flex items-center justify-center transition-transform hover:scale-105">
                      <AvatarImage src={avatarUrl ?? ""} />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>Profile & Settings</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <label className="flex items-center cursor-pointer">
                  <Image className="mr-2 h-4 w-4" />
                  <span>Change Avatar</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={isUploading}
                  />
                </label>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Send } from "lucide-react";

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: Date;
}

export function AddvizerCommunityChat() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io({
      path: "/socket.io",
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      setIsConnected(true);
      if (username) {
        newSocket.emit("user:join", username);
      }
    });

    newSocket.on("message:receive", (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    });

    newSocket.on("users:update", (users: string[]) => {
      setActiveUsers(users);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [username]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (message.trim() && socket && username) {
      const newMessage: Message = {
        id: Math.random().toString(36).substring(7),
        user: username,
        content: message.trim(),
        timestamp: new Date(),
      };
      socket.emit("message:send", newMessage);
      setMessage("");
    }
  };

  const handleJoin = (name: string) => {
    if (name.trim() && socket) {
      setUsername(name.trim());
      socket.emit("user:join", name.trim());
    }
  };

  if (!username) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Join Addvizer Developer Hub Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter your username"
              onKeyPress={(e) => e.key === "Enter" && handleJoin(e.currentTarget.value)}
            />
            <Button onClick={(e) => handleJoin((e.currentTarget.previousElementSibling as HTMLInputElement).value)}>
              Join
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Addvizer Developer Hub</CardTitle>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <Badge variant="outline">{activeUsers.length} online</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.user === username ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.user === username
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{msg.user}</span>
                    <span className="text-xs opacity-70">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <div className="flex gap-2 mt-4">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
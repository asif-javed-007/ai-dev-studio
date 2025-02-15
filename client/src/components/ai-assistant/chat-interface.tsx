import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, X, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    // Mock AI response with typing animation
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm a demo AI assistant. I can't actually process your request yet, but I'm here to show how the interface would work!",
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {!isOpen ? (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.35 }}
          className="fixed bottom-4 right-4"
        >
          <Button
            onClick={() => setIsOpen(true)}
            className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary"
          >
            <Bot className="h-6 w-6 animate-bounce" />
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", bounce: 0.35 }}
          className="fixed bottom-4 right-4"
        >
          <Card className={cn(
            "w-[380px] shadow-lg transition-all duration-300",
            isMinimized ? "h-[60px]" : "h-[500px]"
          )}>
            <CardHeader className="border-b p-4 bg-primary/5">
              <div className="flex items-center justify-between">
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <Bot className="h-5 w-5 text-primary animate-pulse" />
                  <CardTitle className="text-lg">AI Assistant</CardTitle>
                </motion.div>
                <div className="flex items-center gap-1">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-primary/10 transition-colors"
                      onClick={() => setIsMinimized(!isMinimized)}
                    >
                      {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-primary/10 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardHeader>

            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ScrollArea className="flex-1 p-4 h-[360px]">
                    <motion.div className="space-y-4">
                      {messages.map((msg, index) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={cn(
                            "flex",
                            msg.sender === 'user' ? "justify-end" : "justify-start"
                          )}
                        >
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className={cn(
                              "rounded-lg px-4 py-2 max-w-[80%] shadow-sm hover:shadow-md transition-shadow",
                              msg.sender === 'user'
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            )}
                          >
                            <p className="text-sm">{msg.text}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {msg.timestamp.toLocaleTimeString()}
                            </p>
                          </motion.div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </ScrollArea>

                  <CardFooter className="border-t p-4">
                    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
                      <Input
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          type="submit" 
                          size="icon" 
                          disabled={!message.trim()}
                          className="bg-primary hover:bg-primary/90 transition-colors"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </form>
                  </CardFooter>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
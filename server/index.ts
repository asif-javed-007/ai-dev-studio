import express, { type Request, Response, NextFunction } from "express";
import { Server } from "socket.io";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Store active users
const activeUsers = new Set<string>();

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = registerRoutes(app);
  const io = new Server(server, {
    path: "/socket.io",
    transports: ["websocket"]
  });

  // Socket.IO event handlers
  io.on("connection", (socket) => {
    log("New client connected");

    socket.on("user:join", (username: string) => {
      activeUsers.add(username);
      io.emit("users:update", Array.from(activeUsers));
      log(`User joined: ${username}`);
    });

    socket.on("message:send", (message: {
      id: string;
      user: string;
      content: string;
      timestamp: Date;
    }) => {
      io.emit("message:receive", message);
      log(`Message from ${message.user}: ${message.content}`);
    });

    socket.on("disconnect", () => {
      // Find and remove the disconnected user
      const username = Array.from(activeUsers).find(user => {
        const userSockets = io.sockets.adapter.rooms.get(user);
        return userSockets?.has(socket.id);
      });

      if (username) {
        activeUsers.delete(username);
        io.emit("users:update", Array.from(activeUsers));
        log(`User disconnected: ${username}`);
      }
    });
  });

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const PORT = 5000;
  server.listen(PORT, "0.0.0.0", () => {
    log(`serving on port ${PORT}`);
  });
})();
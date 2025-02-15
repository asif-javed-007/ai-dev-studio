import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertToolSchema, insertAnalyticsSchema, insertActivitySchema,
  insertTeamSchema, insertSocialPostSchema, insertContentCalendarSchema,
  insertSocialListeningSchema, insertCampaignSchema, insertWorkflowSchema
} from "@shared/schema";

export function registerRoutes(app: Express): Server {
  // Teams endpoints
  app.get("/api/teams", async (req, res) => {
    const teams = await storage.getTeams();
    res.json(teams);
  });

  app.get("/api/teams/:id", async (req, res) => {
    const team = await storage.getTeam(parseInt(req.params.id));
    if (!team) {
      res.status(404).json({ message: "Team not found" });
      return;
    }
    res.json(team);
  });

  app.post("/api/teams", async (req, res) => {
    const result = insertTeamSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: "Invalid team data" });
      return;
    }
    const team = await storage.createTeam(result.data);
    res.status(201).json(team);
  });

  // Social Posts endpoints
  app.get("/api/teams/:teamId/posts", async (req, res) => {
    const posts = await storage.getTeamSocialPosts(parseInt(req.params.teamId));
    res.json(posts);
  });

  app.post("/api/posts", async (req, res) => {
    const result = insertSocialPostSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: "Invalid post data" });
      return;
    }
    const post = await storage.createSocialPost(result.data);
    res.status(201).json(post);
  });

  app.patch("/api/posts/:id/status", async (req, res) => {
    const { status } = req.body;
    if (!status) {
      res.status(400).json({ message: "Status is required" });
      return;
    }
    try {
      const post = await storage.updateSocialPostStatus(parseInt(req.params.id), status);
      res.json(post);
    } catch (error) {
      res.status(404).json({ message: "Post not found" });
    }
  });

  // Content Calendar endpoints
  app.get("/api/teams/:teamId/calendar", async (req, res) => {
    const { date } = req.query;
    if (!date || typeof date !== 'string') {
      res.status(400).json({ message: "Date parameter is required" });
      return;
    }
    const entries = await storage.getContentCalendar(parseInt(req.params.teamId), date);
    res.json(entries);
  });

  app.post("/api/calendar", async (req, res) => {
    const result = insertContentCalendarSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: "Invalid calendar entry data" });
      return;
    }
    const entry = await storage.createCalendarEntry(result.data);
    res.status(201).json(entry);
  });

  // Social Listening endpoints
  app.get("/api/teams/:teamId/listening", async (req, res) => {
    const mentions = await storage.getSocialListening(parseInt(req.params.teamId));
    res.json(mentions);
  });

  app.post("/api/listening", async (req, res) => {
    const result = insertSocialListeningSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: "Invalid social listening data" });
      return;
    }
    const mention = await storage.createSocialListening(result.data);
    res.status(201).json(mention);
  });

  // Campaigns endpoints
  app.get("/api/teams/:teamId/campaigns", async (req, res) => {
    const campaigns = await storage.getTeamCampaigns(parseInt(req.params.teamId));
    res.json(campaigns);
  });

  app.post("/api/campaigns", async (req, res) => {
    const result = insertCampaignSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: "Invalid campaign data" });
      return;
    }
    const campaign = await storage.createCampaign(result.data);
    res.status(201).json(campaign);
  });

  // Analytics endpoints
  app.get("/api/teams/:teamId/analytics", async (req, res) => {
    const analytics = await storage.getAnalytics(parseInt(req.params.teamId));
    res.json(analytics);
  });

  app.get("/api/analytics/:entityType/:entityId", async (req, res) => {
    const analytics = await storage.getEntityAnalytics(
      req.params.entityType,
      parseInt(req.params.entityId)
    );
    res.json(analytics);
  });

  app.post("/api/analytics", async (req, res) => {
    const result = insertAnalyticsSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: "Invalid analytics data" });
      return;
    }
    const analytics = await storage.createAnalytics(result.data);
    res.status(201).json(analytics);
  });

  // Workflows endpoints
  app.get("/api/teams/:teamId/workflows", async (req, res) => {
    const workflows = await storage.getTeamWorkflows(parseInt(req.params.teamId));
    res.json(workflows);
  });

  app.post("/api/workflows", async (req, res) => {
    const result = insertWorkflowSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: "Invalid workflow data" });
      return;
    }
    const workflow = await storage.createWorkflow(result.data);
    res.status(201).json(workflow);
  });

  // Tools endpoints
  app.get("/api/tools", async (req, res) => {
    const tools = await storage.getTools();
    res.json(tools);
  });

  app.get("/api/tools/:id", async (req, res) => {
    const tool = await storage.getTool(parseInt(req.params.id));
    if (!tool) {
      res.status(404).json({ message: "Tool not found" });
      return;
    }
    res.json(tool);
  });

  app.post("/api/tools", async (req, res) => {
    const result = insertToolSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: "Invalid tool data" });
      return;
    }
    const tool = await storage.createTool(result.data);
    res.status(201).json(tool);
  });

  // Activities endpoints
  app.get("/api/activities/:userId", async (req, res) => {
    const activities = await storage.getActivities(parseInt(req.params.userId));
    res.json(activities);
  });

  app.post("/api/activities", async (req, res) => {
    const result = insertActivitySchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: "Invalid activity data" });
      return;
    }
    const activity = await storage.createActivity(result.data);
    res.status(201).json(activity);
  });

  const httpServer = createServer(app);
  return httpServer;
}
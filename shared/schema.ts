import { z } from "zod";

// Define base schemas
export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  password: z.string(),
  role: z.enum(['admin', 'manager', 'content_creator', 'analyst']),
  profileImage: z.string().optional(),
  bio: z.string().optional(),
  expertise: z.array(z.string()).optional(),
  teamId: z.number().optional(),
  preferences: z.record(z.unknown()).optional(),
});

export const teamSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  ownerId: z.number(),
  settings: z.record(z.unknown()).optional(),
});

export const socialPostSchema = z.object({
  id: z.number(),
  content: z.string(),
  mediaUrls: z.array(z.string()).optional(),
  platforms: z.array(z.string()), // ['facebook', 'twitter', 'instagram', etc]
  scheduledTime: z.string(),
  publishedTime: z.string().optional(),
  status: z.enum(['draft', 'scheduled', 'published', 'failed']),
  authorId: z.number(),
  teamId: z.number(),
  campaign: z.string().optional(),
  hashtags: z.array(z.string()).optional(),
  performanceMetrics: z.record(z.unknown()).optional(),
});

export const contentCalendarSchema = z.object({
  id: z.number(),
  teamId: z.number(),
  postId: z.number(),
  date: z.string(),
  timeSlot: z.string(),
  status: z.enum(['planned', 'in_progress', 'completed', 'cancelled']),
  notes: z.string().optional(),
});

export const socialListeningSchema = z.object({
  id: z.number(),
  keyword: z.string(),
  platform: z.string(),
  mentionType: z.enum(['direct', 'indirect', 'hashtag']),
  content: z.string(),
  author: z.string(),
  sentiment: z.enum(['positive', 'neutral', 'negative']),
  engagement: z.number(),
  timestamp: z.string(),
  url: z.string(),
  teamId: z.number(),
});

export const campaignSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  status: z.enum(['draft', 'active', 'completed', 'paused']),
  budget: z.number().optional(),
  goals: z.record(z.unknown()),
  teamId: z.number(),
  metrics: z.record(z.unknown()).optional(),
});

export const analyticsSchema = z.object({
  id: z.number(),
  entityType: z.enum(['post', 'campaign', 'profile']),
  entityId: z.number(),
  platform: z.string(),
  metrics: z.object({
    impressions: z.number(),
    reach: z.number(),
    engagement: z.number(),
    clicks: z.number().optional(),
    shares: z.number().optional(),
    comments: z.number().optional(),
    likes: z.number().optional(),
  }),
  timestamp: z.string(),
  teamId: z.number(),
});

export const workflowSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  steps: z.array(z.object({
    order: z.number(),
    type: z.string(),
    assigneeId: z.number().optional(),
    status: z.string(),
    dueDate: z.string().optional(),
  })),
  teamId: z.number(),
  status: z.enum(['active', 'completed', 'archived']),
});

export const toolSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  imageUrl: z.string(),
  publisherId: z.number(),
  aiCapabilities: z.record(z.unknown()).optional(),
  apiEndpoint: z.string().optional(),
  documentation: z.string().optional(),
  version: z.string(),
});

export const activitySchema = z.object({
  id: z.number(),
  userId: z.number(),
  action: z.string(),
  metadata: z.record(z.unknown()).optional(),
  timestamp: z.string(),
  entityType: z.string().optional(),
  entityId: z.number().optional(),
});

// New schemas for gamification
export const badgeSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  icon: z.string(), // Icon name or URL
  category: z.string(), // e.g., 'engagement', 'content', 'social'
  requirement: z.record(z.unknown()), // Requirements to earn the badge
  points: z.number(), // Points awarded for earning this badge
  rarity: z.enum(['common', 'rare', 'epic', 'legendary']),
  unlockCriteria: z.string(), // Description of how to unlock
});

export const userAchievementSchema = z.object({
  id: z.number(),
  userId: z.number(),
  badgeId: z.number(),
  earnedAt: z.string(),
  progress: z.number(), // Progress percentage towards badge
  currentValue: z.number(), // Current progress value
  targetValue: z.number(), // Target value to achieve
  status: z.enum(['in_progress', 'completed', 'locked']),
});

// Define insert schemas (omitting auto-generated fields)
export const insertUserSchema = userSchema.omit({ id: true });
export const insertToolSchema = toolSchema.omit({ id: true });
export const insertAnalyticsSchema = analyticsSchema.omit({ id: true });
export const insertActivitySchema = activitySchema.omit({ id: true });
export const insertBadgeSchema = badgeSchema.omit({ id: true });
export const insertUserAchievementSchema = userAchievementSchema.omit({ id: true });
export const insertTeamSchema = teamSchema.omit({ id: true });
export const insertSocialPostSchema = socialPostSchema.omit({ id: true });
export const insertContentCalendarSchema = contentCalendarSchema.omit({ id: true });
export const insertSocialListeningSchema = socialListeningSchema.omit({ id: true });
export const insertCampaignSchema = campaignSchema.omit({ id: true });
export const insertWorkflowSchema = workflowSchema.omit({ id: true });


// Type exports
export type User = z.infer<typeof userSchema>;
export type Tool = z.infer<typeof toolSchema>;
export type Analytics = z.infer<typeof analyticsSchema>;
export type Activity = z.infer<typeof activitySchema>;
export type Badge = z.infer<typeof badgeSchema>;
export type UserAchievement = z.infer<typeof userAchievementSchema>;
export type Team = z.infer<typeof teamSchema>;
export type SocialPost = z.infer<typeof socialPostSchema>;
export type ContentCalendar = z.infer<typeof contentCalendarSchema>;
export type SocialListening = z.infer<typeof socialListeningSchema>;
export type Campaign = z.infer<typeof campaignSchema>;
export type Workflow = z.infer<typeof workflowSchema>;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertTool = z.infer<typeof insertToolSchema>;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type InsertBadge = z.infer<typeof insertBadgeSchema>;
export type InsertUserAchievement = z.infer<typeof insertUserAchievementSchema>;
export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type InsertSocialPost = z.infer<typeof insertSocialPostSchema>;
export type InsertContentCalendar = z.infer<typeof insertContentCalendarSchema>;
export type InsertSocialListening = z.infer<typeof insertSocialListeningSchema>;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;
export type InsertWorkflow = z.infer<typeof insertWorkflowSchema>;
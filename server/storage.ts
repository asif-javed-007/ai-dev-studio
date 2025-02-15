import {
  type User, type Tool, type Analytics, type Activity,
  type InsertUser, type InsertTool, type InsertAnalytics, type InsertActivity,
  type Team, type InsertTeam,
  type SocialPost, type InsertSocialPost,
  type ContentCalendar, type InsertContentCalendar,
  type SocialListening, type InsertSocialListening,
  type Campaign, type InsertCampaign,
  type Workflow, type InsertWorkflow
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Teams
  getTeam(id: number): Promise<Team | undefined>;
  getTeams(): Promise<Team[]>;
  createTeam(team: InsertTeam): Promise<Team>;
  getUserTeams(userId: number): Promise<Team[]>;

  // Social Posts
  getSocialPost(id: number): Promise<SocialPost | undefined>;
  getTeamSocialPosts(teamId: number): Promise<SocialPost[]>;
  createSocialPost(post: InsertSocialPost): Promise<SocialPost>;
  updateSocialPostStatus(id: number, status: string): Promise<SocialPost>;

  // Content Calendar
  getContentCalendar(teamId: number, date: string): Promise<ContentCalendar[]>;
  createCalendarEntry(entry: InsertContentCalendar): Promise<ContentCalendar>;
  updateCalendarEntry(id: number, status: string): Promise<ContentCalendar>;

  // Social Listening
  getSocialListening(teamId: number): Promise<SocialListening[]>;
  createSocialListening(listening: InsertSocialListening): Promise<SocialListening>;

  // Campaigns
  getCampaign(id: number): Promise<Campaign | undefined>;
  getTeamCampaigns(teamId: number): Promise<Campaign[]>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  updateCampaignStatus(id: number, status: string): Promise<Campaign>;

  // Analytics
  getAnalytics(teamId: number): Promise<Analytics[]>;
  getEntityAnalytics(entityType: string, entityId: number): Promise<Analytics[]>;
  createAnalytics(analytics: InsertAnalytics): Promise<Analytics>;

  // Workflows
  getWorkflow(id: number): Promise<Workflow | undefined>;
  getTeamWorkflows(teamId: number): Promise<Workflow[]>;
  createWorkflow(workflow: InsertWorkflow): Promise<Workflow>;
  updateWorkflowStatus(id: number, status: string): Promise<Workflow>;

  // Tools
  getTool(id: number): Promise<Tool | undefined>;
  getTools(): Promise<Tool[]>;
  createTool(tool: InsertTool): Promise<Tool>;

  // Activities
  getActivities(userId: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
}

class MemStorage implements IStorage {
  private users: User[] = [];
  private teams: Team[] = [];
  private socialPosts: SocialPost[] = [];
  private contentCalendar: ContentCalendar[] = [];
  private socialListening: SocialListening[] = [];
  private campaigns: Campaign[] = [];
  private analytics: Analytics[] = [];
  private workflows: Workflow[] = [];
  private tools: Tool[] = [];
  private activities: Activity[] = [];

  private nextIds = {
    users: 1,
    teams: 1,
    socialPosts: 1,
    contentCalendar: 1,
    socialListening: 1,
    campaigns: 1,
    analytics: 1,
    workflows: 1,
    tools: 1,
    activities: 1
  };

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(u => u.username === username);
  }

  async createUser(user: InsertUser): Promise<User> {
    const newUser = { ...user, id: this.nextIds.users++ } as User;
    this.users.push(newUser);
    return newUser;
  }

  // Teams
  async getTeam(id: number): Promise<Team | undefined> {
    return this.teams.find(t => t.id === id);
  }

  async getTeams(): Promise<Team[]> {
    return this.teams;
  }

  async createTeam(team: InsertTeam): Promise<Team> {
    const newTeam = { ...team, id: this.nextIds.teams++ } as Team;
    this.teams.push(newTeam);
    return newTeam;
  }

  async getUserTeams(userId: number): Promise<Team[]> {
    return this.teams.filter(t => t.ownerId === userId);
  }

  // Social Posts
  async getSocialPost(id: number): Promise<SocialPost | undefined> {
    return this.socialPosts.find(p => p.id === id);
  }

  async getTeamSocialPosts(teamId: number): Promise<SocialPost[]> {
    return this.socialPosts.filter(p => p.teamId === teamId);
  }

  async createSocialPost(post: InsertSocialPost): Promise<SocialPost> {
    const newPost = { ...post, id: this.nextIds.socialPosts++ } as SocialPost;
    this.socialPosts.push(newPost);
    return newPost;
  }

  async updateSocialPostStatus(id: number, status: string): Promise<SocialPost> {
    const post = this.socialPosts.find(p => p.id === id);
    if (!post) throw new Error("Post not found");
    post.status = status as any;
    return post;
  }

  // Content Calendar
  async getContentCalendar(teamId: number, date: string): Promise<ContentCalendar[]> {
    return this.contentCalendar.filter(c => c.teamId === teamId && c.date === date);
  }

  async createCalendarEntry(entry: InsertContentCalendar): Promise<ContentCalendar> {
    const newEntry = { ...entry, id: this.nextIds.contentCalendar++ } as ContentCalendar;
    this.contentCalendar.push(newEntry);
    return newEntry;
  }

  async updateCalendarEntry(id: number, status: string): Promise<ContentCalendar> {
    const entry = this.contentCalendar.find(c => c.id === id);
    if (!entry) throw new Error("Calendar entry not found");
    entry.status = status as any;
    return entry;
  }

  // Social Listening
  async getSocialListening(teamId: number): Promise<SocialListening[]> {
    return this.socialListening.filter(s => s.teamId === teamId);
  }

  async createSocialListening(listening: InsertSocialListening): Promise<SocialListening> {
    const newListening = { ...listening, id: this.nextIds.socialListening++ } as SocialListening;
    this.socialListening.push(newListening);
    return newListening;
  }

  // Campaigns
  async getCampaign(id: number): Promise<Campaign | undefined> {
    return this.campaigns.find(c => c.id === id);
  }

  async getTeamCampaigns(teamId: number): Promise<Campaign[]> {
    return this.campaigns.filter(c => c.teamId === teamId);
  }

  async createCampaign(campaign: InsertCampaign): Promise<Campaign> {
    const newCampaign = { ...campaign, id: this.nextIds.campaigns++ } as Campaign;
    this.campaigns.push(newCampaign);
    return newCampaign;
  }

  async updateCampaignStatus(id: number, status: string): Promise<Campaign> {
    const campaign = this.campaigns.find(c => c.id === id);
    if (!campaign) throw new Error("Campaign not found");
    campaign.status = status as any;
    return campaign;
  }

  // Analytics
  async getAnalytics(teamId: number): Promise<Analytics[]> {
    return this.analytics.filter(a => a.teamId === teamId);
  }

  async getEntityAnalytics(entityType: string, entityId: number): Promise<Analytics[]> {
    return this.analytics.filter(a => a.entityType === entityType && a.entityId === entityId);
  }

  async createAnalytics(analytics: InsertAnalytics): Promise<Analytics> {
    const newAnalytics = { ...analytics, id: this.nextIds.analytics++ } as Analytics;
    this.analytics.push(newAnalytics);
    return newAnalytics;
  }

  // Workflows
  async getWorkflow(id: number): Promise<Workflow | undefined> {
    return this.workflows.find(w => w.id === id);
  }

  async getTeamWorkflows(teamId: number): Promise<Workflow[]> {
    return this.workflows.filter(w => w.teamId === teamId);
  }

  async createWorkflow(workflow: InsertWorkflow): Promise<Workflow> {
    const newWorkflow = { ...workflow, id: this.nextIds.workflows++ } as Workflow;
    this.workflows.push(newWorkflow);
    return newWorkflow;
  }

  async updateWorkflowStatus(id: number, status: string): Promise<Workflow> {
    const workflow = this.workflows.find(w => w.id === id);
    if (!workflow) throw new Error("Workflow not found");
    workflow.status = status as any;
    return workflow;
  }

  // Tools
  async getTool(id: number): Promise<Tool | undefined> {
    return this.tools.find(t => t.id === id);
  }

  async getTools(): Promise<Tool[]> {
    return this.tools;
  }

  async createTool(tool: InsertTool): Promise<Tool> {
    const newTool = { ...tool, id: this.nextIds.tools++ } as Tool;
    this.tools.push(newTool);
    return newTool;
  }

  // Activities
  async getActivities(userId: number): Promise<Activity[]> {
    return this.activities.filter(a => a.userId === userId);
  }

  async createActivity(activity: InsertActivity): Promise<Activity> {
    const newActivity = { ...activity, id: this.nextIds.activities++ } as Activity;
    this.activities.push(newActivity);
    return newActivity;
  }
}

export const storage = new MemStorage();
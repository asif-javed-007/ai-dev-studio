import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Users, MessageSquare, Star, Calendar, Globe, Briefcase, 
  Search, Filter, BookOpen, Trophy, Target, Zap, Plus,
  Brain, Workflow as WorkflowIcon, Bot, ChartBar, Rocket
} from "lucide-react";

// Enhanced mock data with AI-powered recommendations and industry focus
const experts = [
  { 
    id: 1, 
    name: "Dr. Sarah Chen", 
    role: "AI Researcher", 
    specialty: "NLP",
    industries: ["Healthcare", "Finance"],
    availability: "Available",
    rating: 4.9,
    projects: 23,
    matchScore: 95,
    image: "/avatars/sarah.jpg",
    recentActivity: "Published a paper on healthcare NLP"
  },
  { 
    id: 2, 
    name: "Mike Johnson", 
    role: "ML Engineer", 
    specialty: "Computer Vision",
    industries: ["Retail", "Manufacturing"],
    availability: "Busy",
    rating: 4.8,
    projects: 45,
    matchScore: 88,
    image: "/avatars/mike.jpg",
    recentActivity: "Deployed ML model for manufacturing"
  },
  { 
    id: 3, 
    name: "Emma Davis", 
    role: "Data Scientist", 
    specialty: "Deep Learning",
    industries: ["Agriculture", "Energy"],
    availability: "Available",
    rating: 4.7,
    projects: 31,
    matchScore: 92,
    image: "/avatars/emma.jpg",
    recentActivity: "Created AI model for crop yield prediction"
  }
];

const investors = [
  { 
    id: 1, 
    name: "Tech Ventures", 
    focus: "AI Infrastructure", 
    portfolio: "$50M+",
    interests: ["ML Infrastructure", "AI Tooling", "Cloud Computing"],
    stage: "Series A-B",
    investments: 12,
    aiScore: 95,
    successRate: "92%",
    recentDeals: ["AI Platform Series A", "ML Ops Tool Seed"]
  },
  { 
    id: 2, 
    name: "Future Fund", 
    focus: "ML Applications", 
    portfolio: "$100M+",
    interests: ["Healthcare AI", "FinTech", "Enterprise SaaS"],
    stage: "Series B-C",
    investments: 24,
    aiScore: 88,
    successRate: "89%",
    recentDeals: ["Health AI Series B", "FinTech AI Series A"]
  },
  { 
    id: 3, 
    name: "Innovation Capital", 
    focus: "AI Startups", 
    portfolio: "$75M+",
    interests: ["AI/ML Startups", "Deep Tech", "Developer Tools"],
    stage: "Seed-Series A",
    investments: 18,
    aiScore: 91,
    successRate: "85%",
    recentDeals: ["DevTools AI Seed", "AI Analytics Series A"]
  }
];

const featuredProjects = [
  {
    id: 1,
    name: "AI Model Marketplace",
    description: "A marketplace for pre-trained AI models and datasets",
    tech: ["Python", "TensorFlow", "React"],
    collaborators: 5,
    status: "Active",
    industry: "AI Tools",
    aiMatch: 97,
    workflow: "Model Training Pipeline"
  },
  {
    id: 2,
    name: "MLOps Pipeline",
    description: "Automated ML model deployment and monitoring",
    tech: ["Kubernetes", "Python", "Docker"],
    collaborators: 3,
    status: "Seeking",
    industry: "DevOps",
    aiMatch: 94,
    workflow: "CI/CD Automation"
  }
];

const industryStats = {
  healthcare: { projects: 156, growth: "+23%", experts: 45 },
  finance: { projects: 203, growth: "+18%", experts: 67 },
  retail: { projects: 134, growth: "+15%", experts: 39 },
  manufacturing: { projects: 178, growth: "+20%", experts: 52 }
};

export default function Collaboration() {
  return (
    <div className="p-6 space-y-6">
      {/* Enhanced Header Section with AI Integration */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Collaboration Hub</h1>
          <p className="text-muted-foreground mt-1">
            AI-powered networking and collaboration platform
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Brain className="h-4 w-4 mr-2" />
            AI Matchmaking
          </Button>
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Meeting
          </Button>
          <Button>
            <MessageSquare className="h-4 w-4 mr-2" />
            Smart Chat
          </Button>
        </div>
      </div>

      {/* AI-Enhanced Search and Filter */}
      <Card className="bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-10" placeholder="AI-powered search for experts, investors, or projects..." />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Smart Filters
              </Button>
            </div>
            <div className="flex gap-4">
              <Badge variant="outline" className="cursor-pointer">
                <Brain className="h-3 w-3 mr-1" /> AI Recommended
              </Badge>
              <Badge variant="outline" className="cursor-pointer">
                <Star className="h-3 w-3 mr-1" /> Top Rated
              </Badge>
              <Badge variant="outline" className="cursor-pointer">
                <Globe className="h-3 w-3 mr-1" /> My Industry
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="experts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="experts">AI Experts</TabsTrigger>
          <TabsTrigger value="investors">Investors</TabsTrigger>
          <TabsTrigger value="developers">Developer Hub</TabsTrigger>
        </TabsList>

        <TabsContent value="experts">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {experts.map((expert) => (
              <Card key={expert.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={expert.image} alt={expert.name} />
                      <AvatarFallback>{expert.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{expert.name}</h3>
                        <Badge variant="outline" className="bg-primary/10">
                          {expert.matchScore}% Match
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{expert.role}</p>
                      <p className="text-sm text-muted-foreground">Specialty: {expert.specialty}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {expert.industries.map((industry) => (
                          <Badge key={industry} variant="secondary">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{expert.rating}</span>
                        <span className="text-sm text-muted-foreground">({expert.projects} projects)</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Recent: {expert.recentActivity}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1">Connect</Button>
                    <Button variant="outline" className="flex-1">View Profile</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="investors">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {investors.map((investor) => (
              <Card key={investor.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold">{investor.name}</h3>
                        <Badge variant="outline" className="bg-primary/10">
                          {investor.aiScore}% Match
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Focus: {investor.focus}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <span className="font-medium">{investor.portfolio}</span>
                        <span className="text-sm text-muted-foreground">({investor.investments} investments)</span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium">Success Rate: {investor.successRate}</p>
                        <Progress value={parseInt(investor.successRate)} className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Investment Stage: {investor.stage}</p>
                      <div className="flex flex-wrap gap-2">
                        {investor.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Recent Deals:</p>
                      <div className="space-y-1">
                        {investor.recentDeals.map((deal, index) => (
                          <p key={index} className="text-sm text-muted-foreground">• {deal}</p>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">Request Meeting</Button>
                      <Button variant="outline" className="flex-1">View Portfolio</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="developers">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>AI-Recommended Projects</CardTitle>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Project
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {featuredProjects.map((project) => (
                      <Card key={project.id}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{project.name}</h4>
                                <Badge variant="outline" className="bg-primary/10">
                                  {project.aiMatch}% Match
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {project.description}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {project.tech.map((tech, index) => (
                                  <Badge key={index} variant="outline">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <WorkflowIcon className="h-4 w-4 text-primary" />
                                <span className="text-sm">Workflow: {project.workflow}</span>
                              </div>
                            </div>
                            <Badge variant={project.status === 'Active' ? 'default' : 'secondary'}>
                              {project.status}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{project.collaborators} collaborators</span>
                            </div>
                            <Button size="sm">Join Project</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Industry Analytics Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Industry Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(industryStats).map(([industry, stats]) => (
                      <Card key={industry}>
                        <CardContent className="pt-6">
                          <h4 className="font-semibold capitalize">{industry}</h4>
                          <div className="space-y-2 mt-2">
                            <div className="flex justify-between text-sm">
                              <span>Projects</span>
                              <span>{stats.projects}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Growth</span>
                              <span className="text-green-500">{stats.growth}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Experts</span>
                              <span>{stats.experts}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Assistant</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 text-primary" />
                      <span>AI Recommendations</span>
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Brain className="h-4 w-4 mr-2" />
                        Find Similar Projects
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <ChartBar className="h-4 w-4 mr-2" />
                        Analytics Insights
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Rocket className="h-4 w-4 mr-2" />
                        Growth Opportunities
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Community Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span>Active Developers</span>
                      </div>
                      <span className="font-bold">1,234</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-primary" />
                        <span>Projects Completed</span>
                      </div>
                      <span className="font-bold">789</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-primary" />
                        <span>Success Rate</span>
                      </div>
                      <span className="font-bold">92%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Browse Documentation
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="h-4 w-4 mr-2" />
                      Join Global Community
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Zap className="h-4 w-4 mr-2" />
                      Start Learning Path
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
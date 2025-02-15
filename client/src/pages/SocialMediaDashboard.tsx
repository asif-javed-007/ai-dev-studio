import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Calendar as CalendarIcon,
  Settings,
  LineChart as LineChartIcon,
  Users,
  MessageSquare,
  CreditCard,
  Bot,
  Share2,
  Smartphone,
  TrendingUp,
  FileText,
  Bell,
  Hash,
  Image,
  Upload,
  Target,
  Filter,
  Clock,
  DollarSign,
  AlertCircle,
  Zap,
  Eye,
  Trophy
} from "lucide-react";
import { SiInstagram, SiFacebook, SiX, SiLinkedin, SiTiktok, SiPinterest, SiYoutube } from "react-icons/si";

export default function SocialMediaDashboard() {
  return (
    <div className="mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Social Media Dashboard</h1>
          <p className="text-muted-foreground">Manage all your social media platforms in one place</p>
        </div>
        <Button variant="outline"><Settings className="mr-2" /> Settings</Button>
      </div>

      {/* Platform Connection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: <SiFacebook className="text-blue-600" />, name: "Facebook", status: "Connected" },
          { icon: <SiInstagram className="text-pink-600" />, name: "Instagram", status: "Connected" },
          { icon: <SiX className="text-blue-400" />, name: "X (Twitter)", status: "Connect" },
          { icon: <SiLinkedin className="text-blue-700" />, name: "LinkedIn", status: "Connect" },
          { icon: <SiTiktok />, name: "TikTok", status: "Connect" },
          { icon: <SiPinterest className="text-red-600" />, name: "Pinterest", status: "Connect" },
          { icon: <SiYoutube className="text-red-600" />, name: "YouTube", status: "Connect" },
        ].map((platform) => (
          <Card key={platform.name}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                {platform.icon}
                <div>
                  <p className="font-medium">{platform.name}</p>
                  <p className="text-sm text-muted-foreground">{platform.status}</p>
                </div>
              </div>
              <Button variant={platform.status === "Connected" ? "secondary" : "default"} size="sm">
                {platform.status}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="scheduling" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-2">
          <TabsTrigger value="scheduling"><CalendarIcon className="mr-2" /> Scheduling</TabsTrigger>
          <TabsTrigger value="content"><FileText className="mr-2" /> Content</TabsTrigger>
          <TabsTrigger value="listening"><MessageSquare className="mr-2" /> Listening</TabsTrigger>
          <TabsTrigger value="analytics"><LineChartIcon className="mr-2" /> Analytics</TabsTrigger>
          <TabsTrigger value="team"><Users className="mr-2" /> Team</TabsTrigger>
          <TabsTrigger value="engagement"><Bell className="mr-2" /> Engagement</TabsTrigger>
          <TabsTrigger value="ads"><CreditCard className="mr-2" /> Ads</TabsTrigger>
          <TabsTrigger value="automation"><Bot className="mr-2" /> Automation</TabsTrigger>
          {/* Add achievement tab */}
          <TabsTrigger value="achievements"><Trophy className="mr-2" /> Achievements</TabsTrigger>
        </TabsList>

        {/* Scheduling Tab */}
        <TabsContent value="scheduling" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Calendar</CardTitle>
                <CardDescription>Schedule and manage your posts</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar className="rounded-md border" />
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Upcoming Posts</h4>
                  <ScrollArea className="h-[200px]">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 hover:bg-accent rounded-md">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <div>
                            <p className="font-medium">Post Title {i}</p>
                            <p className="text-sm text-muted-foreground">Scheduled for 2:00 PM</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Create New Post</CardTitle>
                <CardDescription>Schedule content across platforms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input placeholder="Post Title" />
                  <Textarea placeholder="Write your post content here..." />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platforms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><Image className="mr-2 h-4 w-4" />Add Media</Button>
                  <Button variant="outline" size="sm"><Clock className="mr-2 h-4 w-4" />Schedule</Button>
                  <Button size="sm">Post Now</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Content Library</CardTitle>
                <CardDescription>Manage your media assets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="aspect-square bg-accent rounded-md flex items-center justify-center">
                        <Image className="h-6 w-6 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                  <Button className="w-full"><Upload className="mr-2 h-4 w-4" />Upload Media</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>AI Content Generator</CardTitle>
                <CardDescription>Generate captions and hashtags</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="caption">Caption</SelectItem>
                    <SelectItem value="hashtags">Hashtags</SelectItem>
                    <SelectItem value="story">Story</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full"><Zap className="mr-2 h-4 w-4" />Generate Content</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Content Templates</CardTitle>
                <CardDescription>Quick-start your posts</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 hover:bg-accent rounded-md">
                      <FileText className="text-primary" />
                      <div>
                        <p className="font-medium">Template {i}</p>
                        <p className="text-sm text-muted-foreground">Product Launch</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">Use</Button>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>


        {/* Listening Tab */}
        <TabsContent value="listening" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Keyword Tracking</CardTitle>
                <CardDescription>Monitor brand mentions and hashtags</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input placeholder="Add new keyword or hashtag" />
                    <Button><Hash className="mr-2 h-4 w-4" />Add</Button>
                  </div>
                  <ScrollArea className="h-[300px]">
                    {[
                      { keyword: "#addvizer", mentions: 1234, trend: "+12%" },
                      { keyword: "AI tools", mentions: 856, trend: "+8%" },
                      { keyword: "workflow automation", mentions: 654, trend: "+15%" },
                      { keyword: "#marketingai", mentions: 432, trend: "+5%" },
                    ].map((item) => (
                      <div key={item.keyword} className="flex items-center justify-between p-3 hover:bg-accent rounded-md">
                        <div>
                          <p className="font-medium">{item.keyword}</p>
                          <p className="text-sm text-muted-foreground">{item.mentions} mentions</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-green-500">{item.trend}</span>
                          <Button variant="ghost" size="sm">Remove</Button>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sentiment Analysis</CardTitle>
                <CardDescription>Real-time brand sentiment tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { label: "Positive", value: "65%", color: "bg-green-500" },
                      { label: "Neutral", value: "25%", color: "bg-yellow-500" },
                      { label: "Negative", value: "10%", color: "bg-red-500" },
                    ].map((sentiment) => (
                      <div key={sentiment.label} className="text-center p-2 rounded-lg border">
                        <p className="text-sm text-muted-foreground">{sentiment.label}</p>
                        <p className="text-xl font-bold">{sentiment.value}</p>
                        <div className={`h-1 mt-2 rounded-full ${sentiment.color}`} />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Recent Mentions</h4>
                    <ScrollArea className="h-[200px]">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-start gap-3 p-3 hover:bg-accent rounded-md">
                          <div className={`h-2 w-2 rounded-full mt-2 ${i % 3 === 0 ? 'bg-red-500' : i % 2 === 0 ? 'bg-yellow-500' : 'bg-green-500'}`} />
                          <div>
                            <p className="text-sm">Great AI tool for automating workflows! #addvizer</p>
                            <p className="text-xs text-muted-foreground">2 minutes ago</p>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Competitive Analysis</CardTitle>
                <CardDescription>Track competitor performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select competitor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comp1">Competitor 1</SelectItem>
                      <SelectItem value="comp2">Competitor 2</SelectItem>
                      <SelectItem value="comp3">Competitor 3</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="space-y-3">
                    {[
                      { label: "Engagement Rate", value: "4.8%", diff: "+0.5%" },
                      { label: "Follower Growth", value: "2.3k", diff: "-1.2%" },
                      { label: "Post Frequency", value: "3.2/day", diff: "+0.8%" },
                      { label: "Avg. Response Time", value: "45m", diff: "+12m" },
                    ].map((metric) => (
                      <div key={metric.label} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <p className="text-sm text-muted-foreground">{metric.label}</p>
                          <p className="font-medium">{metric.value}</p>
                        </div>
                        <span className={metric.diff.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                          {metric.diff}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Crisis Alerts</CardTitle>
                <CardDescription>Monitor unusual activity spikes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/10 border-red-200 border rounded-md">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="text-red-500 h-4 w-4" />
                      <div>
                        <p className="font-medium">Unusual Mention Spike</p>
                        <p className="text-sm text-muted-foreground">+200% mentions in last hour</p>
                      </div>
                    </div>
                    <Button variant="destructive" size="sm">View</Button>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Alert Settings</h4>
                    {[
                      { label: "Mention Spike Alert", desc: "Alert when mentions increase by 150%" },
                      { label: "Negative Sentiment Alert", desc: "Alert when negative sentiment exceeds 20%" },
                      { label: "Response Time Alert", desc: "Alert when response time exceeds 1 hour" },
                    ].map((alert) => (
                      <div key={alert.label} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <p className="font-medium">{alert.label}</p>
                          <p className="text-sm text-muted-foreground">{alert.desc}</p>
                        </div>
                        <Switch />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geo-Targeted Listening</CardTitle>
                <CardDescription>Track conversations by location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="na">North America</SelectItem>
                      <SelectItem value="eu">Europe</SelectItem>
                      <SelectItem value="asia">Asia Pacific</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="h-[200px] border rounded-md bg-accent/50 flex items-center justify-center">
                    Map Visualization Placeholder
                  </div>

                  <ScrollArea className="h-[150px]">
                    {[
                      { location: "New York", mentions: 234, sentiment: "positive" },
                      { location: "London", mentions: 156, sentiment: "neutral" },
                      { location: "Tokyo", mentions: 89, sentiment: "positive" },
                      { location: "Paris", mentions: 67, sentiment: "negative" },
                    ].map((item) => (
                      <div key={item.location} className="flex items-center justify-between p-3 hover:bg-accent rounded-md">
                        <div>
                          <p className="font-medium">{item.location}</p>
                          <p className="text-sm text-muted-foreground">{item.mentions} mentions</p>
                        </div>
                        <Badge variant={
                          item.sentiment === "positive" ? "success" :
                          item.sentiment === "negative" ? "destructive" : "secondary"
                        }>
                          {item.sentiment}
                        </Badge>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { title: "Total Followers", value: "125.2K", trend: "+12%" },
              { title: "Engagement Rate", value: "4.8%", trend: "+0.6%" },
              { title: "Total Posts", value: "342", trend: "+24" },
              { title: "Avg. Response Time", value: "28m", trend: "-5m" },
            ].map((stat) => (
              <Card key={stat.title}>
                <CardContent className="pt-4">
                  <div className="text-sm font-medium text-muted-foreground">{stat.title}</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-green-500">{stat.trend}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Overview</CardTitle>
                <CardDescription>Last 30 days performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded">
                  <p className="text-muted-foreground">Line Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Content Performance</CardTitle>
                <CardDescription>Top performing posts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded">
                  <p className="text-muted-foreground">Bar Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage team access</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 hover:bg-accent rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary" />
                        <div>
                          <p className="font-medium">Team Member {i}</p>
                          <p className="text-sm text-muted-foreground">Content Manager</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Manage</Button>
                    </div>
                  ))}
                </ScrollArea>
                <Button className="w-full mt-4">Add Team Member</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Workflows</CardTitle>
                <CardDescription>Content approval process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Content Creation", status: "In Progress" },
                    { name: "Review", status: "Pending" },
                    { name: "Approval", status: "Waiting" },
                    { name: "Publishing", status: "Scheduled" },
                  ].map((workflow) => (
                    <div key={workflow.name} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">{workflow.name}</p>
                        <p className="text-sm text-muted-foreground">{workflow.status}</p>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>Recent team activities</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-start gap-3 p-3 hover:bg-accent rounded-md">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                      <div>
                        <p className="font-medium">Content approved by John Doe</p>
                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Engagement Tab */}
        <TabsContent value="engagement" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Social Inbox</CardTitle>
                <CardDescription>Manage all conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-start gap-3 p-3 hover:bg-accent rounded-md cursor-pointer">
                      <div className="h-8 w-8 rounded-full bg-accent" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">User {i}</p>
                          <span className="text-xs text-muted-foreground">2m ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Great content! Looking forward to more...</p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quick Replies</CardTitle>
                <CardDescription>Manage response templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input placeholder="Search templates..." />
                  <ScrollArea className="h-[300px]">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="p-3 hover:bg-accent rounded-md">
                        <p className="font-medium">Template {i}</p>
                        <p className="text-sm text-muted-foreground">Thank you for your feedback...</p>
                        <div className="flex gap-2 mt-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">Use</Button>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>Real-time interaction tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "Response Rate", value: "92%", trend: "+5%" },
                    { label: "Avg Response Time", value: "15m", trend: "-2m" },
                    { label: "Resolution Rate", value: "88%", trend: "+3%" },
                  ].map((metric) => (
                    <div key={metric.label} className="flex items-center justify-between p-3 border rounded-md">
                      <div>
                        <p className="font-medium">{metric.label}</p>
                        <p className="text-2xl font-bold">{metric.value}</p>
                      </div>
                      <span className="text-green-500">{metric.trend}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Ads Tab */}
        <TabsContent value="ads" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Campaigns</CardTitle>
                <CardDescription>Monitor running ad campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 border rounded-md mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Campaign {i}</h4>
                        <Badge variant="outline">Active</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Budget</span>
                          <span className="font-medium">$500/$1000</span>
                        </div>
                        <div className="h-2 rounded-full bg-accent">
                          <div className="h-full rounded-full bg-primary" style={{ width: "50%" }} />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Reach</span>
                          <span className="text-green-500">+12.5k</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="mt-2">View Details</Button>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Create Campaign</CardTitle>
                <CardDescription>Set up new ad campaign</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Input placeholder="Campaign Name" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Campaign Objective" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="awareness">Brand Awareness</SelectItem>
                        <SelectItem value="traffic">Website Traffic</SelectItem>
                        <SelectItem value="engagement">Engagement</SelectItem>
                        <SelectItem value="leads">Lead Generation</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input type="number" placeholder="Budget" />
                  </div>
                  <Button className="w-full"><Target className="mr-2 h-4 w-4" />Create Campaign</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Campaign metrics and ROI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "Total Spend", value: "$2,450", icon: <DollarSign className="h-4 w-4" /> },
                    { label: "Impressions", value: "125.4K", icon: <Eye className="h-4 w-4" /> },
                    { label: "Cost per Click", value: "$0.32", icon: <Target className="h-4 w-4" /> },
                    { label: "Conversion Rate", value: "2.4%", icon: <Filter className="h-4 w-4" /> },
                  ].map((metric) => (
                    <div key={metric.label} className="flex items-center gap-3 p-3 border rounded-md">
                      {metric.icon}
                      <div>
                        <p className="text-sm text-muted-foreground">{metric.label}</p>
                        <p className="font-medium">{metric.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Automation Tab */}
        <TabsContent value="automation" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Automations</CardTitle>
                <CardDescription>Manage automated workflows</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="p-4 border rounded-md mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">Auto Response {i}</h4>
                        <Switch />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Responds to comments containing keywords
                      </p>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">View Stats</Button>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Create Automation</CardTitle>
                <CardDescription>Set up new automated workflow</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Automation Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="post">Post Scheduling</SelectItem>
                      <SelectItem value="engage">Auto Engagement</SelectItem>
                      <SelectItem value="monitor">Content Monitoring</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="space-y-2">
                    {[
                      { label: "Run on Schedule", desc: "Execute at specific times" },
                      { label: "Monitor Keywords", desc: "Trigger on specific mentions" },
                      { label: "Auto-Response", desc: "Reply to common queries" },
                    ].map((setting) => (
                      <div key={setting.label} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <p className="font-medium">{setting.label}</p>
                          <p className="text-sm text-muted-foreground">{setting.desc}</p>
                        </div>
                        <Switch />
                      </div>
                    ))}
                  </div>
                  <Button className="w-full">Create Automation</Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Automations */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Automations</CardTitle>
                <CardDescription>View automation history</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-start gap-3 p-3 hover:bg-accent rounded-md">
                      <div className="h-2 w-2 rounded-full bg-green-500 mt-2" />
                      <div>
                        <p className="font-medium">Automation {i}</p>
                        <p className="text-sm text-muted-foreground">Executed 2 hours ago</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">View</Button>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Achievements Tab Content */}
        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Badge Showcase */}
            <Card>
              <CardHeader>
                <CardTitle>Your Badges</CardTitle>
                <CardDescription>Track your achievements and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Level 12</p>
                      <p className="text-sm text-muted-foreground">Content Creator</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">1,250 XP</p>
                      <p className="text-sm text-muted-foreground">Next: 1,500 XP</p>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-accent">
                    <div className="h-full rounded-full bg-primary" style={{ width: "75%" }} />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { icon: "🏆", rarity: "legendary" },
                      { icon: "⭐", rarity: "epic" },
                      { icon: "🎯", rarity: "rare" },
                      { icon: "🎨", rarity: "common" },
                    ].map((badge, i) => (
                      <div
                        key={i}
                        className={`aspect-square rounded-lg flex items-center justify-center text-2xl border-2 ${
                          badge.rarity === "legendary" ? "border-yellow-500 bg-yellow-500/10" :
                          badge.rarity === "epic" ? "border-purple-500 bg-purple-500/10" :
                          badge.rarity === "rare" ? "border-blue-500 bg-blue-500/10" :
                          "border-gray-500 bg-gray-500/10"
                        }`}
                      >
                        {badge.icon}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievement Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Current Progress</CardTitle>
                <CardDescription>Track your ongoing achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  {[
                    { name: "Content Master", progress: 75, target: 100, desc: "Create 100 posts" },
                    { name: "Engagement Pro", progress: 450, target: 500, desc: "Get 500 reactions" },
                    { name: "Social Butterfly", progress: 80, target: 100, desc: "Connect with 100 users" },
                    { name: "Trending Creator", progress: 5, target: 10, desc: "Get 10 posts trending" },
                  ].map((achievement) => (
                    <div key={achievement.name} className="mb-4 p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <p className="font-medium">{achievement.name}</p>
                          <p className="text-sm text-muted-foreground">{achievement.desc}</p>
                        </div>
                        <Badge variant="outline">
                          {achievement.progress}/{achievement.target}
                        </Badge>
                      </div>
                      <div className="h-2 rounded-full bg-accent">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Recent Unlocks */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Unlocks</CardTitle>
                <CardDescription>Latest achievements in the community</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {[
                    { user: "John Doe", badge: "Content Creator", time: "2m ago", icon: "🎨" },
                    { user: "Jane Smith", badge: "Engagement Master", time: "5m ago", icon: "🌟" },
                    { user: "Alex Johnson", badge: "Trending Star", time: "15m ago", icon: "🔥" },
                    { user: "Sarah Wilson", badge: "Social Butterfly", time: "1h ago", icon: "🦋" },
                  ].map((unlock, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 hover:bg-accent rounded-md">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl">
                        {unlock.icon}
                      </div>
                      <div>
                        <p className="font-medium">{unlock.user}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Unlocked {unlock.badge}</span>
                          <span className="text-xs text-muted-foreground">• {unlock.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle>Leaderboard</CardTitle>
                <CardDescription>Top achievers this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { rank: 1, name: "Sarah Chen", points: 2500, badges: 15 },
                    { rank: 2, name: "Mike Johnson", points: 2350, badges: 13 },
                    { rank: 3, name: "Emma Davis", points: 2200, badges: 12 },
                    { rank: 4, name: "David Wilson", points: 2100, badges: 11 },
                    { rank: 5, name: "Lisa Anderson", points: 2000, badges: 10 },
                  ].map((user) => (
                    <div key={user.rank} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center font-bold
                        ${user.rank === 1 ? 'bg-yellow-500' :
                          user.rank === 2 ? 'bg-gray-300' :
                          user.rank === 3 ? 'bg-amber-600' : 'bg-gray-100'}
                        ${user.rank <= 3 ? 'text-white' : 'text-gray-600'}
                      `}>
                        {user.rank}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.points} XP • {user.badges} badges</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
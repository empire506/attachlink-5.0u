import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Chatbot } from "./chatbot";
import { 
  SearchIcon, 
  MapPinIcon, 
  ClockIcon, 
  BriefcaseIcon,
  FileTextIcon,
  UserIcon,
  BookmarkIcon,
  CheckCircleIcon,
  XCircleIcon
} from "lucide-react";

const PendingIcon = ClockIcon;

export function StudentDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");

  const opportunities = [
    {
      id: 1,
      title: "Software Development Intern",
      company: "TechCorp Solutions",
      location: "Nairobi, Kenya",
      type: "Internship",
      duration: "3 months",
      posted: "2 days ago",
      deadline: "Jan 30, 2026",
      requirements: ["JavaScript", "React", "Node.js"],
      description: "Join our dynamic team and work on real-world projects using modern web technologies.",
    },
    {
      id: 2,
      title: "Marketing Assistant",
      company: "Creative Agency Ltd",
      location: "Mombasa, Kenya",
      type: "Attachment",
      duration: "6 months",
      posted: "1 week ago",
      deadline: "Feb 15, 2026",
      requirements: ["Digital Marketing", "Social Media", "Content Creation"],
      description: "Help manage social media campaigns and create engaging content for our diverse client base.",
    },
    {
      id: 3,
      title: "Data Analyst Trainee",
      company: "FinanceHub Kenya",
      location: "Kisumu, Kenya",
      type: "Internship",
      duration: "4 months",
      posted: "3 days ago",
      deadline: "Feb 10, 2026",
      requirements: ["Python", "SQL", "Excel"],
      description: "Analyze financial data and create reports to support business decisions.",
    },
    {
      id: 4,
      title: "UI/UX Design Intern",
      company: "DesignStudio Kenya",
      location: "Nairobi, Kenya",
      type: "Internship",
      duration: "3 months",
      posted: "5 days ago",
      deadline: "Jan 25, 2026",
      requirements: ["Figma", "Adobe XD", "User Research"],
      description: "Create beautiful and functional designs for web and mobile applications.",
    },
    {
      id: 5,
      title: "Mechanical Engineering Attachment",
      company: "Industrial Works Ltd",
      location: "Eldoret, Kenya",
      type: "Attachment",
      duration: "6 months",
      posted: "1 day ago",
      deadline: "Feb 20, 2026",
      requirements: ["CAD", "Manufacturing", "Quality Control"],
      description: "Hands-on experience in manufacturing processes and quality assurance.",
    },
    {
      id: 6,
      title: "Content Writer Intern",
      company: "Media House Kenya",
      location: "Nairobi, Kenya",
      type: "Internship",
      duration: "3 months",
      posted: "4 days ago",
      deadline: "Feb 5, 2026",
      requirements: ["Writing", "SEO", "Research"],
      description: "Write engaging articles and blog posts for our online platform.",
    },
  ];

  const myApplications = [
    {
      id: 1,
      position: "Software Development Intern",
      company: "TechCorp Solutions",
      appliedDate: "Jan 10, 2026",
      status: "pending",
    },
    {
      id: 2,
      position: "UI/UX Design Intern",
      company: "DesignStudio Kenya",
      appliedDate: "Jan 8, 2026",
      status: "interview",
    },
    {
      id: 3,
      position: "Data Science Intern",
      company: "Analytics Pro",
      appliedDate: "Jan 5, 2026",
      status: "rejected",
    },
    {
      id: 4,
      position: "Marketing Intern",
      company: "BrandWorks",
      appliedDate: "Jan 3, 2026",
      status: "accepted",
    },
  ];

  const profileCompletion = 75;

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      locationFilter === "all" || opp.location.includes(locationFilter);
    const matchesDuration =
      durationFilter === "all" || opp.duration.includes(durationFilter);

    return matchesSearch && matchesLocation && matchesDuration;
  });
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="gap-1"><PendingIcon className="h-3 w-3" />Pending</Badge>;
      case "interview":
        return <Badge className="bg-blue-500 gap-1"><ClockIcon className="h-3 w-3" />Interview</Badge>;
      case "accepted":
        return <Badge className="bg-green-500 gap-1"><CheckCircleIcon className="h-3 w-3" />Accepted</Badge>;
      case "rejected":
        return <Badge variant="destructive" className="gap-1"><XCircleIcon className="h-3 w-3" />Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Completion Alert */}
        {profileCompletion < 100 && (
          <Card className="mb-6 border-primary/50 bg-primary/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Complete Your Profile</CardTitle>
                  <CardDescription>
                    Your profile is {profileCompletion}% complete. Complete it to increase your chances!
                  </CardDescription>
                </div>
                <Button size="sm">Complete Now</Button>
              </div>
              <Progress value={profileCompletion} className="mt-4" />
            </CardHeader>
          </Card>
        )}

        <Tabs defaultValue="opportunities" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="opportunities" className="gap-2">
              <BriefcaseIcon className="h-4 w-4" />
              Opportunities
            </TabsTrigger>
            <TabsTrigger value="applications" className="gap-2">
              <FileTextIcon className="h-4 w-4" />
              My Applications
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <UserIcon className="h-4 w-4" />
              My Profile
            </TabsTrigger>
          </TabsList>

          {/* Available Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Opportunities</CardTitle>
                <CardDescription>
                  Browse and apply to internships and attachments from top companies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search opportunities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="Nairobi">Nairobi</SelectItem>
                      <SelectItem value="Mombasa">Mombasa</SelectItem>
                      <SelectItem value="Kisumu">Kisumu</SelectItem>
                      <SelectItem value="Eldoret">Eldoret</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={durationFilter} onValueChange={setDurationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Durations</SelectItem>
                      <SelectItem value="3">3 months</SelectItem>
                      <SelectItem value="4">4 months</SelectItem>
                      <SelectItem value="6">6 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Results Count */}
                <p className="text-sm text-muted-foreground">
                  Showing {filteredOpportunities.length} of {opportunities.length} opportunities
                </p>

                {/* Opportunities List */}
                <div className="grid gap-4">
                  {filteredOpportunities.map((opp) => (
                    <Card key={opp.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary">{opp.type}</Badge>
                              <span className="text-xs text-muted-foreground">{opp.posted}</span>
                            </div>
                            <CardTitle className="text-xl mb-1">{opp.title}</CardTitle>
                            <CardDescription className="text-primary font-medium">
                              {opp.company}
                            </CardDescription>
                          </div>
                          <Button variant="ghost" size="icon">
                            <BookmarkIcon className="h-5 w-5" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{opp.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <MapPinIcon className="h-4 w-4 mr-2" />
                            {opp.location}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <ClockIcon className="h-4 w-4 mr-2" />
                            {opp.duration}
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-xs text-muted-foreground mb-2">Required Skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {opp.requirements.map((req, idx) => (
                              <Badge key={idx} variant="outline">{req}</Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <span className="text-sm text-muted-foreground">
                            Deadline: {opp.deadline}
                          </span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">View Details</Button>
                            <Button size="sm">Apply Now</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Applications</CardTitle>
                <CardDescription>
                  Track the status of your internship applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myApplications.map((app) => (
                    <Card key={app.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">{app.position}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{app.company}</p>
                            <p className="text-xs text-muted-foreground">
                              Applied on {app.appliedDate}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {getStatusBadge(app.status)}
                            <Button variant="outline" size="sm">View Application</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
                <CardDescription>
                  Manage your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Personal Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-muted-foreground">Full Name</label>
                        <Input placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Email</label>
                        <Input type="email" placeholder="john@university.edu" />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Phone</label>
                        <Input placeholder="+254 700 000 000" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Education</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-muted-foreground">University</label>
                        <Input placeholder="University of Nairobi" />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Course</label>
                        <Input placeholder="Computer Science" />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Year of Study</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Year 1</SelectItem>
                            <SelectItem value="2">Year 2</SelectItem>
                            <SelectItem value="3">Year 3</SelectItem>
                            <SelectItem value="4">Year 4</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">CV/Resume</h3>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <FileTextIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload your CV in PDF format (max 5MB)
                    </p>
                    <Button>Choose File</Button>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Chatbot Assistant */}
      <Chatbot />
    </div>
  );

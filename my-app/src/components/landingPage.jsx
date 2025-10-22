import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Footer } from "./footer";
import { BriefcaseIcon, GraduationCapIcon, SearchIcon, FileTextIcon, UsersIcon, TrendingUpIcon, CheckCircle } from "lucide-react";
import PropTypes from "prop-types";

export function LandingPage({ onGetStarted }) {
  const opportunities = [
    {
      title: "Software Engineering Intern",
      company: "TechCorp Solutions",
      location: "Nairobi, Kenya",
      type: "Internship",
      duration: "3 months",
      posted: "2 days ago"
    },
    {
      title: "Marketing Assistant",
      company: "Creative Agency Ltd",
      location: "Mombasa, Kenya", 
      type: "Attachment",
      duration: "6 months",
      posted: "1 week ago"
    },
    {
      title: "Data Analyst Trainee",
      company: "FinanceHub Kenya",
      location: "Kisumu, Kenya",
      type: "Internship", 
      duration: "4 months",
      posted: "3 days ago"
    }
  ];

  const stats = [
    { icon: BriefcaseIcon, label: "Active Opportunities", value: "2,500+" },
    { icon: UsersIcon, label: "Students Placed", value: "15,000+" },
    { icon: TrendingUpIcon, label: "Partner Companies", value: "1,200+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-background">
      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Bridge the Gap Between 
                <span className="text-primary"> Students</span> and 
                <span className="text-primary"> Companies</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Connect talented students with meaningful internship and attachment opportunities. 
                Build your career or find your next star employee.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6"
                  onClick={() => onGetStarted('student')}
                >
                  <GraduationCapIcon className="mr-2 h-5 w-5" />
                  I'm a Student
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-6"
                  onClick={() => onGetStarted('company')}
                >
                  <BriefcaseIcon className="mr-2 h-5 w-5" />
                  I'm a Company
                </Button>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1745847768380-2caeadbb3b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoYW5kc2hha2UlMjBwYXJ0bmVyc2hpcHxlbnwxfHx8fDE3NTk0Njk3MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional partnership"
                className="rounded-lg shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-foreground mb-4">How AttachLink Works</h2>
            <p className="text-xl text-muted-foreground">Simple steps to connect students with opportunities</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16">
            {/* For Students */}
            <div>
              <div className="flex items-center mb-8">
                <GraduationCapIcon className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-2xl font-bold text-foreground">For Students</h3>
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">1</div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Create Your Profile</h4>
                    <p className="text-muted-foreground">Upload your CV and showcase your skills, education, and experience.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mr-5 mt-1">2</div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Browse Opportunities</h4>
                    <p className="text-muted-foreground">Search and filter internships and attachments by location, field, and company.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mr-5 mt-1">3</div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Apply & Connect</h4>
                    <p className="text-muted-foreground">Apply directly to companies and track your application status.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Companies */}
            <div>
              <div className="flex items-center mb-8">
                <BriefcaseIcon className="h-8 w-8 text-primary mr-3" />
                <h3 className="text-2xl font-bold text-foreground">For Companies</h3>
              </div>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mr-5 mt-1">1</div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Post Opportunities</h4>
                    <p className="text-muted-foreground">Create detailed job postings for internships and attachment positions.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mr-5 mt-1">2</div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Review Applications</h4>
                    <p className="text-muted-foreground">Browse student profiles and review applications from qualified candidates.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary text-primary-foreground rounded-full w-10 h-10 flex items-center justify-center mr-5 mt-1">3</div>
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">Hire Top Talent</h4>
                    <p className="text-muted-foreground">Connect with students and build your future workforce.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Opportunities</h2>
            <p className="text-xl text-muted-foreground">Latest internships and attachments from top companies</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {opportunities.map((opportunity, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow p-6">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant={opportunity.type === 'Internship' ? 'default' : 'secondary'}>
                      {opportunity.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{opportunity.posted}</span>
                  </div>
                  <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {opportunity.company}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div>📍 {opportunity.location}</div>
                    <div>⏰ Duration: {opportunity.duration}</div>
                  </div>
                  <Button className="w-full mt-6" variant="outline">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg">
              <SearchIcon className="mr-2 h-5 w-5" />
              View All Opportunities
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose AttachLink</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The trusted platform for student placements and company hiring
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <Card className="p-8">
              <CardHeader>
                <div className="bg-primary/10 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Verified Companies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All companies are verified to ensure authentic opportunities and safe placements
                </p>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardHeader>
                <div className="bg-primary/10 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Smart Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our algorithm matches you with opportunities that fit your skills and career goals
                </p>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardHeader>
                <div className="bg-primary/10 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get help anytime with our chatbot assistant and dedicated support team
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

LandingPage.propTypes = {
  onGetStarted: PropTypes.func.isRequired,
};
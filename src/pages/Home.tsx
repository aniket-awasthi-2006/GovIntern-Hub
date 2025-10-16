import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Brain, Shield, TrendingUp, MapPin, Clock, Briefcase } from "lucide-react";
import { NavLink } from "react-router-dom";
import { fetchInternships, Internship } from "@/data/internships";
import heroImage from "@/assets/hero-government-internships.jpg";

const Home = () => {
  const [featuredInternships, setFeaturedInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInternships = async () => {
      try {
        const data = await fetchInternships();
        setFeaturedInternships(data.slice(0, 3)); // Take first 3 for featured
      } catch (err) {
        setError("Failed to load internships");
      } finally {
        setLoading(false);
      }
    };
    loadInternships();
  }, []);

  if (loading) {
    return <div className="space-y-20 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="space-y-20 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-hover text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Government internship opportunities for students"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary-hover/80"></div>
        </div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight animate-fade-in">
              One Platform. All Government Internships.
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto animate-fade-in-delay-1">
              Discover verified government internship opportunities across all ministries and departments in India.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto animate-slide-up-delay">
              <div className="flex gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2 focus-expand">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-foreground/70 h-4 w-4" />
                  <Input
                    placeholder="Search by skills, ministry, location..."
                    className="pl-10 bg-white/20 border-white/30 text-primary-foreground placeholder:text-primary-foreground/70"
                  />
                </div>
                <Button variant="secondary" size="lg" className="hover-scale">
                  Search Internships
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-5 animate-fade-in-delay-2">
              <Badge variant="secondary" className="px-4 py-2 animate-pulse-scale">
                <Users className="h-4 w-4 mr-1" />
                500+ Internships
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 animate-pulse-scale">
                <Shield className="h-4 w-4 mr-1" />
                100% Verified
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 animate-pulse-scale">
                <Brain className="h-4 w-4 mr-1" />
                AI-Powered Matching
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center hover-lift animate-stagger-1">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-primary mx-auto mb-4 animate-float hover-icon-bounce" />
              <h3 className="font-semibold mb-2">Browse All Internships</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Explore 500+ verified government internship opportunities
              </p>
              <Button asChild variant="outline" size="sm" className="hover-scale">
                <NavLink to="/internships">View All</NavLink>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover-lift animate-stagger-2">
            <CardContent className="pt-6">
              <Brain className="h-12 w-12 text-primary mx-auto mb-4 animate-float hover-icon-bounce" />
              <h3 className="font-semibold mb-2">AI Smart Matching</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get personalized internship recommendations
              </p>
              <Button asChild size="sm" className="hover-scale animate-pulse-slow">
                <NavLink to="/ai-match">Get Matched</NavLink>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover-lift animate-stagger-3">
            <CardContent className="pt-6">
              <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4 animate-float hover-icon-bounce" />
              <h3 className="font-semibold mb-2">Track Applications</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Monitor your internship application status
              </p>
              <Button variant="outline" size="sm">
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover-lift animate-stagger-4">
            <CardContent className="pt-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4 animate-float hover-icon-bounce" />
              <h3 className="font-semibold mb-2">Verified Opportunities</h3>
              <p className="text-sm text-muted-foreground mb-4">
                All internships verified by government authorities
              </p>
              <Button asChild variant="outline" size="sm" className="hover-scale">
                <NavLink to="/about">Learn More</NavLink>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Internships */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">Featured Internships</h2>
          <p className="text-lg text-muted-foreground">
            Handpicked opportunities from leading government departments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredInternships.map((internship, index) => (
            <Card key={internship.id} className={`hover-lift animate-stagger-${index + 1}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg leading-tight">
                      {internship.title}
                    </CardTitle>
                    <p className="text-sm text-primary font-medium">
                      {internship.ministry}
                    </p>
                  </div>
                  <Badge variant={internship.level === 'Central' ? 'default' : 'secondary'}>
                    {internship.level}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{internship.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-green-600">{internship.stipend}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{internship.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className="text-xs">
                      {internship.mode}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {internship.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {internship.skills.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{internship.skills.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button asChild size="sm" className="flex-1 hover-scale">
                    <NavLink to={`/internship/${internship.id}`}>View Details</NavLink>
                  </Button>
                  <Button variant="outline" size="sm" className="hover-scale">
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 animate-fade-in-delay-1">
          <Button asChild variant="outline" size="lg" className="hover-scale">
            <NavLink to="/internships">View All Internships</NavLink>
          </Button>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-accent">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-counter">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Active Internships</div>
            </div>
            <div className="animate-counter">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Government Departments</div>
            </div>
            <div className="animate-counter">
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-sm text-muted-foreground">Students Placed</div>
            </div>
            <div className="animate-counter">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

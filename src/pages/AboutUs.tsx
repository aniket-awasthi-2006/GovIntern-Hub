import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Target, Users, Award, CheckCircle, Heart, Lightbulb, Globe } from "lucide-react";
import { NavLink } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-hover text-primary-foreground">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Making Government Opportunities Accessible for Every Student
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
              GovIntern Hub is India's first comprehensive platform dedicated to connecting students 
              with verified government internship opportunities across all ministries and departments.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card className="text-center">
            <CardContent className="pt-8 space-y-4">
              <Target className="h-16 w-16 text-primary mx-auto animate-pulse-scale" />
              <h2 className="text-2xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To democratize access to government internship opportunities by creating a transparent, 
                user-friendly platform that connects talented students with meaningful roles in public service, 
                fostering the next generation of civic leaders.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-8 space-y-4">
              <Lightbulb className="h-16 w-16 text-primary mx-auto animate-pulse-scale" />
              <h2 className="text-2xl font-bold">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To become the go-to platform for government internships, empowering millions of students 
                to contribute to India's development while building their careers in public service, 
                technology, and policy-making.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-accent">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 space-y-3">
                <Shield className="h-12 w-12 text-primary mx-auto animate-float" />
                <h3 className="font-semibold">Transparency</h3>
                <p className="text-sm text-muted-foreground">
                  All opportunities are verified and authentic. No hidden agendas.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 space-y-3">
                <Users className="h-12 w-12 text-primary mx-auto animate-float" />
                <h3 className="font-semibold">Accessibility</h3>
                <p className="text-sm text-muted-foreground">
                  Equal opportunities for students from all backgrounds and regions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 space-y-3">
                <Award className="h-12 w-12 text-primary mx-auto animate-float" />
                <h3 className="font-semibold">Excellence</h3>
                <p className="text-sm text-muted-foreground">
                  Connecting the best talent with impactful government initiatives.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 space-y-3">
                <Heart className="h-12 w-12 text-primary mx-auto animate-float" />
                <h3 className="font-semibold">Service</h3>
                <p className="text-sm text-muted-foreground">
                  Dedicated to serving students and strengthening public service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What We Do</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            GovIntern Hub serves as the bridge between ambitious students and transformative 
            government internship opportunities across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Comprehensive Database</h3>
                <p className="text-muted-foreground">
                  Maintain an up-to-date database of 500+ verified government internship 
                  opportunities across 50+ ministries and departments.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">AI-Powered Matching</h3>
                <p className="text-muted-foreground">
                  Use advanced algorithms to match students with internships based on 
                  their skills, interests, and career goals.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Verification Process</h3>
                <p className="text-muted-foreground">
                  Every internship is verified through official government channels 
                  to ensure authenticity and legitimacy.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Student Support</h3>
                <p className="text-muted-foreground">
                  Provide guidance on application processes, interview preparation, 
                  and career development in public service.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Real-time Updates</h3>
                <p className="text-muted-foreground">
                  Keep students informed about new opportunities, deadline reminders, 
                  and application status updates.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Multi-language Support</h3>
                <p className="text-muted-foreground">
                  Available in English and Hindi to ensure accessibility for 
                  students across different regions of India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg text-primary-foreground/90">
              Making a difference in students' lives and government efficiency
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-primary-foreground/80">Students Registered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">Active Internships</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary-foreground/80">Partner Ministries</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-primary-foreground/80">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose GovIntern Hub?</h2>
          <p className="text-lg text-muted-foreground">
            The advantages that set us apart from other platforms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-primary" />
              <CardTitle>100% Verified Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Every internship is verified through official government channels. 
                No fake or misleading opportunities.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Globe className="h-8 w-8 text-primary" />
              <CardTitle>Pan-India Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Opportunities from all states and union territories, covering 
                both central and state government internships.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-primary" />
              <CardTitle>Student-Centric Design</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Built specifically for students with intuitive interface, 
                helpful guidance, and comprehensive support.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-accent text-center">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Government Career?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who have found their perfect government internship through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <NavLink to="/ai-match">Find My Perfect Match</NavLink>
            </Button>
            <Button asChild variant="outline" size="lg">
              <NavLink to="/internships">Browse All Internships</NavLink>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
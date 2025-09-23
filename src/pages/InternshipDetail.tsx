import { useParams, NavLink, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLink,
  MapPin,
  Clock,
  Briefcase,
  Calendar,
  Users,
  CheckCircle,
  Gift,
  FileText,
  ArrowLeft,
  Share,
  Bookmark
} from "lucide-react";
import { fetchInternships, Internship } from "@/data/internships";

const InternshipDetail = () => {
  const { id } = useParams();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInternships = async () => {
      try {
        const data = await fetchInternships();
        setInternships(data);
      } catch (err) {
        setError("Failed to load internships");
      } finally {
        setLoading(false);
      }
    };
    loadInternships();
  }, []);

  const internship = internships.find(i => i.id === id);

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-16 text-center text-red-500">{error}</div>;
  }

  if (!internship) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Internship Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The internship you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <NavLink to="/internships">Browse All Internships</NavLink>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <NavLink to="/" className="hover:text-primary">Home</NavLink>
        <span>/</span>
        <NavLink to="/internships" className="hover:text-primary">Internships</NavLink>
        <span>/</span>
        <span>{internship.title}</span>
      </div>

      {/* Back Button */}
      <Button variant="outline" asChild className="mb-6">
        <NavLink to="/internships">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Internships
        </NavLink>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant={internship.level === 'Central' ? 'default' : 'secondary'}>
                      {internship.level} Government
                    </Badge>
                    <Badge variant="outline">{internship.mode}</Badge>
                  </div>
                  <CardTitle className="text-2xl">{internship.title}</CardTitle>
                  <div className="space-y-1">
                    <p className="text-lg text-primary font-semibold">{internship.ministry}</p>
                    <p className="text-muted-foreground">{internship.department}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{internship.duration}</p>
                    <p className="text-muted-foreground text-xs">Duration</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-green-600">{internship.stipend}</p>
                    <p className="text-muted-foreground text-xs">Stipend</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{internship.location}</p>
                    <p className="text-muted-foreground text-xs">Location</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-destructive">
                      {new Date(internship.deadline).toLocaleDateString()}
                    </p>
                    <p className="text-muted-foreground text-xs">Deadline</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                About This Internship
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {internship.description}
              </p>
            </CardContent>
          </Card>

          {/* Objectives */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Key Objectives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {internship.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                Benefits & Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {internship.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Gift className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Application Process */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Application Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {internship.applicationProcess.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="pt-1">
                      <p className="text-muted-foreground">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Apply */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Apply</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button size="lg" className="w-full" asChild>
                <a href={internship.applicationLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Apply Now
                </a>
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                <Bookmark className="h-4 w-4 mr-2" />
                Save for Later
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                You'll be redirected to the official application portal
              </p>
            </CardContent>
          </Card>

          {/* Eligibility */}
          <Card>
            <CardHeader>
              <CardTitle>Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {internship.eligibility}
              </p>
            </CardContent>
          </Card>

          {/* Required Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Required Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {internship.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <span className="font-medium">Posted:</span>
                <p className="text-muted-foreground">
                  {new Date(internship.posted).toLocaleDateString()}
                </p>
              </div>
              <Separator />
              <div>
                <span className="font-medium">Application Deadline:</span>
                <p className="text-destructive font-medium">
                  {new Date(internship.deadline).toLocaleDateString()}
                </p>
              </div>
              <Separator />
              <div>
                <span className="font-medium">Work Mode:</span>
                <p className="text-muted-foreground">{internship.mode}</p>
              </div>
            </CardContent>
          </Card>

          {/* Similar Internships */}
          <Card>
            <CardHeader>
              <CardTitle>Similar Internships</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {internships
                  .filter(i => i.id !== internship.id && i.ministry === internship.ministry)
                  .slice(0, 2)
                  .map((similar) => (
                    <div key={similar.id} className="border rounded-md p-3 hover:bg-accent transition-colors">
                      <NavLink to={`/internship/${similar.id}`}>
                        <h4 className="font-medium text-sm mb-1 hover:text-primary">
                          {similar.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {similar.department}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline" className="text-xs">
                            {similar.mode}
                          </Badge>
                          <span className="text-xs text-green-600 font-medium">
                            {similar.stipend}
                          </span>
                        </div>
                      </NavLink>
                    </div>
                  ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3" asChild>
                <NavLink to="/internships">View All</NavLink>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetail;
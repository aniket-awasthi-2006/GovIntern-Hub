import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Upload, Sparkles, TrendingUp, MapPin, Clock, Briefcase } from "lucide-react";
import { NavLink } from "react-router-dom";
import { fetchInternships, Internship } from "@/data/internships";

interface MatchedInternship extends Internship {
  matchScore: number;
  matchingSkills: string[];
}

const AIMatch = () => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    name: "",
    education: "",
    degree: "",
    skills: "",
    interests: "",
    location: "",
    experience: ""
  });
  const [matchResults, setMatchResults] = useState<MatchedInternship[]>([]);
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

  const handleProfileSubmit = () => {
    // Simulate AI matching logic
    const userSkills = profile.skills.toLowerCase().split(',').map(s => s.trim());
    const matches = internships.map(internship => {
      let score = 0;
      
      // Match skills
      const matchingSkills = internship.skills.filter(skill => 
        userSkills.some(userSkill => 
          skill.toLowerCase().includes(userSkill) || userSkill.includes(skill.toLowerCase())
        )
      );
      score += matchingSkills.length * 20;
      
      // Match location preference
      if (profile.location && internship.location.toLowerCase().includes(profile.location.toLowerCase())) {
        score += 15;
      }
      
      // Match education
      if (profile.degree && internship.eligibility.toLowerCase().includes(profile.degree.toLowerCase())) {
        score += 10;
      }
      
      // Add some randomness for demo
      score += Math.random() * 20;
      
      return {
        ...internship,
        matchScore: Math.min(Math.round(score), 95),
        matchingSkills
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
    
    setMatchResults(matches.slice(0, 6));
    setStep(3);
  };

  if (step === 1) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center space-y-4 mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">AI-Powered Internship Matching</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Get personalized internship recommendations based on your profile and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setStep(2)}>
            <CardContent className="pt-6 text-center space-y-4">
              <Upload className="h-16 w-16 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Upload Resume</h3>
              <p className="text-muted-foreground">
                Upload your resume and let our AI extract your skills, education, and experience automatically
              </p>
              <Button className="w-full">
                Upload Resume (PDF/DOC)
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setStep(2)}>
            <CardContent className="pt-6 text-center space-y-4">
              <Sparkles className="h-16 w-16 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">Fill Profile Manually</h3>
              <p className="text-muted-foreground">
                Provide your details manually for more control over your profile information
              </p>
              <Button variant="outline" className="w-full">
                Fill Profile Form
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center space-y-4">
          <h2 className="text-2xl font-semibold">How AI Matching Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold">
                1
              </div>
              <h3 className="font-semibold">Analyze Profile</h3>
              <p className="text-sm text-muted-foreground">
                AI analyzes your skills, education, and preferences
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold">
                2
              </div>
              <h3 className="font-semibold">Match Algorithms</h3>
              <p className="text-sm text-muted-foreground">
                Advanced algorithms find the best matching internships
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto font-bold">
                3
              </div>
              <h3 className="font-semibold">Ranked Results</h3>
              <p className="text-sm text-muted-foreground">
                Get personalized recommendations with match scores
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Create Your Profile</h1>
            <p className="text-muted-foreground">
              Provide your details to get the best internship matches
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Full Name</label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Education Level</label>
                  <Select value={profile.education} onValueChange={(value) => setProfile({...profile, education: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                      <SelectItem value="postgraduate">Post Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Degree/Field of Study</label>
                <Input
                  value={profile.degree}
                  onChange={(e) => setProfile({...profile, degree: e.target.value})}
                  placeholder="e.g., BTech Computer Science, MBA, BSc Physics"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Skills (comma-separated)</label>
                <Textarea
                  value={profile.skills}
                  onChange={(e) => setProfile({...profile, skills: e.target.value})}
                  placeholder="e.g., Python, React, Data Analysis, Project Management"
                  className="min-h-20"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Areas of Interest</label>
                <Textarea
                  value={profile.interests}
                  onChange={(e) => setProfile({...profile, interests: e.target.value})}
                  placeholder="e.g., Technology, Healthcare, Agriculture, Education"
                  className="min-h-20"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Preferred Location</label>
                <Input
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                  placeholder="e.g., New Delhi, Mumbai, Remote"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Experience Level</label>
                <Select value={profile.experience} onValueChange={(value) => setProfile({...profile, experience: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fresher">Fresher (No experience)</SelectItem>
                    <SelectItem value="0-1">0-1 years</SelectItem>
                    <SelectItem value="1-2">1-2 years</SelectItem>
                    <SelectItem value="2+">2+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleProfileSubmit} className="flex-1">
                  <Brain className="h-4 w-4 mr-2" />
                  Find My Matches
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Your AI-Matched Internships</h1>
          <p className="text-lg text-muted-foreground">
            Here are your personalized recommendations based on your profile
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2">
              <TrendingUp className="h-4 w-4 mr-1" />
              {matchResults.length} Matches Found
            </Badge>
            <Button variant="outline" onClick={() => setStep(2)}>
              Update Profile
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matchResults.map((internship) => (
            <Card key={internship.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={internship.matchScore >= 80 ? "default" : internship.matchScore >= 60 ? "secondary" : "outline"}
                        className="text-sm font-bold"
                      >
                        {internship.matchScore}% Match
                      </Badge>
                      <Badge variant={internship.level === 'Central' ? 'default' : 'secondary'}>
                        {internship.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">
                      {internship.title}
                    </CardTitle>
                    <p className="text-sm text-primary font-medium">
                      {internship.ministry}
                    </p>
                  </div>
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
                  <div className="flex items-center gap-1 col-span-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{internship.location}</span>
                  </div>
                </div>
                
                {internship.matchingSkills && internship.matchingSkills.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Matching Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {internship.matchingSkills.map((skill: string) => (
                        <Badge key={skill} variant="default" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="text-sm text-muted-foreground">
                  <p>{internship.description.substring(0, 100)}...</p>
                </div>
                
                <div className="flex gap-2">
                  <Button asChild size="sm" className="flex-1">
                    <NavLink to={`/internship/${internship.id}`}>View Details</NavLink>
                  </Button>
                  <Button variant="outline" size="sm">
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold">Want more matches?</h3>
          <p className="text-muted-foreground">
            Update your profile or skills to discover more relevant opportunities
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => setStep(2)}>
              Update Profile
            </Button>
            <Button asChild>
              <NavLink to="/internships">Browse All Internships</NavLink>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMatch;
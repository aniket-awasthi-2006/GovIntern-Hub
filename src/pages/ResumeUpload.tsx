import { useState, DragEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Loader2 } from "lucide-react";
import { useNavigate, NavLink } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import OpenAI from "openai";
import { fetchInternships, Internship } from "@/data/internships";
import { Badge } from "@/components/ui/badge";
import { Clock, Briefcase, MapPin, TrendingUp } from "lucide-react";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

interface MatchedInternship extends Internship {
  matchScore: number;
  matchingSkills: string[];
}

const ResumeUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    name: "",
    education: "",
    degree: "",
    skills: "",
    interests: "",
    location: "",
    experience: ""
  });
  const [internships, setInternships] = useState<Internship[]>([]);
  const [matchResults, setMatchResults] = useState<MatchedInternship[]>([]);
  const [step, setStep] = useState<"upload" | "results">("upload");

  // Load internships
  useEffect(() => {
    const loadInternships = async () => {
      try {
        const data = await fetchInternships();
        setInternships(data);
      } catch {
        setError("Failed to load internships");
      }
    };
    loadInternships();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setError(null);
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      setError(null);
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const validateAndSetFile = (uploadedFile: File) => {
    if (uploadedFile.type !== "application/pdf") {
      setError("Please upload only PDF files.");
      setFile(null);
      return;
    }
    setFile(uploadedFile);
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items
        .filter(item => "str" in item)
        .map(item => (item as { str: string }).str)
        .join(" ");
      text += pageText + "\n";
    }
    return text;
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const text = await extractTextFromPDF(file);
      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `Extract the following fields from the resume text and return in JSON format.
      Fields: 
      - name
      - education (graduage, post-graduate or undergraduate)
      - degree (list degrees obtained)
      - skills (list key skills, separated by commas)
      - interests (list key interests, separated by commas)
      - location (preferred work location)
      - experience (fresher(0 years), 1-2 years, 3-5 years, 5+ years)
`
          },
          { role: "user", content: text }
        ],
        response_format: { type: "json_object" }
      });

      const result = JSON.parse(completion.choices[0].message?.content || "{}");
      const cleanedProfile = {
        name: result.name || "N/A",
        education: result.education || "N/A",
        degree: result.degree || "N/A",
        skills: result.skills || "N/A",
        interests: result.interests || "N/A",
        location: result.location || "N/A",
        experience: result.experience || "N/A"
      };
      setProfile(cleanedProfile);

      // Match internships
      matchInternships(cleanedProfile);

    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to process the PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const matchInternships = (userProfile: typeof profile) => {
    const skillsStr = Array.isArray(userProfile.skills) ? userProfile.skills.join(', ') : userProfile.skills;
    const userSkills = skillsStr.toLocaleLowerCase().split(",").map(s => s.trim());
    const locationStr = Array.isArray(userProfile.location) ? userProfile.location.join(', ') : userProfile.location;
    const degreeStr = Array.isArray(userProfile.degree) ? userProfile.degree.join(', ') : userProfile.degree;
    const matches = internships.map(internship => {
      const matchingSkills = internship.skills.filter(skill =>
        userSkills.some(userSkill => skill.toLocaleLowerCase().includes(userSkill) || userSkill.includes(skill.toLocaleLowerCase()))
      );
      let score = matchingSkills.length * 20;
      if (locationStr && internship.location.toLocaleLowerCase().includes(locationStr.toLocaleLowerCase())) score += 15;
      if (degreeStr && internship.eligibility.toLocaleLowerCase().includes(degreeStr.toLocaleLowerCase())) score += 10;
      score += Math.random() * 20;
      return { ...internship, matchScore: Math.min(Math.round(score), 95), matchingSkills };
    }).sort((a, b) => b.matchScore - a.matchScore);

    setMatchResults(matches.slice(0, 6));
    setStep("results");
  };

  // Render
  if (step === "upload") {
    return (
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Upload Resume</CardTitle>
            <p className="text-muted-foreground text-sm mt-1">
              Upload your PDF resume and let AI extract your profile and suggest internships
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
              className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center cursor-pointer bg-blue-100 hover:bg-blue-200 transition"
            >
              <Upload className="mx-auto mb-2 h-10 w-10 text-blue-600" />
              <p className="text-gray-700 font-medium">Drop PDF file here or</p>
              <label className="mt-4 inline-block">
                <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" />
                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow cursor-pointer hover:bg-blue-700">
                  Choose File
                </span>
              </label>
            </div>

            {file && <p className="text-green-700 text-sm text-center font-bold">Selected: {file.name}</p>}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Button onClick={handleSubmit} disabled={loading || !file} className="w-full mt-4">
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
              {loading ? "Processing..." : "Upload & Match Internships"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Results Page
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Your AI-Matched Internships</h1>
          <p className="text-lg text-muted-foreground">
            Personalized recommendations based on your uploaded resume
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2">
              <TrendingUp className="h-4 w-4 mr-1" />
              {matchResults.length} Matches Found
            </Badge>
            <Button variant="outline" onClick={() => setStep("upload")}>
              Upload Another Resume
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
                    <CardTitle className="text-lg leading-tight">{internship.title}</CardTitle>
                    <p className="text-sm text-primary font-medium">{internship.ministry}</p>
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

                {internship.matchingSkills.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Matching Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {internship.matchingSkills.map(skill => (
                        <Badge key={skill} variant="default" className="text-xs">{skill}</Badge>
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
      </div>
    </div>
  );
};

export default ResumeUpload;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MapPin, Clock, Briefcase, ExternalLink } from "lucide-react";
import { NavLink } from "react-router-dom";
import { fetchInternships, Internship } from "@/data/internships";

const InternshipSchemes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [ministryFilter, setMinistryFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
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

  // Get unique ministries for filter
  const ministries = Array.from(new Set(internships.map(i => i.ministry)));

  // Filter internships based on search and filters
  const filteredInternships = internships.filter(internship => {
    const matchesSearch = searchQuery === "" ||
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.ministry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      internship.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesMinistry = ministryFilter === "all" || internship.ministry === ministryFilter;
    const matchesMode = modeFilter === "all" || internship.mode === modeFilter;
    const matchesLevel = levelFilter === "all" || internship.level === levelFilter;

    return matchesSearch && matchesMinistry && matchesMode && matchesLevel;
  });

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading internships...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Government Internship Schemes</h1>
        <p className="text-lg text-muted-foreground">
          Explore all available government internship opportunities across India
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by title, ministry, skills, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={ministryFilter} onValueChange={setMinistryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Ministry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ministries</SelectItem>
                {ministries.map(ministry => (
                  <SelectItem key={ministry} value={ministry}>{ministry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={modeFilter} onValueChange={setModeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Work Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modes</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="Onsite">Onsite</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Government Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Central">Central Government</SelectItem>
                <SelectItem value="State">State Government</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {filteredInternships.length} of {internships.length} internships
        </p>
        <Select defaultValue="latest">
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest Posted</SelectItem>
            <SelectItem value="deadline">Deadline</SelectItem>
            <SelectItem value="stipend">Stipend (High to Low)</SelectItem>
            <SelectItem value="duration">Duration</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Internship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInternships.map((internship) => (
          <Card key={internship.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg leading-tight">
                    {internship.title}
                  </CardTitle>
                  <p className="text-sm text-primary font-medium">
                    {internship.ministry}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {internship.department}
                  </p>
                </div>
                <div className="space-y-1">
                  <Badge variant={internship.level === 'Central' ? 'default' : 'secondary'}>
                    {internship.level}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {internship.mode}
                  </Badge>
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
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Eligibility:</p>
                <p className="text-sm">{internship.eligibility}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Skills Required:</p>
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
              </div>
              
              <div className="text-sm">
                <span className="text-muted-foreground">Deadline: </span>
                <span className="font-medium text-destructive">
                  {new Date(internship.deadline).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex gap-2">
                <Button asChild size="sm" className="flex-1">
                  <NavLink to={`/internship/${internship.id}`}>View Details</NavLink>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={internship.applicationLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Apply
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredInternships.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">
            No internships found matching your criteria
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery("");
              setMinistryFilter("all");
              setModeFilter("all");
              setLevelFilter("all");
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default InternshipSchemes;
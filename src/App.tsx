import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import InternshipSchemes from "./pages/InternshipSchemes";
import AIMatch from "./pages/AIMatch"; 
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import InternshipDetail from "./pages/InternshipDetail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import ResumeUpload from "./pages/ResumeUpload";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/sign-in/*" element={<SignIn />} />
        <Route path="/sign-up/*" element={<SignUp />} />
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/internships" element={<InternshipSchemes />} />
              <Route path="/ai-match" element={<AIMatch />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/internship/:id" element={<InternshipDetail />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<AIMatch />} />
              <Route path="/resume-upload" element={<ResumeUpload />} />

            </Routes>
          </Layout>
        } />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

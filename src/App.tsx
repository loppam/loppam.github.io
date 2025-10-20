import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useDocumentTitle } from "./hooks/useDocumentTitle";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectCase } from "./components/ProjectCase";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Writings } from "./pages/Writings";
import { Article } from "./pages/Article";
import { Update } from "./pages/Update";
import { NotFound } from "./pages/NotFound";

interface Project {
  id: string;
  title: string;
  role: string;
  duration: string;
  tech: string[];
  live_demo?: string | null;
  repo?: string;
  summary: string;
  impact: string[];
  takeaway: string;
  problem: string;
  responsibilities: string[];
  approach: string;
  whatIdDoDifferently: string;
  image?: string;
}

function HomePage() {
  useDocumentTitle("LOPAM - Frontend Engineer");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        setProjects(data.projects || []);
        setLoading(false);
      } catch (error) {
        console.error("Error loading projects:", error);
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black/70">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <main>
        <Hero />

        {/* Projects Section */}
        <section
          id="work"
          className="py-24 px-4 md:px-10 lg:px-[120px] bg-gradient-to-b from-transparent via-black/[0.02] to-transparent"
        >
          <div className="max-w-[1100px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[1px] w-12 bg-black" />
                  <span className="text-black/50 uppercase tracking-wider">
                    Portfolio
                  </span>
                </div>
                <h2 className="text-black mb-4">Selected work</h2>
                <p className="text-black/70 max-w-2xl">
                  Real projects, real impact — short case studies showing the
                  problem, approach, and result.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <ProjectCard
                      {...project}
                      onClick={() => setSelectedProject(project)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <About />
        <Contact />
      </main>

      {/* Project Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectCase
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Nav />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/writings" element={<Writings />} />
          <Route path="/writings/:slug" element={<Article />} />
          <Route path="/update" element={<Update />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Save,
  Plus,
  Trash2,
  Edit,
  LogOut,
  FileText,
  Briefcase,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Login } from "../components/Login";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import React from "react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  published: boolean;
}

interface Project {
  id: string;
  title: string;
  role: string;
  duration: string;
  tech: string[];
  live_demo: string | null;
  repo: string;
  summary: string;
  impact: string[];
  takeaway: string;
  problem: string;
  responsibilities: string[];
  approach: string;
  whatIdDoDifferently: string;
}

export function Update() {
  useDocumentTitle("LOPAM Update - Admin");

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [newArticle, setNewArticle] = useState<Partial<Article>>({
    title: "",
    excerpt: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    readTime: "5 min read",
    tags: [],
    published: false,
  });

  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    role: "",
    duration: "",
    tech: [],
    live_demo: "",
    repo: "",
    summary: "",
    impact: [],
    takeaway: "",
    problem: "",
    responsibilities: [],
    approach: "",
    whatIdDoDifferently: "",
  });

  const [editingArticle, setEditingArticle] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [newTech, setNewTech] = useState("");
  const [newImpact, setNewImpact] = useState("");
  const [newResponsibility, setNewResponsibility] = useState("");

  useEffect(() => {
    const authStatus = localStorage.getItem("lopam_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        setArticles(data.articles || []);
        setProjects(data.projects || []);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("lopam_auth");
    setIsAuthenticated(false);
  };

  const saveDataToFile = async (
    updatedArticles: Article[],
    updatedProjects: Project[]
  ) => {
    try {
      const data = {
        articles: updatedArticles,
        projects: updatedProjects,
      };

      // In a real application, you'd send this to a backend API
      // For now, we'll just update the local state
      console.log("Data would be saved:", data);

      // You could implement a backend endpoint to save this data
      // await fetch('/api/save-data', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black/70">Loading content...</p>
        </div>
      </div>
    );
  }

  // Article handlers
  const handleSaveArticle = async () => {
    if (!newArticle.title || !newArticle.excerpt || !newArticle.content) {
      alert("Please fill in all required fields");
      return;
    }

    const article: Article = {
      id: newArticle.id || `article-${Date.now()}`,
      title: newArticle.title,
      excerpt: newArticle.excerpt,
      content: newArticle.content,
      date: newArticle.date || new Date().toISOString().split("T")[0],
      readTime: newArticle.readTime || "5 min read",
      tags: newArticle.tags || [],
      published: newArticle.published || false,
    };

    let updatedArticles: Article[];
    if (editingArticle) {
      updatedArticles = articles.map((a) =>
        a.id === editingArticle ? article : a
      );
      setArticles(updatedArticles);
      setEditingArticle(null);
    } else {
      updatedArticles = [...articles, article];
      setArticles(updatedArticles);
    }

    // Save to file
    await saveDataToFile(updatedArticles, projects);

    setNewArticle({
      title: "",
      excerpt: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
      readTime: "5 min read",
      tags: [],
      published: false,
    });
  };

  const handleEditArticle = (article: Article) => {
    setNewArticle(article);
    setEditingArticle(article.id);
  };

  const handleDeleteArticle = async (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      const updatedArticles = articles.filter((a) => a.id !== id);
      setArticles(updatedArticles);
      await saveDataToFile(updatedArticles, projects);
    }
  };

  const addTag = () => {
    if (newTag && !newArticle.tags?.includes(newTag)) {
      setNewArticle({
        ...newArticle,
        tags: [...(newArticle.tags || []), newTag],
      });
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setNewArticle({
      ...newArticle,
      tags: newArticle.tags?.filter((t) => t !== tag) || [],
    });
  };

  // Project handlers
  const handleSaveProject = async () => {
    if (!newProject.title || !newProject.role || !newProject.summary) {
      alert("Please fill in all required fields");
      return;
    }

    const project: Project = {
      id: newProject.id || `project-${Date.now()}`,
      title: newProject.title,
      role: newProject.role,
      duration: newProject.duration || "",
      tech: newProject.tech || [],
      live_demo: newProject.live_demo || null,
      repo: newProject.repo || "",
      summary: newProject.summary,
      impact: newProject.impact || [],
      takeaway: newProject.takeaway || "",
      problem: newProject.problem || "",
      responsibilities: newProject.responsibilities || [],
      approach: newProject.approach || "",
      whatIdDoDifferently: newProject.whatIdDoDifferently || "",
    };

    let updatedProjects: Project[];
    if (editingProject) {
      updatedProjects = projects.map((p) =>
        p.id === editingProject ? project : p
      );
      setProjects(updatedProjects);
      setEditingProject(null);
    } else {
      updatedProjects = [...projects, project];
      setProjects(updatedProjects);
    }

    // Save to file
    await saveDataToFile(articles, updatedProjects);

    setNewProject({
      title: "",
      role: "",
      duration: "",
      tech: [],
      live_demo: "",
      repo: "",
      summary: "",
      impact: [],
      takeaway: "",
      problem: "",
      responsibilities: [],
      approach: "",
      whatIdDoDifferently: "",
    });
  };

  const handleEditProject = (project: Project) => {
    setNewProject(project);
    setEditingProject(project.id);
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const updatedProjects = projects.filter((p) => p.id !== id);
      setProjects(updatedProjects);
      await saveDataToFile(articles, updatedProjects);
    }
  };

  const addTech = () => {
    if (newTech && !newProject.tech?.includes(newTech)) {
      setNewProject({
        ...newProject,
        tech: [...(newProject.tech || []), newTech],
      });
      setNewTech("");
    }
  };

  const removeTech = (tech: string) => {
    setNewProject({
      ...newProject,
      tech: newProject.tech?.filter((t) => t !== tech) || [],
    });
  };

  const addImpact = () => {
    if (newImpact && !newProject.impact?.includes(newImpact)) {
      setNewProject({
        ...newProject,
        impact: [...(newProject.impact || []), newImpact],
      });
      setNewImpact("");
    }
  };

  const removeImpact = (impact: string) => {
    setNewProject({
      ...newProject,
      impact: newProject.impact?.filter((i) => i !== impact) || [],
    });
  };

  const addResponsibility = () => {
    if (
      newResponsibility &&
      !newProject.responsibilities?.includes(newResponsibility)
    ) {
      setNewProject({
        ...newProject,
        responsibilities: [
          ...(newProject.responsibilities || []),
          newResponsibility,
        ],
      });
      setNewResponsibility("");
    }
  };

  const removeResponsibility = (responsibility: string) => {
    setNewProject({
      ...newProject,
      responsibilities:
        newProject.responsibilities?.filter((r) => r !== responsibility) || [],
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="py-24 px-4 md:px-10 lg:px-[120px] bg-gradient-to-b from-transparent to-black/[0.02]">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-[1px] w-12 bg-black" />
                    <span className="text-black/50 uppercase tracking-wider">
                      Admin
                    </span>
                  </div>

                  <h1
                    className="text-black mb-6 font-roboto-slab"
                    style={{ fontFamily: "var(--font-roboto-slab)" }}
                  >
                    Content Management
                  </h1>

                  <p className="text-black/70 max-w-2xl leading-relaxed">
                    Manage your articles, portfolio content, and site updates.
                    This is your personal CMS for keeping your portfolio fresh.
                  </p>
                </div>

                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50 hidden md:flex"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>

              {/* Mobile Logout Button */}
              <div className="md:hidden flex justify-end">
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="px-4 md:px-10 lg:px-[120px] pb-24">
        <div className="max-w-[1100px] mx-auto">
          <Tabs defaultValue="articles" className="w-full mt-8">
            <TabsList className="flex w-full bg-black/10 p-1 rounded-t-lg mb-8 relative space-evenly">
              <TabsTrigger
                value="articles"
                className="flex items-center gap-2 flex-1 data-[state=active]:bg-black data-[state=active]:text-white text-black/80 hover:bg-black hover:text-white focus:text-black transition-all duration-300 ease-out rounded-lg z-10 relative "
              >
                <FileText className="h-4 w-4" />
                Articles
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="flex items-center gap-2 flex-1 data-[state=active]:bg-black data-[state=active]:text-white text-black/80 hover:bg-black hover:text-white focus:text-black transition-all duration-300 ease-out rounded-lg z-10 relative"
              >
                <Briefcase className="h-4 w-4" />
                Projects
              </TabsTrigger>
            </TabsList>

            <TabsContent value="articles" className="mt-0 mb-8">
              <div className="space-y-6">
                {/* Articles List */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2
                      className="text-black font-roboto-slab"
                      style={{ fontFamily: "var(--font-roboto-slab)" }}
                    >
                      Articles
                    </h2>
                    <Button
                      onClick={() => {
                        setEditingArticle("new");
                        setShowArticleForm(true);
                        setNewArticle({
                          title: "",
                          excerpt: "",
                          content: "",
                          date: new Date().toISOString().split("T")[0],
                          readTime: "5 min read",
                          tags: [],
                          published: false,
                        });
                      }}
                      className="bg-black text-white hover:bg-black/90 transition-all duration-200"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Article
                    </Button>
                  </div>

                  {articles.map((article) => (
                    <div
                      key={article.id}
                      className="border border-black/10 rounded-lg p-6 hover:border-black/30 transition-all duration-300 mb-2"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-black font-medium">
                          {article.title}
                        </h3>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditArticle(article)}
                            size="sm"
                            variant="outline"
                            className="border-black/20 text-black hover:bg-black/5"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteArticle(article.id)}
                            size="sm"
                            variant="outline"
                            className="border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <p className="text-black/70 text-sm mb-3">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-black/60">
                        <span>{article.date}</span>
                        <span>{article.readTime}</span>
                        <Badge
                          variant={article.published ? "default" : "outline"}
                          className={
                            article.published
                              ? "bg-green-100 text-green-800"
                              : "border-black/20"
                          }
                        >
                          {article.published ? "Published" : "Draft"}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {article.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="border-black/20 text-black/70 text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Article Form Modal */}
                {showArticleForm && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="bg-white border border-black/10 rounded-lg p-8"
                  >
                    <h2
                      className="text-black mb-6 font-roboto-slab"
                      style={{ fontFamily: "var(--font-roboto-slab)" }}
                    >
                      {editingArticle === "new"
                        ? "New Article"
                        : "Edit Article"}
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <Label
                          htmlFor="title"
                          className="text-black mb-2 block"
                        >
                          Title *
                        </Label>
                        <Input
                          id="title"
                          value={newArticle.title || ""}
                          onChange={(e) =>
                            setNewArticle({
                              ...newArticle,
                              title: e.target.value,
                            })
                          }
                          className="border-black/20 focus:border-black"
                          placeholder="Article title"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="excerpt"
                          className="text-black mb-2 block"
                        >
                          Excerpt *
                        </Label>
                        <Textarea
                          id="excerpt"
                          value={newArticle.excerpt || ""}
                          onChange={(e) =>
                            setNewArticle({
                              ...newArticle,
                              excerpt: e.target.value,
                            })
                          }
                          className="border-black/20 focus:border-black resize-none"
                          rows={3}
                          placeholder="Brief description of the article"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="content"
                          className="text-black mb-2 block"
                        >
                          Content *
                        </Label>
                        <Textarea
                          id="content"
                          value={newArticle.content || ""}
                          onChange={(e) =>
                            setNewArticle({
                              ...newArticle,
                              content: e.target.value,
                            })
                          }
                          className="border-black/20 focus:border-black resize-none"
                          rows={8}
                          placeholder="Full article content (HTML supported)"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="date"
                            className="text-black mb-2 block"
                          >
                            Date
                          </Label>
                          <Input
                            id="date"
                            type="date"
                            value={newArticle.date || ""}
                            onChange={(e) =>
                              setNewArticle({
                                ...newArticle,
                                date: e.target.value,
                              })
                            }
                            className="border-black/20 focus:border-black"
                          />
                        </div>

                        <div>
                          <Label
                            htmlFor="readTime"
                            className="text-black mb-2 block"
                          >
                            Read Time
                          </Label>
                          <Input
                            id="readTime"
                            value={newArticle.readTime || ""}
                            onChange={(e) =>
                              setNewArticle({
                                ...newArticle,
                                readTime: e.target.value,
                              })
                            }
                            className="border-black/20 focus:border-black"
                            placeholder="5 min read"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-black mb-2 block">Tags</Label>
                        <div className="flex gap-2 mb-2">
                          <Input
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            className="border-black/20 focus:border-black"
                            placeholder="Add tag"
                            onKeyPress={(e) => e.key === "Enter" && addTag()}
                          />
                          <Button onClick={addTag} size="sm">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {newArticle.tags?.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="border-black/20 text-black/70 hover:bg-black/5 transition-colors"
                            >
                              {tag}
                              <button
                                onClick={() => removeTag(tag)}
                                className="ml-1 hover:text-red-500"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={newArticle.published || false}
                            onChange={(e) =>
                              setNewArticle({
                                ...newArticle,
                                published: e.target.checked,
                              })
                            }
                            className="border-black/20"
                          />
                          <span className="text-black">Published</span>
                        </label>
                      </div>

                      <div className="flex gap-4">
                        <Button
                          onClick={handleSaveArticle}
                          className="bg-black text-white hover:bg-black/90 transition-all duration-200"
                        >
                          <Save className="mr-2 h-4 w-4" />
                          {editingArticle ? "Update Article" : "Save Article"}
                        </Button>

                        {editingArticle && (
                          <Button
                            onClick={() => {
                              setEditingArticle(null);
                              setNewArticle({
                                title: "",
                                excerpt: "",
                                content: "",
                                date: new Date().toISOString().split("T")[0],
                                readTime: "5 min read",
                                tags: [],
                                published: false,
                              });
                            }}
                            variant="outline"
                            className="border-black/20 text-black hover:bg-black/5"
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="projects" className="mt-0 mb-8">
              <div className="space-y-6">
                {/* Projects List */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2
                      className="text-black font-roboto-slab"
                      style={{ fontFamily: "var(--font-roboto-slab)" }}
                    >
                      Projects
                    </h2>
                    <Button
                      onClick={() => {
                        setEditingProject("new");
                        setShowProjectForm(true);
                        setNewProject({
                          title: "",
                          role: "",
                          duration: "",
                          tech: [],
                          live_demo: "",
                          repo: "",
                          summary: "",
                          impact: [],
                          takeaway: "",
                          problem: "",
                          responsibilities: [],
                          approach: "",
                          whatIdDoDifferently: "",
                        });
                      }}
                      className="bg-black text-white hover:bg-black/90 transition-all duration-200"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Project
                    </Button>
                  </div>

                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="border border-black/10 rounded-lg p-6 hover:border-black/30 transition-all duration-300 mb-2"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-black font-medium">
                          {project.title}
                        </h3>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditProject(project)}
                            size="sm"
                            variant="outline"
                            className="border-black/20 text-black hover:bg-black/5"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDeleteProject(project.id)}
                            size="sm"
                            variant="outline"
                            className="border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <p className="text-black/70 text-sm mb-3">
                        {project.summary}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-black/60 mb-3">
                        <span>{project.role}</span>
                        <span>{project.duration}</span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="border-black/20 text-black/70 text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Project Form Modal */}
                {showProjectForm && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="bg-white border border-black/10 rounded-lg p-8"
                  >
                    <h2
                      className="text-black mb-6 font-roboto-slab"
                      style={{ fontFamily: "var(--font-roboto-slab)" }}
                    >
                      {editingProject === "new"
                        ? "New Project"
                        : "Edit Project"}
                    </h2>

                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="project-title"
                            className="text-black mb-2 block"
                          >
                            Title *
                          </Label>
                          <Input
                            id="project-title"
                            value={newProject.title || ""}
                            onChange={(e) =>
                              setNewProject({
                                ...newProject,
                                title: e.target.value,
                              })
                            }
                            className="border-black/20 focus:border-black"
                            placeholder="Project title"
                          />
                        </div>

                        <div>
                          <Label
                            htmlFor="role"
                            className="text-black mb-2 block"
                          >
                            Role *
                          </Label>
                          <Input
                            id="role"
                            value={newProject.role || ""}
                            onChange={(e) =>
                              setNewProject({
                                ...newProject,
                                role: e.target.value,
                              })
                            }
                            className="border-black/20 focus:border-black"
                            placeholder="Your role"
                          />
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="duration"
                          className="text-black mb-2 block"
                        >
                          Duration
                        </Label>
                        <Input
                          id="duration"
                          value={newProject.duration || ""}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              duration: e.target.value,
                            })
                          }
                          className="border-black/20 focus:border-black"
                          placeholder="Jan 2021 – Present"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="summary"
                          className="text-black mb-2 block"
                        >
                          Summary *
                        </Label>
                        <Textarea
                          id="summary"
                          value={newProject.summary || ""}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              summary: e.target.value,
                            })
                          }
                          className="border-black/20 focus:border-black resize-none"
                          rows={3}
                          placeholder="Brief project description"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="live-demo"
                            className="text-black mb-2 block"
                          >
                            Live Demo
                          </Label>
                          <Input
                            id="live-demo"
                            value={newProject.live_demo || ""}
                            onChange={(e) =>
                              setNewProject({
                                ...newProject,
                                live_demo: e.target.value,
                              })
                            }
                            className="border-black/20 focus:border-black"
                            placeholder="https://example.com"
                          />
                        </div>

                        <div>
                          <Label
                            htmlFor="repo"
                            className="text-black mb-2 block"
                          >
                            Repository
                          </Label>
                          <Input
                            id="repo"
                            value={newProject.repo || ""}
                            onChange={(e) =>
                              setNewProject({
                                ...newProject,
                                repo: e.target.value,
                              })
                            }
                            className="border-black/20 focus:border-black"
                            placeholder="https://github.com/username/repo"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-black mb-2 block">
                          Tech Stack
                        </Label>
                        <div className="flex gap-2 mb-2">
                          <Input
                            value={newTech}
                            onChange={(e) => setNewTech(e.target.value)}
                            className="border-black/20 focus:border-black"
                            placeholder="Add technology"
                            onKeyPress={(e) => e.key === "Enter" && addTech()}
                          />
                          <Button onClick={addTech} size="sm">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {newProject.tech?.map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="border-black/20 text-black/70 hover:bg-black/5 transition-colors"
                            >
                              {tech}
                              <button
                                onClick={() => removeTech(tech)}
                                className="ml-1 hover:text-red-500"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="problem"
                          className="text-black mb-2 block"
                        >
                          Problem
                        </Label>
                        <Textarea
                          id="problem"
                          value={newProject.problem || ""}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              problem: e.target.value,
                            })
                          }
                          className="border-black/20 focus:border-black resize-none"
                          rows={3}
                          placeholder="What problem did this project solve?"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="approach"
                          className="text-black mb-2 block"
                        >
                          Approach
                        </Label>
                        <Textarea
                          id="approach"
                          value={newProject.approach || ""}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              approach: e.target.value,
                            })
                          }
                          className="border-black/20 focus:border-black resize-none"
                          rows={3}
                          placeholder="How did you approach the solution?"
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="takeaway"
                          className="text-black mb-2 block"
                        >
                          Key Takeaway
                        </Label>
                        <Input
                          id="takeaway"
                          value={newProject.takeaway || ""}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              takeaway: e.target.value,
                            })
                          }
                          className="border-black/20 focus:border-black"
                          placeholder="What did you learn?"
                        />
                      </div>

                      <div>
                        <Label className="text-black mb-2 block">Impact</Label>
                        <div className="flex gap-2 mb-2">
                          <Input
                            value={newImpact}
                            onChange={(e) => setNewImpact(e.target.value)}
                            className="border-black/20 focus:border-black"
                            placeholder="Add impact statement"
                            onKeyPress={(e) => e.key === "Enter" && addImpact()}
                          />
                          <Button onClick={addImpact} size="sm">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {newProject.impact?.map((impact) => (
                            <Badge
                              key={impact}
                              variant="outline"
                              className="border-black/20 text-black/70 hover:bg-black/5 transition-colors"
                            >
                              {impact}
                              <button
                                onClick={() => removeImpact(impact)}
                                className="ml-1 hover:text-red-500"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-black mb-2 block">
                          Responsibilities
                        </Label>
                        <div className="flex gap-2 mb-2">
                          <Input
                            value={newResponsibility}
                            onChange={(e) =>
                              setNewResponsibility(e.target.value)
                            }
                            className="border-black/20 focus:border-black"
                            placeholder="Add responsibility"
                            onKeyPress={(e) =>
                              e.key === "Enter" && addResponsibility()
                            }
                          />
                          <Button onClick={addResponsibility} size="sm">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {newProject.responsibilities?.map(
                            (responsibility) => (
                              <Badge
                                key={responsibility}
                                variant="outline"
                                className="border-black/20 text-black/70 hover:bg-black/5 transition-colors"
                              >
                                {responsibility}
                                <button
                                  onClick={() =>
                                    removeResponsibility(responsibility)
                                  }
                                  className="ml-1 hover:text-red-500"
                                >
                                  ×
                                </button>
                              </Badge>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="what-different"
                          className="text-black mb-2 block"
                        >
                          What I'd Do Differently
                        </Label>
                        <Input
                          id="what-different"
                          value={newProject.whatIdDoDifferently || ""}
                          onChange={(e) =>
                            setNewProject({
                              ...newProject,
                              whatIdDoDifferently: e.target.value,
                            })
                          }
                          className="border-black/20 focus:border-black"
                          placeholder="What would you do differently?"
                        />
                      </div>

                      <div className="flex gap-4">
                        <Button
                          onClick={handleSaveProject}
                          className="bg-black text-white hover:bg-black/90 transition-all duration-200"
                        >
                          <Save className="mr-2 h-4 w-4" />
                          {editingProject ? "Update Project" : "Save Project"}
                        </Button>

                        {editingProject && (
                          <Button
                            onClick={() => {
                              setEditingProject(null);
                              setNewProject({
                                title: "",
                                role: "",
                                duration: "",
                                tech: [],
                                live_demo: "",
                                repo: "",
                                summary: "",
                                impact: [],
                                takeaway: "",
                                problem: "",
                                responsibilities: [],
                                approach: "",
                                whatIdDoDifferently: "",
                              });
                            }}
                            variant="outline"
                            className="border-black/20 text-black hover:bg-black/5"
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

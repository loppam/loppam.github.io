// Content service for managing articles and portfolio content
// This would integrate with Firebase in a real implementation

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
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

class ContentService {
  private articles: Article[] = [];
  private projects: Project[] = [];

  // Article methods
  async getArticles(): Promise<Article[]> {
    // In real implementation, this would fetch from Firebase
    return this.articles;
  }

  async getArticle(id: string): Promise<Article | null> {
    // In real implementation, this would fetch from Firebase
    return this.articles.find((article) => article.id === id) || null;
  }

  async saveArticle(article: Article): Promise<void> {
    // In real implementation, this would save to Firebase
    const existingIndex = this.articles.findIndex((a) => a.id === article.id);
    if (existingIndex >= 0) {
      this.articles[existingIndex] = {
        ...article,
        updatedAt: new Date().toISOString(),
      };
    } else {
      this.articles.push({
        ...article,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }

  async deleteArticle(id: string): Promise<void> {
    // In real implementation, this would delete from Firebase
    this.articles = this.articles.filter((article) => article.id !== id);
  }

  // Project methods
  async getProjects(): Promise<Project[]> {
    // In real implementation, this would fetch from Firebase
    return this.projects;
  }

  async saveProject(project: Project): Promise<void> {
    // In real implementation, this would save to Firebase
    const existingIndex = this.projects.findIndex((p) => p.id === project.id);
    if (existingIndex >= 0) {
      this.projects[existingIndex] = project;
    } else {
      this.projects.push(project);
    }
  }

  async deleteProject(id: string): Promise<void> {
    // In real implementation, this would delete from Firebase
    this.projects = this.projects.filter((project) => project.id !== id);
  }

  // Export/Import methods for backup
  async exportContent(): Promise<{ articles: Article[]; projects: Project[] }> {
    return {
      articles: this.articles,
      projects: this.projects,
    };
  }

  async importContent(content: {
    articles: Article[];
    projects: Project[];
  }): Promise<void> {
    this.articles = content.articles;
    this.projects = content.projects;
  }
}

export const contentService = new ContentService();

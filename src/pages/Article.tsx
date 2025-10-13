import { motion } from "motion/react";
import { ArrowLeft, Calendar, Clock, Tag, ExternalLink } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import React, { useState, useEffect } from "react";

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

export function Article() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  // Always call hooks at the top level
  useDocumentTitle(article ? `${article.title} - LOPAM` : "Article - LOPAM");

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        const foundArticle = data.articles.find((a: Article) => a.id === slug);
        setArticle(foundArticle || null);
        setLoading(false);
      } catch (error) {
        console.error("Error loading article:", error);
        setLoading(false);
      }
    };

    if (slug) {
      loadArticle();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black/70">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">
            Article Not Found
          </h1>
          <Link to="/writings">
            <Button>Back to Writings</Button>
          </Link>
        </div>
      </div>
    );
  }

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
            <div className="mb-8">
              <Link to="/writings">
                <Button
                  variant="outline"
                  className="mb-6 border-black/20 text-black hover:bg-black hover:text-white transition-all duration-200"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Writings
                </Button>
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <div className="h-[1px] w-12 bg-black" />
                <span className="text-black/50 uppercase tracking-wider">
                  Article
                </span>
              </div>

              <h1
                className="text-black mb-6 font-roboto-slab"
                style={{ fontFamily: "var(--font-roboto-slab)" }}
              >
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-black/60">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{article.date}</span>
                </div>

                <div className="flex items-center gap-2 text-black/60">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{article.readTime}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-black/20 text-black/70 hover:bg-black/5 transition-colors"
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 px-4 md:px-10 lg:px-[120px]">
        <div className="max-w-[800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
            style={{
              fontFamily: "var(--font-inter)",
              lineHeight: "1.7",
              color: "#333",
            }}
          />
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 md:px-10 lg:px-[120px] bg-black text-white">
        <div className="max-w-[1100px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2
              className="text-white mb-4 font-roboto-slab"
              style={{ fontFamily: "var(--font-roboto-slab)" }}
            >
              Want to discuss this article?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              I'm always interested in talking about anime, frontend development
              and sharing experiences.
            </p>
            <Link to="/#contact">
              <Button
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-black transition-all duration-200"
              >
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

import { motion } from "motion/react";
import { ArrowLeft, Calendar, Clock, Tag, ExternalLink } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import React from "react";

export function Writings() {
  useDocumentTitle("LOPAM Writings");

  const articles = [
    {
      id: "my-journey-as-lopam",
      title: "My Journey as LOPAM",
      excerpt:
        "From building Sneaklin to working at Nomba, here's my story as Pariola Ololade (LOPAM) - the challenges, wins, and lessons learned along the way.",
      date: "2024-01-15",
      readTime: "8 min read",
      tags: ["Personal", "LOPAM", "Journey"],
      published: true,
    },
    {
      id: "building-sneaklin-my-story",
      title: "Building Sneaklin: My E-commerce Journey",
      excerpt:
        "How I built and maintained Sneaklin from scratch - the real challenges, technical decisions, and what it taught me about being a developer.",
      date: "2024-01-08",
      readTime: "12 min read",
      tags: ["Sneaklin", "LOPAM", "E-commerce"],
      published: true,
    },
    {
      id: "nomba-internship-lopam",
      title: "My Nomba Internship: Learning Fintech UX",
      excerpt:
        "What I learned during my time at Nomba working on KYC workflows. How this experience shaped my understanding of fintech and user experience.",
      date: "2024-01-02",
      readTime: "10 min read",
      tags: ["Nomba", "LOPAM", "Fintech"],
      published: true,
    },
    {
      id: "unichow-wallet-lopam",
      title: "Building UniChow: My Payment Integration Story",
      excerpt:
        "How I integrated Paystack payments for UniChow and built a seamless wallet experience. The challenges of working with real money and user trust.",
      date: "2023-12-20",
      readTime: "15 min read",
      tags: ["UniChow", "LOPAM", "Payments"],
      published: true,
    },
    {
      id: "web3-experiments-lopam",
      title: "My Web3 Experiments: Learning Base",
      excerpt:
        "My journey into Web3 development and what I'm building on Base. The excitement, challenges, and what I'm learning about the future of the web.",
      date: "2023-12-10",
      readTime: "14 min read",
      tags: ["Web3", "LOPAM", "Base"],
      published: true,
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
            <div className="mb-8">
              <Link to="/">
                <Button
                  variant="outline"
                  className="mb-6 border-black/20 text-black hover:bg-black hover:text-white transition-all duration-200"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Portfolio
                </Button>
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <div className="h-[1px] w-12 bg-black" />
                <span className="text-black/50 uppercase tracking-wider">
                  Writings
                </span>
              </div>

              <h1
                className="text-black mb-6 font-roboto-slab"
                style={{ fontFamily: "var(--font-roboto-slab)" }}
              >
                Writing Out Loud
              </h1>

              <p className="text-black/70 max-w-2xl leading-relaxed">
                Thoughts & things happening in my life. 
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles List */}
      <section className="py-12 px-4 md:px-10 lg:px-[120px]">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group border border-black/10 hover:border-black/30 mb-2 p-8 rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h2
                      className="text-black mb-3 group-hover:text-black/80 transition-colors font-roboto-slab"
                      style={{ fontFamily: "var(--font-roboto-slab)" }}
                    >
                      {article.title}
                    </h2>

                    <p className="text-black/70 mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mb-4">
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

                  <div className="md:ml-6">
                    <Link to={`/writings/${article.id}`}>
                      <Button className="bg-black text-white hover:bg-black/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                        Read Article
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
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
              Want to discuss any of these topics?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              I'm always interested in talking about anime, frontend development, React
              patterns, and building better user experiences.
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

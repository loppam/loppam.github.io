import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import React from "react";

interface ProjectCardProps {
  id: string;
  title: string;
  summary: string;
  tech: string[];
  repo?: string;
  live_demo?: string | null;
  onClick: () => void;
}

export function ProjectCard({
  title,
  summary,
  tech,
  repo,
  live_demo,
  onClick,
}: ProjectCardProps) {
  return (
    <motion.div
      className="group cursor-pointer border-2 border-black/10 bg-white overflow-hidden hover:border-black transition-all duration-200 hover:shadow-xl"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
    >
      {/* Content */}
      <div className="p-6">
        <h3 className="text-black mb-3 group-hover:underline transition-all">
          {title}
        </h3>

        <p className="text-black/70 mb-5 leading-relaxed">{summary}</p>

        {/* Tech Stack */}
        <motion.div
          className="flex flex-wrap gap-2 mb-5"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {tech.map((item) => (
            <Badge
              key={item}
              variant="outline"
              className="border-black/20 text-black/70 bg-white hover:bg-black hover:text-white transition-colors"
            >
              {item}
            </Badge>
          ))}
        </motion.div>

        {/* Links */}
        <div className="flex gap-4 pt-3 border-t border-black/10">
          {typeof live_demo === "string" && live_demo.trim() && (
            <a
              href={live_demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-black hover:underline underline-offset-4 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          )}
          {typeof repo === "string" && repo.trim() && (
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-black hover:underline underline-offset-4 transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="mr-2 h-4 w-4" />
              View Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

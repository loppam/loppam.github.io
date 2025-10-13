import { motion } from "motion/react";
import { X, ExternalLink, Github, CheckCircle2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import React from "react";

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

interface ProjectCaseProps {
  project: Project;
  onClose: () => void;
}

export function ProjectCase({ project, onClose }: ProjectCaseProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white/98 backdrop-blur-md border-b border-black/10 z-10 shadow-sm">
        <div className="max-w-[1100px] mx-auto px-4 md:px-10 lg:px-[120px] py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-8 bg-black" />
              <span className="text-black/50 uppercase tracking-wider">
                Case Study
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-black/10 hover:rotate-90 transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-10 lg:px-[120px] py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Hero */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge variant="outline" className="border-black/20 text-black">
                {project.role}
              </Badge>
              <Badge
                variant="outline"
                className="border-black/20 text-black/60"
              >
                {project.duration}
              </Badge>
            </div>

            <h1 className="text-black mb-4">{project.title}</h1>
            <p className="text-black/70 max-w-3xl mb-8">{project.summary}</p>

            {/* Image */}
            <div className="w-full aspect-video overflow-hidden bg-black/5 border border-black/10 mb-8">
              <ImageWithFallback
                src=""
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4">
              {project.live_demo && (
                <Button
                  variant="default"
                  className="bg-black text-white hover:bg-black/90"
                  asChild
                >
                  <a
                    href={project.live_demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
              <Button
                variant="outline"
                className="border-black text-black hover:bg-black/5"
                asChild
              >
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            </div>
          </div>

          <Separator className="my-12 bg-black/10" />

          {/* Problem */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-12 bg-black" />
              <span className="text-black/50 uppercase tracking-wider">
                Challenge
              </span>
            </div>
            <h2 className="text-black mb-6">Problem</h2>
            <p className="text-black/70 max-w-3xl leading-relaxed">
              {project.problem}
            </p>
          </div>

          <Separator className="my-16 bg-black/10" />

          {/* Role & Responsibilities */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-12 bg-black" />
              <span className="text-black/50 uppercase tracking-wider">
                My Role
              </span>
            </div>
            <h2 className="text-black mb-6">Role & Responsibilities</h2>
            <ul className="space-y-3">
              {project.responsibilities.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-black/40 mt-1 flex-shrink-0" />
                  <span className="text-black/70 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator className="my-16 bg-black/10" />

          {/* Approach */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-12 bg-black" />
              <span className="text-black/50 uppercase tracking-wider">
                Solution
              </span>
            </div>
            <h2 className="text-black mb-6">Approach</h2>
            <p className="text-black/70 max-w-3xl whitespace-pre-line leading-relaxed">
              {project.approach}
            </p>
          </div>

          <Separator className="my-16 bg-black/10" />

          {/* Tech Stack */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-12 bg-black" />
              <span className="text-black/50 uppercase tracking-wider">
                Technologies
              </span>
            </div>
            <h2 className="text-black mb-6">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <Badge
                  key={item}
                  className="bg-black text-white hover:bg-black/90 px-4 py-2"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-16 bg-black/10" />

          {/* Outcome & Impact */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-12 bg-black" />
              <span className="text-black/50 uppercase tracking-wider">
                Results
              </span>
            </div>
            <h2 className="text-black mb-6">Outcome & Impact</h2>
            <div className="grid gap-4">
              {project.impact.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-black/5 to-transparent border-l-4 border-black pl-6 py-5"
                >
                  <p className="text-black/80 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-16 bg-black/10" />

          {/* Takeaway */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-12 bg-black" />
              <span className="text-black/50 uppercase tracking-wider">
                Reflection
              </span>
            </div>
            <h2 className="text-black mb-6">Key Takeaway</h2>
            <p className="text-black/70 max-w-3xl italic leading-relaxed">
              {project.takeaway}
            </p>
          </div>

          {/* What I'd Do Differently */}
          <div className="bg-black text-white p-8 shadow-lg">
            <h3 className="text-white mb-4">What I'd do differently now</h3>
            <p className="text-white/80 leading-relaxed">
              {project.whatIdDoDifferently}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

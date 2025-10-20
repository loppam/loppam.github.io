import { motion } from "motion/react";
import { ArrowDown, Download } from "lucide-react";
import { Button } from "./ui/button";
import React from "react";

export function Hero() {
  const scrollToWork = () => {
    const element = document.getElementById("work");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-10 lg:px-[120px] pt-16">
      <motion.div
        className="max-w-[1100px] w-full grid lg:grid-cols-2 gap-12 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Text Content */}
        <div className="space-y-6">
          <motion.div
            variants={itemVariants}
            className="mb-8"
            transition={{ ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="tracking-wide">
                Available for remote & contract work
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-black mb-6"
            transition={{ ease: [0.22, 1, 0.36, 1] }}
          >
            Pariola Ololade
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="mb-8"
            transition={{ ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-black/90 max-w-3xl mb-2">
              Frontend Engineer specializing in React, TypeScript & Web3
            </p>
            <p className="text-black/60 max-w-3xl">Based in Nigeria 🇳🇬</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-black/5 to-transparent border-l-4 border-black pl-6 py-5 mb-12 max-w-3xl"
            transition={{ ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-black/80">
              I build production React apps that prioritize usability and
              performance. I ship features end-to-end — from UX to APIs — for
              startups in fintech, SaaS, and Web3.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4"
            transition={{ ease: [0.22, 1, 0.36, 1] }}
          >
            <Button
              onClick={scrollToWork}
              size="lg"
              className="bg-black text-white hover:bg-black/90 transition-all duration-120 hover:scale-[1.03] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              See my work
              <ArrowDown className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-120 hover:scale-[1.03] active:scale-[0.98]"
              asChild
            >
              <a href="/OloladePariola.pdf" download="Ololade Pariola.pdf">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

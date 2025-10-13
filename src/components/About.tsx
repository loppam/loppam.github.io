import { motion } from 'motion/react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import React from 'react';

export function About() {
  const techStack = [
    'React',
    'TypeScript',
    'Firebase',
    'Paystack',
    'Web3 (Base)',
    'Git',
    'Figma',
    'REST APIs',
    'Tailwind CSS'
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-24 px-4 md:px-10 lg:px-[120px] bg-white">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-12 bg-black" />
              <span className="text-black/50 uppercase tracking-wider">Background</span>
            </div>
            <h2 className="text-black mb-6">About Pariola (LOPAM)</h2>
          </div>

          <div className="space-y-6 mb-12">
            <p className="text-black/80 max-w-3xl leading-relaxed">
              I'm Pariola Ayomikun Ololade (LOPAM). I build frontend-first product experiences using React and TypeScript, with production experience in fintech, SaaS, and Web3. I focus on performance, usability, and shipping features that matter.
            </p>

            <p className="text-black/80 max-w-3xl leading-relaxed">
              Currently building on projects like UniChow and Noctix. I enjoy designing small systems end-to-end — from wireframes to integration and deployment.
            </p>
          </div>

          <div className="mb-12 bg-black/5 p-8 border-l-4 border-black">
            <h3 className="text-black mb-5">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="border-black/30 text-black bg-white hover:bg-black hover:text-white transition-colors"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Web3 Experiments Section */}
          <div className="bg-gradient-to-br from-black to-black/90 text-white p-8 mb-12 shadow-xl">
            <h3 className="text-white mb-4">Web3 Experiments</h3>
            <p className="text-white/80 max-w-2xl mb-4 leading-relaxed">
              I'm exploring Web3 primitives and wallet UX — recent experiments include wallet-connect demos, Base signing flows, and token-gated UIs.{' '}
              <a
                href="https://github.com/loppam"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4 hover:text-white/70 transition-colors"
              >
                See experimental repos on GitHub
              </a>
              .
            </p>
          </div>

          <Button
            onClick={scrollToContact}
            className="bg-black text-white hover:bg-black/90 transition-all duration-120 hover:scale-[1.03] active:scale-[0.98]"
          >
            Work with me
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

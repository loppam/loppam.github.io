import { Separator } from './ui/separator';
import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 px-4 md:px-10 lg:px-[120px] bg-black text-white">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div>
            <div className="mb-2">LOPAM</div>
            <div className="text-white/60">
              Frontend Engineer
            </div>
          </div>
          
          <div className="flex gap-8">
            <a
              href="https://github.com/loppam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/pariola-ololade"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com/lopam_dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Twitter
            </a>
          </div>
        </div>
        
        <Separator className="mb-8 bg-white/20" />
        
        <div className="text-center text-white/50">
          © {currentYear} Pariola Ololade (LOPAM). All rights reserved.
        </div>
      </div>
    </footer>
  );
}

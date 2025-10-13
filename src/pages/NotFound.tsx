import { motion } from "motion/react";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import React from "react";

export function NotFound() {
  useDocumentTitle("404 - Page Not Found - LOPAM");
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* 404 Number */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <h1
            className="text-8xl md:text-9xl font-bold text-black/10 font-roboto-slab"
            style={{ fontFamily: "var(--font-roboto-slab)" }}
          >
            404
          </h1>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-black" />
            <span className="text-black/50 uppercase tracking-wider">
              Error
            </span>
          </div>

          <h2
            className="text-black mb-4 font-roboto-slab"
            style={{ fontFamily: "var(--font-roboto-slab)" }}
          >
            Page Not Found
          </h2>

          <p className="text-black/70 max-w-xl mx-auto leading-relaxed mb-8">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </p>

          {/* Actions */}
          <div className="flex sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/")}
              className="bg-black text-white hover:bg-black/90 transition-all duration-200 cursor-pointer">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>

            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="border-black/20 text-black hover:bg-black/5 cursor-pointer"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="border-t border-black/10 pt-8"
        >
          <p className="text-black/50 text-sm mb-4">
            Looking for something specific?
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/writings">
              <Button
                variant="outline"
                size="sm"
                className="border-black/20 text-black/70 hover:bg-black/5 cursor-pointer"
              >
                <Search className="mr-2 h-3 w-3" />
                Browse Writings
              </Button>
            </Link>

            <Link to="/#work">
              <Button
                variant="outline"
                size="sm"
                className="border-black/20 text-black/70 hover:bg-black/5 cursor-pointer"
              >
                <Search className="mr-2 h-3 w-3" />
                View Projects
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

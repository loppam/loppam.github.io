import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Nav } from "../components/Nav";
import { ToolField } from "../components/ToolField";
import { CaseStudy } from "./CaseStudy";
import { Home } from "./Home";
import { NotFound } from "./NotFound";
import { Writing } from "./Writing";

const Update = lazy(() =>
  import("./Update").then((module) => ({ default: module.Update }))
);

export default function Portfolio() {
  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <ToolField />
      <Nav />
      <div id="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/writings" element={<Writing />} />
          <Route path="/writings/:slug" element={<Writing />} />
          <Route
            path="/update"
            element={
              <Suspense fallback={<main className="shell writing-page">Loading.</main>}>
                <Update />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

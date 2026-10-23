import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Nav } from "./components/Nav";
import { CaseStudy } from "./pages/CaseStudy";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Writing } from "./pages/Writing";

const Update = lazy(() =>
  import("./pages/Update").then((module) => ({ default: module.Update }))
);

export default function App() {
  return (
    <BrowserRouter>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
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
    </BrowserRouter>
  );
}

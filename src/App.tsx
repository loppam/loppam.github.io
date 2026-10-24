import { lazy, Suspense, useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

const Meet = lazy(() => import("./pages/Meet").then((module) => ({ default: module.Meet })));
const Portfolio = lazy(() => import("./pages/Portfolio"));

function RouteScroll() {
  const { pathname, hash } = useLocation();
  useLayoutEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteScroll />
      <Suspense fallback={<main className="shell writing-page" role="status">Loading.</main>}>
        <Routes>
          <Route path="/meet" element={<Meet />} />
          <Route path="*" element={<Portfolio />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "@/App.tsx";
import ErrorNotFound from "@/pages/ErrorNotFound.tsx";

// Lazy load page components
const Home = lazy(() => import("@/pages/Home.tsx"));
const Gallery = lazy(() => import("@/pages/Gallery.tsx"));
const Letters = lazy(() => import("@/pages/Letters.tsx"));
const Playlist = lazy(() => import("@/pages/Playlist"));
const Pangarap = lazy(() => import("@/pages/Pangarap"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorNotFound />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/alaala",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Gallery />
          </Suspense>
        ),
      },
      {
        path: "/liham",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Letters />
          </Suspense>
        ),
      },
      {
        path: "/himig",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Playlist />
          </Suspense>
        ),
      },
      {
        path: "/pangarap",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Pangarap />
          </Suspense>
        ),
      },
    ],
  },
]);

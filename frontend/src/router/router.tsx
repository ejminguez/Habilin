import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "@/App.tsx";
import ErrorNotFound from "@/pages/ErrorNotFound.tsx";
import flower4 from "@/assets/pictures/flower-4-medium.webp";

// Lazy load page components
const Home = lazy(() => import("@/pages/Home.tsx"));
const Gallery = lazy(() => import("@/pages/Gallery.tsx"));
const Letters = lazy(() => import("@/pages/Letters.tsx"));
const Playlist = lazy(() => import("@/pages/Playlist"));
const Pangarap = lazy(() => import("@/pages/Pangarap"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <img src={flower4} width={80} height={80} className="animate-spin" />
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

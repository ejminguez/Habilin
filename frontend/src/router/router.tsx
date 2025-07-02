import { createBrowserRouter } from "react-router-dom";
import App from "@/App.tsx";
import Home from "@/pages/Home.tsx";
import ErrorNotFound from "@/pages/ErrorNotFound.tsx";
import Gallery from "@/pages/Gallery.tsx";
import Letters from "@/pages/Letters.tsx";
import Playlist from "@/pages/Playlist";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorNotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/alaala",
        element: <Gallery />,
      },
      {
        path: "/liham",
        element: <Letters />,
      },
      {
        path: "/himig",
        element: <Playlist />,
      },
    ],
  },
]);

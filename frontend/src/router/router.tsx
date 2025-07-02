import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import Home from "../pages/Home.tsx";
import ErrorNotFound from "../pages/ErrorNotFound.tsx";

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
    ],
  },
]);

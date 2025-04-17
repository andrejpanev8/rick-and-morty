import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import PaginationPage from "./pages/PaginationPage";
import Layout from "./components/Layout";
import InfiniteScrollPage from "./pages/InfiniteScrollPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/pagination",
        element: <PaginationPage />,
      },
      {
        path: "/scrolled",
        element: <InfiniteScrollPage />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}

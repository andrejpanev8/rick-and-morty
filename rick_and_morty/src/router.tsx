import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import PaginationPage from "./pages/PaginationPage";
import InfiniteScrollClientFilter from "./pages/InfiniteScrollClientFilter";
import InfiniteScrollApiFilter from "./pages/InfiniteScrollApiFilter";
import Layout from "./components/Layout";

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
        path: "/client-filter",
        element: <InfiniteScrollClientFilter />,
      },
      {
        path: "/api-filter",
        element: <InfiniteScrollApiFilter />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}

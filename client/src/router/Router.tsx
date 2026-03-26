import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import CreateFormPage from "../pages/HomePage/CreateFormPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/forms/new",
    element: <CreateFormPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;

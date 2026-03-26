import { createBrowserRouter, type RouteObject } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CreateFormPage from "../pages/CreateFormPage";
import FormFillPage from "../pages/FormFillPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/forms/new",
    element: <CreateFormPage />,
  },
  {
    path: "/forms/:id/fill",
    element: <FormFillPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;

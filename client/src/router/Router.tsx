import { createBrowserRouter, type RouteObject } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CreateFormPage from "../pages/CreateFormPage";
import FormFillPage from "../pages/FormFillPage";
import FormResponsesPage from "../pages/FormResponsesPage";

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
  {
    path: "/forms/:id/responses",
    element: <FormResponsesPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;

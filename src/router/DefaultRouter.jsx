import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from '../layouts/DefaultLayouts'
import About from "../pages/About";
import Contact from "../pages/Contact";
import Portfolio from "../pages/Portfolio";
import Resume from "../pages/Resume";
import NotFound from "../pages/NotFound";

const DefaultRouter = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <About /> },
      { path: "portfolio", element: <Portfolio /> },
      { path: "resume", element: <Resume /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);

export default DefaultRouter;

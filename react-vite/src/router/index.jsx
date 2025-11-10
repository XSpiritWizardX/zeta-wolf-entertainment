import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import LandingPage from "../components/LandingPage/LandingPage";
import ProductsPage from "../components/ProductsPage/ProductsPage";


// General pages

import BlankPage from "../components/BlankPage/BlankPage";




export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [

      // Auth
      { path: "login", element: <LoginFormPage /> },
      { path: "signup", element: <SignupFormPage /> },

      // Public pages
      { path: "/", element: <LandingPage /> },
      { path: "/products", element: <ProductsPage /> },

      { path: "coming-soon", element: <BlankPage /> },
      { path: "*", element: <BlankPage /> },
    ],
  },
]);

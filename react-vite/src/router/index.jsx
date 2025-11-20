import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import LandingPage from "../components/LandingPage/LandingPage";
import ProductsPage from "../components/ProductsPage/ProductsPage";
import CompanyPage from "../components/CompanyPage/CompanyPage";
import ContactPage from "../components/ContactPage/ContactPage";
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
      { path: "/services", element: <ProductsPage /> },
      { path: "/about", element: <CompanyPage /> },
      { path: "/contact", element: <ContactPage /> },

      { path: "coming-soon", element: <BlankPage /> },
      { path: "*", element: <BlankPage /> },
    ],
  },
]);

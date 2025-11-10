import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
// import CookieBanner from "../components/Compliance/CookieBanner/CookieBanner";
import ScrollToTop from "./ScrollToTop";
import WolfTransition from "../components/WolfTransition/WolfTransition";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        {/* <CookieBanner /> */}
        <Navigation />

        {/* 🔹 This ensures scroll resets on every route change */}
        <ScrollToTop />
        <WolfTransition /> {/* 🐺 Page transition animation */}

        {isLoaded && <Outlet />}
        <Modal />
        <Footer />
      </ModalProvider>
    </>
  );
}

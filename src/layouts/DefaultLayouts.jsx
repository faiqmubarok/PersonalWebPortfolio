import { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import images from "../images";
import { motion } from "framer-motion";

import Header from "../components/Header/Header";
import Profile from "../components/Profile/Profile";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import ScrollToTopButton from "../components/ScrollToTopButton";

const Layout = () => {
  const [theme] = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollableDivRef = useRef(null);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = "About | Web Profile Faiq Mubarok";
        break;
      case "/portfolio":
        document.title = "Portfolio | Web Profile Faiq Mubarok";
        break;
      case "/resume":
        document.title = "Resume | Web Profile Faiq Mubarok";
        break;
      case "/contact":
        document.title = "Contact | Web Profile Faiq Mubarok";
        break;
      default:
        document.title = "Web Profile Faiq Mubarok";
        break;
    }
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTo({
        top: 0,
        behavior: "smooth", // Tambahkan opsi behavior smooth
      });
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const motionVariants = {
    fromLeft: {
      initial: { x: "-50%", opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { duration: 1, ease: "easeOut" },
    },
    fromBottom: {
      initial: { y: "10%", opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.5, ease: "easeOut" },
    },
    fromTop: {
      initial: { y: "-50%", opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 1, ease: "easeOut", delay: 0.3 },
    },
    fromRight: {
      initial: { x: "50%", opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  function handleOpenSidebar() {
    setSidebarOpen(true);
  }

  function handleCloseSidebar() {
    setSidebarOpen(false);
  }

  return (
    <div
      ref={scrollableDivRef}
      className={`w-screen h-screen bg-fixed bg-cover bg-right md:bg-center overflow-y-auto no-scrollbar ${
        theme === "light" ? "bg-white" : "bg-black"
      }`}
      style={{
        backgroundImage: `url(${
          theme === "light" ? images.backgroundLight : images.backgroundDark
        })`,
      }}
    >
      <div className="flex flex-col w-full mx-auto max-w-screen-xl px-4 md:px-8 lg:px-16 py-12 gap-24 lg:gap-60">
        {/* --------- Header --------- */}
        <motion.header className="w-full" {...motionVariants.fromTop}>
          <Header onSidebarOpen={handleOpenSidebar} />
        </motion.header>

        <div className="flex flex-col lg:flex-row lg:justify-between w-full gap-8">
          {/* --------- Profile --------- */}
          <motion.section
            className="w-full lg:max-w-[350px] flex-1"
            {...(isMobile
              ? motionVariants.fromBottom
              : motionVariants.fromLeft)}
          >
            <Profile />
          </motion.section>

          {/* --------- Main Content --------- */}
          <motion.main
            className="w-full lg:max-w-[700px] lg:min-w-[420px] flex-1 h-fit"
            initial={motionVariants.fromBottom.initial}
            animate={motionVariants.fromBottom.animate}
            transition={{ duration: 1, ease: "easeOut" }} // Atur durasi khusus
          >
            <Outlet />
          </motion.main>

          {/* --------- Navigation --------- */}
          <motion.section
            className="w-full lg:max-w-[125px] shrink-0 hidden lg:block"
            {...motionVariants.fromRight}
          >
            <Navbar />
          </motion.section>
        </div>
      </div>
      <Sidebar sidebarOpen={sidebarOpen} onSidebarClose={handleCloseSidebar} />
      <ScrollToTopButton onScrollAbleDivRef={scrollableDivRef} />
    </div>
  );
};

export default Layout;

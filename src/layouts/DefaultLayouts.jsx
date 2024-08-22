import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import images from '../images';

import Header from '../components/Header/Header';
import Profile from '../components/Profile/Profile';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import ScrollToTopButton from '../components/ScrollToTopButton';

const Layout = () => {
  const [theme] = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollableDivRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        document.title = 'About | Web Profile Faiq Mubarok';
        break;
      case '/portfolio':
        document.title = 'Portfolio | Web Profile Faiq Mubarok';
        break;
      case '/resume' :
        document.title = 'Resume | Web Profile Faiq Mubarok';
        break;
      case '/contact':
        document.title = 'Contact | Web Profile Faiq Mubarok';
        break;
      default:
        document.title = 'Web Profile Faiq Mubarok';
        break;
    }
  }, [location.pathname]);

  function handleOpenSidebar() {
    setSidebarOpen(true);
  }

  function handleCloseSidebar() {
    setSidebarOpen(false);
  }

  return (
    <div
    ref={scrollableDivRef}
      className={`w-screen h-screen bg-fixed bg-cover bg-right md:bg-center overflow-y-auto ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
      style={{
        backgroundImage: `url(${theme === 'light' ? images.backgroundLight : images.backgroundDark})`,
      }}
    >
      <div  className="flex flex-col w-full mx-auto max-w-screen-xl px-4 md:px-8 lg:px-16 py-12 gap-24 lg:gap-60">
        {/* --------- Header --------- */}
        <header className="w-full">
          <Header onSidebarOpen={handleOpenSidebar} />
        </header>

        <div className='flex flex-col lg:flex-row lg:justify-between w-full gap-8'>
          {/* --------- Profile --------- */}
          <section className="w-full lg:max-w-[350px] flex-1">
            <Profile />
          </section>

          {/* --------- Main Content --------- */}
          <main className="w-full lg:max-w-[700px] lg:min-w-[420px] flex-1 h-fit">
            <Outlet />
          </main>

          {/* --------- Navigation --------- */}
          <section className="w-full lg:max-w-[125px] shrink-0 hidden lg:block">
            <Navbar />
          </section>
        </div>
      </div>
      <Sidebar sidebarOpen={sidebarOpen} onSidebarClose={handleCloseSidebar} />
      <ScrollToTopButton onScrollAbleDivRef={scrollableDivRef}/>
    </div>
  );
};

export default Layout;

import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import images from '../images';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Profile from '../components/Profile/Profile';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';

const Layout = () => {
  const [theme] = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <div
      className={`w-screen h-screen bg-fixed bg-cover bg-right md:bg-center overflow-y-auto ${theme === 'light' ? 'bg-white' : 'bg-black'}`}
      style={{
        backgroundImage: `url(${theme === 'light' ? images.backgroundLight : images.backgroundDark})`,
      }}
    >
      <div className="flex flex-col w-full mx-auto max-w-screen-xl px-4 md:px-8 lg:px-16 py-12 gap-24 lg:gap-60">
        {/* Header */}
        <header className="w-full">
          <Header setSidebarOpen={setSidebarOpen} />
        </header>

        <div className='flex flex-col lg:flex-row lg:justify-between w-full gap-8'>
          {/* Profile */}
          <section className="w-full lg:max-w-[350px] flex-1">
            <Profile />
          </section>

          {/* Main Content */}
          <main className="w-full lg:max-w-[700px] lg:min-w-[420px] flex-1 h-fit">
            <Outlet />
          </main>

          {/* Navigation */}
          <section className="w-full lg:max-w-[125px] shrink-0 hidden lg:block">
            <Navbar />
          </section>

        </div>
      </div>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </div>
  );
};

export default Layout;

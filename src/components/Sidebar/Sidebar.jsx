import PropTypes from 'prop-types';
import { BsPerson } from "react-icons/bs";
import { MdOutlineWorkOutline } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { RiContactsBook3Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import '../../css/style.css';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigation = [
    { name: 'About', link: '/', icon: <BsPerson className='w-6 h-6' /> },
    { name: 'Portfolio', link: '/portfolio', icon: <MdOutlineWorkOutline className='w-6 h-6' /> },
    { name: 'Resume', link: '/resume', icon: <TiDocumentText className='w-6 h-6' /> },
    { name: 'Contact', link: '/contact', icon: <RiContactsBook3Line className='w-6 h-6' /> },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { 
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setSidebarOpen]);

  return (
    <>
      <aside className={`fixed top-0 right-0 z-40 w-72 h-screen transition-transform duration-300 ease-in-out shadow-md ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col w-full h-full overflow-y-scroll bg-white dark:bg-black dark:bg-opacity-30 dark:backdrop-blur-lg px-3 py-9 md:px-6 gap-8 bg-opacity-30 backdrop-blur-lg">
          {/* Logo & Close Button */}
          <div className="flex justify-between items-center">
            <NavLink onClick={() => setSidebarOpen(false)} to="/" className='font-expletus-sans text-3xl font-extrabold shadow-sm underline text-start dinamic-gradient'>
              Faiqmubarok.
            </NavLink>
            <button onClick={() => setSidebarOpen(false)} className='text-black dark:text-white p-2 hover:bg-accentColor hover:text-white rounded-lg'><IoClose className='w-6 h-6' />
            </button>
          </div>
          {/* Logo & Close Button */}
          <ul className="flex flex-col gap-4">
            {navigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  onClick={() => setSidebarOpen(false)}
                  to={item.link}
                  className={({ isActive }) => 
                    `w-full flex gap-4 px-4 py-5 rounded-lg transition-all duration-300 ${
                      isActive ? 'bg-accentColor dark:bg-accentColor text-white' : ' text-secondary dark:text-darkSecondary hover:bg-accentColor dark:hover:bg-accentColor hover:text-white dark:hover:text-white'
                    }`
                  }
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-25 z-30" onClick={() => setSidebarOpen(false)}></div>
      )}
    </>
  );
};

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};

export default Sidebar;

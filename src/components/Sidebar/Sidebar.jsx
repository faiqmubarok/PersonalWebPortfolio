import PropTypes from 'prop-types';
import { BsPerson } from "react-icons/bs";
import { MdOutlineWorkOutline } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { RiContactsBook3Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import '../../css/style.css';

const Sidebar = ({ sidebarOpen, onSidebarClose }) => {
  const navigation = [
    { name: 'About', link: '/', icon: <BsPerson className='w-6 h-6' /> },
    { name: 'Portfolio', link: '/portfolio', icon: <MdOutlineWorkOutline className='w-6 h-6' /> },
    { name: 'Resume', link: '/resume', icon: <TiDocumentText className='w-6 h-6' /> },
    { name: 'Contact', link: '/contact', icon: <RiContactsBook3Line className='w-6 h-6' /> },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { 
        onSidebarClose();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [onSidebarClose]);

  return (
    <>
      <aside className={`fixed top-0 right-0 z-40 w-72 h-screen transition-transform duration-300 ease-in-out shadow-lg ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col w-full h-full overflow-y-scroll bg-white/10 dark:bg-black/10 backdrop-blur-md dark:backdrop-blur-md border border-white/20 dark:border-black/20 px-3 py-9 md:px-6 gap-8 ">
          {/* Logo & Close Button */}
          <div className="flex justify-between items-center">
            <NavLink 
            onClick={() => onSidebarClose()} 
            to="/" 
            className='font-expletus-sans text-3xl font-extrabold shadow-sm underline text-start dinamic-gradient'>
              Faiqmubarok.
            </NavLink>
            <button 
            onClick={() => onSidebarClose()} 
            className='text-black dark:text-white p-2 hover:bg-accentColor hover:text-white rounded-full group'><IoClose className='w-6 h-6 group-hover:rotate-90 transition-all duration-200 ease-in-out' />
            </button>
          </div>
          {/* Logo & Close Button */}
          <ul className="flex flex-col gap-4">
            {navigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  onClick={() => onSidebarClose()}
                  to={item.link}
                  className={({ isActive }) => 
                    `w-full flex gap-4 px-4 py-5 rounded-lg transition-colors duration-200 ease-in-out ${isActive ? 'bg-accentColor dark:bg-accentColor text-white' : 'text-secondary dark:text-darkSecondary hover:bg-accentColor dark:hover:bg-accentColor hover:text-white dark:hover:text-white'
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
        <div className="fixed inset-0 bg-black opacity-25 z-30" onClick={() => onSidebarClose()}></div>
      )}
    </>
  );
};

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  onSidebarClose: PropTypes.func.isRequired,
};

export default Sidebar;

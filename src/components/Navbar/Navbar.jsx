import { BsPerson } from "react-icons/bs";
import { MdOutlineWorkOutline } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { RiContactsBook3Line } from "react-icons/ri";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navigation = [
    { name: 'About', link: '/', icon: <BsPerson className='w-6 h-6' /> },
    { name: 'Portfolio', link: '/portfolio', icon: <MdOutlineWorkOutline className='w-6 h-6' /> },
    { name: 'Resume', link: '/resume', icon: <TiDocumentText className='w-6 h-6' /> },
    { name: 'Contact', link: '/contact', icon: <RiContactsBook3Line className='w-6 h-6' /> },
  ];

  return (
    <ul className="flex flex-col gap-5 rounded-xl bg-white dark:bg-black shadow-lg p-5 transition-all duration-300 lg:sticky top-3">
      {navigation.map((item) => (
        <li key={item.name}>
          <NavLink
            to={item.link}
            className={({ isActive }) => 
              `flex flex-col gap-1.5 px-5 py-4 rounded-lg justify-center items-center font-medium text-sm font-poppins group ${
                isActive ? 'bg-accentColor dark:bg-accentColor text-white' : 'bg-lightPrimary dark:bg-[#1B1A17] text-black dark:text-darkSecondary hover:bg-accentColor dark:hover:bg-accentColor hover:text-white dark:hover:text-white'
              }`
            }
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;

import PropTypes from 'prop-types';
import ButtonDarkMode from './ButtonDarkMode.jsx';
import ButtonSidebar from './ButtonSidebar';
import { NavLink } from 'react-router-dom';
import '../../css/style.css';


const Header = ({ onSidebarOpen }) => {
  return (
    <div className="w-full flex justify-between items-center">
      {/* Logo */}
      <NavLink to="/" className='font-expletus-sans text-3xl font-extrabold shadow-sm underline text-start dinamic-gradient'>
        Faiqmubarok.
      </NavLink>

      {/* Button Group */}
      <div className="flex gap-4">
        <ButtonDarkMode />
        <ButtonSidebar onSidebarOpen={onSidebarOpen} />
      </div>
    </div>
  );
};

Header.propTypes = {
  onSidebarOpen: PropTypes.func.isRequired,
};

export default Header;

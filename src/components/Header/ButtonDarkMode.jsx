import { useTheme } from "../../context/ThemeContext";

const ButtonDarkMode = () => {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className='rounded-full p-4 bg-white dark:bg-black group hover:bg-accentColor dark:hover:bg-accentColor shadow-md'
    >
      {/* dark-icon */}
      <svg className='block dark:hidden text-[#44556C] group-hover:text-white' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.073 20C7.27441 20 4.89591 19.022 2.93755 17.0661C0.979182 15.1102 0 12.7347 0 9.93964C0 7.39185 0.831025 5.18276 2.49307 3.31237C4.15513 1.44199 6.21338 0.33786 8.66784 0C8.73584 0 8.80257 0.00251514 8.86804 0.00754532C8.93352 0.0125755 8.99773 0.0197012 9.06069 0.0289232C8.63594 0.620808 8.29976 1.27892 8.05213 2.00327C7.8045 2.72762 7.68069 3.48675 7.68069 4.28068C7.68069 6.5166 8.46386 8.41675 10.0302 9.98114C11.5966 11.5455 13.4995 12.3281 15.7391 12.329C16.5374 12.329 17.2983 12.2053 18.0219 11.958C18.7455 11.7107 19.3952 11.3749 19.971 10.9507C19.9811 11.0136 19.9882 11.0777 19.9924 11.1431C19.9966 11.2085 19.9992 11.2752 20 11.3431C19.6777 13.7936 18.5801 15.8488 16.7074 17.5088C14.8346 19.1688 12.624 19.9992 10.073 20Z" fill="currentColor"/>
      </svg>
      {/* light-icon */}
      <svg className='hidden dark:block text-white group-hover:text-white' width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 15.4444C13.4546 15.4444 15.4444 13.4546 15.4444 11C15.4444 8.54539 13.4546 6.55554 11 6.55554C8.54539 6.55554 6.55554 8.54539 6.55554 11C6.55554 13.4546 8.54539 15.4444 11 15.4444Z" stroke="currentColor" strokeWidth="1.66667" strokeLinejoin="round"/>
        <path d="M19.8889 11H21M1 11H2.11111M11 19.8889V21M11 1V2.11111M17.2856 17.2856L18.0711 18.0711M3.92889 3.92889L4.71444 4.71444M4.71444 17.2856L3.92889 18.0711M18.0711 3.92889L17.2856 4.71444" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round"/>
      </svg>
    </button>
  );
};

export default ButtonDarkMode;

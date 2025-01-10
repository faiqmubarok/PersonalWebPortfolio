import PropTypes from "prop-types";

const PublicSkill = ({ item, index, hoveredItem, setHoveredItem }) => {
  return (
    <li
      key={index}
      onMouseEnter={() => setHoveredItem(item.name)}
      onMouseLeave={() => setHoveredItem(null)}
      className={`flex items-center flex-col md:flex-row gap-3 px-5 py-5 md:py-3 text-black dark:text-white rounded-lg text-sm h-32 justify-center md:justify-start md:h-16 font-poppins hover:cursor-pointer shadow-md font-medium text-center md:text-start backdrop-blur-md group dark:bg-transparent outline outline-white dark:outline-[#353535] 
                  ${
                    index % 12 === 0 ||
                    index % 12 === 3 ||
                    index % 12 === 4 ||
                    index % 12 === 7 ||
                    index % 12 === 8
                      ? "bg-[#e4f7fa]/70"
                      : "bg-[#FFF3F4]/70"
                  }
                `}
    >
      <img
        loading="lazy"
        src={`${import.meta.env.VITE_BACKEND_URL}/${item.icon}`}
        alt={item.name}
        className="w-8 h-8"
      />
      <div>
        <span className="group-hover:text-xs transition-transform duration-300 ease-in-out text-black dark:text-white">
          {item.name}
        </span>
        <span
          className={`${
            hoveredItem === item.name ? "block" : "hidden"
          } text-xs font-light capitalize text-lightSecondary dark:text-darkSecondary`}
        >
          {item.level}
        </span>
      </div>
    </li>
  );
};

PublicSkill.propTypes = {
  item: PropTypes.object,
  index: PropTypes.number,
  hoveredItem: PropTypes.string,
  setHoveredItem: PropTypes.func,
};

export default PublicSkill;

import propTypes from "prop-types";
const PublicExperience = ({ index, item }) => {
  return (
    <li
      key={index}
      className={`flex flex-col gap-4 p-3 rounded-lg font-poppins justify-evenly items-start py-4 dark:bg-transparent outline outline-1  dark:text-darkSecondary outline-white dark:outline-[#353535]  ${
        index % 2 === 0 ? "bg-[#FFF3F4] " : "bg-[#e4f7fa]/70"
      }`}
    >
      <p className="text-xs">{`${item?.startMonth.slice(0, 3)} ${
        item?.startYear
      } ${
        item?.endMonth === item?.startMonth && item?.endYear === item?.startYear
          ? ""
          : `-  ${
              item?.endMonth && item?.endYear === "Now"
                ? "Now"
                : `${item?.endMonth.slice(0, 3)} ${item?.endYear}`
            }`
      }`}</p>
      <h4 className="font-medium text-base dark:text-white">{item.company}</h4>
      <p className="text-sm">{item.role}</p>
    </li>
  );
};

PublicExperience.propTypes = {
  index: propTypes.number.isRequired,
  item: propTypes.object.isRequired,
};

export default PublicExperience;

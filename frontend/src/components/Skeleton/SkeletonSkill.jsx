import { Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { MdImage } from "react-icons/md";

const SkeletonSkill = ({ index }) => {
  return (
    <li
      key={index}
      className={`flex items-center flex-col md:flex-row gap-3 px-5 py-5 md:py-3 text-black dark:text-white rounded-lg text-sm h-32 justify-center md:justify-start md:h-16 font-poppins shadow-md font-medium text-center md:text-start backdrop-blur-md group dark:bg-transparent outline animate-pulse outline-white dark:outline-[#353535] 
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
      <MdImage className="w-8 h-8 text-lightSecondary/50 dark:text-darkSecondary/50" />
      <div>
        <Typography
          as="div"
          variant="paragraph"
          className=" h-1 w-20 rounded-full bg-lightSecondary/20 dark:bg-darkSecondary/50 mb-2"
        >
          &nbsp;
        </Typography>
        <Typography
          as="div"
          variant="paragraph"
          className=" h-1 w-12 rounded-full bg-lightSecondary/20 dark:bg-darkSecondary/50"
        >
          &nbsp;
        </Typography>
      </div>
    </li>
  );
};

SkeletonSkill.propTypes = {
  index: PropTypes.number,
};

export default SkeletonSkill;

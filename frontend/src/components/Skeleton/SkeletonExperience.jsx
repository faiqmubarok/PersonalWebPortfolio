import { Typography } from "@material-tailwind/react";
import propTypes from "prop-types";

const SkeletonResume = ({ index }) => {
  return (
    <li
      className={`flex flex-col gap-8 p-3 rounded-lg font-poppins justify-evenly items-start py-4 dark:bg-transparent outline outline-1  outline-white dark:outline-[#353535] animate-pulse  ${
        index % 2 == 0 ? "bg-[#e4f7fa]/70 " : "bg-[#FFF3F4]"
      }`}
    >
      <Typography
        as="div"
        variant="paragraph"
        className=" h-1.5 w-32 rounded-full bg-lightSecondary/20 dark:bg-darkSecondary/50"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="h1"
        className=" h-2 w-40 rounded-full bg-lightSecondary/20 dark:bg-darkSecondary/50"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className=" h-2 w-28 rounded-full bg-lightSecondary/20 dark:bg-darkSecondary/50"
      >
        &nbsp;
      </Typography>
    </li>
  );
};

SkeletonResume.propTypes = {
  index: propTypes.number,
};

export default SkeletonResume;

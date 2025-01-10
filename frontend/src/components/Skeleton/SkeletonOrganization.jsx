import { Typography } from "@material-tailwind/react";
import propTypes from "prop-types";

const SkeletonOrganization = ({ index }) => {
  return (
    <tr className="bg-transparent border-b border-[#e3e3e3] dark:border-[#353535] text-sm animate-pulse">
      <td className="px-6 py-4  whitespace-nowrap ">
        <Typography
          as="div"
          variant="paragraph"
          className={`h-1.5 ${
            index % 2 === 0 ? "w-40" : "w-32"
          } rounded-full bg-lightSecondary/20 dark:bg-darkSecondary/50`}
        >
          &nbsp;
        </Typography>
      </td>
      <td className="px-6 py-4  whitespace-nowrap  ">
        <Typography
          as="div"
          variant="paragraph"
          className={`h-1.5 ${
            index % 2 === 0 ? "w-40" : "w-32"
          } rounded-full bg-lightSecondary/20 dark:bg-darkSecondary/50`}
        >
          &nbsp;
        </Typography>
      </td>
      <td className="px-6 py-4  whitespace-nowrap ">
        <Typography
          as="div"
          variant="paragraph"
          className={`h-1.5 ${
            index % 2 === 0 ? "w-40" : "w-32"
          } rounded-full bg-lightSecondary/20 dark:bg-darkSecondary/50`}
        >
          &nbsp;
        </Typography>
      </td>
    </tr>
  );
};

SkeletonOrganization.propTypes = {
  index: propTypes.number,
};

export default SkeletonOrganization;

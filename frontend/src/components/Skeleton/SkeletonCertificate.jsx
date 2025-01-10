import { MdImage } from "react-icons/md";
import { Typography } from "@material-tailwind/react";

const SkeletonCertificate = () => {
  return (
    <div className="lg:border-none border-b border-lightSecondary dark:border-darkSecondary py-3 animate-pulse">
      <div className="grid h-40 w-full place-items-center bg-lightPrimary dark:bg-darkPrimary rounded-md mb-2">
        <MdImage className="w-7 h-7 text-lightSecondary/50 dark:text-darkSecondary/50" />
      </div>
      <Typography
        as="div"
        variant="paragraph"
        className="h-2 rounded-full w-32 mx-auto bg-lightPrimary dark:bg-darkSecondary/50 mb-1"
      >
        &nbsp;
      </Typography>
      <div className="flex items-center justify-center w-full gap-2">
        <Typography
          as="div"
          variant="paragraph"
          className="h-1.5 rounded-full w-12 bg-lightPrimary dark:bg-darkSecondary/50 inline"
        >
          &nbsp;
        </Typography>
        <span className="text-lightPrimary dark:text-darkSecondary">•</span>
        <Typography
          as="div"
          variant="paragraph"
          className="h-1.5 rounded-full w-12 bg-lightPrimary dark:bg-darkSecondary/50 inline"
        >
          &nbsp;
        </Typography>
      </div>
    </div>
  );
};

export default SkeletonCertificate;

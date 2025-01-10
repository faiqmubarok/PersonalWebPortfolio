import { MdImage } from "react-icons/md";
const SkeletonCertificate2 = () => {
  return (
    <div className="grid w-[90vw] aspect-video max-w-xl animate-pulse place-items-center rounded-lg bg-gray-300">
      <MdImage className="w-14 h-14 text-lightSecondary/50 dark:text-darkSecondary/50" />
    </div>
  );
};

export default SkeletonCertificate2;

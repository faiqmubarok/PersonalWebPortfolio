import { FaHeart } from "react-icons/fa";
import { Typography } from "@material-tailwind/react";
const AdminFooter = () => {
  const routes = [
    { name: "About Me", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Resume", path: "/resume" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography
          variant="small"
          className="font-normal text-inherit text-center md:text-left"
        >
          &copy; 2025, made with{" "}
          <FaHeart className="-mt-0.5 inline-block h-3.5 w-3.5 text-red-600" />{" "}
          by{" "}
          <a
            href="/"
            target="_blank"
            className="transition-colors hover:text-blue-500 font-bold"
          >
            Muhammad Faiq Mubarok
          </a>{" "}
          for a better web.
        </Typography>
        <ul className="flex items-center gap-4">
          {routes.map(({ name, path }) => (
            <li key={name}>
              <Typography
                as="a"
                href={path}
                target="_blank"
                variant="small"
                className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
              >
                {name}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default AdminFooter;

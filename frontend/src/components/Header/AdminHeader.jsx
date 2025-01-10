import {
  Navbar,
  Typography,
  Breadcrumbs,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { HiMenuAlt2 } from "react-icons/hi";
import Notification from "../Notification/Notification";
import { useState, useEffect } from "react";
import { useBreadcrumb } from "../../context/BreadcrumbContext";

const AdminHeader = ({ sidebarOpen, setSidebarOpen }) => {
  const [greeting, setGreeting] = useState("");
  const { breadcrumbs, currentTitle } = useBreadcrumb();

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 0 && hour < 12) {
      setGreeting("Good Morning!");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good Afternoon!");
    } else {
      setGreeting("Good Evening!");
    }
  }, []);

  return (
    <Navbar
      color={"white"}
      className={`rounded-xl transition-all sticky w-full top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"`}
      fullWidth
      blurred
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs className="bg-transparent p-0 transition-all mt-1">
            <Link to="/dashboard">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                Dashboard
              </Typography>
            </Link>

            {breadcrumbs.length > 0 &&
              breadcrumbs.map((breadcrumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return isLast ? (
                  <Typography
                    key={index}
                    variant="small"
                    color="blue-gray"
                    className="font-normal "
                  >
                    {breadcrumb.name}
                  </Typography>
                ) : (
                  <Link key={index} to={breadcrumb.path}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
                    >
                      {breadcrumb.name}
                    </Typography>
                  </Link>
                );
              })}
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {currentTitle}
          </Typography>
        </div>
        <div className="flex items-center gap-4 justify-between md:justify-end">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-start md:items-end order-2 md:order-1 ">
              <Typography className="text-sm font-medium" color="blue-gray">
                Hello Mr. Faiq 👋🏻
              </Typography>
              <span className="text-xs text-blue-gray-400">{greeting}</span>
            </div>
            <IconButton
              variant="outlined"
              color="blue-gray"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="xl:hidden order-1 md:order-2 border-blue-gray-100"
            >
              <HiMenuAlt2 className="w-5 h-5" />
            </IconButton>
          </div>
          <Notification />
        </div>
      </div>
    </Navbar>
  );
};

AdminHeader.propTypes = {
  sidebarOpen: propTypes.bool,
  setSidebarOpen: propTypes.func,
};

export default AdminHeader;

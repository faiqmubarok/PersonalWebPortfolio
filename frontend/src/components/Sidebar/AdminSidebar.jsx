import PropTypes from "prop-types";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAlert } from "../../context/AlertContext";
import { useAuth } from "../../context/AuthContext";
import { useLogout } from "../../api/auth";
import { Typography, IconButton, Button } from "@material-tailwind/react";
import ClickedOutside from "../ClickedOutside";
import { RiShutDownLine } from "react-icons/ri";
import Modal from "../Modal/Modal";
import { IoReturnDownBackOutline, IoHome } from "react-icons/io5";
import { GrContactInfo } from "react-icons/gr";
import { GoProjectRoadmap } from "react-icons/go";
import { BiTask } from "react-icons/bi";
import { TbMessage } from "react-icons/tb";

const routes = [
  {
    icon: <IoHome className="w-5 h-5" />,
    path: "/dashboard",
    name: "Dashboard",
  },
  {
    icon: <GrContactInfo className="w-5 h-5" />,
    path: "/general",
    name: "General",
  },
  {
    icon: <BiTask className="w-5 h-5" />,
    path: "/portfolio-admin",
    name: "Portfolio",
  },
  {
    icon: <GoProjectRoadmap className="w-5 h-5" />,
    path: "/resume-admin",
    name: "Resume",
  },
  {
    icon: <TbMessage className="w-5 h-5" />,
    path: "/messages",
    name: "Messages",
  },
];

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { showAlert } = useAlert();
  const { adminLoggedOut } = useAuth();
  const navigate = useNavigate();

  const { mutate } = useLogout({
    onSuccess: async (data) => {
      showAlert("success", data.message);
      await navigate("/", { replace: true });
      await adminLoggedOut();
    },
    onError: (error) => {
      showAlert("error", error.response?.data?.message || "Terjadi kesalahan");
      console.log(error);
    },
  });

  const handleOpen = () => setModalOpen(!modalOpen);

  return (
    <>
      <ClickedOutside onClick={() => setSidebarOpen(false)}>
        <div
          className={`fixed inset-0 z-50 my-4 xl:ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100 bg-white shadow-sm  ${
            !sidebarOpen ? "ml-0" : "ml-4"
          }  left-0 top-0  flex flex-col ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="relative">
            <Link
              to="/dashboard"
              className="py-6 block w-fit mx-auto px-4 text-center "
            >
              <Typography variant="h6" color="black">
                Portfolio Admin
              </Typography>
            </Link>

            <IconButton
              onClick={() => setSidebarOpen(false)}
              variant="text"
              className="!absolute top-4 right-4 xl:hidden"
            >
              <IoReturnDownBackOutline className="w-5 h-5" />
            </IconButton>
          </div>
          <div className="m-4">
            <ul className="flex flex-col gap-1.5">
              {routes.map((route, index) => (
                <li key={index}>
                  <NavLink to={route.path}>
                    {({ isActive }) => (
                      <Button
                        onClick={() => setSidebarOpen(false)}
                        variant={isActive ? "gradient" : "text"}
                        color={isActive ? "black" : "blue-gray"}
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                      >
                        {route.icon}
                        <Typography
                          color="inherit"
                          variant="h6"
                          className="font-medium capitalize"
                        >
                          {route.name}
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
            <hr className="my-4 text-blue-gray-900" />
            <Button
              variant="text"
              className="flex items-center gap-4 px-4"
              fullWidth
              onClick={() => {
                handleOpen();
                setSidebarOpen(false);
              }}
              color="blue-gray"
            >
              <RiShutDownLine className="w-5 h-5" />{" "}
              <Typography color="inherit" className="font-medium capitalize">
                Logout
              </Typography>
            </Button>
          </div>
        </div>
      </ClickedOutside>
      <Modal
        headerText="Logout"
        open={modalOpen}
        handleOpen={handleOpen}
        footer={
          <div className="flex justify-center space-x-4 w-full">
            <Button
              variant="outlined"
              color="red"
              onClick={handleOpen}
              className="w-32"
            >
              Cancel
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={() => {
                handleOpen();
                mutate();
              }}
              className="w-32"
            >
              Logout
            </Button>
          </div>
        }
      >
        <div className="space-y-2">
          <Typography variant="h6" color="blue-gray" className="text-center">
            Are you sure you want to logout?
          </Typography>
          <p className="text-center text-sm text-gray-600">
            You will be logged out of your account and returned to the login
            page.
          </p>
        </div>
      </Modal>
    </>
  );
};

AdminSidebar.propTypes = {
  sidebarOpen: PropTypes.bool,
  setSidebarOpen: PropTypes.func,
};

export default AdminSidebar;

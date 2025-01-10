import { Alert, Button } from "@material-tailwind/react";
import { BsInfoCircleFill } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { BsPatchCheck } from "react-icons/bs";
import propTypes from "prop-types";
import { IoIosClose } from "react-icons/io";

const AlertNotif = ({ type, message, onClose }) => {
  return (
    <Alert
      variant="gradient"
      className="fixed w-fit flex items-center text-sm right-1/2 translate-x-1/2 bottom-4 bg-opacity-50 lg:top-4 h-fit z-[99999]"
      icon={
        type === "success" ? (
          <BsPatchCheck className="w-5 h-5 text-green-500" />
        ) : type === "error" ? (
          <BiErrorCircle className="w-5 h-5 text-red-500" />
        ) : (
          <BsInfoCircleFill className="w-5 h-5" />
        )
      }
      action={
        <Button
          variant="text"
          color="white"
          size="sm"
          className="!absolute top-2.5 right-2.5 p-1.5"
          onClick={onClose}
        >
          <IoIosClose className="w-5 h-5"/>
        </Button>
      }
    >
      <span className="font-medium mr-20 w-full shrink-0 text-nowrap">{message}</span>
    </Alert>
  );
};

AlertNotif.propTypes = {
  type: propTypes.string,
  message: propTypes.string,
  onClose: propTypes.func,
};

export default AlertNotif;

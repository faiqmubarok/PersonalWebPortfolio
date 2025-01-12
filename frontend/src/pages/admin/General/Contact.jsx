import {
  Typography,
  Tooltip,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { IoPencil, IoLocation } from "react-icons/io5";
import { SlScreenSmartphone } from "react-icons/sl";
import { HiOutlineMailOpen } from "react-icons/hi";
import { LuCalendarDays } from "react-icons/lu";
import Modal from "../../../components/Modal/Modal";

const info = [
  {
    name: "phone",
    icon: <SlScreenSmartphone className="text-[#667BC6] w-6 h-6" />,
    value: "+62 821 1774 8606",
  },
  {
    name: "email",
    icon: <HiOutlineMailOpen className="text-[#50B498] w-6 h-6" />,
    value: "faiqmubarok@gmail.com",
  },
  {
    name: "location",
    icon: <IoLocation className="text-[#B692C2] w-6 h-6" />,
    value: "Purwokerto, Indonesia",
  },
  {
    name: "age",
    icon: <LuCalendarDays className="text-[#4F1787] w-6 h-6" />,
    value: "21 Years Old",
  },
];

const Contact = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6" color="blue-gray">
          Contact Info
        </Typography>
        <Tooltip content="Edit Contact Info" placement="top">
          <IconButton
            variant="text"
            size="sm"
            onClick={() => setModalOpen(true)}
          >
            <IoPencil className="text-blue-gray-500 w-4 h-4" />
          </IconButton>
        </Tooltip>
      </div>
      <ul className="flex flex-col gap-4">
        {info?.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-start gap-3 pb-2 py-3"
          >
            {/* Icon */}
            <Typography
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
              {item.icon}
            </Typography>
            {/* Value */}
            <div className="flex flex-col font-poppins">
              <Typography
                variant="small"
                className="font-medium capitalize text-blue-gray-500 text-xs"
              >
                {item.name}
              </Typography>
              <Typography
                variant="small"
                className="font-medium text-blue-gray-800"
              >
                {item.value}
              </Typography>
            </div>
          </li>
        ))}
      </ul>
      <Modal
        open={modalOpen}
        handleOpen={() => setModalOpen(!modalOpen)}
        headerText="Contact Info"
        footer={
          <Button
            // onClick={formik.handleSubmit}
            // loading={isLoading}
            className="w-full md:w-fit"
            variant="gradient"
            type="submit"
          >
            Update
          </Button>
        }
      ></Modal>
    </>
  );
};

export default Contact;

import { Button, IconButton, Typography } from "@material-tailwind/react";
import { IoIosClose } from "react-icons/io";
import { LuReply } from "react-icons/lu";
import { BsTrash } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import propTypes from "prop-types";
import useDate from "../../../hooks/useDate";

const DetailMessageHeader = ({
  selectedChat,
  setSelectedChat,
  handleToggleImportant,
  setModalOpen,
}) => {
  const { formatDate } = useDate();

  return (
    <>
      <div className="flex justify-betwen gap-2 md:justify-end w-full items-center mb-2">
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2 normal-case text-sm font-normal p-3"
        >
          <a
            href={`mailto:${selectedChat?.email}`}
            className="flex items-center gap-2"
          >
            <LuReply className="w-5 h-5" />
            Reply
          </a>
        </Button>
        <Button
          onClick={() => handleToggleImportant(selectedChat)}
          variant="text"
          color={selectedChat.isImportant ? "teal" : "blue-gray"}
          className="flex items-center gap-2 normal-case text-sm font-normal p-3"
        >
          <FaRegStar className="w-5 h-5" />
          Important
        </Button>
        <Button
          variant="text"
          onClick={() => setModalOpen(true)}
          color="blue-gray"
          className="flex items-center gap-2 normal-case text-sm font-normal p-3"
        >
          <BsTrash className="w-5 h-5" />
          Delete
        </Button>
        <IconButton
          variant="text"
          className="md:hidden text-red-500 font-bold"
          onClick={() => setSelectedChat(null)}
        >
          <IoIosClose className="w-6 h-6" />
        </IconButton>
      </div>
      <div className="flex justify-between items-center pb-4 border-b border-blue-gray-50">
        <div className="">
          <Typography variant="h6">{selectedChat?.name}</Typography>
          <p className="text-sm text-gray-500">{selectedChat?.email}</p>
        </div>
        <p className="text-sm text-gray-500">
          {formatDate(selectedChat?.createdAt)}
        </p>
      </div>
    </>
  );
};

DetailMessageHeader.propTypes = {
  selectedChat: propTypes.object,
  setSelectedChat: propTypes.func,
  handleToggleImportant: propTypes.func,
  setModalOpen: propTypes.func,
};

export default DetailMessageHeader;

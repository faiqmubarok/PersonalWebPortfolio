import { Button, Badge } from "@material-tailwind/react";
import propTypes from "prop-types";
import useDate from "../../hooks/useDate";

const ListMessage = ({ chat, selectedChat, handleSelectChat }) => {
  const { formatDate } = useDate();
  return (
    <li>
      <Button
        onClick={() => handleSelectChat(chat)}
        className={`text-start border border-blue-gray-100 py-5 px-4 hover:bg-blue-gray-50 ring-0 focus:outline-none focus:ring-0 normal-case flex ${
          selectedChat?._id === chat?._id ? "bg-blue-gray-50" : "bg-white"
        }`}
        fullWidth
        variant="outlined"
      >
        <div className="flex flex-col items-center gap-1 mt-2.5">
          {!chat?.isRead && (
            <Badge
              color="green"
              invisible={chat?.isRead}
              className="w-0.5 h-0.5 rounded-full inline-block"
            >
              {" "}
              <span className="sr-only">Unread message</span>
            </Badge>
          )}
          {chat?.isImportant && (
            <Badge
              color="teal"
              invisible={!chat?.isImportant}
              className="w-0.5 h-0.5 rounded-full inline-block"
            >
              {" "}
              <span className="sr-only">Important message</span>
            </Badge>
          )}
        </div>
        <div className="ml-4 w-full">
          <div className="flex justify-between items-center mb-2">
            <p className="text-black text-sm font-medium line-clamp-1">
              {chat?.name}
            </p>
            <span className="text-gray-500 text-xs font-light line-clamp-1">
              {formatDate(chat?.createdAt)}
            </span>
          </div>
          <p className="text-gray-500 text-sm font-light line-clamp-2">
            {chat?.message}
          </p>
        </div>
      </Button>
    </li>
  );
};

ListMessage.propTypes = {
  chat: propTypes.object,
  selectedChat: propTypes.object,
  handleSelectChat: propTypes.func,
};

export default ListMessage;

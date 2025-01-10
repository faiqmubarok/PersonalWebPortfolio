import {
  Menu,
  MenuHandler,
  MenuList,
  IconButton,
} from "@material-tailwind/react";
import { MdNotifications } from "react-icons/md";
import { useState } from "react";

const Notification = () => {
  const [open, setOpen] = useState(true);
  return (
    <Menu>
      <MenuHandler>
        <div className="relative inline-flex">
          <IconButton 
            onClick={() => setOpen(false)}
            className="border-blue-gray-100"
            color="blue-gray"
            variant="outlined"
          >
            <MdNotifications className="w-5 h-5" />
          </IconButton>
          <span
            className={`absolute top-0.5 right-0.5 ${
              open ? "grid" : "hidden"
            } min-h-[12px] min-w-[12px] translate-x-2/4 -translate-y-2/4 place-items-center rounded-full bg-red-500 py-1 px-1 text-xs font-medium leading-none text-white content-['']`}
          ></span>
        </div>
      </MenuHandler>
      <MenuList>
        
      </MenuList>
    </Menu>
  );
};

export default Notification;

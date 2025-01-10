import {
  Dialog,
  DialogHeader,
  Typography,
  IconButton,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { IoIosClose } from "react-icons/io";

import propTypes from "prop-types";
const Modal = ({ headerText, open, handleOpen, children, footer }) => {
  return (
    <Dialog size="md" open={open} handler={handleOpen} className="p-4">
      <DialogHeader className="relative m-0 block">
        <Typography className="leading-8 mr-10" variant="h5" color="blue-gray">
          {headerText}
        </Typography>
        <IconButton
          size="sm"
          variant="text"
          className="!absolute right-3.5 top-3.5"
          onClick={handleOpen}
        >
          <IoIosClose className="w-5 h-5" />
        </IconButton>
      </DialogHeader>
      <DialogBody>{children}</DialogBody>
      <DialogFooter>{footer}</DialogFooter>
    </Dialog>
  );
};

Modal.propTypes = {
  open: propTypes.bool,
  handleOpen: propTypes.func,
  headerText: propTypes.string,
  children: propTypes.node,
  footer: propTypes.node,
};

export default Modal;

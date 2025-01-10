import { createContext, useState, useContext } from "react";
import { Typography, Button } from "@material-tailwind/react";
import Modal from "../components/Modal/Modal";
import PropTypes from "prop-types";

const ConfirmDeleteContext = createContext();

export const ConfirmDeleteProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [resolveCallback, setResolveCallback] = useState(null);

  const askConfirm = (message) => {
    setContent(message);
    setIsOpen(true);
    return new Promise((resolve) => {
      setResolveCallback(() => resolve);
    });
  };

  const handleConfirm = () => {
    setIsOpen(false);
    if (resolveCallback) resolveCallback(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (resolveCallback) resolveCallback(false);
  };

  return (
    <ConfirmDeleteContext.Provider value={askConfirm}>
      {children}
      <Modal
        headerText={"Confirm Delete"}
        open={isOpen}
        handleOpen={() => setIsOpen((prev) => !prev)}
        footer={
          <div className="flex space-x-4 w-full justify-center">
            <Button
              variant="outlined"
              color="red"
              onClick={handleCancel}
              className="w-32"
            >
              Cancel
            </Button>
            <Button
              variant="gradient"
              type="submit"
              color="green"
              onClick={handleConfirm}
              className="w-32 flex items-center justify-center gap-3 focus:ring-0 normal-case py-2.5 font-medium text-sm"
            >
              Delete
            </Button>
          </div>
        }
      >
        <div className="space-y-2">
          <p className="text-center text-gray-600">
            Are you sure you want to delete the following items?
          </p>
          <Typography
            variant="h6"
            color="blue-gray"
            className="text-center text-black font-semibold"
          >
            {content}
          </Typography>
          <p className="text-center text-gray-600">
            This action cannot be undone
          </p>
        </div>
      </Modal>
    </ConfirmDeleteContext.Provider>
  );
};

ConfirmDeleteProvider.propTypes = {
  children: PropTypes.node,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDelete = () => {
  const askConfirm = useContext(ConfirmDeleteContext);
  if (!askConfirm) {
    throw new Error("useDelete must be used within a ConfirmDeleteProvider");
  }
  return askConfirm;
};

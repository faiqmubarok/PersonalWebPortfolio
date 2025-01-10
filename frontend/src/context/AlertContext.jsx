import { createContext, useContext, useState } from "react";
import AlertNotif from "../components/Alert/AlertNotif";
import propTypes from "prop-types";

const AlertContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    type: "",
    message: "",
    isVisible: false,
  });

  const showAlert = (type, message) => {
    setAlert({ type, message, isVisible: true });

    if (type === "error") {
      setTimeout(() => {
        setAlert((prevAlert) => ({ ...prevAlert, isVisible: false }));
      }, 6000);
    } else {
      setTimeout(() => {
        setAlert((prevAlert) => ({ ...prevAlert, isVisible: false }));
      }, 4000);
    }
  };

  const closeAlert = () =>
    setAlert((prevAlert) => ({ ...prevAlert, isVisible: false }));

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert.isVisible && (
        <AlertNotif
          type={alert.type}
          onClose={closeAlert}
          message={alert.message}
        />
      )}
    </AlertContext.Provider>
  );
};

AlertProvider.propTypes = {
  children: propTypes.node,
};

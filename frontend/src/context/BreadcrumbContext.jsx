import { useState, useContext, createContext } from "react";
import propTypes from "prop-types";

const BreadcrumbContext = createContext();

export const BreadcrumbProvider = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");

  return (
    <BreadcrumbContext.Provider
      value={{
        breadcrumbs,
        setBreadcrumbs,
        currentTitle,
        setCurrentTitle,
      }}
    >
      {children}
    </BreadcrumbContext.Provider>
  );
};

BreadcrumbProvider.propTypes = {
  children: propTypes.node,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBreadcrumb = () => useContext(BreadcrumbContext);

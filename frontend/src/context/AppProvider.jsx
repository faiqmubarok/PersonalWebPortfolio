import { ThemeProvider } from "./ThemeContext";
import { AlertProvider } from "./AlertContext";
import { AuthProvider } from "./AuthContext";
import { BreadcrumbProvider } from "./BreadcrumbContext";
import { ConfirmDeleteProvider } from "./ConfirmDeleteContext";
import propTypes from "prop-types";

const AppProvider = ({ children }) => {
  return (
    <ThemeProvider>
      <AlertProvider>
        <AuthProvider>
          <ConfirmDeleteProvider>
            <BreadcrumbProvider>{children}</BreadcrumbProvider>
          </ConfirmDeleteProvider>
        </AuthProvider>
      </AlertProvider>
    </ThemeProvider>
  );
};

AppProvider.propTypes = {
  children: propTypes.node,
};

export default AppProvider;

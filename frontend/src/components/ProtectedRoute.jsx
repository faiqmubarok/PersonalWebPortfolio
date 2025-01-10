import { useContext } from "react";
import { Route } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import propTypes from "prop-types";
import Login from "../pages/auth/Login";
import PageTitle from "./PageTitle";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { authState } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      element={
        authState.isAuthenticated ? (
          <Element />
        ) : (
          <>
            <PageTitle title="Login | Web Profile Faiq Mubarok" />
            <Login />
          </>
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  element: propTypes.element,
};

export default ProtectedRoute;

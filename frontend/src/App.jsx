import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import PageTitle from "./components/PageTitle";

// Layout
import DefaultLayout from "./layouts/DefaultLayouts";
import AdminLayout from "./layouts/AdminLayout";

// Pages
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Auth
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Protected Route
import Dashboard from "./pages/admin/Dashboard";
import Messages from "./pages/admin/Messages";
import ResumeAdmin from "./pages/admin/Resume/Resume";
import PortfolioAdmin from "./pages/admin/Portfolio";
import DetailPortfolio from "./pages/admin/DetailPortfolio";
import General from "./pages/admin/General/General";

const App = () => {
  const { authState } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <PageTitle title="About | Web Profile Faiq Mubarok" />
            <DefaultLayout>
              <About />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/portfolio"
        element={
          <>
            <PageTitle title="Portfolio | Web Profile Faiq Mubarok" />
            <DefaultLayout>
              <Portfolio />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/resume"
        element={
          <>
            <PageTitle title="Resume | Web Profile Faiq Mubarok" />
            <DefaultLayout>
              <Resume />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/contact"
        element={
          <>
            <PageTitle title="Contact | Web Profile Faiq Mubarok" />
            <DefaultLayout>
              <Contact />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/auth/sign-in"
        element={
          <>
            <PageTitle title="Login | Web Profile Faiq Mubarok" />
            <Login />
          </>
        }
      />
      <Route
        path="/auth/forgot-password"
        element={
          <>
            <PageTitle title="Forgot Password | Web Profile Faiq Mubarok" />
            <ForgotPassword />
          </>
        }
      />
      <Route
        path="/auth/reset-password"
        element={
          <>
            <PageTitle title="Reset Password | Web Profile Faiq Mubarok" />
            <ResetPassword />
          </>
        }
      />
      <Route
        path="/dashboard"
        element={
          authState.isAuthenticated ? (
            <>
              <PageTitle title="Dashboard | Web Profile Faiq Mubarok" />
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </>
          ) : (
            <Navigate to="/auth/sign-in" replace />
          )
        }
      />
      <Route
        path="/general"
        element={
          authState.isAuthenticated ? (
            <>
              <PageTitle title="General | Web Profile Faiq Mubarok" />
              <AdminLayout>
                <General />
              </AdminLayout>
            </>
          ) : (
            <Navigate to="/auth/sign-in" replace />
          )
        }
      />
      <Route
        path="/messages"
        element={
          authState.isAuthenticated ? (
            <>
              <PageTitle title="Messages | Web Profile Faiq Mubarok" />
              <AdminLayout>
                <Messages />
              </AdminLayout>
            </>
          ) : (
            <Navigate to="/auth/sign-in" replace />
          )
        }
      />
      <Route
        path="/resume-admin"
        element={
          authState.isAuthenticated ? (
            <>
              <PageTitle title="Resume | Web Profile Faiq Mubarok" />
              <AdminLayout>
                <ResumeAdmin />
              </AdminLayout>
            </>
          ) : (
            <Navigate to="/auth/sign-in" replace />
          )
        }
      />
      <Route
        path="/portfolio-admin"
        element={
          authState.isAuthenticated ? (
            <>
              <PageTitle title="Portfolio | Web Profile Faiq Mubarok" />
              <AdminLayout>
                <PortfolioAdmin />
              </AdminLayout>
            </>
          ) : (
            <Navigate to="/auth/sign-in" replace />
          )
        }
      />
      <Route
        path="/portfolio-admin/:id"
        element={
          authState.isAuthenticated ? (
            <>
              <PageTitle title="Portfolio | Web Profile Faiq Mubarok" />
              <AdminLayout>
                <DetailPortfolio />
              </AdminLayout>
            </>
          ) : (
            <Navigate to="/auth/sign-in" replace />
          )
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;

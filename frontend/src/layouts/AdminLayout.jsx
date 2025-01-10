import propTypes from "prop-types";
import { useState } from "react";
import AdminSidebar from "../components/Sidebar/AdminSidebar";
import AdminHeader from "../components/Header/AdminHeader";
import AdminFooter from "../components/Footer/AdminFooter";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-blue-gray-50/50 w-full !no-scrollbar">
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="p-4 xl:ml-80 ">
        <AdminHeader
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="mt-8 mb-5">{children}</div>
        <div className="text-blue-gray-600">
          <AdminFooter />
        </div>
      </div>
    </div>
  );
};

AdminLayout.propTypes = {
  children: propTypes.node,
};

export default AdminLayout;

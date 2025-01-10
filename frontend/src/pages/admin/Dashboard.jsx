import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { useEffect } from "react";

const Admin = () => {
  const { setBreadcrumbs, setCurrentTitle } = useBreadcrumb();

  useEffect(() => {
    setCurrentTitle("Dashboard");
    setBreadcrumbs([]);
  }, [setBreadcrumbs, setCurrentTitle]);
  
  return <div className="h-[900px]">This is Dashboard Page</div>;
};

export default Admin;

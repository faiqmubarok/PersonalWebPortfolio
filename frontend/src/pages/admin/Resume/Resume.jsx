import { useEffect } from "react";
import { useBreadcrumb } from "../../../context/BreadcrumbContext";
// import EducationExperience from "../../../components/Molecule/Resume/EducationExperience";
import OrganizationCommitte from "../../../components/Molecule/Resume/OrganizationCommitte";
import Certification from "../../../components/Molecule/Resume/Certification";
import Experience from "./Experience";

const Resume = () => {
  const { setBreadcrumbs, setCurrentTitle } = useBreadcrumb();

  useEffect(() => {
    setCurrentTitle("Resume");
    setBreadcrumbs([{ name: "Resume", path: "/resume-admin" }]);
  }, [setBreadcrumbs, setCurrentTitle]);

  return (
    <>
      <Experience />
      {/* <EducationExperience /> */}
      <OrganizationCommitte />
      <Certification />
    </>
  );
};

export default Resume;

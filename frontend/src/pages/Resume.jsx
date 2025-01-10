import { useState, useEffect, Suspense, lazy } from "react";
import { useAlert } from "../context/AlertContext";
import { PiGraduationCap } from "react-icons/pi";
import { MdOutlineWorkOutline } from "react-icons/md";
import { getExperiences } from "../api/experience";
import { getOrganization } from "../api/organization";
import { getCertificates } from "../api/certificate";
import "../css/style.css";

import Footer from "../components/Footer/Footer";
import DrawerTop from "../components/DrawerTop/DrawerTop";
import SkeletonExperience from "../components/Skeleton/SkeletonExperience";
import SkeletonOrganization from "../components/Skeleton/SkeletonOrganization";
import SkeletonCertificate from "../components/Skeleton/SkeletonCertificate";

const EducationList = lazy(() => import("../components/List/PublicEducation"));
const ExperienceList = lazy(() =>
  import("../components/List/PublicExperience")
);
const OrganizationList = lazy(() =>
  import("../components/List/PublicOrganization")
);
const CertificateList = lazy(() =>
  import("../components/List/PublicCertificate")
);

const Resume = () => {
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const { showAlert } = useAlert();
  const [selectedImage, setSelectedImage] = useState(null);
  const [drawerTop, setDrawerTop] = useState(false);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await getExperiences({ limit: 100 });
        const data = response.data;

        const educationData = data.filter((item) => item.type === "education");
        const experienceData = data.filter(
          (item) => item.type === "experience"
        );

        setEducation(educationData);
        setExperience(experienceData);
      } catch (error) {
        console.error("Error fetching experiences:", error);
        showAlert("error", error.message);
      }
    };
    const fetchOrganizations = async () => {
      try {
        const response = await getOrganization({ page: 1, limit: 30 });
        setOrganizations(response?.data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
        showAlert("error", error.message);
      }
    };
    const fetchCertificates = async () => {
      try {
        const response = await getCertificates({ page: 1, limit: 30 });
        setCertificates(response?.data);
      } catch (error) {
        console.error("Error fetching certificates:", error);
        showAlert("error", error.message);
      }
    };

    fetchExperiences();
    fetchOrganizations();
    fetchCertificates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <main className="w-full bg-white dark:bg-black rounded-xl flex flex-col shadow-lg overflow-hidden transition-all duration-300 font-poppins">
        {/* Education & Experience */}
        <section className="px-6 md:px-8 lg:px-14 pt-8 md:pt-10 lg:pt-14 pb-7">
          {/* Title */}
          <div className="flex items-center gap-7 mb-8">
            <h1 className="font-roboto-slab font-extrabold text-3xl text-black dark:text-white">
              Resume
            </h1>
            <div className="w-32 h-1 bg-accentColor rounded-full"></div>
          </div>
          {/* Title */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-3">
            {/* Education */}
            <div className="flex flex-col gap-5 w-full">
              <div className="flex gap-3 items-center font-poppins font-semibold text-xl text-black dark:text-whi">
                <PiGraduationCap className="w-7 h-7 text-accentColor" />
                <h3 className="text-black dark:text-white">Education</h3>
              </div>
              <ul className="flex flex-col gap-4 lg:gap-3">
                {education?.map((item, index) => (
                  <Suspense
                    key={index}
                    fallback={<SkeletonExperience index={index} />}
                  >
                    <EducationList item={item} index={index} />
                  </Suspense>
                ))}
              </ul>
            </div>
            {/* Experience */}
            <div className="flex flex-col gap-5 w-full">
              <div className="flex gap-3 items-center font-poppins font-semibold text-xl text-black dark:text-white">
                <MdOutlineWorkOutline className="w-7 h-7 text-accentColor" />
                <h3 className="text-black dark:text-white">Experience</h3>
              </div>
              <ul className="flex flex-col gap-4 lg:gap-3">
                {experience?.map((item, index) => (
                  <Suspense
                    key={index}
                    fallback={<SkeletonExperience index={index} />}
                  >
                    <ExperienceList item={item} index={index} />
                  </Suspense>
                ))}
              </ul>
            </div>
          </div>
        </section>
        {/* Organization & Committe */}
        <section className="w-full bg-[#F8FBFB] dark:bg-[#0D0D0D] px-6 md:px-8 lg:px-14 py-10 shadow-sm">
          <h3 className="text-xl font-bold font-poppins text-black dark:text-white mb-6">
            Organization & Committe
          </h3>
          <div className="relative overflow-x-auto no-scrollbar">
            <table className="w-full text-sm text-left text-lightSecondary dark:text-darkSecondary">
              <thead className="text-xs text-black dark:text-white uppercase bg-lightPrimary dark:bg-darkPrimary ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Activity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Position
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Period
                  </th>
                </tr>
              </thead>
              <tbody>
                {organizations.map((organization, index) => (
                  <Suspense
                    key={index}
                    fallback={<SkeletonOrganization index={index} />}
                  >
                    <OrganizationList organization={organization} />
                  </Suspense>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* Certification */}
        <section className="px-6 md:px-8 lg:px-14 py-10">
          <h3 className="text-xl font-bold font-poppins text-black dark:text-white mb-6">
            Certificate
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map((certificate, index) => (
              <Suspense key={index} fallback={<SkeletonCertificate />}>
                <CertificateList
                  setDrawerTop={setDrawerTop}
                  setSelectedImage={setSelectedImage}
                  certificate={certificate}
                  index={index}
                />
              </Suspense>
            ))}
          </div>
        </section>
        <DrawerTop
          isOpen={drawerTop}
          onClose={() => {
            setDrawerTop(false);
            setSelectedImage(null);
          }}
          activePage="certificate"
          certificate={selectedImage}
        />
        <Footer isTrueDesign={false} />
      </main>
    </>
  );
};

export default Resume;

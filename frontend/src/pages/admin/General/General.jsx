import images from "../../../images";
import { useEffect } from "react";
import { useBreadcrumb } from "../../../context/BreadcrumbContext";
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tooltip,
  IconButton,
  Button,
} from "@material-tailwind/react";
import Skill from "./Skill";
import SocialMedia from "./SocialMedia";
import Contact from "./Contact";
import { IoPencil } from "react-icons/io5";
import { GrDocumentDownload } from "react-icons/gr";
import { useFetchProfile } from "../../../api/profile";
import { useAlert } from "../../../context/AlertContext";

const General = () => {
  const { setBreadcrumbs, setCurrentTitle } = useBreadcrumb();
  const { showAlert } = useAlert();

  useEffect(() => {
    setCurrentTitle("General Information");
    setBreadcrumbs([{ name: "General", path: "/general" }]);
  }, [setBreadcrumbs, setCurrentTitle]);

  const { data, isLoading, refetch } = useFetchProfile({
    onError: (error) => {
      console.error(error);
      showAlert("error", error.response?.data?.message || "Terjadi kesalahan");
    },
  });

  const aboutDesc = [
    "Hello, I'm Faiq, a fifth-semester Information Systems student at Telkom University Purwokerto. I focus on full-stack web development, with a passion for creating responsive and user-friendly applications. My primary expertise lies in the MERN stack, allowing me to build dynamic and efficient web solutions.",
    "As a student, I am committed to learning and applying the latest technologies to deliver innovative solutions. My goal is to contribute to exciting projects, further develop my skills, and ultimately pursue a career as a proficient software developer.",
    "Feel free to explore my portfolio to see some of the projects I've worked on and how I can bring your ideas to life!",
  ];

  return (
    <>
      <div
        className="relative mt-8 h-72 w-full overflow-hidden rounded-xl  bg-cover bg-center"
        style={{
          backgroundImage: `url(${images.pattern})`,
        }}
      >
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src={images.photoProfile}
                alt="Muhammad Faiq Mubarok"
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  Muhammad Faiq Mubarok
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  Fullstack Developer | UI/UX Designer
                </Typography>
              </div>
            </div>
          </div>
          <div className="grid-cols-1 mb-12 grid gap-12 lg:grid-cols-8">
            <div className=" lg:col-span-4">
              <div className="flex justify-between items-center mb-4">
                <Typography variant="h6" color="blue-gray">
                  Personal Info
                </Typography>
                <Tooltip content="Edit Personal Info" placement="top">
                  <IconButton variant="text" size="sm">
                    <IoPencil className="text-blue-gray-500 w-4 h-4" />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="flex flex-col gap-4">
                <div className="">
                  {aboutDesc.map((desc, index) => (
                    <Typography
                      key={index}
                      variant="small"
                      className="font-normal text-blue-gray-500 mb-4 "
                    >
                      {desc}
                    </Typography>
                  ))}
                </div>
                <Button
                  color="blue-gray"
                  variant="outlined"
                  className="flex items-center gap-4 justify-center"
                >
                  <GrDocumentDownload className="w-4 h-4" />
                  <a href="">Curiculum Vitae</a>
                </Button>
                {/* <Typography
                  className="hover:underline font-normal w-fit"
                  variant="small"
                  color="blue"
                >
                  <a href="">Curiculum Vitae</a>
                </Typography> */}
              </div>
            </div>
            <div className="lg:col-span-2">
              <Contact />
            </div>
            {/* Social Media */}
            <div className="lg:col-span-2">
              <SocialMedia
                socialMediaData={data?.socialMedia}
                isLoading={isLoading}
                refetch={refetch}
              />
            </div>
          </div>
          <Skill />
        </CardBody>
      </Card>
    </>
  );
};

export default General;

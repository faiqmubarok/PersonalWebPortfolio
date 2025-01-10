import { Typography, IconButton, Tooltip } from "@material-tailwind/react";
import { FaWhatsapp, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { IoPencil } from "react-icons/io5";

const socialMedia = [
  {
    name: "whatsapp",
    icon: <FaWhatsapp className="text-[#25D366] w-6 h-6" />,
    url: "https://api.whatsapp.com/send/?phone=6282117748606&text&type=phone_number&app_absent=0",
  },
  {
    name: "instagram",
    icon: <FaInstagram className="text-[#DA4A80] w-6 h-6" />,
    url: "https://www.instagram.com/faiqmubarok._/",
  },
  {
    name: "linkedin",
    icon: <FaLinkedin className="text-[#0077B5] w-6 h-6" />,
    url: "https://www.linkedin.com/in/faiq-mubarok-35a11a229/",
  },
  {
    name: "github",
    icon: <FaGithub className="text-[#24292F] dark:text-white w-6 h-6" />,
    url: "https://github.com/faiqmubarok",
  },
];
const SocialMedia = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6" color="blue-gray">
          Social Media
        </Typography>
        <Tooltip content="Edit Social Media" placement="top">
          <IconButton variant="text" size="sm">
            <IoPencil className="text-blue-gray-500 w-4 h-4" />
          </IconButton>
        </Tooltip>
      </div>
      <div className="flex flex-col gap-4">
        {socialMedia.map((item, index) => (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 group"
            key={index}
          >
            <div className="flex items-center gap-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium "
              >
                {item.icon}
              </Typography>
              <Typography
                variant="small"
                className="font-medium capitalize text-blue-gray-500 group-hover:underline"
              >
                {item.name}
              </Typography>
            </div>
          </a>
        ))}
      </div>
    </>
  );
};

export default SocialMedia;

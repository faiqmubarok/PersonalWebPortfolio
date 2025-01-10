import images from "../../images";
import { Link } from "react-router-dom";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { FaWhatsapp, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { SlScreenSmartphone } from "react-icons/sl";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoLocation } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { MdOutlineFileDownload } from "react-icons/md";

const Profile = () => {
  const [text] = useTypewriter({
    words: ["Frontend Developer", "UI/UX Designer"],
    loop: true,
    typeSpeed: 30,
    deleteSpeed: 20,
    delaySpeed: 2000,
  });

  const socialMedia = [
    {
      name: "whatsapp",
      icon: (
        <FaWhatsapp className="text-[#25D366] w-6 h-6 group-hover:text-white" />
      ),
      url: "https://api.whatsapp.com/send/?phone=6282117748606&text&type=phone_number&app_absent=0",
    },
    {
      name: "instagram",
      icon: (
        <FaInstagram className="text-[#DA4A80] w-6 h-6 group-hover:text-white" />
      ),
      url: "https://www.instagram.com/faiqmubarok._/",
    },
    {
      name: "linkedin",
      icon: (
        <FaLinkedin className="text-[#0077B5] w-6 h-6 group-hover:text-white" />
      ),
      url: "https://www.linkedin.com/in/faiq-mubarok-35a11a229/",
    },
    {
      name: "github",
      icon: (
        <FaGithub className="text-[#24292F] dark:text-white w-6 h-6 group-hover:text-white" />
      ),
      url: "https://github.com/faiqmubarok",
    },
  ];

  const info = [
    {
      name: "phone",
      title: "Phone",
      icon: <SlScreenSmartphone className="text-[#667BC6] w-6 h-6" />,
      value: "+62 821 1774 8606",
    },
    {
      name: "email",
      title: "Email",
      icon: <HiOutlineMailOpen className="text-[#50B498] w-6 h-6" />,
      value: "faiqmubarok@gmail.com",
    },
    {
      name: "location",
      title: "Location",
      icon: <IoLocation className="text-[#B692C2] w-6 h-6" />,
      value: "Purwokerto, Indonesia",
    },
    {
      name: "birthday",
      title: "Birthday",
      icon: <LuCalendarDays className="text-[#4F1787] w-6 h-6" />,
      value: "November 20, 2003",
    },
  ];

  return (
    <>
      <div className="flex flex-col rounded-xl bg-white dark:bg-black shadow-lg py-10 px-2.5 md:px-5 transition-all duration-300 lg:sticky top-36">
        {/* Photo Profil */}
        <div className="w-full lg:absolute -top-32 left-0 mb-4">
          <Link to={"/auth/sign-in"}>
            <img
              className="w-[210px] h-[210px] mx-auto"
              src={images.photoProfile}
              alt="photo-profil"
            />
          </Link>
        </div>
        {/* Bio */}
        <div className="flex flex-col lg:pt-16 gap-7 items-center">
          {/* Text Profil */}
          <div className="w-full flex flex-col items-center gap-5">
            <h2 className="text-3xl font-roboto-slab font-semibold text-black dark:text-white w-full text-center">
              Muhammad Faiq Mubarok
            </h2>
            <h4 className="text-lg font-medium font-poppins px-5 py-1 text-black dark:text-white bg-lightPrimary dark:bg-darkPrimary rounded-md">
              <span>{text}</span>
              <Cursor
                cursorBlinking="false"
                cursorStyle="|"
                cursorColor="#1A73E3"
              />
            </h4>
            {/* Social Media */}
            <ul className="flex gap-3 w-full justify-center">
              {socialMedia.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-2.5 bg-lightPrimary dark:bg-darkPrimary hover:bg-accentColor dark:hover:bg-accentColor rounded-md group transition-colors duration-200 ease-in-out"
                  >
                    {item.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Info */}
          <ul className="w-full bg-lightPrimary dark:bg-darkPrimary rounded-lg px-2.5 py-7 flex flex-col gap-2.5">
            {info.map((info, index) => (
              <li
                key={info.name}
                className={`flex items-center justify-start gap-3 pb-2 ${
                  index !== info.length - 1
                    ? "border-b border-darkSecondary border-opacity-40"
                    : ""
                }`}
              >
                {/* Icon */}
                <div className="p-2.5 rounded-md bg-white dark:bg-black">
                  {info.icon}
                </div>
                {/* Value */}
                <div className="flex flex-col font-poppins">
                  <span className="text-xs text-darkSecondary text-opacity-80">
                    {info.title}
                  </span>
                  <span className="text-sm font-medium text-black dark:text-white">
                    {info.value}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          {/* Button Cv */}
          <div className="w-full flex justify-center items-center">
            <a
              href="/Muhammad_Faiq_Mubarok.pdf"
              download="Muhammad_Faiq_Mubarok_CV.pdf"
              className="bg-accentColor flex rounded-md justify-center items-center py-3.5 px-7 gap-1 text-white"
            >
              {<MdOutlineFileDownload className="w-6 h-6" />}
              <span className="text-lg font-medium  font-poppins">
                Download CV
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

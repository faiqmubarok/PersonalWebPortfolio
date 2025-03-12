import Footer from "../components/Footer/Footer";
import { useState } from "react";
import images from "../images";

const About = () => {
  const [activeSkill, setActiveSkill] = useState("techStack");

  const handleActiveSkill = (value) => {
    setActiveSkill(value);
  };

  const techStack = [
    { name: "HTML", icon: images.html, level: "Intermediate" },
    { name: "CSS", icon: images.css, level: "Intermediate" },
    { name: "Tailwind", icon: images.tailwind, level: "Intermediate" },
    { name: "Javascript", icon: images.javascript, level: "Intermediate" },
    { name: "Typescript", icon: images.typescript, level: "Beginner" },
    { name: "React", icon: images.react, level: "Intermediate" },
    { name: "Next Js", icon: images.nextjs, level: "Beginner" },
    { name: "Python", icon: images.python, level: "Beginner" },
    { name: "Node Js", icon: images.nodejs, level: "Beginner" },
    { name: "Express", icon: images.express, level: "Beginner" },
    { name: "Django", icon: images.django, level: "Beginner" },
    { name: "MySQL", icon: images.mysql, level: "Beginner" },
    { name: "MongoDB", icon: images.mongodb, level: "Beginner" },
  ];

  const tools = [
    { name: "Figma", icon: images.figma, level: "Intermediate" },
    { name: "VSCode", icon: images.vscode, level: "Intermediate" },
    { name: "Git", icon: images.git, level: "Intermediate" },
    { name: "Github", icon: images.github, level: "Intermediate" },
  ];

  const [hoveredItem, setHoveredItem] = useState(null);

  const handleItemHover = (item) => {
    setHoveredItem(item.name);
  };

  const handleItemLeave = () => {
    setHoveredItem(null);
  };

  return (
    <>
      <main className="w-full bg-white dark:bg-black rounded-xl flex flex-col shadow-lg overflow-hidden transition-all duration-300 font-poppins">
        {/* Branding Self */}
        <section className="px-6 md:px-8 lg:px-14 pt-8 md:pt-10 lg:pt-14 pb-7">
          {/* Title */}
          <div className="flex items-center gap-7 mb-5">
            <h1 className="font-roboto-slab font-extrabold text-4xl text-black dark:text-white">
              About
            </h1>
            <div className="w-32 h-1 bg-accentColor rounded-full"></div>
          </div>
          {/* Title */}

          <article className="text-justify leading-6 text-sm space-y-4 text-lightSecondary dark:text-darkSecondary font-normal">
            <p>
              Hello, I&apos;m Faiq, a fifth-semester Information Systems student
              at Telkom University Purwokerto. With one year of experience as a
              frontend developer, I specialize in building responsive and
              user-friendly web applications using JavaScript and TypeScript.
            </p>

            <p>
              While my primary focus is frontend development, I also have a
              solid understanding of backend technologies, including Node.js and
              Express.js, allowing me to work across the full stack when needed.
              I&apos;m passionate about learning and applying the latest web
              technologies to deliver high-quality and innovative solutions.
            </p>

            <p>
              Feel free to explore my portfolio to see some of the projects I’ve
              worked on and how I can bring your ideas to life!
            </p>
          </article>
        </section>

        {/* Skills */}
        <section className="w-full bg-[#F8FBFB] dark:bg-[#0D0D0D] flex-col flex gap-4 px-6 md:px-8 lg:px-14 py-10">
          <h3 className="text-xl font-bold font-poppins text-black dark:text-white">
            Skills
          </h3>
          <div className="flex gap-3 mb-3">
            <button
              className={`py-2 px-4 font-poppins font-medium text-sm  text-accentColor border border-accentColor rounded-lg  transition-colors duration-200 ease-in-out hover:bg-accentColor hover:text-white dark:hover:text-white ${
                activeSkill === "techStack"
                  ? "bg-accentColor text-white border-none"
                  : ""
              }`}
              onClick={() => handleActiveSkill("techStack")}
            >
              Tech Stack
            </button>
            <button
              className={`py-2 px-4 font-poppins font-medium text-sm  text-accentColor border border-accentColor rounded-lg transition-colors duration-200 ease-in-out hover:bg-accentColor hover:text-white dark:hover:text-white ${
                activeSkill === "tools"
                  ? "bg-accentColor text-white border-none"
                  : ""
              }`}
              onClick={() => handleActiveSkill("tools")}
            >
              Tools
            </button>
          </div>

          {/* Tech Stack and Tools */}
          <ul className="grid grid-cols-2 gap-4">
            {(activeSkill === "techStack" ? techStack : tools).map(
              (item, index) => (
                <li
                  key={index}
                  onMouseEnter={() => handleItemHover(item)}
                  onMouseLeave={handleItemLeave}
                  className={`flex items-center flex-col md:flex-row gap-3 px-5 py-5 md:py-3 text-black dark:text-white rounded-lg text-sm h-32 justify-center md:justify-start md:h-16 font-poppins hover:cursor-pointer shadow-md font-medium text-center md:text-start backdrop-blur-md group dark:bg-transparent outline outline-white dark:outline-[#353535] 
                  ${
                    index % 12 === 0 ||
                    index % 12 === 3 ||
                    index % 12 === 4 ||
                    index % 12 === 7 ||
                    index % 12 === 8
                      ? "bg-[#e4f7fa]/70"
                      : "bg-[#FFF3F4]/70"
                  }
                `}
                >
                  <img
                    loading="lazy"
                    src={item.icon}
                    alt={item.name}
                    className="w-8 h-8"
                  />
                  <div>
                    <span className="group-hover:text-xs transition-transform duration-300 ease-in-out text-black dark:text-white">
                      {item.name}
                    </span>
                    <span
                      className={`${
                        hoveredItem === item.name ? "block" : "hidden"
                      } text-xs font-light text-lightSecondary dark:text-darkSecondary`}
                    >
                      {item.level}
                    </span>
                  </div>
                </li>
              )
            )}
          </ul>
        </section>
        <Footer isTrueDesign={true} />
      </main>
    </>
  );
};

export default About;

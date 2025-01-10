import Footer from "../components/Footer/Footer";
import { useState, Suspense, lazy } from "react";
import { useFetchSkills } from "../api/skill";
import { useSearchParams } from "react-router-dom";
import SkeletonSkill from "../components/Skeleton/SkeletonSkill";

const buttonTypes = [
  { value: "tech_stack", label: "Tech Stack" },
  { value: "tools", label: "Tools" },
];

const SkillList = lazy(() => import("../components/List/PublicSkill"));

const About = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = 30;
  const filter = searchParams.get("type") || "tech_stack";
  const [hoveredItem, setHoveredItem] = useState(null);

  const { data } = useFetchSkills({
    filter,
    limit,
    onError: (e) => {
      console.log("Error fetching skills:", e);
    },
  });
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
              Hello, I’m Faiq, a fifth-semester Information Systems student at
              Telkom University Purwokerto. I have a strong passion and skill
              set in front-end web development, focusing on creating responsive
              and user-friendly interfaces. My expertise includes HTML, CSS,
              JavaScript, and React JS, which enables me to build dynamic and
              visually appealing web applications.
            </p>

            <p>
              As a student, I am committed to learning and applying the latest
              technologies to deliver innovative solutions. My goal is to
              contribute to exciting projects, further develop my skills, and
              ultimately pursue a career as a proficient software developer.
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
            {buttonTypes.map((type, index) => (
              <button
                key={index}
                className={`py-2 px-4 font-poppins font-medium text-sm  text-accentColor border border-accentColor rounded-lg  transition-colors duration-200 ease-in-out hover:bg-accentColor hover:text-white dark:hover:text-white ${
                  filter === type.value &&
                  "bg-accentColor text-white border-none"
                }`}
                onClick={() => setSearchParams({ type: type.value })}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Tech Stack and Tools */}
          <ul className="grid grid-cols-2 gap-4">
            {data?.data.map((item, index) => (
              <Suspense key={index} fallback={<SkeletonSkill index={index} />}>
                <SkillList
                  index={index}
                  item={item}
                  hoveredItem={hoveredItem}
                  setHoveredItem={setHoveredItem}
                />
              </Suspense>
            ))}
          </ul>
        </section>
        <Footer isTrueDesign={true} />
      </main>
    </>
  );
};

export default About;

import Footer from "../components/Footer/Footer"
import { useState } from "react";
import images from "../images";


const About = () => {

  const [activeSkill, setActiveSkill] = useState('techStack');

  const handleActiveSkill = (value) => {
    setActiveSkill(value);
  }

  const techStack = [
    {name : 'HTML', icon : images.html, level: "Intermediate"},
    {name : 'CSS', icon : images.css, level: 'Intermediate'},
    {name : 'Javascript', icon: images.javascript, level : 'Intermediate'},
    {name : 'React', icon : images.react, level: 'Beginner'},
    {name : 'C++', icon : images.cPositif, level: 'Intermediate'},
    {name : 'Bootstrap', icon : images.bootstrap, level: 'Beginner'},
    {name : 'Tailwind', icon : images.tailwind, level:'Intermediate'},
  ]

  const tools = [
    {name : 'Figma', icon : images.figma, level: 'Intermediate'},
    {name : 'Git', icon : images.git, level: 'Intermediate'},
    {name : 'Github', icon : images.github, level: 'Intermediate'},
    {name : 'MySQL', icon : images.mysql, level: 'Beginner'},
  ]

    const [hoveredItem, setHoveredItem] = useState(null);

    const handleItemHover = (item) => {
      setHoveredItem(item.name);
    };
  
    const handleItemLeave = () => {
      setHoveredItem(null);
    }

  return (
    <>
    <main className="w-full bg-white dark:bg-black rounded-xl flex flex-col shadow-lg overflow-hidden transition-all duration-300 font-poppins">
      <div className="px-6 md:px-8 lg:px-14 pt-8 md:pt-10 lg:pt-14 pb-7">
        {/* Title */}
        <div className="flex items-center gap-7 mb-5">
          <h1 className="font-roboto-slab font-extrabold text-4xl text-black dark:text-white">About</h1>
          <div className="w-32 h-1 bg-accentColor rounded-full"></div>
        </div>
        {/* Title */}

        <article className="text-justify leading-6 text-sm space-y-4 text-lightSecondary dark:text-darkSecondary font-normal">
          <p>Hello, I&apos;m Muhammad Faiq Mubarok, or you can call me Faiq. I&apos;m a 20-year-old student at Telkom University Institute in Purwokerto, where I&apos;m pursuing a degree in Information Systems.</p>
          <p>I began my journey in design in 2019, working on various projects for organizations and events. I started with Corel Draw and later transitioned to using Canva and Figma. I also worked as a freelance designer, specializing in stickers.</p>
          <p>In 2022, my interest expanded to Information Technology, and I decided to focus on front-end development. I actively learn through online platforms and bootcamps, and I&apos;m proud to have a GPA of 3.90.</p>
        </article>
      </div>

      {/* Skills */}
      <div className="w-full bg-lightPrimary dark:bg-darkPrimary flex-col flex gap-4 px-6 md:px-8 lg:px-14 py-10">
        <h3 className="text-xl font-bold font-poppins text-black dark:text-white">Skills</h3>
          <div className="flex gap-3 mb-3">
            <button className={`py-2 px-4 font-poppins font-medium text-sm  text-accentColor border border-accentColor rounded-lg hover:bg-accentColor hover:text-white dark:hover:text-white ${activeSkill === 'techStack' ? 'bg-accentColor text-white border-none' : ''}`} onClick={() => handleActiveSkill('techStack')}>Tech Stack</button>
            <button className={`py-2 px-4 font-poppins font-medium text-sm  text-accentColor border border-accentColor rounded-lg hover:bg-accentColor hover:text-white dark:hover:text-white ${activeSkill === 'tools' ? 'bg-accentColor text-white border-none' : ''}`} onClick={() => handleActiveSkill('tools')}>Tools</button>
          </div>

          {/* Tech Stack */}
          <ul className={`grid grid-cols-2 gap-4 ${activeSkill === 'techStack' ? 'block' : 'hidden'}`}>
              {techStack.map((item) => (
                <li 
                className="flex items-center flex-col md:flex-row gap-3 px-5 py-5 md:py-3 bg-black/10 dark:bg-black/30 text-black dark:text-white rounded-lg text-sm h-32 justify-center md:justify-start md:h-16 font-poppins hover:cursor-pointer shadow-md font-medium text-center md:text-start backdrop-blur-md group" 
                key={item.name} 
                onMouseEnter={() => handleItemHover(item)}
                onMouseLeave={handleItemLeave}>
                  <img src={item.icon} alt={item.name} className="w-8 h-8" />
                  <div>
                    <span className="group-hover:text-xs transition-transform duration-300 ease-in-out">{item.name}</span>
                    <span className={`${hoveredItem === item.name ? 'block' : 'hidden'} text-xs font-light`}>{item.level}</span>
                  </div>
                </li>
              ))}
          </ul>

          {/* Tools */}
          <ul className={`grid grid-cols-2 gap-4 ${activeSkill === 'tools' ? 'block' : 'hidden'}`}>
              {tools.map((item) => (
                <li 
                className="flex items-center flex-col md:flex-row gap-3 px-5 py-5 md:py-3 bg-black/10 dark:bg-black/30 text-black dark:text-white rounded-lg text-sm h-32 justify-center md:justify-start md:h-16 font-poppins hover:cursor-pointer shadow-md font-medium text-center md:text-start backdrop-blur-md" 
                key={item.name} 
                onMouseEnter={() => handleItemHover(item)}
                onMouseLeave={handleItemLeave}>
                  <img src={item.icon} alt={item.name} className="w-8 h-8" />
                  <div>
                    <span>{item.name}</span>
                    <span className={`${hoveredItem === item.name ? 'block' : 'hidden'} text-xs font-light`}>{item.level}</span>
                  </div>
                </li>
              ))}
          </ul>
          
      </div>
      {/* Skills */}

      <Footer isTrueDesign={ true }/>
    </main>
    </>
  )
}

export default About

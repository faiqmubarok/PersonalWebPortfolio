import { useState } from 'react';
import Footer from '../../components/Footer/Footer'
import projects from '../../data/projects.json'
import images from '../../images';

const Portfolio = () => {
  const [selectedType, setSelectedType] = useState('All');

  const portfolio = [
    {type: 'All'},
    {type: 'Website'},
    {type: 'UI/UX Design'},
  ]

  const filteredProjects = projects.filter((project) => {
    switch(selectedType) {
      case 'Website':
        return project.type === 'Website' || project.type === 'Web App';
      case 'UI/UX Design':
        return project.type === 'UI/UX Design';
      case 'All':
      default:
        return project;
    }
  })

  return (
    <>
    <main className="w-full bg-white dark:bg-black rounded-xl flex flex-col shadow-lg overflow-hidden transition-all duration-300 font-poppins">
      <div className="px-6 md:px-8 lg:px-14 pt-8 md:pt-10 lg:pt-14 pb-7">
        <div className="flex items-center gap-7 mb-6">
          <h1 className="font-roboto-slab font-extrabold text-3xl text-black dark:text-white">Portfolio</h1>
          <div className="w-32 h-1 bg-accentColor rounded-full"></div>
        </div>
        {/* Type Portfolio */}
        <ul
        className='flex w-full justify-end gap-1 items-center'
        >
          {portfolio.map((item, index) => (
            <li
            key={index}>
              <button 
              onClick={() => setSelectedType(item.type)}
              className={`text-base px-4  hover:text-accentColor dark:hover:text-accentColor font-medium ${selectedType === item.type ? 'text-accentColor' : 'text-lightSecondary dark:text-darkSecondary'}`}>
                {item.type}
              </button>
            </li>
          ))}
        </ul>
        {/* Projects */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
          {filteredProjects.map((project, index) => (
            <li
            key={project.id}
            >
              <button
              className={`p-2 rounded-lg dark:bg-transparent group shadow-md outline outline-white dark:outline-[#353535]
                ${ (index % 12 === 0 || index % 12 === 3 || index % 12 === 4 || index % 12 === 7 || index % 12 === 8)
                  ? 'bg-[#e4f7fa]/70' 
                  : 'bg-[#FFF3F4]/70'}
              `}
              >
                <img 
                className='w-full h-full object-cover rounded-lg group-hover:scale-105 transition-all duration-300'
                src={images[project.image]} 
                loading='lazy'
                alt={project.title} 
                />
                <div className="text-start p-2 text-black dark:text-white space-y-1">
                  <h3 className="font-semibold text-base">{project.name}</h3>
                  <p className='text-xs text-lightSecondary dark:text-darkSecondary'>{project.type}</p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Footer isTrueDesign={ false }/>
    </main>
    </>
  )
}

export default Portfolio

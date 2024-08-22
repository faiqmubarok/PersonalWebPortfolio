import { useState } from "react"
import images from "../../images"
import '../../css/style.css'

import Footer from "../../components/Footer/Footer"
import DetailImage from "./DetailImage"

const Resume = () => {
  const [active, setActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const education = [
    {year : '2022 - Now', school : 'Telkom University Purwokerto', major: 'Information System'},
    {year : '2019 - 2022', school : 'MA Husnul Khotimah', major: 'Science'},
    {year : '2016 - 2019', school : 'MTS Husnul Khotimah', major: ''},
  ]

  const experience = [
    {year: 'March 2022 - June 2024', company: 'U Kost Indonesia', position: 'Frontend Developer'},
    {year: 'February 2024', company: 'Kopidia', position: 'UI/UX Designer'},
  ]

  const organization = [
    {name: 'Dies Natalis Sistem Informasi 7', position: 'Person In Charge', period: 'Sep 2023 - Dec 2023'},
    {name: 'Information Systems Student Association', position: 'Human Resource Developmen', period: '2023 - 2024'},
    {name: 'Intern Information Systems Student Association', position: 'Social Development', period: 'Oct 2022 - Jan 2023'},
    {name: 'Eksecutive Board GoodEnd Futsal', position: 'Secretary', period: '2021 - 2022'},
    {name: 'Association Of Santri From Karawang, Subang, Purwakarta', position: 'Event Organizer', period: '2022 - 2021'},
    {name: 'Romadhon Fun With Ankasa-HK', position: 'Secretary', period: 'May 2020'},
  ]

  const certification = [
    {publisher: 'Codepolitan', title: 'Learn ReactJS', year: '2024', thumb: images.thumb01, image:images.certificate01},
    {publisher: 'Edspert.id', title: 'Web Development For Beginner', year: '2024', thumb: images.thumb03, image:images.certificate04},
    {publisher: 'Edspert.id', title: 'Start Learning IoT From Zero', year: '2024', thumb: images.thumb04, image:images.certificate03},
    {publisher: 'JadiHacker', title: 'Blockchain And Cryptography', year: '2024', thumb: images.thumb05, image:images.certificate05},
    {publisher: 'AWS Cloud Club', title: 'AWS Cloud Computing', year: '2024', thumb: images.thumb06, image:images.certificate06},
    {publisher: 'SCB International Consulting', title: 'Be a Great Speaker', year: '2023', thumb: images.thumb02, image:images.certificate02},
  ]

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
    setActive(true);
  };

  return (
    <>
      <main className="w-full bg-white dark:bg-black rounded-xl flex flex-col shadow-lg overflow-hidden transition-all duration-300 font-poppins">
        {/* Education & Experience */}
        <section className="px-6 md:px-8 lg:px-14 pt-8 md:pt-10 lg:pt-14 pb-7">
          {/* Title */}
          <div className="flex items-center gap-7 mb-8">
            <h1 className="font-roboto-slab font-extrabold text-3xl text-black dark:text-white">Resume</h1>
            <div className="w-32 h-1 bg-accentColor rounded-full"></div>
          </div>
          {/* Title */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-3">
            {/* Education */}
            <div className="flex flex-col gap-5 w-full">
              <div className="flex gap-3 items-center font-poppins font-semibold text-xl text-black dark:text-whi">
                <svg className="text-accentColor" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.3848 2.07422C14.2266 2.11523 11.0684 3.52734 7.37695 5.20898C2.15039 7.59375 0.615232 8.31445 0.457029 8.47266C-0.11719 9.02344 -0.140627 9.91406 0.404295 10.4707C0.615232 10.6934 1.32422 11.0449 4.14258 12.3105L4.98047 12.6855V16.1484C4.98047 18.3633 5.0039 19.7344 5.04492 19.957C5.15039 20.5312 5.46094 21.1055 5.96484 21.627C6.20508 21.8848 6.5332 22.1895 6.6914 22.3008L6.97265 22.5117V23.2793V24.0527L6.69726 24.1816C6.28125 24.3691 5.96484 24.6738 5.73633 25.0898C5.54883 25.4297 5.53711 25.4941 5.53711 25.9863C5.53711 26.4316 5.56054 26.5605 5.68945 26.8359C5.88281 27.2402 6.25781 27.6152 6.67968 27.8203C6.95508 27.9551 7.07812 27.9785 7.5 27.9785C7.92773 27.9785 8.04492 27.9551 8.33203 27.8145C8.7539 27.6094 9.11718 27.2461 9.31054 26.8359C9.43945 26.5664 9.46289 26.4316 9.46289 25.9863C9.46289 25.4941 9.45117 25.4297 9.26367 25.0898C9.03515 24.6738 8.71875 24.3691 8.30273 24.1816L8.02734 24.0527V23.6016C8.02734 23.1152 8.04492 23.0918 8.31445 23.2324C8.61914 23.3906 10.043 23.8535 10.752 24.0293C11.9297 24.3164 12.9082 24.4395 14.332 24.4746C18.2168 24.5742 21.5859 23.7188 23.5371 22.1309C24.2988 21.5156 24.8379 20.6777 24.9551 19.9219C24.9961 19.6875 25.0195 18.2109 25.0195 16.1133L25.0254 12.6855L26.4434 12.0469C28.9687 10.9043 29.4902 10.6406 29.666 10.4062C30.082 9.86133 30.1055 9.24023 29.7246 8.67188C29.4902 8.31445 30.2109 8.6543 19.3652 3.7207C17.4316 2.8418 15.709 2.0918 15.5391 2.05664C15.1523 1.97461 14.7598 1.98047 14.3848 2.07422ZM22.125 6.08203C27.1113 8.35547 28.8223 9.1582 28.9043 9.26953C29.0273 9.43359 29.0098 9.65039 28.8691 9.79688C28.8223 9.83789 25.7871 11.2441 22.1133 12.9199L15.4395 15.9668H15H14.5605L11.6309 14.625C10.0195 13.8926 8.69531 13.2832 8.68359 13.2715C8.67773 13.2656 9.65039 12.7617 10.8457 12.1582L13.0254 11.0566L13.5879 11.25C14.9473 11.7188 16.5762 11.4727 17.4258 10.6641C17.8477 10.2656 18.0117 9.88477 17.9766 9.4043C17.959 9.20508 17.9004 8.96484 17.8477 8.85938C17.5898 8.35547 17.0566 7.95117 16.3066 7.69336C15.8965 7.55273 15.7676 7.53516 15.0293 7.53516C14.3965 7.5293 14.127 7.55273 13.8633 7.63477C13.0781 7.88086 12.498 8.2793 12.1992 8.7832C12.0645 9.01172 12.041 9.11719 12.041 9.49219C12.041 9.80273 12.0762 9.99023 12.1465 10.125C12.2051 10.2363 12.2461 10.3301 12.2344 10.3418C12.1934 10.377 7.51172 12.7148 7.48242 12.7148C7.36523 12.7148 1.14258 9.83203 1.07812 9.74414C0.960935 9.58594 0.978513 9.39844 1.125 9.23438C1.20117 9.15234 1.81054 8.8418 2.54883 8.50781C3.25781 8.18555 6.22265 6.83203 9.14062 5.50781C12.0586 4.17773 14.5254 3.06445 14.6191 3.04102C15.1523 2.90039 15.0527 2.85938 22.125 6.08203ZM15.75 8.58398C16.4824 8.75977 16.9922 9.13477 16.9922 9.50391C16.9922 9.7793 16.582 10.1426 16.0781 10.3184C15.7441 10.4355 15.5566 10.459 15 10.459C14.4434 10.459 14.2559 10.4355 13.9219 10.3184C13.418 10.1426 13.0078 9.7793 13.0078 9.50391C13.0078 8.81836 14.543 8.30273 15.75 8.58398ZM6.52734 13.3945L6.97265 13.6055V17.4492V21.293L6.79101 21.1172C6.68554 21.0234 6.5039 20.7949 6.38086 20.6074C5.98828 20.0039 5.97656 19.875 5.97656 16.3242C5.97656 14.5137 6 13.1836 6.02929 13.1836C6.05859 13.1836 6.28125 13.2773 6.52734 13.3945ZM24.0117 16.5352L23.9941 19.8926L23.8418 20.2148C23.127 21.7324 20.6777 22.9102 17.3027 23.3613C16.2363 23.502 13.7344 23.502 12.6855 23.3555C11.1035 23.1387 9.79687 22.793 8.63672 22.2832L8.02734 22.0137V18.0703C8.02734 15.8965 8.05078 14.1211 8.07422 14.1211C8.09765 14.1211 9.45117 14.7305 11.0742 15.4746C12.7031 16.2129 14.1797 16.8633 14.3555 16.9102C14.7598 17.0156 15.2402 17.0156 15.6445 16.9102C15.9082 16.8398 18.6211 15.6211 23.3789 13.4414C23.6836 13.3008 23.959 13.1836 23.9824 13.1836C24.0059 13.1836 24.0234 14.6953 24.0117 16.5352ZM8.07422 25.1895C8.17968 25.2598 8.31445 25.4238 8.3789 25.5469C8.67187 26.1211 8.37304 26.7715 7.73437 26.959C7.14843 27.1348 6.5039 26.6191 6.5039 25.9863C6.5039 25.6113 6.78515 25.207 7.14843 25.0605C7.34179 24.9785 7.88672 25.0547 8.07422 25.1895Z" fill="currentColor"/>
                </svg>
                <h3 className="text-black dark:text-white">Education</h3>
              </div>
              <ul className="flex flex-col gap-4 lg:gap-3">
                {education.map((item, index) => (
                  <li key={index} className={`flex flex-col gap-4 p-3 rounded-lg font-poppins justify-evenly items-start py-4 dark:bg-transparent outline outline-1  dark:text-darkSecondary outline-white dark:outline-[#353535]  ${index % 2 == 0 ? 'bg-[#e4f7fa]/70 ' : 'bg-[#FFF3F4]'}`}>
                    <p className="text-xs">{item.year}</p>
                    <h4 className="font-medium text-base dark:text-white">{item.school}</h4>
                    <p className="text-sm">{item.major}</p>
                  </li>
                ))}
              </ul>
            </div>
            {/* Experience */}
            <div className="flex flex-col gap-5 w-full">
              <div className="flex gap-3 items-center font-poppins font-semibold text-xl text-black dark:text-white">
                <svg className="text-accentColor" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M27.1875 15.9375V26.25H2.8125V15.9375M15 20.625V16.875M18.75 7.5C18.75 7.5 18.75 3.75 15 3.75C11.25 3.75 11.25 7.5 11.25 7.5M1.875 7.5H28.125V15C28.125 15 22.5 18.75 15 18.75C7.5 18.75 1.875 15 1.875 15V7.5Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <h3 className="text-black dark:text-white">Experience</h3>
              </div>
              <ul className="flex flex-col gap-4 lg:gap-3">
                  {experience.map((item, index) => (
                    <li key={index} className={`flex flex-col gap-4 p-3 rounded-lg font-poppins justify-evenly items-start py-4 dark:bg-transparent outline outline-1  dark:text-darkSecondary outline-white dark:outline-[#353535]  ${index % 2 == 0 ? 'bg-[#FFF3F4] ' : 'bg-[#e4f7fa]/70'}`}
                    >
                      <p className="text-xs">{item.year}</p>
                      <h4 className="font-medium text-base dark:text-white">{item.company}</h4>
                      <p className="text-sm">{item.position}</p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </section>
        {/* Organization & Committe */}
        <section className="w-full bg-[#F8FBFB] dark:bg-[#0D0D0D] px-6 md:px-8 lg:px-14 py-10 shadow-sm">
          <h3 className="text-xl font-bold font-poppins text-black dark:text-white mb-6">Organization & Committe</h3>
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
                    {organization.map((item, index) => (
                      <tr key={index} className="bg-transparent border-b border-[#e3e3e3] dark:border-[#353535] text-sm">
                        <td className="px-6 py-4 font-medium text-lightSecondary whitespace-nowrap dark:text-darkSecondary">
                          {item.name} 
                        </td>
                        <td className="px-6 py-4 font-medium text-lightSecondary whitespace-nowrap  dark:text-darkSecondary">
                          {item.position} 
                        </td>
                        <td className="px-6 py-4 font-medium text-lightSecondary whitespace-nowrap dark:text-darkSecondary">
                          {item.period}
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </table>
          </div>

        </section>
        {/* Certification */}
        <section className="px-6 md:px-8 lg:px-14 py-10">
          <h3 className="text-xl font-bold font-poppins text-black dark:text-white mb-6">Certificate</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certification.map((item, index) => (
              <button 
              onClick={() => handleThumbnailClick(item.image)}
              key={index}
              className=" lg:border-none border-b border-lightSecondary dark:border-darkSecondary py-3 hover:scale-105 transition-transform duration-200"
              >
                <img loading="lazy" className="w-full mb-2" 
                src={item.thumb} 
                alt={`certificate - ${index + 1}`} />
                <h6 className="font-medium text-sm mb-1 text-black dark:text-white">{item.title}</h6>
                <p className="text-xs text-lightSecondary dark:text-darkSecondary">{item.publisher} • {item.year}</p>
              </button>
            ))}
          </div>
          {active && (
          <DetailImage
          image={selectedImage}
          active={active}
          onClose={() => setActive(false)}
          />
        )}
        </section>
      <Footer isTrueDesign={ false }/>
    </main>
    </>
  )
}

export default Resume

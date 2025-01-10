import { NavLink } from "react-router-dom"
import '../css/style.css'

const NotFound = () => {
  return (
    <div className="bg-lightPrimary dark:bg-darkPrimary w-full h-screen flex items-center justify-center font-poppins flex-col">
        <div className="text-center mb-10">
            <h2 className="text-2xl text-darkSecondary dark:text-[#53565a] font-medium">Ooops..</h2>
            <h1 className=" font-expletus-sans text-[150px] leading-[130px] lg:text-[200px] lg:leading-[180px] font-black drop-shadow-md dinamic-gradient">404</h1>
            <h2 className="uppercase text-3xl lg:text-4xl font-semibold  dinamic-gradient">Page Not Found</h2>
        </div>
            <NavLink 
                to="/"
                className={`text-lg text-accentColor font-medium border border-accentColor rounded-lg px-4 py-2 dark:text-accentColor dark:hover:text-white hover:bg-accentColor hover:text-white transition-colors duration-200 ease-in-out shadow-sm`}
            >Go Home
            </NavLink>
    </div>
  )
}

export default NotFound

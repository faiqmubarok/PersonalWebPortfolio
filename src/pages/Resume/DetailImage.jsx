import PropTypes from 'prop-types'
import { IoIosClose } from "react-icons/io";
import '../../css/style.css'


const DetailImage = ({ image, active, onClose }) => {
  if (!active) return null
  return (
    <div 
      className={`fixed inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-lg dark:backdrop-blur-lg flex justify-center items-center z-50 transition-transform duration-200 delay-200 ease-in-out ${active ? '-translate-y-0' : '-translate-y-full'}`}
      onClick={onClose} 
    >
        <button
          onClick={onClose}
          className='absolute top-4 right-4 bg-lightPrimary dark:bg-darkPrimary rounded-full p-1 group hover:bg-accentColor dark:hover:bg-accentColor shadow-md transition-colors duration-200 ease-in-out'
          >
            <IoIosClose className='w-8 h-8 group-hover:text-white text-black dark:text-white group-hover:rotate-90 transition-transform duration-200' />
          </button>

      <div className="bg-white dark:bg-black p-4 rounded-md">
        <img loading='lazy' src={image} className='w-auto h-auto max-h-[80vh] max-w-[90vw]' alt={`Detail of ${image}`} />
      </div>
    </div>
  )
}

DetailImage.propTypes = {
  image: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default DetailImage

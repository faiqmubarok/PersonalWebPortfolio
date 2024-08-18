import PropTypes from 'prop-types'
import { IoIosClose } from "react-icons/io";


const DetailImage = ({ image, active, onClose }) => {
  if (!active) return null

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
      onClick={onClose} 
    >
        <button
          onClick={onClose}
          className='absolute top-4 right-4 bg-lightPrimary dark:bg-darkPrimary rounded-md p-1 group hover:bg-accentColor dark:hover:bg-accentColor shadow-md'
          >
            <IoIosClose className='w-8 h-8 group-hover:text-white text-black dark:text-white' />
          </button>

      <div className="bg-white dark:bg-black p-4 rounded-md">
        <img src={image} className='w-auto h-auto max-h-[80vh] max-w-[90vw]' alt={`Detail of ${image}`} />
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

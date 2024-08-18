import PropTypes from 'prop-types';

const Footer = ( {isTrueDesign} ) => {
  return (
    <>
      <footer className={`w-full py-6 flex items-center justify-center font-poppins text-sm text-lightSecondary dark:text-darkSecondary ${isTrueDesign ? 'bg-white dark:bg-black' : 'bg-[#F8FBFB] dark:bg-[#0D0D0D]'}`}>
        <p className=''>&copy; 2024 All Rights Reserved By Faiqmubarok</p>
      </footer>
    </>
  )
}

Footer.propTypes ={
    isTrueDesign: PropTypes.bool
}

export default Footer

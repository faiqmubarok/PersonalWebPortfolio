import { useState, useEffect } from "react"
import Proptypes from "prop-types"


const ScrollToTopButton = ( {onScrollAbleDivRef} ) => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          if (onScrollAbleDivRef.current) {
            setShowScrollTop(onScrollAbleDivRef.current.scrollTop > 300);
          }
        };
    
        const scrollableDiv = onScrollAbleDivRef.current;
        if (scrollableDiv) {
          scrollableDiv.addEventListener('scroll', handleScroll);
        }
    
        return () => {
          if (scrollableDiv) {
            scrollableDiv.removeEventListener('scroll', handleScroll);
          }
        };
    }, [onScrollAbleDivRef]);
    
    const scrollToTop = () => {
        if (onScrollAbleDivRef.current) {
            onScrollAbleDivRef.current.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }
    };

  return showScrollTop ? (
    <>
      <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 lg:right-10 lg:bottom-10 p-4 bg-accentColor text-white rounded-full shadow-md hover:rotate-[360deg] transition-transform duration-200"
          aria-label="Scroll to top"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M4.16669 12.5001L10 6.66675L15.8334 12.5001" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
    </>
  ) : (
    null
  )
}

ScrollToTopButton.propTypes = {
  onScrollAbleDivRef: Proptypes.object
}

export default ScrollToTopButton

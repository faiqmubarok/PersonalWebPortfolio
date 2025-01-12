import propTypes from "prop-types";

const PublicCertificates = ({
  certificate,
  setDrawerTop,
  setSelectedImage,
}) => {

  const handleButtonClicked = (image) => {
    setDrawerTop(true);
    setSelectedImage(image);
  };
  
  return (
    <button
      onClick={() => handleButtonClicked(certificate?.image)}
      key={certificate?._id}
      className=" lg:border-none border-b border-lightSecondary dark:border-darkSecondary py-3 hover:scale-105 transition-transform duration-200"
    >
      <img
        loading="lazy"
        className="w-full mb-2 h-44 object-cover "
        src={`${import.meta.env.VITE_BACKEND_URL}/${certificate?.image}`}
        alt={`certificate - ${certificate?.name}`}
      />
      <h6 className="font-medium text-sm mb-1 text-black dark:text-white line-clamp-1">
        {certificate?.name}
      </h6>
      <p className="text-xs text-lightSecondary dark:text-darkSecondary line-clamp-1">
        {certificate?.issuer} • {certificate?.year}
      </p>
    </button>
  );
};

PublicCertificates.propTypes = {
  certificate: propTypes.object,
  setDrawerTop: propTypes.func,
  setSelectedImage: propTypes.func,
};

export default PublicCertificates;

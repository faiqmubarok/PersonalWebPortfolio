import { IconButton, Typography } from "@material-tailwind/react";
import { IoIosArrowBack } from "react-icons/io";
import propTypes from "prop-types";

const Pagination = ({ page, setPage, totalPage, handleQueryParams }) => {
  const handlePageChange = (newPage) => {
    setPage(newPage);
    if (handleQueryParams) {
      handleQueryParams(newPage);
    }
  };

  return (
    <div className="flex items-center gap-8">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        <IoIosArrowBack className="w-4 h-4" />
      </IconButton>
      <Typography color="gray" className="font-normal text-sm">
        Page <strong className="text-gray-900">{page}</strong> of{" "}
        <strong className="text-gray-900">{totalPage || 1}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= totalPage}
      >
        <IoIosArrowBack className="w-4 h-4 rotate-180" />
      </IconButton>
    </div>
  );
};

Pagination.propTypes = {
  page: propTypes.number.isRequired,
  totalPage: propTypes.number,
  setPage: propTypes.func.isRequired,
  handleQueryParams: propTypes.func,
};

export default Pagination;

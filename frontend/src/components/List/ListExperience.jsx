import { Typography, Chip } from "@material-tailwind/react";
import PropTypes from "prop-types";

const ListExperience = ({ itemData, className, onEdit, onDelete }) => {
  return (
    <tr>
      <td className={className}>
        <Typography
          variant="small"
          className="font-medium text-sm text-blue-gray-700"
        >
          {itemData?.company}
        </Typography>
      </td>
      <td className={className}>
        <Typography className="text-sm text-blue-gray-700">
          {itemData?.role}
        </Typography>
      </td>
      <td className={className}>
        <Chip
          variant="gradient"
          color={itemData?.type === "education" ? "blue" : "blue-gray"}
          value={itemData?.type === "education" ? "Education" : "Experience"}
          className="py-0.5 px-2 text-xs font-medium w-fit normal-case"
        />
      </td>
      <td className={className}>
        <Typography className="text-sm text-blue-gray-700">
          {`${itemData?.startMonth.slice(0, 3)} ${itemData?.startYear} ${
            itemData?.endMonth === itemData?.startMonth &&
            itemData?.endYear === itemData?.startYear
              ? ""
              : `-  ${
                  itemData?.endMonth && itemData?.endYear === "Now"
                    ? "Now"
                    : `${itemData?.endMonth.slice(0, 3)} ${itemData?.endYear}`
                }`
          }`}
        </Typography>
      </td>
      <td className={className}>
        <div className="flex items-center gap-4">
          <Typography
            onClick={() => onEdit(itemData)}
            className="text-sm font-medium hover:underline text-blue-gray-700 hover:cursor-pointer"
          >
            Edit
          </Typography>
          <Typography
            onClick={() => onDelete(itemData._id, itemData.company)}
            className="text-sm font-medium hover:underline text-blue-gray-700 hover:cursor-pointer"
          >
            Delete
          </Typography>
        </div>
      </td>
    </tr>
  );
};

ListExperience.propTypes = {
  itemData: PropTypes.object,
  className: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ListExperience;

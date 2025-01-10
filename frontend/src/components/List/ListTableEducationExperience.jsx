import { Typography, Chip } from "@material-tailwind/react";
import propTypes from "prop-types";

const ListTableEducationExperience = ({
  className,
  setForm,
  setModalOpen,
  itemData,
  setTypeAction,
}) => {
  const handleEditButton = (itemData) => {
    setForm(itemData);
    setModalOpen(true);
    setTypeAction("update");
  };
  const handleDeleteButton = (itemData) => {
    setForm(itemData);
    setModalOpen(true);
    setTypeAction("delete");
  };
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
            onClick={() => handleEditButton(itemData)}
            className="text-sm font-medium hover:underline text-blue-gray-700 hover:cursor-pointer"
          >
            Edit
          </Typography>
          <Typography
            onClick={() => handleDeleteButton(itemData)}
            className="text-sm font-medium hover:underline text-blue-gray-700 hover:cursor-pointer"
          >
            Delete
          </Typography>
        </div>
      </td>
    </tr>
  );
};

ListTableEducationExperience.propTypes = {
  className: propTypes.string,
  itemData: propTypes.object,
  setForm: propTypes.func,
  setModalOpen: propTypes.func,
  setTypeAction: propTypes.func,
};

export default ListTableEducationExperience;

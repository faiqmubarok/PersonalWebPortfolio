import { Avatar, Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";

const ListSkill = ({ skill, className, onEdit, onDelete }) => {
  return (
    <tr>
      <td className={className}>
        <div className="flex items-center gap-4">
          <Avatar
            src={`${import.meta.env.VITE_BACKEND_URL}/${skill.icon}`}
            variant="square"
            alt={name}
            size="sm"
          />
          <Typography variant="small" color="blue-gray" className="font-bold">
            {skill.name}
          </Typography>
        </div>
      </td>
      <td className={className}>
        <Typography
          variant="small"
          className="text-sm font-medium text-blue-gray-600 capitalize"
        >
          {skill.level}
        </Typography>
      </td>
      <td className={className}>
        <Typography
          variant="small"
          className="text-sm font-medium text-blue-gray-600 capitalize"
        >
          {skill.type.toString().replace("_", " ")}
        </Typography>
      </td>
      <td className={className}>
        <div className="flex gap-4 items-center">
          <Typography
            variant="small"
            onClick={() => onEdit(skill)}
            className="text-sm  text-blue-gray-600 font-medium cursor-pointer hover:underline"
          >
            Edit
          </Typography>
          <Typography
            variant="small"
            onClick={() => onDelete(skill._id, skill.name)}
            className="text-sm  text-blue-gray-600 font-medium cursor-pointer hover:underline"
          >
            Delete
          </Typography>
        </div>
      </td>
    </tr>
  );
};

ListSkill.propTypes = {
  skill: PropTypes.object,
  className: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ListSkill;

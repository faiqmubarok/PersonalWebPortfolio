import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import propTypes from "prop-types";
import { RiEditBoxLine } from "react-icons/ri";
import { IoTrashOutline } from "react-icons/io5";

const CardCertificate1 = ({
  certification,
  setForm,
  setModalOpen,
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
    <Card className="w-full max-w-md shadow-md hover:shadow-lg transition-all overflow-hidden relative">
      <CardHeader
        floated={false}
        className="h-48 overflow-hidden m-0 rounded-none"
      >
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/${certification.image}`}
          alt={certification?.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h6" color="blue-gray" className="font-bold">
          {certification?.name}
        </Typography>
        <Typography variant="small" color="gray" className="mt-1">
          {certification?.issuer}
        </Typography>
        <Typography
          variant="small"
          color="blue-gray"
          className="mt-1 font-semibold"
        >
          {certification?.year}
        </Typography>
      </CardBody>
      <div className="!absolute right-1 top-1 flex gap-2">
        <IconButton
          onClick={() => handleEditButton(certification)}
          variant="gradient"
          size="sm"
          color="blue-gray"
        >
          <RiEditBoxLine className="w-4 h-4" />
        </IconButton>
        <IconButton
          onClick={() => handleDeleteButton(certification)}
          variant="gradient"
          size="sm"
          color="red"
        >
          <IoTrashOutline className="w-4 h-4" />
        </IconButton>
      </div>
    </Card>
  );
};

CardCertificate1.propTypes = {
  certification: propTypes.object,
  setForm: propTypes.func,
  setModalOpen: propTypes.func,
  setTypeAction: propTypes.func,
};

export default CardCertificate1;

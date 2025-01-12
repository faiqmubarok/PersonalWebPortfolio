import { useState } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  IconButton,
  Tooltip,
  Button,
  Input,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import { useAlert } from "../../../context/AlertContext";
import { useUpdateSocialMedia } from "../../../api/profile";
import Modal from "../../../components/Modal/Modal";
import { FaDiscord, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { IoPencil } from "react-icons/io5";

const socialMediaIcons = {
  discord: <FaDiscord className="text-[#5765f2] w-6 h-6" />,
  instagram: <FaInstagram className="text-[#DA4A80] w-6 h-6" />,
  linkedin: <FaLinkedin className="text-[#0077b5] w-6 h-6" />,
  github: <FaGithub className="text-[#24292F] w-6 h-6" />,
};

const SocialMedia = ({ socialMediaData, isLoading, refetch }) => {
  const socialMediaTypes = ["discord", "instagram", "linkedin", "github"];
  const [modalOpen, setModalOpen] = useState(false);
  const { showAlert } = useAlert();

  const initialValues = socialMediaTypes.reduce((acc, media) => {
    acc[media] =
      socialMediaData?.find((item) => item.media === media)?.link || "";
    return acc;
  }, {});

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (value) => {
      const dataToSend = socialMediaTypes.map((media) => ({
        media,
        link: value[media],
      }));
      mutate(dataToSend);
    },
  });

  const { mutate, isLoading: updateSocialMediaIsLoading } =
    useUpdateSocialMedia({
      onSuccess: (response) => {
        showAlert("success", response?.message);
        setModalOpen(false);
        refetch();
      },
      onError: (error) => {
        showAlert(
          "error",
          error.response?.data?.message || "Terjadi kesalahan"
        );
      },
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6" color="blue-gray">
          Social Media
        </Typography>
        <Tooltip content="Edit Social Media" placement="top">
          <IconButton
            variant="text"
            size="sm"
            onClick={() => setModalOpen(true)}
          >
            <IoPencil className="text-blue-gray-500 w-4 h-4" />
          </IconButton>
        </Tooltip>
      </div>
      <div className="flex flex-col gap-4">
        {isLoading && (
          <Typography
            variant="small"
            color="blue-gray"
            className="font-medium text-blue-gray-500"
          >
            Loading...
          </Typography>
        )}
        {!socialMediaData || socialMediaData.every((item) => !item.link) ? (
          <Typography
            variant="small"
            color="blue-gray"
            className="font-medium text-blue-gray-500"
          >
            No data found or added
          </Typography>
        ) : null}

        {socialMediaData?.map((item) =>
          item.link ? (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 group"
              key={item._id}
            >
              <div className="flex items-center gap-4">
                <div>{socialMediaIcons[item.media] || null}</div>
                <Typography
                  variant="small"
                  className="font-medium capitalize text-blue-gray-500 group-hover:underline"
                >
                  {item.media}
                </Typography>
              </div>
            </a>
          ) : null
        )}
      </div>
      <Modal
        headerText={"Social Media"}
        open={modalOpen}
        handleOpen={() => setModalOpen(!modalOpen)}
        footer={
          <Button
            onClick={formik.handleSubmit}
            loading={updateSocialMediaIsLoading}
            className="w-full md:w-fit"
            variant="gradient"
            type="submit"
          >
            Update
          </Button>
        }
      >
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-8">
          <Input
            name="discord"
            id="discord"
            value={formik.values.discord}
            label="Discord"
            onChange={handleChange}
            icon={<FaDiscord className="w-5 h-5" />}
          />
          <Input
            id="instagram"
            name="instagram"
            value={formik.values.instagram}
            onChange={handleChange}
            label="Instagram"
            icon={<FaInstagram className="w-5 h-5" />}
          />
          <Input
            id="linkedin"
            name="linkedin"
            onChange={handleChange}
            value={formik.values.linkedin}
            label="LinkedIn"
            icon={<FaLinkedin className="w-5 h-5" />}
          />
          <Input
            id="github"
            name="github"
            value={formik.values.github}
            onChange={handleChange}
            label="Github"
            icon={<FaGithub className="w-5 h-5" />}
          />
        </form>
      </Modal>
    </>
  );
};

SocialMedia.propTypes = {
  socialMediaData: PropTypes.array,
  isLoading: PropTypes.bool,
  refetch: PropTypes.func,
};

export default SocialMedia;
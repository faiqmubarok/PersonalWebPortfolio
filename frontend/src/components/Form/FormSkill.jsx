import { Select, Input, Option, IconButton } from "@material-tailwind/react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import PropTypes from "prop-types";

const FormSkill = ({ formik, handleFormInput, handleSelectInput }) => {
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="grid grid-cols-1 gap-y-8 gap-x-4 md:grid-cols-2"
    >
      {/* ID */}
      {formik.values._id ? (
        <Input
          className="uppercase"
          label="ID Skill"
          name="id"
          disabled
          value={formik.values._id}
        />
      ) : null}
      {/* Name */}
      <Input
        label="Name"
        name="name"
        onChange={handleFormInput}
        value={formik.values.name}
      />
      {/* Level */}
      <Select
        label="Select Level"
        name="level"
        value={formik.values.level}
        onChange={(e) => handleSelectInput({ name: "level", e })}
      >
        <Option value="beginner">Beginner</Option>
        <Option value="intermediate">Intermediate</Option>
        <Option value="advanced">Advanced</Option>
      </Select>
      {/* Type */}
      <Select
        label="Select Type"
        name="type"
        value={formik.values.type}
        onChange={(e) => handleSelectInput({ name: "type", e })}
      >
        <Option value="tech_stack">Tech Stack</Option>
        <Option value="tools">Tools</Option>
      </Select>
      {/* Icon */}
      <div className="col-span-1 md:col-span-2">
        {formik.values.icon ? (
          <div className="relative flex h-64 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-blue-gray-50">
            <img
              src={
                typeof formik.values.icon === "string"
                  ? `${import.meta.env.VITE_BACKEND_URL}/${formik.values.icon}`
                  : URL.createObjectURL(formik.values.icon)
              }
              alt="Preview"
              className="h-full w-auto rounded-lg object-cover"
            />
            <IconButton
              type="button"
              variant="gradient"
              color="red"
              onClick={() => formik.setFieldValue("icon", null)}
              className="bg-opacity-70 backdrop-blur-sm !absolute bottom-2 right-2"
            >
              <IoTrashOutline className="h-4 w-4" />
            </IconButton>
          </div>
        ) : (
          <label
            htmlFor="icon"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <AiOutlineCloudUpload className="mb-4 h-8 w-8 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">SVG (MAX. 800x400px)</p>
            </div>
            <input
              id="icon"
              name="icon"
              type="file"
              className="hidden"
              accept="image/svg+xml"
              required
              onChange={(e) => formik.setFieldValue("icon", e.target.files[0])}
            />
          </label>
        )}
      </div>
    </form>
  );
};

FormSkill.propTypes = {
  formik: PropTypes.object,
  handleFormInput: PropTypes.func,
  handleSelectInput: PropTypes.func,
};

export default FormSkill;

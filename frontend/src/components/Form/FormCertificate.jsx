import propTypes from "prop-types";
import { Input, Select, Option, IconButton } from "@material-tailwind/react";
import { getYear } from "date-fns";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";

const FormCertificate = ({ form, setForm }) => {
  const currentYear = getYear(new Date());
  const years = Array.from({ length: 10 }, (_, i) =>
    (currentYear - i).toString()
  );
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: String(value) }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
    }
  };
  return (
    <>
      <div className="md:col-span-2 col-span-1 py-1">
        <div className="flex w-full items-center justify-center">
          {form.image ? (
            <div className="relative flex h-64 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-blue-gray-50">
              <img
                src={
                  typeof form.image === "string"
                    ? `${import.meta.env.VITE_BACKEND_URL}/${form.image}`
                    : URL.createObjectURL(form.image)
                }
                alt="Preview"
                className="h-full w-auto rounded-lg object-cover"
              />
              <IconButton
                type="button"
                variant="gradient"
                color="red"
                onClick={() => setForm((prev) => ({ ...prev, image: null }))}
                className="bg-opacity-70 backdrop-blur-sm !absolute bottom-2 right-2"
              >
                <IoTrashOutline className="h-4 w-4" />
              </IconButton>
            </div>
          ) : (
            <label
              htmlFor="dropzone-file"
              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <AiOutlineCloudUpload className="mb-4 h-8 w-8 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG, or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                name="image"
                type="file"
                className="hidden"
                accept="image/*"
                required
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>
      </div>
      <div className="py-1">
        <Input
          id="name"
          name="name"
          type="text"
          label="Name"
          required
          value={form.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>
      <div className="py-1">
        <Input
          id="issuer"
          name="issuer"
          type="text"
          label="Issuer"
          required
          value={form.issuer || ""}
          onChange={(e) => handleChange("issuer", e.target.value)}
        />
      </div>
      <div className="py-1">
        <Select
          value={form.year || ""}
          id="year"
          name="year"
          onChange={(value) => handleChange("year", value)}
          label="Year"
          required
          menuProps={{
            className: "max-h-48 overflow-y-auto no-scrollbar",
          }}
        >
          {years.map((year, index) => (
            <Option key={index} value={year}>
              {year}
            </Option>
          ))}
        </Select>
      </div>
    </>
  );
};

FormCertificate.propTypes = {
  form: propTypes.object,
  setForm: propTypes.func,
};

export default FormCertificate;

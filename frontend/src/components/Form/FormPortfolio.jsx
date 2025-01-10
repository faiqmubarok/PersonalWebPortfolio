import PropTypes from "prop-types";
import {
  Input,
  Select,
  Option,
  Button,
  Textarea,
  IconButton,
} from "@material-tailwind/react";
import { IoIosAdd } from "react-icons/io";
import { IoTrashOutline } from "react-icons/io5";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useState } from "react";

const FormPortfolio = ({ form, setForm }) => {
  // State untuk preview image
  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle paragraphs dengan enter
  const handleParagraphsChange = (e) => {
    const inputValue = e.target.value;

    // Memisahkan input menjadi array berdasarkan baris baru tanpa menghapus baris kosong di tampilan.
    const paragraphs = inputValue.split("\n");

    // Memperbarui state form dengan array paragraf
    setForm((prevForm) => ({
      ...prevForm,
      paragraphs,
    }));
  };

  // Tambahkan pada bagian handleImageUpload dan handleRemoveImage
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Preview images baru
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviewUrls]);

    // Pastikan hanya menambahkan file baru ke form.images
    setForm((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...files],
    }));
  };

  const handleRemoveImage = (index) => {
    const newImages = [...(form.images || [])];

    // Hapus item berdasarkan apakah itu file atau URL
    newImages.splice(index, 1);

    // Hapus URL preview dari state previewImages
    const newPreviewUrls = [...previewImages];
    newPreviewUrls.splice(index, 1);

    // Perbarui state
    setPreviewImages(newPreviewUrls);
    setForm((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  // Handle tech input
  const addTechField = () => {
    setForm((prev) => ({
      ...prev,
      tech: [...(prev.tech || []), ""],
    }));
  };

  const updateTechField = (index, value) => {
    setForm((prev) => {
      const newTech = [...(prev.tech || [])];
      newTech[index] = value;
      return {
        ...prev,
        tech: newTech,
      };
    });
  };

  const removeTechField = (index) => {
    setForm((prev) => {
      const newTech = [...(prev.tech || [])];
      newTech.splice(index, 1);
      return {
        ...prev,
        tech: newTech,
      };
    });
  };

  return (
    <>
      {/* Name */}
      <div className="py-1">
        <Input
          id="name"
          type="text"
          name="name"
          label="Name"
          autoComplete="off"
          value={form?.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />
      </div>
      {/* Type */}
      <div className="py-1">
        <Select
          id="type"
          name="type"
          label="Type"
          value={form?.type || ""}
          onChange={(value) => handleChange("type", value)}
          required
        >
          <Option value="web_app">Web App</Option>
          <Option value="ui/ux_design">UI/UX Design</Option>
        </Select>
      </div>
      {/* Client */}
      <div className="py-1">
        <Input
          id="client"
          name="client"
          type="text"
          label="Client"
          value={form?.client || ""}
          onChange={(e) => handleChange("client", e.target.value)}
        />
      </div>
      {/* Link */}
      <div className="py-1">
        <Input
          id="link"
          name="link"
          type="url"
          label="Project Link"
          value={form?.link || ""}
          onChange={(e) => handleChange("link", e.target.value)}
        />
      </div>
      {/* Tech */}
      <div className="md:col-span-2 py-1">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Technologies
          </label>
          {form?.tech?.length !== 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(form?.tech || []).map((tech, index) => (
                <div key={index} className="relative">
                  <Input
                    id={`tech-${index}`}
                    name={`tech-${index}`}
                    type="text"
                    value={tech}
                    onChange={(e) => updateTechField(index, e.target.value)}
                    className="flex-1"
                    containerProps={{ className: "min-w-0" }}
                  />
                  <IconButton
                    color="red"
                    variant="text"
                    size="sm"
                    onClick={() => removeTechField(index)}
                    className="p-2 !absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <IoTrashOutline className="w-4 h-4" />
                  </IconButton>
                </div>
              ))}
            </div>
          )}
          <Button
            size="sm"
            onClick={addTechField}
            className="flex items-center gap-2 normal-case font-normal"
          >
            <IoIosAdd className="w-4 h-4" />
            Add Technology
          </Button>
        </div>
      </div>
      {/* Gambar */}
      <div className="py-1 md:col-span-2">
        <div className="space-y-4">
          <label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center py-5">
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
              name="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
          </label>
          {/* Preview Gambar */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {(form?.images || []).map((image, index) => (
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                key={index}
                className="relative aspect-video group"
              >
                <img
                  src={
                    typeof image === "string"
                      ? `${import.meta.env.VITE_BACKEND_URL}/${image}`
                      : URL.createObjectURL(image)
                  }
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-red-100 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <IoTrashOutline className="w-4 h-4 text-red-700" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Paragraphs */}
      <div className="py-1 md:col-span-2">
        <Textarea
          label="Paragraphs"
          name="paragraphs"
          id="paragraphs"
          value={form?.paragraphs?.join("\n") || ""}
          onChange={handleParagraphsChange}
          required
          rows={10}
        />
      </div>
    </>
  );
};

FormPortfolio.propTypes = {
  form: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.oneOf(["web_app", "ui/ux_design"]),
    client: PropTypes.string,
    tech: PropTypes.arrayOf(PropTypes.string),
    images: PropTypes.arrayOf(PropTypes.any),
    link: PropTypes.string,
    paragraphs: PropTypes.arrayOf(PropTypes.string),
  }),
  setForm: PropTypes.func.isRequired,
};

export default FormPortfolio;

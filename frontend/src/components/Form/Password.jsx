import { Typography, Input } from "@material-tailwind/react";
import propTypes from "prop-types";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Password = ({ value, handleChange, name, typography }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Typography
        variant="small"
        color="blue-gray"
        className="-mb-3 font-medium"
      >
        {typography}
      </Typography>
      <div className="relative w-full">
        <Input
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          size="lg"
          placeholder="••••••••"
          className="!border-t-blue-gray-200 focus:!border-t-gray-900 placeholder:opacity-100"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? (
            <IoMdEye className="w-4 h-4" />
          ) : (
            <IoMdEyeOff className="w-4 h-4" />
          )}
        </button>
      </div>
    </>
  );
};

Password.propTypes = {
  value: propTypes.string,
  handleChange: propTypes.func,
  name: propTypes.string,
  typography: propTypes.string,
};

export default Password;

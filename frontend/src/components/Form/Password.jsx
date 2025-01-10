import { Typography, Input } from "@material-tailwind/react";
import propTypes from "prop-types";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdError } from "react-icons/md";

const Password = ({ value, handleChange, name, typography, error }) => {
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
          error={error ? true : false}
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
          aria-label="Toggle password visibility"
          tabIndex="-1" 
          aria-hidden="true"
        >
          {showPassword ? (
            <IoMdEye className="w-4 h-4" />
          ) : (
            <IoMdEyeOff className="w-4 h-4" />
          )}
        </button>
      </div>
      {error && (
        <Typography
          color="red"
          className="flex items-center gap-2 text-xs font-normal"
        >
          <MdError className="w-4 h-4" />
          {error}
        </Typography>
      )}
    </>
  );
};

Password.propTypes = {
  value: propTypes.string,
  handleChange: propTypes.func,
  name: propTypes.string,
  typography: propTypes.string,
  error: propTypes.string,
};

export default Password;

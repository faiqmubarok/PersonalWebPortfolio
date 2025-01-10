import { Button, Typography, Input } from "@material-tailwind/react";
import images from "../../images";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "../../context/AlertContext";
import Password from "../../components/Form/Password";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { useFormik } from "formik";
import { useLogin } from "../../api/auth";

const Login = () => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const { adminLoggedIn } = useAuth();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async () => {
      const formData = formik.values;
      login(formData);
    },
  });

  const { mutate: login } = useLogin({
    onSuccess: (data) => {
      showAlert("success", data.message);
      const accessToken = data.accessToken;
      sessionStorage.setItem("accessToken", accessToken);

      // Set token di header axiosInstance untuk request selanjutnya
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
      adminLoggedIn(formik.values.email);
      navigate("/dashboard");
      formik.resetForm();
    },
    onError: (error) => {
      console.log(error);
      showAlert("error", error.response?.data?.message || "Terjadi kesalahan");
    },
  });

  const handleChange = (e) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };

  return (
    <section className="p-2.5 md:p-4 lg:p-8 flex gap-4 min-h-screen no-scrollbar">
      <div className="w-full lg:w-3/5 flex flex-col justify-center items-center -mt-10 lg:-mt-0">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">
            Sign In
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-base font-normal"
          >
            You cannot access this page, please sign-in first.
          </Typography>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
        >
          <div className="mb-6 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              <label htmlFor="email">Your email</label>
            </Typography>
            <Input
              size="lg"
              id="email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={(e) => handleChange(e)}
              placeholder="Email Address"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 placeholder:opacity-100"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Password
              name={"password"}
              value={formik.values.password}
              handleChange={(e) => handleChange(e)}
              typography={"Password"}
            />
          </div>
          <Button
            className="text-sm"
            variant="gradient"
            type="submit"
            fullWidth
          >
            Sign In
          </Button>
        </form>
        <Link
          to={"/auth/forgot-password"}
          className="text-sm hover:underline mt-4"
        >
          Forgot Password?
        </Link>
      </div>
      <div className="w-2/5 hidden lg:block">
        <img
          src={images.pattern}
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </section>
  );
};

export default Login;
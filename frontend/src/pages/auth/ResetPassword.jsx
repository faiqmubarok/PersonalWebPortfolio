import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAlert } from "../../context/AlertContext";
import { useResetPassword } from "../../api/auth";
import Password from "../../components/Form/Password";

const INITIAL_FORM = {
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password harus memiliki minimal 8 karakter")
    .required("Password wajib diisi"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Konfirmasi password tidak sesuai")
    .required("Konfirmasi password wajib diisi"),
});

const ResetPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: INITIAL_FORM,
    validationSchema,
    onSubmit: async () => {
      resetPassword({ credentials: formik.values, token });
    },
  });

  const { mutate: resetPassword } = useResetPassword({
    onSuccess: (data) => {
      showAlert("success", data.message);
      formik.resetForm();
      navigate("/auth/sign-in");
    },
    onError: (error) => {
      console.log(error);
      showAlert("error", error.response?.data?.message || "Terjadi kesalahan");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center mt-4"
        >
          <Typography variant="h3" color="white" className="text-2xl">
            Reset Password
          </Typography>
        </CardHeader>
        <form onSubmit={formik.handleSubmit}>
          <CardBody className="flex flex-col gap-4">
            <Password
              name={"password"}
              value={formik.values.password}
              handleChange={(e) => handleChange(e)}
              typography={"Password"}
              error={formik.errors.password && formik.touched.password ? formik.errors.password : null}
            />
            <Password
              name={"confirmPassword"}
              value={formik.values.confirmPassword}
              handleChange={(e) => handleChange(e)}
              typography={"Confirm Password"}
              error={formik.errors.confirmPassword && formik.touched.confirmPassword ? formik.errors.confirmPassword : null}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button type="submit" variant="gradient" fullWidth>
              Change Password
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ResetPassword;
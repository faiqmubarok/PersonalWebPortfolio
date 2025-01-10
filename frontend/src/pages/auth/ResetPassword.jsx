import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import Password from "../../components/Form/Password";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAlert } from "../../context/AlertContext";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const [formPassword, setFormPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormPassword({ ...formPassword, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/reset-password`,
        formPassword,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showAlert("success", response.data.message);
      console.log(response.data);
      if (response.status === 200) {
        navigate("/auth/sign-in");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      showAlert("error", error?.response?.data.message);
    }
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
        <form onSubmit={handleChangePassword}>
          <CardBody className="flex flex-col gap-4">
            <Password
              name={"password"}
              value={formPassword.password}
              handleChange={(e) => handleChange(e)}
              typography={"Password"}
            />
            <Password
              name={"confirmPassword"}
              value={formPassword.confirmPassword}
              handleChange={(e) => handleChange(e)}
              typography={"Confirm Password"}
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

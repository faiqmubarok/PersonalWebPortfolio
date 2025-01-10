import {
  Card,
  CardBody,
  IconButton,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../context/AlertContext";
import { IoIosArrowBack } from "react-icons/io";
import { useFetchResetLink } from "../../api/auth";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const {
    mutate: sendResetLink,
    isPending,
    isError,
    data,
  } = useFetchResetLink({
    onSuccess: (data) => {
      showAlert("success", data.message);
    },
    onError: (error) => {
      showAlert("error", error.response?.data?.message || "Terjadi kesalahan");
      console.log(error);
    },
  });

  const handleRequestReset = async () => sendResetLink();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 relative">
      <Card className="w-full max-w-lg p-4 shadow-lg relative">
        <IconButton
          onClick={() => navigate(-1)}
          className="!absolute top-6 left-6"
          size="md"
          variant="text"
        >
          <IoIosArrowBack className="w-5 h-5 text-blue-gray-500" />
        </IconButton>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="font-bold mb-4">
            Forgot Password
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="mb-6 text-sm"
          >
            Click the button below to send a password reset link to your email.
          </Typography>
          <Button
            onClick={() => handleRequestReset()}
            size="lg"
            fullWidth
            loading={isPending}
            className="mb-4 ring-0 text-center flex items-center justify-center"
          >
            Send Reset Link
          </Button>
          {data?.message && (
            <div
              className={`p-4 rounded-lg bg-green-500 bg-opacity-20 text-green-900 text-sm mt-4 ${
                isError ? "bg-red-500 bg-opacity-20 text-red-900" : ""
              }`}
            >
              {data?.message}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ForgotPassword;

import { useState } from "react";
import {
  Card,
  CardBody,
  IconButton,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../context/AlertContext";
import { IoIosArrowBack } from "react-icons/io";

const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const sendResetLink = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/send-reset-password`
      );
      setMessage(response?.data.message);
      showAlert("success", response?.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Terjadi kesalahan");
      setError(true);
      showAlert("error", error.response?.data?.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

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
            onClick={sendResetLink}
            size="lg"
            fullWidth
            loading={loading}
            className="mb-4 ring-0 text-center flex items-center justify-center"
          >
            Send Reset Link
          </Button>
          {message && (
            <div className={`p-4 rounded-lg bg-green-500 bg-opacity-20 text-green-900 text-sm mt-4 ${error ? "bg-red-500 bg-opacity-20 text-red-900" : ""}`}>
              {message}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ForgotPassword;

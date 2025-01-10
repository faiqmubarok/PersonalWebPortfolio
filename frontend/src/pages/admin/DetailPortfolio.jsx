import { useState, useEffect, useCallback } from "react";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { useParams, useNavigate } from "react-router-dom";
import { getPortfolio } from "../../api/portfolio";
import { useAlert } from "../../context/AlertContext";
import {
  CardHeader,
  Card,
  Carousel,
  Typography,
  Chip,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import Modal from "../../components/Modal/Modal";
import FormPortfolio from "../../components/Form/FormPortfolio";
import { updatePortfolio, deletePortfolio } from "../../api/portfolio";
import { GrProjects } from "react-icons/gr";
import { GoProjectSymlink } from "react-icons/go";
import { IoIosLink } from "react-icons/io";
import { RiEditBoxLine } from "react-icons/ri";
import { IoTrashOutline } from "react-icons/io5";

const INITIAL_FORM = {
  name: "",
  type: "web_app",
  client: "",
  tech: [],
  images: [],
  link: "",
  paragraphs: [],
};

const DetailPortfolio = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(INITIAL_FORM);
  const [form, setForm] = useState(INITIAL_FORM);
  const { showAlert } = useAlert();
  const { setBreadcrumbs, setCurrentTitle } = useBreadcrumb();
  const [modalOpen, setModalOpen] = useState(false);
  const [typeAction, setTypeAction] = useState("update");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let response;

      if (typeAction === "update") {
        response = await updatePortfolio(form?._id, form);
      } else if (typeAction === "delete") {
        response = await deletePortfolio(form?._id);
      }

      setModalOpen(false);
      setForm(INITIAL_FORM);
      showAlert("success", response?.message);

      if (typeAction === "delete") {
        navigate("/portfolio-admin");
      }
    } catch (error) {
      console.error(error);
      showAlert("error", error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentTitle("Detail Portfolio");
    setBreadcrumbs([
      { name: "Portfolio", path: "/portfolio-admin" },
      { name: "Detail Portfolio", path: `/portfolio-admin/${id}` },
    ]);
  }, [setBreadcrumbs, setCurrentTitle, id]);

  const fetchPortfolio = useCallback(async () => {
    try {
      const response = await getPortfolio(id);
      setPortfolio(response);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const formatText = (text) =>
    text
      ?.split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const ensureLink = (link) =>
    link?.startsWith("http://") || link?.startsWith("https://")
      ? link
      : `https://${link}`;

  return (
    <>
      <div className="pt-6">
        <Card>
          <CardHeader color="gray" className="aspect-video rounded-md mb-6">
            <Carousel
              navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                  {new Array(length).fill("").map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 cursor-pointer rounded-2xl ${
                        activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                      }`}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
              )}
            >
              {portfolio.images.map((image, index) => (
                <img
                  key={index}
                  loading="lazy"
                  src={`${import.meta.env.VITE_BACKEND_URL}/${image}`}
                  alt={`Portfolio Image ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              ))}
            </Carousel>
          </CardHeader>
          <CardBody>
            <Typography variant="h4" className="font-bold mb-8">
              {portfolio.name}
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <Typography variant="h6" className="font-semibold">
                  Description
                </Typography>
                {portfolio.paragraphs.map((paragraph, index) => (
                  <Typography key={index} className="text-justify">
                    {paragraph}
                  </Typography>
                ))}
              </div>
              <div className="space-y-4">
                {[
                  [
                    "Type",
                    GrProjects,
                    formatText(portfolio.type) || "Not Specified",
                  ],
                  [
                    "Client",
                    GoProjectSymlink,
                    portfolio.client || "Not Specified",
                  ],
                  [
                    "Link",
                    IoIosLink,
                    portfolio.link ? (
                      <a
                        href={ensureLink(portfolio.link)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        {portfolio.link}
                      </a>
                    ) : (
                      "No link provided"
                    ),
                  ],
                ].map(([label, Icon, value], index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Icon className="w-10 h-10 text-blue-gray-900 rounded-md p-3 bg-blue-gray-50" />
                    <div className="space-y-0.5">
                      <Typography variant="h6" className="font-semibold">
                        {label} :
                      </Typography>
                      <Typography variant="small">{value}</Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4 mb-4">
              <Typography variant="h6" className="font-semibold">
                Technology Used
              </Typography>
              <div className="flex flex-wrap gap-4 md:max-w-sm xl:max-w-xl">
                {portfolio.tech.map((tech, index) => (
                  <Chip
                    key={index}
                    value={tech}
                    color="blue-gray"
                    variant="ghost"
                    size="sm"
                  />
                ))}
              </div>
            </div>
          </CardBody>
          <CardFooter className="flex items-center gap-4 md:justify-end w-full border border-t-blue-gray-50">
            <Button
              color="blue-gray"
              variant="gradient"
              className="flex items-center gap-3"
              onClick={() => {
                setForm(portfolio);
                setModalOpen(true);
                setTypeAction("update");
              }}
            >
              <RiEditBoxLine className=" w-4 h-4" /> Edit
            </Button>
            <Button
              color="red"
              variant="gradient"
              className="flex items-center gap-3"
              onClick={() => {
                setForm(portfolio);
                setModalOpen(true);
                setTypeAction("delete");
              }}
            >
              <IoTrashOutline className=" w-4 h-4" /> Delete
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Modal
        headerText={
          typeAction === "update" ? "Update Portfolio" : "Delete Portfolio"
        }
        open={modalOpen}
        handleOpen={() => setModalOpen(!modalOpen)}
        footer={
          <div
            className={`flex space-x-4 w-full ${
              typeAction === "delete" ? "justify-center" : "justify-end"
            }`}
          >
            {typeAction === "delete" && (
              <Button
                variant="outlined"
                color="red"
                onClick={() => setModalOpen(!modalOpen)}
                className="w-32"
              >
                Cancel
              </Button>
            )}
            <Button
              variant="gradient"
              loading={loading}
              disabled={loading}
              type="submit"
              color={typeAction !== "delete" ? "black" : "green"}
              onClick={handleSendForm}
              className="w-32 flex items-center justify-center gap-3 focus:ring-0 normal-case py-2.5 font-medium text-sm"
            >
              {typeAction === "update" ? "Save" : "Delete"}
            </Button>
          </div>
        }
      >
        {typeAction !== "delete" ? (
          <form onSubmit={handleSendForm}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 overflow-y-auto no-scrollbar max-h-[60vh]">
              <FormPortfolio form={form} setForm={setForm} />
            </div>
          </form>
        ) : (
          <div className="space-y-2">
            <p className="text-center text-gray-600">
              Are you sure you want to delete the following portfolio?
            </p>
            <Typography
              variant="h6"
              color="blue-gray"
              className="text-center text-black font-semibold"
            >
              {form?.name}?
            </Typography>
            <p className="text-center text-gray-600">
              This action cannot be undone
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default DetailPortfolio;

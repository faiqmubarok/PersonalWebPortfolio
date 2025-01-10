import DefaultTable from "../../Table/DefaultTable";
import ListTableEducationExperience from "../../List/ListTableEducationExperience";
import Pagination from "../../Pagination/Pagination";
import { useState, useEffect, useCallback } from "react";
import useDebounce from "../../../hooks/useDebounce";
import { Search, Filter } from "../../Search/Search";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { IoIosAdd } from "react-icons/io";
import { GrClear } from "react-icons/gr";
import Modal from "../../Modal/Modal";
import FormEducationExperience from "../../Form/FormEducationExperience";
import {
  createExperience,
  getExperiences,
  updateExperience,
  deleteExperience,
} from "../../../api/experience";
import { useAlert } from "../../../context/AlertContext";

const INITIAL_FORM = {
  company: "",
  role: "",
  type: "experience",
  startMonth: "",
  startYear: "",
  endMonth: "",
  endYear: "",
};

const EducationExperience = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [experienceData, setExperienceData] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, 500);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typeAction, setTypeAction] = useState("create");
  const { showAlert } = useAlert();
  const listFilter = [
    { label: "All", value: "all" },
    { label: "Education", value: "education" },
    { label: "Experience", value: "experience" },
  ];

  const handleResetButton = () => {
    setSearch("");
    setFilter("all");
  };

  const getExperiencesData = useCallback(async () => {
    try {
      const response = await getExperiences({
        page: page,
        filter: filter,
        search: debouncedValue,
        limit: 5,
      });
      setExperienceData(response?.data);
      setTotalPage(response?.totalPages);
      setTotalData(response?.totalData);
    } catch (error) {
      console.log(error);
    }
  }, [page, filter, debouncedValue]);

  const handleSendForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let response;

      if (typeAction === "create") {
        response = await createExperience(form);
      } else if (typeAction === "update") {
        response = await updateExperience(form._id, form);
      } else if (typeAction === "delete") {
        response = await deleteExperience(form._id);
      }

      setModalOpen(false);
      setForm(INITIAL_FORM);
      showAlert("success", response.message);
      setPage(1);
      getExperiencesData();
    } catch (error) {
      console.log(error);
      showAlert("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getExperiencesData();
  }, [getExperiencesData]);

  return (
    <>
      <div className="mt-14 mb-10 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-5 p-6">
            <Typography variant="h6" color="white">
              Education & Experience
            </Typography>
          </CardHeader>
          <CardBody className="p-0">
            {/* Toolbar */}
            <div className="px-4 mb-6 shadow-sm pb-5">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="w-full md:max-w-sm xl:max-w-md">
                  <Search
                    id="search-experience"
                    name="search-experience"
                    search={search}
                    setSearch={setSearch}
                    placeholder={"Search by company or role"}
                  >
                    <Filter
                      listFilter={listFilter}
                      filter={filter}
                      setFilter={setFilter}
                    />
                  </Search>
                </div>
                <div className="grid grid-cols-2 md:flex md:justify-end gap-4 w-full">
                  <Button
                    color="blue-gray"
                    variant="outlined"
                    size="sm"
                    fullWidth
                    className="flex items-center justify-center gap-3 focus:ring-0 normal-case py-2.5 font-medium text-sm md:w-fit shrink-0"
                    onClick={() => {
                      setModalOpen(true);
                      setForm(INITIAL_FORM);
                      setTypeAction("create");
                    }}
                  >
                    <IoIosAdd className="w-4 h-4" />
                    Create New
                  </Button>
                  <Button
                    color="blue-gray"
                    variant="outlined"
                    size="sm"
                    fullWidth
                    className="flex items-center justify-center gap-3 focus:ring-0 normal-case py-2.5 font-medium text-sm md:w-fit shrink-0"
                    onClick={handleResetButton}
                  >
                    <GrClear className="w-4 h-4 " />
                    Reset
                  </Button>
                </div>
              </div>
              {debouncedValue && (
                <p className="mt-4 text-sm">
                  search data with keyword &quot;{debouncedValue}&quot;
                </p>
              )}
            </div>
            <DefaultTable
              listHeader={[
                "Company / Institution",
                "Role / Major",
                "Type",
                "Period",
                "Action",
              ]}
              loading={loading}
            >
              {experienceData.map((item, index) => (
                <ListTableEducationExperience
                  key={index}
                  itemData={item}
                  setForm={setForm}
                  setModalOpen={setModalOpen}
                  setTypeAction={setTypeAction}
                  className={`py-4 px-6 whitespace-nowrap ${
                    index === experienceData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`}
                />
              ))}
            </DefaultTable>
          </CardBody>
          <CardFooter className="flex justify-between items-center border border-t mt-6">
            <Typography variant="small" color="gray" className="font-normal">
              {totalData} items found
            </Typography>
            <Pagination page={page} setPage={setPage} totalPage={totalPage} />
          </CardFooter>
        </Card>
      </div>
      <Modal
        headerText={
          typeAction === "create"
            ? "Create New Experience/Education"
            : typeAction === "update"
            ? "Update Experience/Education"
            : "Delete"
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
              {typeAction === "create"
                ? "Create"
                : typeAction === "update"
                ? "Save"
                : "Delete"}
            </Button>
          </div>
        }
      >
        {typeAction !== "delete" ? (
          <form onSubmit={handleSendForm}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 overflow-y-auto no-scrollbar max-h-[60vh]">
              <FormEducationExperience form={form} setForm={setForm} />
            </div>
          </form>
        ) : (
          <div className="space-y-2">
            <p className="text-center text-gray-600">
              Are you sure deleted the following company data
            </p>
            <Typography
              variant="h6"
              color="blue-gray"
              className="text-center text-black font-semibold"
            >
              {form?.company}?
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

export default EducationExperience;

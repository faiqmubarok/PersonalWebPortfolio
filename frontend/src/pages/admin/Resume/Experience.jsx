import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Search, Filter } from "../../../components/Search/Search";
import DefaultTable from "../../../components/Table/DefaultTable";
import ListExperience from "../../../components/List/ListExperience";
import Modal from "../../../components/Modal/Modal";
import Pagination from "../../../components/Pagination/Pagination";
import FormExperience from "../../../components/Form/FormExperience";
import useDebounce from "../../../hooks/useDebounce";
import { useDelete } from "../../../context/ConfirmDeleteContext";
import { useAlert } from "../../../context/AlertContext";
import { useFormik } from "formik";
import {
  useFetchExperience,
  useCreateExperience,
  useUpdateExperience,
} from "../../../api/experience";
import { IoIosAdd } from "react-icons/io";
import { GrClear } from "react-icons/gr";

const listFilter = [
  { label: "All", value: "all" },
  { label: "Education", value: "education" },
  { label: "Experience", value: "experience" },
];

const INITIAL_VALUES = {
  id: null,
  company: "",
  role: "",
  type: "experience",
  startMonth: "",
  startYear: "",
  endMonth: "",
  endYear: "",
};

const Experience = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const filter = searchParams.get("filter_exp") || "all";
  const [page, setPage] = useState(
    parseInt(searchParams.get("page_exp") || "1", 10)
  );
  const [modalOpen, setModalOpen] = useState(false);
  const debouncedValue = useDebounce(search, 500);
  const { showAlert } = useAlert();
  const askConfirm = useDelete();

  const handleSuccess = (data) => {
    setModalOpen(false);
    refetchExperiences();
    showAlert("success", data.data.message);
  };

  const handleError = (error) => showAlert("error", error.message);

  const {
    data: experiences,
    isLoading: isLoadingExperiences,
    refetch: refetchExperiences,
  } = useFetchExperience({
    page: page,
    search: debouncedValue,
    filter,
    onError: handleError,
  });

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: async () => {
      const { _id, ...rest } = formik.values;
      _id ? updateExperience({ ...rest, _id }) : createExperience(rest);
      formik.resetForm();
    },
  });

  const { mutate: createExperience, isLoading: createExperienceIsLoading } =
    useCreateExperience({
      onSuccess: handleSuccess,
      onError: handleError,
    });

  const { mutate: updateExperience, isLoading: updateExperienceIsLoading } =
    useUpdateExperience({
      onSuccess: handleSuccess,
      onError: handleError,
    });

  const handleDeleteButton = async (experienceId, experienceName) => {
    if (await askConfirm(experienceName)) {
      console.log("delete", experienceId);
    }
  };

  const handleResetButton = () => {
    setSearch("");
    setPage(1);
    setSearchParams({ filter_exp: "all", page: 1 });
  };

  const handleEditButton = (data) => {
    formik.setValues(data);
    setModalOpen(true);
  };

  const handlePageChange = (newPage) => {
    setSearchParams({
      page_exp: newPage,
    });
    setPage(newPage);
  };

  const handleFilterChange = (value) => {
    setSearchParams({ filter_exp: value, page: 1 });
    setPage(1);
  };

  const isLoading =
    isLoadingExperiences ||
    createExperienceIsLoading ||
    updateExperienceIsLoading;

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
                      handleFilterChange={handleFilterChange}
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
                      formik.resetForm();
                      setModalOpen(true);
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
              loading={isLoading}
            >
              {experiences?.data.map((item, index) => (
                <ListExperience
                  key={index}
                  itemData={item}
                  onEdit={handleEditButton}
                  onDelete={handleDeleteButton}
                  className={`py-4 px-6 whitespace-nowrap ${
                    index === experiences?.data.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`}
                />
              ))}
            </DefaultTable>
          </CardBody>
          <CardFooter className="flex justify-between items-center w-full py-4">
            <Typography variant="small" color="gray" className="font-normal">
              {experiences?.totalData} items found
            </Typography>
            <Pagination
              page={page}
              setPage={setPage}
              totalPage={experiences?.totalPages}
              handleQueryParams={handlePageChange}
            />
          </CardFooter>
        </Card>
      </div>
      <Modal
        headerText={formik.values._id ? "Edit Experience" : "Add Experience"}
        open={modalOpen}
        handleOpen={() => setModalOpen(false)}
        footer={
          <Button
            loading={isLoading}
            className="w-full md:w-fit"
            variant="gradient"
            type="submit"
            onClick={formik.handleSubmit}
          >
            Submit Experience
          </Button>
        }
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 overflow-y-auto no-scrollbar max-h-[60vh]">
            <FormExperience formik={formik} />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Experience;

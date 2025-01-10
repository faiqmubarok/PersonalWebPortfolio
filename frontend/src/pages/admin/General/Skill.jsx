import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import {
  Typography,
  TabsHeader,
  Tab,
  Tabs,
  Button,
} from "@material-tailwind/react";
import Modal from "../../../components/Modal/Modal";
import ListSkill from "../../../components/List/ListSkill";
import FormSkill from "../../../components/Form/FormSkill";
import Pagination from "../../../components/Pagination/Pagination";
import { useAlert } from "../../../context/AlertContext";
import { useDelete } from "../../../context/ConfirmDeleteContext";
import {
  useCreateSkill,
  useFetchSkills,
  useUpdateSkill,
  useDeleteSkill,
} from "../../../api/skill";

const filterList = [
  { label: "All", value: "" },
  { label: "Tech Stack", value: "tech_stack" },
  { label: "Tools", value: "tools" },
];

const INITIAL_VALUES = {
  name: "",
  type: "",
  level: "",
  icon: null,
  _id: null,
};

const Skill = () => {
  const { showAlert } = useAlert();
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "";
  const [page, setPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const [modalOpen, setModalOpen] = useState(false);
  const askConfirm = useDelete();

  const handleSuccess = (data) => {
    setModalOpen(false);
    refetchSkills();
    showAlert("success", data.data.message);
  };

  const handleError = (error) => showAlert("error", error.message);

  const {
    data,
    isLoading: skillsIsLoading,
    refetch: refetchSkills,
  } = useFetchSkills({
    filter,
    page,
    onError: handleError,
  });

  const { mutate: createSkill, isLoading: createSkillIsLoading } =
    useCreateSkill({
      onSuccess: handleSuccess,
      onError: handleError,
    });

  const { mutate: updateSkill, isLoading: updateSkillIsLoading } =
    useUpdateSkill({
      onSuccess: handleSuccess,
      onError: handleError,
    });

  const { mutate: deleteSkill } = useDeleteSkill({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: async () => {
      const { _id, ...rest } = formik.values;
      _id ? updateSkill({ ...rest, _id }) : createSkill(rest);
      formik.resetForm();
    },
  });

  const handleDelete = async (skillId, skillName) => {
    if (await askConfirm(skillName)) {
      deleteSkill(skillId);
    }
  };

  const onEditClick = (skill) => {
    formik.setValues(skill);
    setModalOpen(true);
  };

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  const handleSelectInput = ({ name, e }) => formik.setFieldValue(name, e);

  const handleFilterChange = (value) => {
    setSearchParams({ filter: value, page: 1 });
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setSearchParams({
      filter,
      page: newPage,
    });
    setPage(newPage);
  };

  const isLoading =
    skillsIsLoading || createSkillIsLoading || updateSkillIsLoading;

  return (
    <>
      <div>
        <Typography variant="h6" color="blue-gray" className="mb-3">
          Skills
        </Typography>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-center w-full justify-between mb-4">
          <Tabs className="max-w-sm w-full" value={filter}>
            <TabsHeader>
              {filterList.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  className="text-sm font-medium py-2"
                  onClick={() => handleFilterChange(value)}
                >
                  {" "}
                  {label}
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <Button
            onClick={() => {
              formik.resetForm();
              setModalOpen(true);
            }}
            className="w-full md:w-fit"
          >
            Add Skill
          </Button>
        </div>
        {/* Toolbar */}

        {/* Table */}
        <div className="overflow-x-scroll">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Skill", "Level", "Type", "Action"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-4 px-6 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-xs font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-4 px-6 text-sm text-blue-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              )}
              {data?.data.length === 0 && !isLoading && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-4 px-6 text-sm text-blue-gray-500"
                  >
                    No skills found
                  </td>
                </tr>
              )}
              {data?.data.map((skill, key) => {
                const className = `py-4 px-6 ${
                  key === data?.data.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;
                return (
                  <ListSkill
                    key={skill._id}
                    className={className}
                    skill={skill}
                    onEdit={onEditClick}
                    onDelete={handleDelete}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center w-full py-4">
          <Typography variant="small" color="gray" className="font-normal">
            {data?.pagination.totalData || 0} items found
          </Typography>
          <Pagination
            page={page}
            setPage={setPage}
            totalPage={data?.pagination.totalPages}
            handleQueryParams={handlePageChange}
          />
        </div>
        {/* Table */}
      </div>
      <Modal
        headerText={formik.values._id ? "Edit Skill" : "Add Skill"}
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
            Submit Skill
          </Button>
        }
      >
        <FormSkill
          formik={formik}
          handleFormInput={handleFormInput}
          handleSelectInput={handleSelectInput}
        />
      </Modal>
    </>
  );
};

export default Skill;
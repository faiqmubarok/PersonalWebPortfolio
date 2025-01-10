import {
  Card,
  CardHeader,
  CardFooter,
  Typography,
  CardBody,
  Button,
} from "@material-tailwind/react";
import { IoIosAdd } from "react-icons/io";
import { useState, useEffect, useCallback } from "react";
import useDebounce from "../../../hooks/useDebounce";
import DefaultTable from "../../Table/DefaultTable";
import ListTableOrganizationCommitte from "../../List/ListTableOrganizationCommitte";
import { useAlert } from "../../../context/AlertContext";
import {
  createOrganization,
  getOrganization,
  updateOrganization,
  deleteOrganization,
} from "../../../api/organization";
import Pagination from "../../Pagination/Pagination";
import FormOrganization from "../../Form/FormOrganization";
import Modal from "../../Modal/Modal";
import { Search } from "../../Search/Search";

const INITIAL_FORM = {
  name: "",
  position: "",
  startMonth: "",
  startYear: "",
  endMonth: "",
  endYear: "",
};

const OrganizationCommitte = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [organizationData, setOrganizationData] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typeAction, setTypeAction] = useState("create");
  const { showAlert } = useAlert();

  const getOrganizationData = useCallback(async () => {
    try {
      const response = await getOrganization({
        page: page,
        search: debouncedValue,
        limit: 5,
      });
      setOrganizationData(response?.data);
      setTotalPage(response?.totalPages);
      setTotalData(response?.totalData);
    } catch (error) {
      console.log(error);
    }
  }, [page, debouncedValue]);

  const handleSendForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let response;

      if (typeAction === "create") {
        response = await createOrganization(form);
      } else if (typeAction === "update") {
        response = await updateOrganization(form._id, form);
      } else if (typeAction === "delete") {
        response = await deleteOrganization(form._id);
      }

      setModalOpen(false);
      setForm(INITIAL_FORM);
      showAlert("success", response.message);
      setPage(1);
      getOrganizationData();
    } catch (error) {
      console.log(error);
      showAlert("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrganizationData();
  }, [getOrganizationData]);

  return (
    <>
      <div className="mt-14 mb-10 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-5 p-6">
            <Typography variant="h6" color="white">
              Organization & Committe
            </Typography>
          </CardHeader>
          <CardBody className="p-0">
            {/* Toolbar */}
            <div className="px-4 mb-6 shadow-sm pb-5">
              <div className="flex justify-between flex-col md:flex-row gap-6">
                <div className="w-full md:max-w-sm xl:max-w-md">
                  <Search
                    id="search-organization"
                    name="search-organization"
                    search={search}
                    setSearch={setSearch}
                    placeholder={"Search organization / position"}
                  />
                </div>
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
              </div>
              {debouncedValue && (
                <p className="mt-4 text-sm">
                  search data with keyword &quot;{debouncedValue}&quot;
                </p>
              )}
            </div>
            <DefaultTable
              listHeader={[
                "Organization / Event",
                "Position",
                "Period",
                "Action",
              ]}
              loading={loading}
            >
              {organizationData.map((item, index) => (
                <ListTableOrganizationCommitte
                  key={index}
                  itemData={item}
                  setForm={setForm}
                  setModalOpen={setModalOpen}
                  setTypeAction={setTypeAction}
                  className={`py-4 px-6 whitespace-nowrap ${
                    index === organizationData.length - 1
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
            ? "Create New Organization"
            : typeAction === "update"
            ? "Update Organization"
            : "Delete Organization"
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
              <FormOrganization form={form} setForm={setForm} />
            </div>
          </form>
        ) : (
          <div className="space-y-2">
            <p className="text-center text-gray-600">
              Are you sure deleted the following name organization
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

export default OrganizationCommitte;

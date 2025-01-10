import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useAlert } from "../../context/AlertContext";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { Search, Filter } from "../../components/Search/Search";
import useDebounce from "../../hooks/useDebounce";
import { useState, useEffect, useCallback } from "react";
import { IoIosAdd } from "react-icons/io";
import { GrClear } from "react-icons/gr";
import Pagination from "../../components/Pagination/Pagination";
import CardPortfolio1 from "../../components/Card/CardPortfolio1";
import Modal from "../../components/Modal/Modal";
import FormPortfolio from "../../components/Form/FormPortfolio";
import { createPortfolio, getPortfolios } from "../../api/portfolio";

const INITIAL_FORM = {
  name: "",
  type: "web_app",
  client: "",
  tech: [],
  images: [],
  link: "",
  paragraphs: [],
};

const Portfolio = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const debouncedValue = useDebounce(search, 500);
  const [portfolio, setPortfolio] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const { setBreadcrumbs, setCurrentTitle } = useBreadcrumb();
  const { showAlert } = useAlert();

  const listFilter = [
    { label: "All", value: "all" },
    { label: "Web App", value: "web_app" },
    { label: "UI/UX Design", value: "ui/ux_design" },
  ];

  const handleResetButton = () => {
    setSearch("");
    setFilter("all");
  };

  const fetchPortfolio = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getPortfolios({
        page,
        search: debouncedValue,
        filter,
        limit: 4,
      });
      setPortfolio(response?.data);
      setTotalData(response?.totalData);
      setTotalPage(response?.totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedValue, filter]);

  const handleCreatePortfolio = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await createPortfolio(form);
      showAlert("success", response?.message);
      setModalOpen(false);
      setForm(INITIAL_FORM);
      fetchPortfolio();
    } catch (err) {
      console.log(err);
      showAlert("error", err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentTitle("Portfolio");
    setBreadcrumbs([{ name: "Portfolio", path: "/portfolio-admin" }]);
  }, [setBreadcrumbs, setCurrentTitle]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-5 p-6">
            <Typography variant="h6" color="white">
              Portfolio
            </Typography>
          </CardHeader>
          <CardBody className="p-0">
            {/* Toolbar */}
            <div className="px-4 mb-6 shadow-sm pb-5">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="w-full md:max-w-sm xl:max-w-md">
                  <Search
                    id="search-portfolio"
                    name="search-portfolio"
                    search={search}
                    setSearch={setSearch}
                    placeholder={"Search portfolio..."}
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
            {/* List Card Here */}
            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4 px-4">
              {portfolio.length === 0 ? (
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="md:col-span-2 xl:col-span-4 mx-auto text-center font-normal"
                >
                  No Portfolio Found
                </Typography>
              ) : (
                portfolio.map((portfolio) => (
                  <CardPortfolio1 key={portfolio._id} portfolio={portfolio} />
                ))
              )}
            </div>
          </CardBody>
          <CardFooter className="flex justify-between items-center border border-t mt-5">
            <Typography variant="small" color="gray" className="font-normal">
              {totalData} items found
            </Typography>
            <Pagination page={page} setPage={setPage} totalPage={totalPage} />
          </CardFooter>
        </Card>
      </div>
      <Modal
        headerText={"Create Portfolio"}
        open={modalOpen}
        handleOpen={() => setModalOpen(!modalOpen)}
        footer={
          <div className={"flex space-x-4 w-full justify-end"}>
            <Button
              variant="gradient"
              loading={loading}
              disabled={loading}
              type="submit"
              color={"black"}
              onClick={handleCreatePortfolio}
              className="w-32 flex items-center justify-center gap-3 focus:ring-0 normal-case py-2.5 font-medium text-sm"
            >
              Create
            </Button>
          </div>
        }
      >
        <form onSubmit={handleCreatePortfolio}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 overflow-y-auto no-scrollbar max-h-[60vh]">
            <FormPortfolio form={form} setForm={setForm} />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Portfolio;

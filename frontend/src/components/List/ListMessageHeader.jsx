import {
  Typography,
  Input,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import propTypes from "prop-types";

const ListMessageHeader = ({
  search,
  setSearch,
  activeFilter,
  applyFilter,
}) => {
  const filterList = [
    { label: "All", value: "all" },
    { label: "Unread", value: "unread" },
    { label: "Read", value: "read" },
  ];
  return (
    <>
      <Typography className="mb-4 py-3" variant="h5" color="blue-gray">
        Inbox
      </Typography>
      <Input
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Tabs className="my-4" value={activeFilter}>
        <TabsHeader>
          {filterList.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              className="text-sm font-medium py-2"
              onClick={() => applyFilter({ value })}
            >
              {" "}
              {label}
            </Tab>
          ))}
        </TabsHeader>
      </Tabs>
    </>
  );
};

ListMessageHeader.propTypes = {
  search: propTypes.string,
  setSearch: propTypes.func,
  activeFilter: propTypes.string,
  applyFilter: propTypes.func,
};

export default ListMessageHeader;

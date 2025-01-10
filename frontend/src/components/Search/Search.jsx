import {
  IconButton,
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { IoIosSearch } from "react-icons/io";
import PropTypes from "prop-types";
import { VscFilter } from "react-icons/vsc";

// Parent Component
const Search = ({
  search,
  setSearch,
  placeholder = "Search...",
  children,
  name = "search",
  id = "search",
}) => {
  return (
    <div className="w-full max-w-md min-w-[300px]">
      <div className="relative mt-2">
        {children && (
          <div className="absolute inset-y-1 left-0 flex items-center border-e">
            {children}
          </div>
        )}
        <input
          type="text"
          name={name}
          id={id}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full bg-transparent placeholder:text-gray-400 text-slate-700 text-sm border border-slate-200 rounded-md ${
            children ? "pr-12 pl-[105px]" : "pr-12 pl-4"
          } py-2.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow`}
          placeholder={placeholder}
        />
        <IconButton size="sm" className="!absolute inset-y-1 right-1.5 p-0">
          <IoIosSearch className="w-4 h-4" />
        </IconButton>
      </div>
    </div>
  );
};

Search.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
  placeholder: PropTypes.string,
  children: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
};

// Filter Subcomponent
const Filter = ({ listFilter, filter, handleFilterChange }) => {
  return (
    <Menu>
      <MenuHandler>
        <Button
          size="sm"
          fullWidth
          variant="text"
          color="blue-gray"
          className="flex items-center justify-center gap-3 focus:ring-0 normal-case py-2.5 font-medium text-sm md:w-fit shrink-0 hover:bg-transparent hover:text-blue-gray-400"
        >
          <VscFilter className="w-4 h-4" />
          Filter
        </Button>
      </MenuHandler>
      <MenuList>
        {listFilter.map((item, index) => (
          <MenuItem
            className={`text-sm ${
              filter === item.value ? "text-blue-gray-800 font-medium" : ""
            }`}
            onClick={() => handleFilterChange(item.value)}
            key={index}
          >
            {item.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

Filter.propTypes = {
  listFilter: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export { Search, Filter };

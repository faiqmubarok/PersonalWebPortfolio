import { Typography } from "@material-tailwind/react";
import propTypes from "prop-types";
import { Suspense } from "react";

const DefaultTable = ({ listHeader = [], children, loading }) => {
  return (
    <div className="overflow-x-auto no-scrollbar px-4">
      <table className="w-full min-w-[640px] table-auto">
        <thead>
          <tr>
            {listHeader.map((header, index) => (
              <th
                key={`${header}-${index}`}
                className="border-b border-blue-gray-50 bg-blue-gray-50 py-4 px-6 text-left whitespace-nowrap"
              >
                <Typography
                  variant="small"
                  className="text-[12px] font-bold uppercase"
                  color="blue-gray"
                >
                  {header}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr className="bg-white border-b border-gray-100">
              <td
                colSpan={listHeader.length}
                className="text-center px-5 py-3 font-medium"
              >
                Loading...
              </td>
            </tr>
          ) : (children && children.length === 0) || children === undefined ? (
            <tr className="bg-white border-b border-gray-100">
              <td colSpan={listHeader.length} className="text-center px-5 py-3">
                No data found
              </td>
            </tr>
          ) : (
            <Suspense
              fallback={
                <tr className="bg-white border-b border-gray-100">
                  <td
                    colSpan={listHeader.length}
                    className="text-center px-5 py-3 font-medium"
                  >
                    Memuat...
                  </td>
                </tr>
              }
            >
              {children}
            </Suspense>
          )}
        </tbody>
      </table>
    </div>
  );
};

DefaultTable.propTypes = {
  listHeader: propTypes.arrayOf(propTypes.string),
  children: propTypes.node,
  loading: propTypes.bool,
};

export default DefaultTable;

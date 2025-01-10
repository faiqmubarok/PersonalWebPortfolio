import propTypes from "prop-types";

const PublicOrganization = ({ organization }) => {
  return (
    <tr className="bg-transparent border-b border-[#e3e3e3] dark:border-[#353535] text-sm">
      <td className="px-6 py-4 font-medium text-lightSecondary whitespace-nowrap dark:text-darkSecondary">
        {organization?.name}
      </td>
      <td className="px-6 py-4 font-medium text-lightSecondary whitespace-nowrap  dark:text-darkSecondary">
        {organization?.position}
      </td>
      <td className="px-6 py-4 font-medium text-lightSecondary whitespace-nowrap dark:text-darkSecondary">
        {`${organization?.startMonth.slice(0, 3)} ${organization?.startYear} ${
          organization?.endMonth === organization?.startMonth &&
          organization?.endYear === organization?.startYear
            ? ""
            : `-  ${
                organization?.endMonth && organization?.endYear === "Now"
                  ? "Now"
                  : `${organization?.endMonth.slice(0, 3)} ${
                      organization?.endYear
                    }`
              }`
        }`}
      </td>
    </tr>
  );
};

PublicOrganization.propTypes = {
  organization: propTypes.object,
};

export default PublicOrganization;

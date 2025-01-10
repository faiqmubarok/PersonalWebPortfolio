import { Input, Select, Option } from "@material-tailwind/react";
import { format, getYear } from "date-fns";
import propTypes from "prop-types";

const FormOrganization = ({ form, setForm }) => {
  const currentYear = getYear(new Date());
  const years = Array.from({ length: 10 }, (_, i) =>
    (currentYear - i).toString()
  );

  const endYearOptions = form?.startYear
    ? [
        "Now",
        ...Array.from({ length: currentYear - form.startYear + 1 }, (_, i) =>
          (currentYear - i).toString()
        ),
      ]
    : [];

  const months = Array.from({ length: 12 }, (_, i) =>
    format(new Date(0, i), "MMMM")
  );

  const monthOptions = ["Now", ...months];
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: String(value) }));
  };
  return (
    <>
      <div className="py-1">
        <Input
          type="text"
          label="Name Organization"
          required
          value={form.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </div>
      <div className="py-1">
        <Input
          type="text"
          label="Position"
          required
          value={form.position || ""}
          onChange={(e) => handleChange("position", e.target.value)}
        />
      </div>

      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="py-1">
          <Select
            value={form.startMonth || ""}
            onChange={(value) => handleChange("startMonth", value)}
            label="Select start month period"
            required
            menuProps={{
              className: "max-h-32 overflow-y-auto no-scrollbar",
            }}
          >
            {months.map((month, index) => (
              <Option key={index} value={month}>
                {month}
              </Option>
            ))}
          </Select>
        </div>
        <div className="py-1">
          <Select
            value={form.startYear || ""}
            onChange={(value) => handleChange("startYear", value)}
            label="Select start year period"
            required
            menuProps={{
              className: "max-h-32 overflow-y-auto no-scrollbar",
            }}
          >
            {years.map((year, index) => (
              <Option key={index} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="py-1">
          <Select
            key={form.endMonth}
            value={form.endMonth || ""}
            onChange={(value) => handleChange("endMonth", value)}
            label="Select end month period"
            disabled={!form.startMonth}
            menuProps={{
              className: "max-h-48 overflow-y-auto no-scrollbar",
            }}
          >
            {monthOptions.map((month, index) => (
              <Option key={index} value={month}>
                {month}
              </Option>
            ))}
          </Select>
        </div>
        <div className="py-1">
          <Select
            key={form.endYear}
            value={form.endYear}
            onChange={(value) => handleChange("endYear", value)}
            label="Select end year period"
            required
            disabled={!form.startYear}
            menuProps={{
              className: "max-h-48 overflow-y-auto no-scrollbar",
            }}
          >
            {endYearOptions?.map((year, index) => (
              <Option key={index} value={year}>
                {year}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    </>
  );
};

FormOrganization.propTypes = {
  form: propTypes.object.isRequired,
  setForm: propTypes.func.isRequired,
};

export default FormOrganization;

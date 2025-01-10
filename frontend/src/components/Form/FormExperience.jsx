import { Input, Select, Option } from "@material-tailwind/react";
import { format, getYear } from "date-fns";
import PropTypes from "prop-types";

const FormExperience = ({ formik }) => {
  const currentYear = getYear(new Date());
  const months = Array.from({ length: 12 }, (_, i) =>
    format(new Date(0, i), "MMMM")
  );

  const years = Array.from({ length: 10 }, (_, i) =>
    (currentYear - i).toString()
  );

  const monthOptions = ["Now", ...months];

  const endYearOptions = formik.values.startYear
    ? [
        "Now",
        ...Array.from(
          { length: currentYear - formik.values.startYear + 1 },
          (_, i) => (currentYear - i).toString()
        ),
      ]
    : [];

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  const handleSelectInput = ({ name, e }) => formik.setFieldValue(name, e);
  return (
    <>
      <div className="py-1">
        <Input
          label="Company/Instance"
          name="company"
          required
          value={formik.values.company}
          onChange={handleFormInput}
        />
      </div>
      <div className="py-1">
        <Input
          name="role"
          label="Role/Major"
          required
          value={formik.values.role}
          onChange={handleFormInput}
        />
      </div>
      <div className="py-1">
        <Select
          label="Select type"
          name="type"
          value={formik.values.type}
          onChange={(e) => handleSelectInput({ name: "type", e })}
          required
        >
          <Option value="experience">Experience</Option>
          <Option value="education">Education</Option>
        </Select>
      </div>
      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="py-1">
          <Select
            label="Select start month period"
            name="startMonth"
            value={formik.values.startMonth}
            onChange={(e) => handleSelectInput({ name: "startMonth", e })}
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
            value={formik.values.startYear}
            name="startYear"
            onChange={(e) => handleSelectInput({ name: "startYear", e })}
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
            name="endMonth"
            key={formik.values.endMonth}
            value={formik.values.endMonth}
            onChange={(e) => handleSelectInput({ name: "endMonth", e })}
            label="Select end month period"
            disabled={!formik.values.startMonth}
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
            key={formik.values.endYear}
            value={formik.values.endYear}
            name="endYear"
            onChange={(e) => handleSelectInput({ name: "endYear", e })}
            label="Select end year period"
            required
            disabled={!formik.values.startYear}
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

FormExperience.propTypes = {
  formik: PropTypes.object,
};

export default FormExperience;

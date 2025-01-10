import Organization from "../models/Organization.js";

export const getOrganization = async (req, res) => {
  try {
    const { page = 1, search, limit = 10 } = req.query;

    const queryFilter = {};

    if (search) {
      queryFilter.$or = [
        { name: { $regex: search, $options: "i" } },
        { position: { $regex: search, $options: "i" } },
      ];
    }

    const totalData = await Organization.countDocuments(queryFilter);

    const data = await Organization.find(queryFilter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({
      data,
      totalData,
      totalPages: Math.ceil(totalData / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

export const createOrganization = async (req, res) => {
  const { name, position, startMonth, startYear, endMonth, endYear } = req.body;

  try {
    const newOrganization = new Organization({
      name,
      position,
      startMonth,
      startYear,
      endMonth,
      endYear,
    });
    await newOrganization.save();

    res
      .status(201)
      .json({ message: "Data has been created successfully", newOrganization });
  } catch (error) {
    res.status(500).json({ message: "Error creating data", error });
  }
};

export const updateOrganization = async (req, res) => {
  const { id } = req.params;
  const { name, position, startMonth, startYear, endMonth, endYear } =
    req.body;

  try {
    const updateOrganization = await Organization.findByIdAndUpdate(
      id,
      { name, position, startMonth, startYear, endMonth, endYear },
      { new: true }
    );

    if (!updateOrganization) {
      return res
        .status(404)
        .json({ message: "Organization not found" });
    }

    res.status(200).json({ message: "Data has been updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating data", error });
  }
};

export const deleteOrganization = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteOrganization = await Organization.findByIdAndDelete(id);

    if (!deleteOrganization) {
      return res
        .status(404)
        .json({ message: "Organization not found" });
    }

    res.status(200).json({ message: "Data has been deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting data", error });
  }
};

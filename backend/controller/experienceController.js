import Experience from "../models/Experience.js";

export const getExperiences = async (req, res) => {
  try {
    const { page = 1, search, filter = "all", limit = 5 } = req.query;

    const queryFilter = {};

    if (filter !== "all") {
      queryFilter.type = filter;
    }

    if (search) {
      queryFilter.$or = [
        { company: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ];
    }

    const totalData = await Experience.countDocuments(queryFilter);

    const data = await Experience.find(queryFilter)
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

export const createExperience = async (req, res) => {
  const { company, role, type, startMonth, startYear, endMonth, endYear } =
    req.body;

  try {
    const newExperience = new Experience({
      company,
      role,
      type,
      startMonth,
      startYear,
      endMonth,
      endYear,
    });
    await newExperience.save();

    res
      .status(201)
      .json({ message: "Data has been created successfully", newExperience });
  } catch (error) {
    res.status(500).json({ message: "Error creating data", error });
  }
};

export const updateExperience = async (req, res) => {
  const { id } = req.params;
  const { company, role, type, startMonth, startYear, endMonth, endYear } =
    req.body;

  try {
    const updatedExperience = await Experience.findByIdAndUpdate(
      id,
      { company, role, type, startMonth, startYear, endMonth, endYear },
      { new: true }
    );

    if (!updatedExperience) {
      return res
        .status(404)
        .json({ message: "Experience/Education not found" });
    }

    res.status(200).json({ message: "Data has been updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating data", error });
  }
};

export const deleteExperience = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExperience = await Experience.findByIdAndDelete(id);

    if (!deletedExperience) {
      return res
        .status(404)
        .json({ message: "Experience/Education not found" });
    }

    res.status(200).json({ message: "Data has been deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting data", error });
  }
};

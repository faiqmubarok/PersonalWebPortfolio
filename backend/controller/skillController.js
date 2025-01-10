import Skill from "../models/Skill.js";
import fs from "fs";

export const createSkill = async (req, res) => {
  try {
    const { name, type, level } = req.body;
    const icon = req.file ? req.file.path : null;
    console.log(req.file);

    const newSkill = new Skill({ name, icon, type, level });
    await newSkill.save();
    res.status(201).json({ message: "Skill created successfully", newSkill });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating skill", error });
  }
};

export const getSkills = async (req, res) => {
  try {
    const { filter, page = 1, limit = 10 } = req.query;

    // Validasi nilai `page` dan `limit`
    const currentPage = Math.max(Number(page), 1); // Minimal 1
    const pageSize = Math.max(Number(limit), 1); // Minimal 1

    // Membuat query filter
    const query = filter ? { type: filter } : {};

    // Hitung total dokumen yang cocok dengan filter
    const totalData = await Skill.countDocuments(query);

    // Ambil data dengan pagination
    const data = await Skill.find(query)
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    // Kirim response
    res.status(200).json({
      data,
      pagination: {
        totalData,
        totalPages: Math.ceil(totalData / pageSize),
        page: currentPage,
        pageSize,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching skills", error });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, level } = req.body;
    const icon = req.file ? req.file.path : null;

    const skill = await Skill.findById(id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    if (icon && skill.icon) {
      fs.unlinkSync(skill.icon); // Hapus file lama jika ada
    }

    skill.name = name || skill.name;
    skill.icon = icon || skill.icon;
    skill.type = type || skill.type;
    skill.level = level || skill.level;

    await skill.save(); // Simpan perubahan
    res.status(200).json({ message: "Skill updated successfully", skill });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating skill", error });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    if (skill.icon) {
      fs.unlinkSync(skill.icon); // Hapus file lama jika ada
    }

    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting skill", error });
  }
};

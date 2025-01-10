import Certificate from "../models/Certificate.js";
import fs from "fs";

export const createCertificate = async (req, res) => {
  const { name, issuer, year } = req.body;
  const imagePath = req.file ? req.file.path : null;

  try {
    const newCertificate = new Certificate({
      name,
      issuer,
      year,
      image: imagePath,
    });
    await newCertificate.save();

    res
      .status(201)
      .json({ message: "Data has been created successfully", newCertificate });
  } catch (error) {
    res.status(500).json({ message: "Error creating data", error });
  }
};

export const updateCertificate = async (req, res) => {
  const { id } = req.params;
  const { name, issuer, year } = req.body;
  const imagePath = req.file ? req.file.path : null;

  try {
    const certificate = await Certificate.findById(id);

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    if (imagePath && certificate.image) {
      // Hapus file lama jika ada
      fs.unlinkSync(certificate.image);
    }

    const updatedCertificate = await Certificate.findByIdAndUpdate(
      id,
      {
        name: name || certificate.name,
        issuer: issuer || certificate.issuer,
        year: year || certificate.year,
        image: imagePath || certificate.image,
      },
      { new: true } // Mengembalikan dokumen setelah diperbarui
    );

    res.status(200).json({
      message: "Data has been updated successfully",
      certificate: updatedCertificate,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating data", error });
  }
};

export const deleteCertificate = async (req, res) => {
  const { id } = req.params;

  try {
    const certificate = await Certificate.findByIdAndDelete(id);

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    // Hapus file gambar jika ada
    if (certificate.image) {
      fs.unlinkSync(certificate.image);
    }

    res.status(200).json({ message: "Data has been deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting data", error });
  }
};

export const getCertificates = async (req, res) => {
  try {
    const { page = 1, search, limit = 10 } = req.query;

    const queryFilter = {};

    if (search) {
      queryFilter.$or = [
        { name: { $regex: search, $options: "i" } },
        { issuer: { $regex: search, $options: "i" } },
      ];
    }

    const totalData = await Certificate.countDocuments(queryFilter);

    const data = await Certificate.find(queryFilter)
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

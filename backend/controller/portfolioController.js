import Portfolio from "../models/Portfolio.js";
import fs from "fs";

export const createPortfolio = async (req, res) => {
  const { name, type, client, tech, link, paragraphs } = req.body;
  const images = req.files ? req.files.map((file) => file.path) : [];

  try {
    if (!name || !type || !tech || !paragraphs) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newPortfolio = new Portfolio({
      name,
      type,
      client: client ? client : "",
      tech,
      link: link ? link : "",
      images,
      paragraphs,
    });

    await newPortfolio.save();
    res.status(201).json({
      message: "Portfolio created successfully",
      newPortfolio,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating portfolio", error });
    console.log(error);
  }
};

export const getPortfolios = async (req, res) => {
  try {
    const { page = 1, search, filter = "all", limit = 10 } = req.query;

    const queryFilter = {};

    if (filter !== "all") {
      queryFilter.type = filter;
    }

    if (search) {
      queryFilter.$or = [
        { name: { $regex: search, $options: "i" } },
        { client: { $regex: search, $options: "i" } },
        { paragraphs: { $regex: search, $options: "i" } },
      ];
    }

    const totalData = await Portfolio.countDocuments(queryFilter);

    const data = await Portfolio.find(queryFilter)
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
    res.status(500).json({ message: "Error fetching portfolios", error });
  }
};

export const getPortfolioById = async (req, res) => {
  const { id } = req.params;

  try {
    const portfolio = await Portfolio.findById(id);

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: "Error fetching portfolio", error });
  }
};

export const updatePortfolio = async (req, res) => {
  const { id } = req.params;
  const { name, type, client, tech, link, paragraphs } = req.body;
  const images = req.files ? req.files.map((file) => file.path) : null;
  console.log(images);

  try {
    const portfolio = await Portfolio.findById(id);

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    // Hapus gambar lama jika ada gambar baru
    if (images && portfolio.images.length > 0) {
      portfolio.images.forEach((image) => {
        fs.unlinkSync(image); // Hapus file gambar lama
      });
    }

    portfolio.name = name || portfolio.name;
    portfolio.type = type || portfolio.type;
    portfolio.client = client || portfolio.client;
    portfolio.tech = tech || portfolio.tech;
    portfolio.images = images || portfolio.images;
    portfolio.link = link || portfolio.link;
    portfolio.paragraphs = paragraphs || portfolio.paragraphs;

    const updatedPortfolio = await portfolio.save();
    res.status(200).json({
      message: "Portfolio updated successfully",
      portfolio: updatedPortfolio,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating portfolio", error });
  }
};

export const deletePortfolio = async (req, res) => {
  const { id } = req.params;

  try {
    const portfolio = await Portfolio.findByIdAndDelete(id);

    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio not found" });
    }

    // Hapus semua gambar yang terkait
    if (portfolio.images.length > 0) {
      portfolio.images.forEach((image) => {
        fs.unlinkSync(image); 
      });
    }

    res.status(200).json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting portfolio", error });
  }
};

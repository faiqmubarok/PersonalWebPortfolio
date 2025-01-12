import Profile from "../models/Profile.js";

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.status(200).json(profile);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

export const updateSocialMedia = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    profile.socialMedia = req.body;
    await profile.save();
    res
      .status(200)
      .json({ message: "Social media updated successfully", profile });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

import Message from "../models/Message.js";
import Notification from "../models/Notification.js";

export const createMessage = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newMessage = new Message({
      name,
      email,
      message,
    });

    const newNotification = new Notification({
      title: "You have a new message",
      message: "You have a new message from " + name,
      type: "message",
    });

    await newNotification.save();

    await newMessage.save();
    res.status(201).json({ message: "Your message has been sent", newMessage });
  } catch (error) {
    res.status(500).json({ message: "Error creating message", error });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { page = 1, search, filter = "all", limit = 10 } = req.query;

    const queryFilter = {};

    if (filter !== "all") {
      queryFilter.isRead = filter === "read" ? true : false;
    }

    if (search) {
      queryFilter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    const totalMessages = await Message.countDocuments(queryFilter);

    const messages = await Message.find(queryFilter)
      .sort({ isImportant: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({
      messages,
      totalMessages,
      totalPages: Math.ceil(totalMessages / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};

export const updateMessage = async (req, res) => {
  const { id } = req.params;
  const { isRead, isImportant } = req.body;

  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { isRead, isImportant },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({
      ok: true,
      message: "Message updated successfully",
      updatedMessage,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating message", error });
  }
};

export const deleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ ok: true, message: "Message deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ ok: false, message: "Error deleting message", error });
  }
};

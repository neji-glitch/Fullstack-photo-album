
const userModel = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.findAll();
    res.json({ message: "success", data: users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await userModel.create(req.body);
    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await userModel.update(userId, req.body);
    res.json({ message: "User updated successfully", data: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await userModel.delete(userId);
    res.status(204).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

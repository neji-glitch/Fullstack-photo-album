const albumModel = require("../models/albumModel");

exports.getAllAlbums = async (req, res) => {
  try {
    const albums = await albumModel.findAll();
    res.json({ message: "success", data: albums });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAlbumsByUserId = async (req, res) => {
  try {
    console.log("fetching all albums with data:", req.body);
    const userId = req.params.userId;
    const albums = await albumModel.findByUserId(userId);
    res.json({ message: "success", data: albums });
  } catch (err) {
    console.error("error in fetching users:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.createAlbum = async (req, res) => {
  try {
    console.log("Creating album with data:", req.body);
    const newAlbum = await albumModel.create(req.body);
    console.log("New album created:", newAlbum);
    res
      .status(201)
      .json({ message: "Album created successfully", data: newAlbum });
  } catch (err) {
    console.error("Error creating album:", err);
    res.status(500).json({ error: err.message });
  }
};
exports.updateAlbum = async (req, res) => {
  try {
    const albumId = req.params.id;
    const updatedAlbum = await albumModel.update(albumId, req.body);
    res.json({ message: "Album updated successfully", data: updatedAlbum });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAlbum = async (req, res) => {
  try {
    const albumId = req.params.id;
    await albumModel.delete(albumId);
    res.status(204).json({ message: "Album deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

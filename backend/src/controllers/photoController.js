const photoModel = require("../models/photoModel");

exports.getAllPhotos = async (req, res) => {
  try {
    const photos = await photoModel.findAll();
    res.json({ message: "success", data: photos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPhotosByAlbumId = async (req, res) => {
  try {
    const albumId = req.params.albumId;
    const photos = await photoModel.findByAlbumId(albumId);
    res.json({ message: "success", data: photos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPhoto = async (req, res) => {
  try {
    const newPhoto = await photoModel.create(req.body);
    res
      .status(201)
      .json({ message: "Photo created successfully", data: newPhoto });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePhoto = async (req, res) => {
  try {
    const photoId = req.params.id;
    const updatedPhoto = await photoModel.update(photoId, req.body);
    res.json({ message: "Photo updated successfully", data: updatedPhoto });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const photoId = req.params.id;
    await photoModel.delete(photoId);
    res.status(204).json({ message: "Photo deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPhotoById = async (req, res) => {
  try {
    const photoId = req.params.photoId; // Ensure this matches the route parameter
    const photo = await photoModel.findPhotoById(photoId);
    if (photo) {
      res.status(200).json(photo); // Send the photo if found
    } else {
      res.status(404).json({ message: "Photo not found" }); // Handle photo not found
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

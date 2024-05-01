const express = require("express");
const router = express.Router({ mergeParams: true });

const albumController = require("../controllers/albumController");

router.get("/", albumController.getAlbumsByUserId); // Get all albums for a user
router.post("/", albumController.createAlbum); // Create a new album for a user
router.put("/:id", albumController.updateAlbum); // Update an existing album
router.delete("/:id", albumController.deleteAlbum); // Delete an album

module.exports = router;

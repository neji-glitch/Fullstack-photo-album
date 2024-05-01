const express = require("express");
//const router = express.Router();
const router = express.Router({ mergeParams: true });
const photoController = require("../controllers/photoController");


router.get("/", photoController.getPhotosByAlbumId);
router.post("/", photoController.createPhoto);
router.put("/:id", photoController.updatePhoto);
router.delete("/:id", photoController.deletePhoto);
router.get("/:photoId", photoController.getPhotoById);

module.exports = router;

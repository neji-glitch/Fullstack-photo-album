import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deletePhoto, fetchPhotos } from "../features/photos/photosSlice";
import PhotoCard from "../components/PhotoCard";
import Paginator from "../components/Paginator";
import { useState } from "react";
import PhotoModal from "../components/PhotoModal";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const PhotoList = () => {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const photos = useSelector(
    (state) => state.photos.photosByAlbum[albumId]?.photos || []
  );
  const photoStatus = useSelector((state) => state.photos.status);
  const error = useSelector((state) => state.photos.error);
  const pageSize = 10; // Number of albums per page
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(null);

  console.log(photos.length);

  useEffect(() => {
    dispatch(fetchPhotos(albumId));
  }, [albumId, dispatch]);

  const indexOfLastPhoto = currentPage * pageSize;
  const indexOfFirstPhoto = indexOfLastPhoto - pageSize;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddNewPhoto = () => {
    setCurrentPhoto(null);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  const handleCardClick = (albumId, photoId) => {
    navigate(`/albums/${albumId}/photos/${photoId}`);
    console.log("tlançet");
  };

  const handleDeletePhoto = (photoId) => {
    console.log("Attempting to delete photo with ID:", photoId);
    dispatch(deletePhoto({ albumId, photoId }));
  };

  return (
    <>
      <Navbar
        showNavItems={true}
        showPhotoLinks={true}
        onAddPhoto={handleAddNewPhoto}
      />
      <div>
        {photoStatus === "loading" ? (
          <p>Loading...</p>
        ) : photoStatus === "failed" ? (
          <p>Error: {error}</p>
        ) : (
          <div className="d-flex flex-wrap justify-content-center">
            {currentPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onDelete={() => handleDeletePhoto(photo.id)}
                onClick={() => handleCardClick(photo.albumId, photo.id)}
              />
            ))}
          </div>
        )}
        <PhotoModal
          albumId={albumId}
          show={showModal}
          onHide={handleClose}
          photo={currentPhoto}
        />
        <Paginator
          total={photos.length}
          current={currentPage}
          onChange={handlePageChange}
          pageSize={pageSize}
        />
      </div>
    </>
  );
};

export default PhotoList;

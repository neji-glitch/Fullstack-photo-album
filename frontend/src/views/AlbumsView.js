import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAlbums, deleteAlbum } from "../features/albums/albumsSlice";
import { fetchPhotos } from "../features/photos/photosSlice";
import AlbumCard from "../components/AlbumCard";
import AlbumModal from "../components/AlbumModal";
import Paginator from "../components/Paginator";
import Navbar from "../components/Navbar";
import "../App.css";

const AlbumsView = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const albums = useSelector((state) => state.albums.albums);
  const albumStatus = useSelector((state) => state.albums.status);
  const error = useSelector((state) => state.albums.error);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(fetchAlbums(userId));
  }, [userId, dispatch]);

  useEffect(() => {
    albums.forEach((album) => {
      dispatch(fetchPhotos(album.id));
    });
  }, [dispatch, albums]);

  const handleAddNewAlbum = () => {
    setCurrentAlbum(null);
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEdit = (album) => {
    setCurrentAlbum(album);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleDeleteAlbum = (albumId) => {
    dispatch(deleteAlbum({ userId, albumId }));
  };

  const handleCheckPhotos = (albumId) => {
    navigate(`/albums/${albumId}/photos`);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  if (albumStatus === "loading") {
    return <div>Loading albums...</div>;
  }

  if (error) {
    return <div>Error fetching albums: {error}</div>;
  }

  return (
    <>
      <Navbar
        showNavItems={true}
        showAlbumLinks={true}
        onAddAlbum={handleAddNewAlbum}
      />
      <div className="container">
        <div className="d-flex flex-wrap">
          {albums
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((album) => (
              <AlbumCard
                key={album.id}
                album={album}
                onEdit={() => handleEdit(album)}
                onDelete={() => handleDeleteAlbum(album.id)}
                onCheckPhotos={() => handleCheckPhotos(album.id)}
              />
            ))}
        </div>
        <AlbumModal
          userId={userId}
          show={showModal}
          onHide={handleClose}
          album={currentAlbum}
          isEdit={isEdit}
        />
        <Paginator
          total={albums.length}
          current={currentPage}
          onChange={handlePageChange}
          pageSize={pageSize}
        />
      </div>
    </>
  );
};

export default AlbumsView;

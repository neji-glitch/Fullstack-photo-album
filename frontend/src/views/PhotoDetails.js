import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPhotoById } from "../features/photos/photosSlice";
import Navbar from "../components/Navbar";

export function PhotoDetails() {
  const { albumId, photoId } = useParams(); // Assuming you're using React Router
  const dispatch = useDispatch();
  const photo = useSelector((state) => state.photos.currentPhoto);
  const status = useSelector((state) => state.photos.status);
  const error = useSelector((state) => state.photos.error);

  useEffect(() => {
    if (photoId && albumId) {
      dispatch(fetchPhotoById({ photoData: { albumId, photoId } }));
    }
  }, [photoId, albumId, dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!photo) return <div>Photo not found</div>;

  return (
    <>
      <Navbar showNavItems={true} showDetPhotoLinks={true} />
      <div className="photo-card">
        <div className="photo-card-image">
          <img src={photo.url} alt={photo.title} />
        </div>
        <div className="photo-card-body">
          <h2 className="photo-card-title">{photo.title}</h2>
          <p className="photo-card-text">{photo.description}</p>
        </div>
      </div>
    </>
  );
}

export default PhotoDetails;

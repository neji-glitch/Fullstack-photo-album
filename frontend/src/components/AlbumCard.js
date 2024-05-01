import React from "react";
import { Card, Button } from "antd";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";

const AlbumCard = ({ album, onEdit, onDelete, onCheckPhotos, albumId }) => {
  const intl = useIntl();

  const photoCount = useSelector(
    (state) => state.photos.photosByAlbum[album.id]?.count || 0
  );

  return (
    <Card title={album.title} className="user-card" hoverable>
      <p>
        <span className="NumPhoto">
          {intl.formatMessage({ id: "albumCard.photos" })}
        </span>
        <span> {photoCount} </span>{" "}
      </p>
      <div className="card-buttons">
        <Button type="primary" onClick={() => onEdit(album.id)}>
          {intl.formatMessage({ id: "albumCard.edit" })}
        </Button>
        <Button type="danger" onClick={() => onDelete(album.id)}>
          {intl.formatMessage({ id: "albumCard.delete" })}
        </Button>
        <Button type="secondary" onClick={() => onCheckPhotos(album.id)}>
          {" "}
          {intl.formatMessage({ id: "albumCard.checkPhotos" })}
        </Button>
      </div>
    </Card>
  );
};

export default AlbumCard;

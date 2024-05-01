import React from "react";
import { Card, Button } from "antd";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const AlbumCard = ({ album, onEdit, onDelete, onCheckPhotos }) => {
  const intl = useIntl();

  const photoCount = useSelector(
    (state) => state.photos.photosByAlbum[album.id]?.count || 0
  );

  return (
    <Card className="user-card" hoverable>
      <div className="card-header">
        <h3 className="card-title">{album.title}</h3>
        <div className="card-buttons">
          <button
            className="icon-button edit-button"
            onClick={() => onEdit(album.id)}
          >
            <EditOutlined />
            <span>{intl.formatMessage({ id: "albumCard.edit" })}</span>{" "}
          </button>
          <button
            className="icon-button delete-button"
            onClick={() => onDelete(album.id)}
          >
            {" "}
            <DeleteOutlined />
          </button>
        </div>
      </div>
      <p>
        <span className="NumPhoto">
          {intl.formatMessage({ id: "albumCard.photos" })}
        </span>
        <span> {photoCount} </span>
      </p>
      <div className="check-photos-button">
        <Button variant="link" onClick={() => onCheckPhotos(album.id)}>
          {intl.formatMessage({ id: "albumCard.checkPhotos" })}
        </Button>
      </div>
    </Card>
    //</Link>
  );
};

export default AlbumCard;

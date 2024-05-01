import React from "react";
import { Card, Button } from "antd";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const AlbumCard = ({ album, onEdit, onDelete, onCheckPhotos, albumId }) => {
  const intl = useIntl();

  const photoCount = useSelector(
    (state) => state.photos.photosByAlbum[album.id]?.count || 0
  );

  return (
    <Card className="user-card" hoverable>
      <div className="card-header">
        <h3 className="card-title">{album.title}</h3>
        <div className="card-buttons">
          {/* <Button type="primary" onClick={() => onEdit(album.id)}>
              {intl.formatMessage({ id: "albumCard.edit" })}
            </Button> */}
          <button
            className="icon-button edit-button"
            onClick={() => onEdit(album.id)}
          >
            {" "}
            {/* Use a button instead of a Button component */}
            <EditOutlined /> {/* Replace the text with the pen icon */}
            <span>Edit</span> {/* Text for edit action */}
          </button>
          <button
            className="icon-button delete-button"
            onClick={() => onDelete(album.id)}
          >
            {" "}
            {/* Use button instead of Button component */}
            <DeleteOutlined /> {/* Trash bin icon for delete action */}
          </button>
        </div>
      </div>
      <p>
        <span className="NumPhoto">
          {intl.formatMessage({ id: "albumCard.photos" })}
        </span>
        <span> {photoCount} </span>
        {/* { <Button type="secondary" onClick={() => onCheckPhotos(album.id)}>
            {intl.formatMessage({ id: "albumCard.checkPhotos" })}
          </Button> } */}
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

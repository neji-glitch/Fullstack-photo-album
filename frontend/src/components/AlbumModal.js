import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  createAlbum,
  updateAlbum,
  fetchAlbums,
} from "../features/albums/albumsSlice";
import { useIntl } from "react-intl";

const AlbumModal = ({ show, onHide, isEdit, album, userId }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const intl = useIntl();

  useEffect(() => {
    if (isEdit && album) {
      setTitle(album.title);
    } else {
      setTitle("");
    }
  }, [isEdit, album]);

  const handleSubmit = () => {
    console.log("Submitting Album Data:", { id: album?.id, title, userId });
    const albumData = { title: title, userId: userId, albumId: album?.id };
    if (isEdit && album?.id) {
      dispatch(updateAlbum({ id: album.id, albumData }))
        .unwrap()
        .then(() => {
          setTitle("");
          onHide();
        })
        .then(() => dispatch(fetchAlbums(userId))) // Ensure to re-fetch albums
        .catch((error) => {
          console.error("Update failed:", error);
        });
    } else {
      dispatch(createAlbum(albumData))
        .unwrap()
        .then((newAlbum) => {
          setTitle(""); // Clear the title field after successful addition
          onHide(); // Hide the modal after successful addition
          console.log("New album added:", newAlbum); // Log the new album with ID
        })
        .catch((error) => {
          console.error("Creation failed:", error);
        });
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEdit
            ? intl.formatMessage({ id: "albumModal.editAlbum" })
            : intl.formatMessage({ id: "albumModal.addAlbum" })}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="albumTitle">
            <Form.Label>
              {intl.formatMessage({ id: "albumModal.albumTitle" })}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={intl.formatMessage({ id: "albumModal.albumTitle" })}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {intl.formatMessage({ id: "albumModal.close" })}
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {intl.formatMessage({ id: "albumModal.saveChanges" })}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlbumModal;

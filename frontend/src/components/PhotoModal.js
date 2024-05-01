import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createPhoto } from "../features/photos/photosSlice";
import { useIntl } from "react-intl";

const PhotoModal = ({ show, onHide, photo, albumId }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const dispatch = useDispatch();
  const intl = useIntl();

  const handleSubmit = () => {
    console.log("Submitting Photo Data:", {
      title,
      albumId,
      url,
      thumbnailUrl,
    });
    const photoData = {
      title,
      albumId,
      url,
      thumbnailUrl,
    };
    dispatch(createPhoto(photoData))
      .unwrap()
      .then((newPhoto) => {
        console.log("New photo added:", newPhoto); // Ensure 'newPhoto' includes new photo details
        setTitle(""); // Clear the title field after successful addition
        setUrl(""); // Clear the url field
        setThumbnailUrl(""); // Clear the thumbnailUrl field
        onHide(); // Hide the modal after successful addition
      })
      .catch((error) => {
        console.error("Creation failed:", error);
      });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {intl.formatMessage({ id: "photoModal.addPhoto" })}{" "}
          {/* Translated title */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="PhotoTitle">
            <Form.Label>
              {intl.formatMessage({ id: "photoModal.photoTitle" })}{" "}
              {/* Translated label */}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={intl.formatMessage({
                id: "photoModal.photoTitlePlaceholder",
              })}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Label>
              {intl.formatMessage({ id: "photoModal.photoUrl" })}{" "}
              {/* Translated label */}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={intl.formatMessage({
                id: "photoModal.photoUrlPlaceholder",
              })}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Form.Label>
              {intl.formatMessage({ id: "photoModal.thumbnailUrl" })}{" "}
              {/* Translated label */}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={intl.formatMessage({
                id: "photoModal.thumbnailUrlPlaceholder",
              })}
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {intl.formatMessage({ id: "photoModal.close" })}{" "}
          {/* Translated text */}
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {intl.formatMessage({ id: "photoModal.saveChanges" })}{" "}
          {/* Translated text */}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PhotoModal;

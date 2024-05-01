import React from "react";
import { Card, Button } from "antd";
import { useIntl } from "react-intl";

const PhotoCard = ({ photo, onDelete, onClick }) => {
  const intl = useIntl();

  return (
    <Card
      hoverable
      style={{ width: 240, margin: "10px" }}
      cover={<img alt={photo.title} src={photo.url} />}
      onClick={onClick}
    >
      <Card.Meta title={photo.title} />
      <Button
        type="danger"
        onClick={() => onDelete(photo.id)} // Use the passed onDelete function
        style={{ marginTop: "10px" }}
      >
        {intl.formatMessage({ id: "photoCard.delete" })}
      </Button>
    </Card>
  );
};

export default PhotoCard;

import React from "react";
import { Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "react-bootstrap";

const PhotoCard = ({ photo, onDelete, onClick }) => {
  //const intl = useIntl();

  return (
    <Card
      hoverable
      style={{ width: 240, margin: "10px" }}
      cover={<img alt={photo.title} src={photo.url} />}
      onClick={onClick}
    >
      <Card.Meta
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{photo.title}</span>
            <div className="icon-button delete-button">
              <Button variant="link" onClick={() => onDelete(photo.id)}>
                <DeleteOutlined /> {/* Trash bin icon for delete action */}
              </Button>
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default PhotoCard;

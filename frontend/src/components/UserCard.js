import React from "react";
import { Card } from "antd";
import { useIntl } from "react-intl";

const UserCard = ({ user, onClick }) => {
  const intl = useIntl();

  return (
    <Card className="user-card" onClick={() => onClick(user.id)} hoverable>
      <p>
        <strong>{intl.formatMessage({ id: "userCard.name" })}:</strong> 📛
        <span className="card-detail-value">{user.name}</span>
      </p>
      <p>
        <strong>{intl.formatMessage({ id: "userCard.email" })}:</strong> 📧
        <span className="card-detail-value"> {user.email} </span>
      </p>
      <p>
        <strong>{intl.formatMessage({ id: "userCard.phone" })}:</strong> 📱
        <span className="card-detail-value">{user.phone}</span>
      </p>
    </Card>
  );
};

export default UserCard;

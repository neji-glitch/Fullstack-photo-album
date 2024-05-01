import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../features/users/usersSlice";
import UserCard from "../components/UserCard";
import { useNavigate } from "react-router-dom";
import Paginator from "../components/Paginator";
import { useIntl } from "react-intl";
import Navbar from "../components/Navbar";
import "../App.css";

const UsersView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);
  const userStatus = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const intl = useIntl();

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);

  const indexOfLastUser = currentPage * pageSize;
  const indexOfFirstUser = indexOfLastUser - pageSize;
  const currentUsers = Array.isArray(users)
    ? users.slice(indexOfFirstUser, indexOfLastUser)
    : [];

  const handlePageChange = (page) => setCurrentPage(page);
  const handleCardClick = (userId) => navigate(`/users/${userId}/albums`);

  return (
    <>
      <Navbar showNavItems={false} />
      <div className="container d-flex flex-wrap">
        {userStatus === "loading" && (
          <p className="loading">
            {intl.formatMessage({ id: "usersView.loading" })}
          </p>
        )}
        {userStatus === "failed" && (
          <p className="error">
            {intl.formatMessage({ id: "usersView.error" }, { error })}
          </p>
        )}
        <div className="card-container">
          {currentUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onClick={() => handleCardClick(user.id)}
            />
          ))}
        </div>
        <Paginator
          total={users.length}
          current={currentPage}
          onChange={handlePageChange}
          pageSize={pageSize}
          className="paginator"
        />
      </div>
    </>
  );
};

export default UsersView;

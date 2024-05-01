import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useIntl } from "react-intl";
import { useLocale } from "../i18n";

const Navbar = ({
  showNavItems,
  showAlbumLinks,
  showPhotoLinks,
  onAddAlbum,
  onAddPhoto,
  showDetPhotoLinks,
}) => {
  const [isNavExpanded, setIsNavExpanded] = useState(false); // State to manage the navbar collapse
  const intl = useIntl();
  const { setLocale } = useLocale();
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsNavExpanded((prevState) => !prevState);
    console.log(isNavExpanded);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Photo Album Application 📷
      </Link>
      <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
        <span className="navbar-toggler-icon">&#9776;</span>
      </button>
      <div
        className={`collapse navbar-collapse ${isNavExpanded ? "show" : ""}`}
      >
        {showNavItems && (
          <>
            {showAlbumLinks && (
              <div>
                <Button className="nav-link" onClick={onAddAlbum}>
                  ➕ {intl.formatMessage({ id: "navbar.addNewAlbum" })}
                </Button>
              </div>
            )}
            {showPhotoLinks && (
              <div>
                <Button className="nav-link" onClick={() => navigate(-1)}>
                  🔙 {intl.formatMessage({ id: "navbar.backToAlbums" })}
                </Button>
                <Button className="nav-link" onClick={onAddPhoto}>
                  ➕ {intl.formatMessage({ id: "navbar.addNewPhoto" })}
                </Button>
              </div>
            )}
            {showDetPhotoLinks && (
              <div>
                <Button className="nav-link" onClick={() => navigate(-1)}>
                  🔙 {intl.formatMessage({ id: "navbar.BackToPhotos" })}
                </Button>
              </div>
            )}
          </>
        )}
        <div className="language-buttons navbar-text">
          <Button onClick={() => setLocale("en")} className="language-button">
            English
          </Button>
          <Button onClick={() => setLocale("el")} className="language-button">
            Ελληνικά
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SearchBar from "./SearchBar";
import ProfileIcon from "../css/images/profile.png";
import SearchIcon from "../css/images/search.png";
import Search from "../images/searchIcon.svg";
import Profile from "../images/profileIcon.svg";
import "../css/Header.css";

export default function Header() {
  const [showBar, setShowBar] = useState(false);
  const history = useHistory();

  return (
    <>
      <header>
        <button
          onClick={() => history.push("/profile")}
          data-testid="profile-top-btn"
          className="header__button"
          src={Profile}
        >
          <img src={ProfileIcon} alt="search-icon" className="header_icon" />
        </button>
        <div className="header__title">
          <div className="title_header">
            <h1>Recipes</h1>
          </div>
          <h3 className="subtitle_header">app</h3>
        </div>
        <div>
          <button
            onClick={() => setShowBar(!showBar)}
            className="header__button"
            data-testid="search-top-btn"
            src={Search}
          >
            <img src={SearchIcon} alt="search-icon" className="header_icon" />
          </button>
        </div>
      </header>
      <section className="header__search">{showBar && <SearchBar />}</section>
    </>
  );
}

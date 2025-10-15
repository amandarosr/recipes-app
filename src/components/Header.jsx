import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SearchBar from "./SearchBar";
import Profile from "../css/images/profile.png";
import Search from "../css/images/search.png";
import Home2 from "../css/images/home2.png";
import "../css/Header.css";

export default function Header() {
  const [showBar, setShowBar] = useState(false);
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <>
      <header>
        <button
          onClick={() => history.push("/profile")}
          data-testid="profile-top-btn"
          className="header__button"
          // src={Profile}
        >
          <img src={Profile} alt="search-icon" className="header_icon" />
        </button>
        <div className="header__title">
          <div className="title_header">
            <h1>Recipes</h1>
          </div>
          <h3 className="subtitle_header">app</h3>
        </div>
        <div>
          {pathname === "/meals" ? (
            <button
              onClick={() => setShowBar(!showBar)}
              className="header__button"
              data-testid="search-top-btn"
              // src={Search}
            >
              <img src={Search} alt="search-icon" className="header_icon" />
            </button>
          ) : (
            <button onClick={() => history.push("/meals")} className="header__button">
              <img src={Home2} alt="homepage" className="header_icon home2" />
            </button>
          )}
        </div>
      </header>
      <section className="header__search">{showBar && <SearchBar />}</section>
    </>
  );
}

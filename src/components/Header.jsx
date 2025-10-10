import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import SearchBar from './SearchBar';
import ProfileIcon from '../css/images/profile.png';
import SearchIcon from '../css/images/search.png';
import Search from '../images/searchIcon.svg';
import Profile from '../images/profileIcon.svg';
import '../css/Header.css';

export default function Header() {
  const [showBar, setShowBar] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname;
  const pathSearch = path === '/meals';
  const header2 = !pathSearch

  return (
    <>
      <header>
        <div className="header__title">
          <div className="title_header">
            <h1>Recipes</h1>
          </div>
          <h3 className="subtitle_header">app</h3>
        </div>
        <div className="header__icons">
          { header2 && (
            <button onClick={() => history.push("/meals")}>
          </button>
          )}
          <button
            onClick={ () => history.push('/profile') }
            data-testid="profile-top-btn"
            className="header__button"
            src={ Profile }
          >
            <img src={ ProfileIcon } alt="search-icon" />
          </button>
          {pathSearch && (
            <div>
              <button
                onClick={ () => setShowBar(!showBar) }
                className="header__button"
                data-testid="search-top-btn"
                src={ Search }
              >
                <img src={ SearchIcon } alt="search-icon" />
              </button>
            </div>
          )}
        </div>
      </header>
      <section className="header__search">
        { showBar && <SearchBar /> }
      </section>
    </>
  );
}

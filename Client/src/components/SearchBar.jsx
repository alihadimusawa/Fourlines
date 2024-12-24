import React from "react";
import styling from "../style/AdminPage.module.css";

export default function SearchBar() {
  return (
    <div className={styling.searchBar}>
      <input
        type="text"
        name="search"
        placeholder="Search..."
        id={styling.searchBarInput}
      />
      <div>
        <img
          src="http://localhost:3000/icon/searchIcon.png"
          alt="search icon"
        />
      </div>
    </div>
  );
}

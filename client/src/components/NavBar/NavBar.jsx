import React, { useState } from "react";
import Style from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

const NavBar = ({ onSearch }) => {
  const [value, setValue] = useState("");
  const handleSearchValue = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      return alert("You must write a dog name!");
    } else {
      onSearch(value);
      setValue("");
    }
  };

  return (
    <>
      <nav className={Style.navbar}>
        <ul>
          <li className={Style.title}>DOGS PI</li>

          <form className={Style.searchIcon} onSubmit={handleSubmit}>
            <input
              className={Style.searchInput}
              onChange={handleSearchValue}
              value={value}
              type="search"
              placeholder="Search Dogs by name..."
            />
          </form>

          <div className={Style.items}>
            <li>
              <NavLink to="/dogsCreate" className={Style.penLink}>
                <button className={Style.btnCreate}>Create Dog!</button>
              </NavLink>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
};
export default NavBar;

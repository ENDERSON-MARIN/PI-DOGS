import React, { useState } from "react";
import Style from "./NavBar.module.css";
import { NavLink } from "react-router-dom";

import Swal from "sweetalert2";

const NavBar = ({ onSearch }) => {
  const [value, setValue] = useState("");
  const handleSearchValue = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      Swal.fire({
        title: "Not name!",
        text: "You must write a dog name!",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "red",
        timer: "3000",
      });
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

import React from "react";
import { Link } from "react-router-dom";
import Style from "./DogCard.module.css";
import { useDispatch } from "react-redux";

import { addDogFavorites } from "../../redux/actions/index";

import Swal from "sweetalert2";

//--HOME CARDS
const DogCard = ({ id, name, weight_min, weight_max, image, temperaments }) => {
  const dispatch = useDispatch();

  //--ADD DOGS TO FAVORITES
  const handleAddFavorites = () => {
    dispatch(
      addDogFavorites({
        name: name,
        id: id,
      })
    );
    Swal.fire({
      title: "Added!",
      text: "Dog added Favorites!",
      icon: "success",
      confirmButtonText: "Ok",
      confirmButtonColor: "green",
      timer: "3000",
    });
  };

  return (
    <>
      <section className={Style.card}>
        <section className={Style.card2}>
          <Link to={`/dogDetails/${id}`}>
            <img className={Style.img} src={image} alt={name} />
            <h2 className={Style.cardName}> {name.toUpperCase()} </h2>
            <h3 className={Style.cardWeight}>Weight Min: {weight_min} Kg</h3>
            <h3 className={Style.cardWeight}>Weight Max: {weight_max} Kg</h3>
            <h3 className={Style.cardTemperaments}>
              {" "}
              <p className={Style.temperaments}>Temperaments: {temperaments}</p>
            </h3>
          </Link>

          <button
            onClick={handleAddFavorites}
            //disabled={videogamesFavorites.find((v) => v.id === videogames.id)}
          >
            💖
          </button>
        </section>
      </section>
    </>
  );
};
export default DogCard;

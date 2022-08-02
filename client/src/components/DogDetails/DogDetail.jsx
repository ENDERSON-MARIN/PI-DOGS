import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Style from "./DogDetail.module.css";

import { deleteDog, getDogById } from "../../redux/actions/index"

import CardDetail from "./CardDetail.jsx";

import Swal from "sweetalert2";

const DogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const dogDetails = useSelector((state) => state.dogDetails);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDogById(id));
    // console.log(id);
  }, [dispatch, id]);

  const handleDelete = () => {
    Swal.fire({
      title: "Do you want to delete the Dog?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "green",
      denyButtonText: "Cancel",
      // timer: "3000",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDog(id));
        Swal.fire("Dog successfully removed!", "", "success");
        navigate("/home");
      } else if (result.isDenied) {
        //Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  //console.log(dogDetails);

  return (
    <div>
      <div className={Style.btncontainer}>
        <NavLink to="/home">
          <button className={Style.backBtn}>
            <span className={Style.buttonTop}>GO BACK HOME</span>
          </button>
        </NavLink>
        {typeof dogDetails.id === "string" && (
          <NavLink to={`/dogUpdate/${id}`}>
            <button className={Style.backBtn}>
              <span className={Style.buttonTop}>UPDATE DOG</span>
            </button>
          </NavLink>
        )}
        {typeof dogDetails.id === "string" && (
          <button className={Style.backBtn} onClick={handleDelete}>
            {" "}
            <span className={Style.buttonTop}>DELETE DOG</span>
          </button>
        )}
      </div>

      <div className={Style.container}>
        <CardDetail dog={dogDetails} />
      </div>
    </div>
  );
};
export default DogDetail;

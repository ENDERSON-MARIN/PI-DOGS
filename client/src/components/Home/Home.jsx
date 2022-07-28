import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Style from "./Home.module.css";
import NavBar from "../NavBar/NavBar";
import DogCard from "../DogCard/DogCard";
import Paginated from "../Paginated/Paginated";
import Loader from "../Loader/Loader";

//---Import Actions--//
import {
  getAlldogs,
  getDogsByTemperaments,
  filterDogsByExistence,
  filterDogsByTemperaments,
  orderDogsByAlphabetical,
  orderDogsByWeight,
  getDogsByName,
} from "../../redux/actions/index";

const Home = () => {
  const [, /*refresh*/ setRefresh] = useState(false);
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const temperaments = useSelector((state) => state.temperaments);
  const [status, setStatus] = useState("All");
  const [loader, setLoader] = useState(true);

  //Paginated section
  const [currentPage, setCurrentPage] = useState(1); //inicia pagina 1
  const [dogsPerPage /*setDogsPerPage*/] = useState(8); //8 x pagina
  const lastDogsPerPage = currentPage * dogsPerPage; // 8
  const firstDogsPerPage = lastDogsPerPage - dogsPerPage; // 0
  const currentDogs = allDogs?.slice(firstDogsPerPage, lastDogsPerPage);

  const paginar = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getAlldogs());
    dispatch(getDogsByTemperaments());
  }, [dispatch]);

  //--FILTER BY EXISTENCE-->ALL-API-DB
  const handleFilterExistence = (e) => {
    e.preventDefault();
    setStatus(e.target.value);
    dispatch(filterDogsByExistence(e.target.value));
    setCurrentPage(1);
    setRefresh((prevState) => !prevState); // refresh->true
  };

  //--FILTER BY ALPHABETICAL-->A-Z/Z-A
  const handleOrderByAlphabetical = (e) => {
    e.preventDefault();
    setStatus(e.target.value);
    dispatch(orderDogsByAlphabetical(e.target.value));
    setCurrentPage(1);
    setRefresh((prevState) => !prevState); // refresh->true
  };

  //--ORDER BY WEIGHT-->MIN/MAX
  const handleOrderByWeight = (e) => {
    e.preventDefault();
    setStatus(e.target.value);
    dispatch(orderDogsByWeight(e.target.value));
    setCurrentPage(1);
    setRefresh((prevState) => !prevState); //  refresh->true
  };
  //--FILTER BY TEMPERAMENTS (search by temperaments)
  const handleFilterTemperaments = (e) => {
    e.preventDefault();
    dispatch(filterDogsByTemperaments(e.target.value, status)); //gets the value and the status
    setCurrentPage(1);
    setRefresh((prevState) => !prevState); //  refresh->true
  };

  const handleSearch = (value) => {
    dispatch(getDogsByName(value));
    setCurrentPage(1);
  };

  const handleReloadBtn = () => {
    window.location.reload();
  };

  if (currentPage && loader) {
    setLoader(false);
  }
  return (
    <>
      <NavBar onSearch={handleSearch} />
      <main className={Style.main}>
        <div>
          <div>
            <div className={Style.selectContainer}>
              <div className={Style.box}>
                <select
                  onChange={handleFilterTemperaments}
                  name="Temperaments"
                  defaultValue="Filter by Temperaments"
                >
                  <option value="Filter by Temperaments" disabled>
                    {" "}
                    FILTER BY TEMPERAMENTS
                  </option>
                  {temperaments.map((t) => {
                    return (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    );
                  })}
                </select>

                <select
                  onChange={(e) => handleFilterExistence(e)}
                  defaultValue="Filterby"
                >
                  <option value="Filterby" disabled>
                    {" "}
                    FILTER BY EXISTENCE{" "}
                  </option>
                  <option value="All">All</option>
                  <option value="API">API</option>
                  <option value="DB">DB</option>
                </select>

                <select
                  onChange={handleOrderByAlphabetical}
                  name="Temperament"
                  defaultValue="Sortby"
                >
                  <option value="Sortby" disabled>
                    {" "}
                    ORDER BY ALPHABETIC{" "}
                  </option>
                  <option value="A-Z"> A-Z </option>
                  <option value="Z-A"> Z-A </option>
                </select>
                <select onChange={handleOrderByWeight} defaultValue="Weight">
                  <option value="Weight" disabled>
                    {" "}
                    ORDER BY WEIGHT{" "}
                  </option>
                  <option value="Max">MAX⬆</option>
                  <option value="Min">MIN⬇</option>
                </select>
              </div>
            </div>
            <div className={Style.reloadBtnContainer}>
              <button
                data-text="Reload"
                className={Style.reloadBtn}
                onClick={handleReloadBtn}
              >
                <span className={Style.hoverText} aria-hidden="true">
                  &nbsp;Reset Dogs&nbsp;
                </span>
              </button>
            </div>
            <section className={Style.contentWrapper}>
              {currentDogs.length > 0 && !loader ? (
                currentDogs.map((d) => {
                  return (
                    <DogCard
                      key={d.id}
                      id={d.id}
                      name={d.name}
                      image={d.image}
                      weight_min={d.weight_min}
                      weight_max={d.weight_max}
                      temperaments={d.temperaments}
                    />
                  );
                })
              ) : !currentDogs && loader ? (
                <h1>Cargando Dogs...!</h1>
              ) : (
                <Loader />
              )}
            </section>
            <div className={Style.paginated}>
              <Paginated
                pageFunction={paginar}
                data={dogsPerPage}
                current={currentPage}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Home;

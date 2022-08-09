import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog } from "../../redux/actions/index";
import { getDogsByTemperaments } from "../../redux/actions/index";
import "./CreateDog.css";

function validateForm(inputs) {
  let errors = {};

  /* REGULAR EXPRESIONS */
  const regexText = /^([a-zA-Z ]+)$/i;
  const regexNumber = /^([0-9]+)$/i;
  const regexImg = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/i;

  if (!inputs.name) {
    errors.name = "The field 'Name' is required!";
  } else if (!regexText.test(inputs.name)) {
    errors.name = "The name can't include especial characters or numbers";
  } else if (parseInt(inputs.name.length) >= 255) {
    errors.name = "must contain less than 255 characters";
  }

  /* INPUT IMAGE */
  if (!inputs.image) {
    errors.image = "The field 'image' is required!";
  } else if (!regexImg.test(inputs.image)) {
    errors.image = "Verify the URL, format image Valid(png|gif|webp|jpeg|jpg) ";
  }

  /* INPUT HEIGHT MAX */
  if (!inputs.height_max) {
    errors.height_max = "The field 'Height-Max' is required!";
  } else if (!regexNumber.test(inputs.height_max)) {
    errors.height_max = "The field 'Height-Max' can only contain numbers";
  }

  /* INPUT HEIGHT MIN */
  if (!inputs.height_min) {
    errors.height_min = "The field 'Height-Min' is required!";
  } else if (!regexNumber.test(inputs.height_min)) {
    errors.height_min = "The field 'Height-Min' can only contain numbers";
  } else if (parseInt(inputs.height_min) >= parseInt(inputs.height_max)) {
    errors.height_min =
      "The field 'Height-Min' must be smaller than the field 'Height-Max'";
  }

  /* INPUT WEIGHT */
  if (!inputs.weight_max) {
    errors.weight_max = "The field 'Weight-Max' is required!";
  } else if (!regexNumber.test(inputs.weight_max)) {
    errors.weight_max = "The field 'Weight-Max' can only contain numbers";
  }

  /* INPUT WEIGHT MIN */
  if (!inputs.weight_min) {
    errors.weight_min = "The field 'Weight-Min' is required!";
  } else if (!regexNumber.test(inputs.weight_min)) {
    errors.weight_min = "The field 'Weight-Min' can only contain numbers";
  } else if (parseInt(inputs.weight_min) >= parseInt(inputs.weight_max)) {
    errors.weight_min =
      "The field 'Weight-Min' must be smaller than the field 'Weight-Max'";
  }

  /* INPUT YEARS LIFE */
  if (!inputs.years_life) {
    errors.years_life = "The field 'years_life' is required!";
  } else if (parseInt(inputs.years_life.length) >= 30) {
    errors.years_life = "must contain less than 30 characters";
  }

  return errors;
}

function Form() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogsByTemperaments());
  }, [dispatch]);

  const temperamentos = useSelector((state) => state.temperaments);

  const [errors, setErrors] = useState({});

  const [inputs, setInputs] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    image: "",
    years_life: "",
    temperament: [],
  });

  const [selectTemperaments, setSelectTemperaments] = useState([]);

  // console.log("inputs form :",inputs.temperament)

  function handleChange(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateForm({
        ...inputs,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    if (inputs.temperament.includes(e.target.value)) return;

    setInputs({
      ...inputs,
      temperament: [...inputs.temperament, e.target.value],
    });

    const selectName = e.target.value;
    if (selectName === "default") return;
    setInputs({ ...inputs, temperament: [...inputs.temperament, selectName] });
    setSelectTemperaments([
      ...selectTemperaments,
      temperamentos.find((e) => e.id === parseInt(selectName)),
    ]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !errors.name &&
      !errors.height_min &&
      !errors.height_max &&
      !errors.weight_min &&
      !errors.weight_max
    ) {
      try {
        dispatch(createDog(inputs));
        setInputs({
          name: "",
          height_min: "",
          height_max: "",
          weight_min: "",
          weight_max: "",
          image: "",
          years_life: "",
          temperament: [],
        });
        setSelectTemperaments([]);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleDelete(e) {
    setInputs({
      ...inputs,
      temperament: inputs.temperament.filter((t) => t !== e.target.value),
    });
    setSelectTemperaments(
      selectTemperaments.filter((t) => t.id !== parseInt(e.target.value))
    );
  }

  return (
    <div className="Form_container">
      <h2 className="form_title">
        AGREGA LOS DATOS DE TU <span className="form_title_naranja">PERRO</span>
      </h2>
      <p className="datos_obligatorios">Datos con * obligatorios</p>

      <form className="form" action="" onSubmit={handleSubmit}>
        {/* ---- INPUT NAME ---- */}
        <div>
          <div>
            <label>Nombre *</label>
            <div className={errors.name ? "div_input error" : "div_input"}>
              <input
                className="form_input"
                placeholder="Name Dog"
                onChange={handleChange}
                name="name"
                value={inputs.name}
              />
            </div>
            {errors.name && (
              <span className="dato_incorrecto">{errors.name}</span>
            )}
          </div>
        </div>

        {/* ---- INPUT IMAGE ---- */}
        <div>
          <label>Imagen</label>
          <div className="div_input">
            <input
              className="form_input"
              placeholder="Image URL"
              onChange={handleChange}
              name="image"
              value={inputs.image}
            />
          </div>
          {errors.image && (
            <span className="dato_incorrecto">{errors.image}</span>
          )}
        </div>

        {/* ---- INPUT HEIGHT ---- */}
        <div className="div_inputs_dobles">
          <div className="max">
            <label>Altura *</label>
            <div
              className={errors.height_max ? "div_input error" : "div_input"}
            >
              <input
                className="form_input min"
                placeholder="Max"
                onChange={handleChange}
                name="height_max"
                value={inputs.height_max}
              />
              <span className="unidad">CM</span>
            </div>
            {errors.height_max && (
              <span className="dato_incorrecto">{errors.height_max}</span>
            )}
          </div>

          <div className="min">
            <label className="label_min">Peso</label>
            <div
              className={errors.height_min ? "div_input error" : "div_input"}
            >
              <input
                className="form_input max"
                placeholder="Min"
                onChange={handleChange}
                name="height_min"
                value={inputs.height_min}
              />
              <span className="unidad">CM</span>
            </div>
            {errors.height_min && (
              <span className="dato_incorrecto">{errors.height_min}</span>
            )}
          </div>
        </div>

        {/* ---- INPUT WEIGHT ---- */}
        <div className="div_inputs_dobles">
          <div className="max">
            <label>Peso *</label>
            <div
              className={errors.weight_max ? "div_input error" : "div_input"}
            >
              <input
                className="form_input min"
                placeholder="Max"
                onChange={handleChange}
                name="weight_max"
                value={inputs.weight_max}
              />
              <span className="unidad">KG</span>
            </div>
            {errors.weight_max && (
              <span className="dato_incorrecto">{errors.weight_max}</span>
            )}
          </div>

          <div className="min">
            <label className="label_min">Peso</label>
            <div
              className={errors.weight_min ? "div_input error" : "div_input"}
            >
              <input
                className="form_input max"
                placeholder="Min"
                onChange={handleChange}
                name="weight_min"
                value={inputs.weight_min}
              />
              <span className="unidad">KG</span>
            </div>
            {errors.weight_min && (
              <span className="dato_incorrecto">{errors.weight_min}</span>
            )}
          </div>
        </div>

        {/* ---- INPUT YEARS LIFE ---- */}
        <div className="div_inputs_dobles">
          <div className="max">
            <label>Años de vida</label>
            <div
              className={errors.years_life ? "div_input error" : "div_input"}
            >
              <input
                className="form_input min_years"
                placeholder="Years Life"
                onChange={handleChange}
                name="years_life"
                value={inputs.years_life}
              />
              <span className="unidad">Años</span>
            </div>
            {errors.years_life && (
              <span className="dato_incorrecto">{errors.years_life}</span>
            )}
          </div>
        </div>

        {/* ---- INPUT TEMPERAMENTS ---- */}
        <div>
          <label>Temperamentos</label>
          <div className="div_input">
            <select
              className="select_form"
              name="temperamentos"
              onChange={handleSelect}
            >
              {temperamentos.map((t, i) => {
                return (
                  <option className="option_form" key={i} value={t.id}>
                    {t.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="div_form_final_temps">
            <ul className="ul_temp">
              {selectTemperaments.map((e, i) => {
                return (
                  <li className="li_temp" key={i}>
                    {e.name}
                    <button
                      className="delete_temp"
                      type="button"
                      value={e.id}
                      onClick={handleDelete}
                    >
                      x
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <input className="submit"
        type="submit" value="Create new Dog"
        disabled={errors.name || errors.height_min || errors.height_max || errors.weight_min || errors.weight_max}
         />
      </form>
    </div>
  );
}

export default Form;

/* FUNCIONES PARA EL FILTRADO Y ORDENAMIENTO */

export const filterByExistence = (existence, arrayDogs) => {
  switch (existence) {
    case "API":
      return arrayDogs.filter((dog) => typeof dog.id === "number");
    case "DB":
      return arrayDogs.filter((dog) => typeof dog.id === "string");
    default:
      return arrayDogs;
  }
};

export const filterByTemperaments = (temperaments, arrayDogs) => {
  return arrayDogs.filter((dog) => dog.temperaments.includes(temperaments));
};

export const orderByAlphabetic = (order, arrayDogs) => {
  switch (order) {
    case "A-Z":
      return arrayDogs.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    case "Z-A":
      return arrayDogs.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    default:
      return arrayDogs;
  }
};

export const orderByWeight = (weight, arrayDogs) => {
  switch (weight) {
    case "Higth":
      return arrayDogs.sort((a, b) => {
        if (a.weight_max > b.weight_max) return -1;
        if (b.weight_max > a.weight_max) return 1;
        else return 0;
      });
    case "Lower":
      return arrayDogs.sort((a, b) => {
        if (a.weight_min > b.weight_min) return 1;
        if (b.weight_min > a.weight_min) return -1;
        else return 0;
      });
    default:
      return arrayDogs;
  }
};

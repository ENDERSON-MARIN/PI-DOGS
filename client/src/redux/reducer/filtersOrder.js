/* FUNCIONES PARA EL FILTRADO Y ORDENAMIENTO */

export const filterByExistence = (existence, stateDogs) => {
  switch (existence) {
    case "API":
      return stateDogs.filter((dog) => typeof dog.id === "number");
    case "DB":
      return stateDogs.filter((dog) => typeof dog.id === "string");
    default:
      return stateDogs;
  }
};

export const filterByTemperaments = (temperaments, stateDogs) => {
  return stateDogs.filter((dog) => dog.temperaments.includes(temperaments));
};

export const orderByAlphabetic = (order, stateDogs) => {
  switch (order) {
    case "A-Z":
      return stateDogs.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    case "Z-A":
      return stateDogs.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    default:
      return stateDogs;
  }
};

export const orderByWeight = (weight, stateDogs) => {
  switch (weight) {
    case "Max":
      return stateDogs.sort((a, b) => {
        if (a.weight_max > b.weight_max) return -1;
        if (b.weight_max > a.weight_max) return 1;
        else return 0;
      });
    case "Min":
      return stateDogs.sort((a, b) => {
        if (a.weight_min > b.weight_min) return 1;
        if (b.weight_min > a.weight_min) return -1;
        else return 0;
      });
    default:
      return stateDogs;
  }
};

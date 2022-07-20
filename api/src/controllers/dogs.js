const { getAllDogs, getDogsDb } = require("../controllers/index");

const getAllDogsOrByName = async (req, res) => {
  try {
    const { name } = req.query;
    const allDogs = await getAllDogs();
    if (name) {
      const dogsByName = allDogs.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      dogsByName.length
        ? res.status(200).send(dogsByName)
        : res.status(404).send(`Dog with name ${name} not exist!`);
    } else {
      res.status(200).send(allDogs);
    }
  } catch (error) {
    res.status(400).send({ errorMsg: error });
  }
};

/* GET ONE DOG BY ID FROM DB OR API */

const getAllDogsById = async (req, res) => {
  try {
    const { id } = req.params;
    //si el id es mayor a 7 y el tipo de dato es string busco en la base de datos, sino busco en la API
    if (id.length > 7 && typeof id === "string") {
      const DogsDb = await getDogsDb();
      const DogByIdDb = DogsDb.find((d) => d.id === id);
      if (DogByIdDb) {
        res.status(200).json(DogByIdDb);
      } else {
        res.status(404).send(`Dog with id ${id} not exist in the DB!`);
      }
    } else {
      const allDogs = await getAllDogs();
      const DogByIdApi = allDogs.find((e) => e.id === Number(id));
      if (DogByIdApi) {
        res.status(200).json(DogByIdApi);
      } else {
        res.status(404).send(`Dog with id ${id} not exist in the API!`);
      }
    }
  } catch (err) {
    res.status(400).send({ err: "Dog not found" });
  }
};

module.exports = {
  getAllDogsOrByName,
  getAllDogsById,
};

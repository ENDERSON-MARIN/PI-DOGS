const { Router } = require("express");
const {
  getDogsApi,
  getDogsDb,
  getAllDogs,
  getAllTemperaments,
} = require("../controllers");

const router = Router();

/* GET ALL DOGS OR BY NAME */

router.get("/", async (req, res) => {
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
});

/* GET ALL DOGS BY ID */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allDogs = await getAllDogs();
    const dogById = allDogs.find((e) => e.id === Number(id));
    if (dogById) {
      res.status(200).json(dogById);
    } else {
      res.status(404).send(`Dog with id ${id} not exist!`);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

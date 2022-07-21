const { Router } = require("express");
const {
  getAllDogsOrByName,
  getAllDogsById,
  createDog,
  updateDog,
} = require("../controllers/dogs");

const router = Router();

/* GET ALL DOGS OR BY NAME */
router.get("/", getAllDogsOrByName);

/* GET ALL DOGS BY ID */
router.get("/:id", getAllDogsById);

/* CREATE NEW DOG IN THE DATABASE */
router.post("/", createDog);

/* UPDATE DOG IN THE DATABASE */
router.put("/:id", updateDog)

module.exports = router;

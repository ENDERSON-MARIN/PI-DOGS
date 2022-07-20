const { Router } = require("express");
const { getAllDogsOrByName, getAllDogsById } = require("../controllers/dogs");

const router = Router();

/* GET ALL DOGS OR BY NAME */
router.get("/", getAllDogsOrByName);

/* GET ALL DOGS BY ID */
router.get("/:id", getAllDogsById);

module.exports = router;

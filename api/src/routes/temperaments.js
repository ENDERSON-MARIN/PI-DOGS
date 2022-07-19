const { Router } = require("express");

const { getAllTemperaments } = require("../controllers");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allTemperaments = await getAllTemperaments();
    res.status(200).json(allTemperaments);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

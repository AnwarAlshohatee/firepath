const express = require("express");
const router = express.Router();

const controller = require("../controllers/scenarioController");

// CREATE
router.post("/calculate", controller.createScenario);

// READ
router.get("/scenarios", controller.getScenarios);
router.get("/scenarios/:id", controller.getScenario);

// UPDATE
router.get("/scenarios/:id/edit", controller.getEditForm);
router.post("/scenarios/:id/edit", controller.updateScenario);

// DELETE
router.post("/scenarios/:id/delete", controller.deleteScenario);

module.exports = router;
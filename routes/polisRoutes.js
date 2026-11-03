const express = require("express");

const router = express.Router();

const doctorController = require("../controllers/polisController");
const cekApiKey = require("../middlewares/cekApiKey");

router.get("/", polisController.getPolis);

router.get("/:id", polisController.getPolisById);

router.post("/", cekApiKey, polisController.createPolis);

router.put("/:id", cekApiKey, polisController.updatePolis);

router.delete("/:id", cekApiKey, polisController.deletePolis);

module.exports = router;
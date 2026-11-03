const express = require("express");

const router = express.Router();

const doctorController = require("../controllers/doctorController");
const cekApiKey = require("../middlewares/cekApiKey");

router.get("/", doctorController.getDoctors);

router.get("/:id", doctorController.getDoctorById);

router.post("/", cekApiKey, doctorController.createDoctor);

router.put("/:id", cekApiKey, doctorController.updateDoctor);

router.delete("/:id", cekApiKey, doctorController.deleteDoctor);

module.exports = router;
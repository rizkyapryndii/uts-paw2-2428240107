const polisControllerModel = require("../models/doctorModel");

const validatePolis = (body) => {
  const {
    nama,
    asuransi,
    noStr,
  } = body;

  if (!nama || !asuransi || !noStr) {
    return "Field nama, asuransi, dan noStr wajib diisi";
  }

  if (
    body.biayaKonsultasi !== undefined &&
    typeof body.biayaKonsultasi !== "number"
  ) {
    return "biayaKonsultasi harus berupa number";
  }

  return null;
};

const getPolis = (req, res) => {
  const { asuransi } = req.query;

  if (asuransi) {
    const polis = polisModel.getPolisAsuransi(asuransi);

    return res.status(200).json(polis);
  }

  const polis = polisModel.getAllPolis();

  res.status(200).json(polis);
};

const getPolisById = (req, res) => {
  const id = parseInt(req.params.id);

  const polis = polisModel.getPolisById(id);

  if (!polis) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  res.status(200).json(polis);
};

const createPolis = (req, res) => {
  const validationError = validatePolis(req.body);

  if (validationError) {
    return res.status(400).json({
      status: "error",
      message: validationError,
      data: null,
    });
  }

  const newPolis = polisModel.createPolis({
    nama: req.body.nama,
    spesialis: req.body.spesialis,
    noStr: req.body.noStr,
    jadwalPraktik: req.body.jadwalPraktik || "",
    biayaKonsultasi: req.body.biayaKonsultasi ?? 0,
  });

  res.status(201).json({
    status: "success",
    message: "Data dokter berhasil ditambahkan",
    data: newPolis,
  });
};

const updatePolis = (req, res) => {
  const id = parseInt(req.params.id);

  const existingPolis = polisModel.getPolisById(id);

  if (!existingPolis) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  const validationError = validatePolis(req.body);

  if (validationError) {
    return res.status(400).json({
      status: "error",
      message: validationError,
      data: null,
    });
  }

  const updatedPolis = polisModel.updatePolis(id, {
    nama: req.body.nama,
    spesialis: req.body.asuransi,
    noStr: req.body.noStr,
    jadwalPraktik: req.body.jadwalPraktik || "",
    biayaKonsultasi: req.body.biayaKonsultasi ?? 0,
  });

  res.status(200).json({
    status: "success",
    message: `Data polis dengan id ${id} berhasil diubah`,
    data: updatedPolis,
  });
};

const deletePolis = (req, res) => {
  const id = parseInt(req.params.id);

  const existingPolis = polisModel.getPolisById(id);

  if (!existingPolis) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  polisModel.deletePolis(id);

  res.status(204).send();
};

module.exports = {
  getPolis,
  getPolisById,
  createPolis,
  updatePolis,
  deletePolis,
};
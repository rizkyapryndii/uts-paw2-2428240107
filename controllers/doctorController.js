const doctorModel = require("../models/doctorModel");

const validateDoctor = (body) => {
  const {
    nama,
    spesialis,
    noStr,
  } = body;

  if (!nama || !spesialis || !noStr) {
    return "Field nama, spesialis, dan noStr wajib diisi";
  }

  if (
    body.biayaKonsultasi !== undefined &&
    typeof body.biayaKonsultasi !== "number"
  ) {
    return "biayaKonsultasi harus berupa number";
  }

  return null;
};

// GET /doctors
const getDoctors = (req, res) => {
  const { spesialis } = req.query;

  if (spesialis) {
    const doctors = doctorModel.getDoctorsBySpesialis(spesialis);

    return res.status(200).json(doctors);
  }

  const doctors = doctorModel.getAllDoctors();

  res.status(200).json(doctors);
};

// GET /doctors/:id
const getDoctorById = (req, res) => {
  const id = parseInt(req.params.id);

  const doctor = doctorModel.getDoctorById(id);

  if (!doctor) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  res.status(200).json(doctor);
};

// POST /doctors
const createDoctor = (req, res) => {
  const validationError = validateDoctor(req.body);

  if (validationError) {
    return res.status(400).json({
      status: "error",
      message: validationError,
      data: null,
    });
  }

  const newDoctor = doctorModel.createDoctor({
    nama: req.body.nama,
    spesialis: req.body.spesialis,
    noStr: req.body.noStr,
    jadwalPraktik: req.body.jadwalPraktik || "",
    biayaKonsultasi: req.body.biayaKonsultasi ?? 0,
  });

  res.status(201).json({
    status: "success",
    message: "Data dokter berhasil ditambahkan",
    data: newDoctor,
  });
};

// PUT /doctors/:id
const updateDoctor = (req, res) => {
  const id = parseInt(req.params.id);

  const existingDoctor = doctorModel.getDoctorById(id);

  if (!existingDoctor) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  const validationError = validateDoctor(req.body);

  if (validationError) {
    return res.status(400).json({
      status: "error",
      message: validationError,
      data: null,
    });
  }

  const updatedDoctor = doctorModel.updateDoctor(id, {
    nama: req.body.nama,
    spesialis: req.body.spesialis,
    noStr: req.body.noStr,
    jadwalPraktik: req.body.jadwalPraktik || "",
    biayaKonsultasi: req.body.biayaKonsultasi ?? 0,
  });

  res.status(200).json({
    status: "success",
    message: `Data dokter dengan id ${id} berhasil diubah`,
    data: updatedDoctor,
  });
};

// DELETE /doctors/:id
const deleteDoctor = (req, res) => {
  const id = parseInt(req.params.id);

  const existingDoctor = doctorModel.getDoctorById(id);

  if (!existingDoctor) {
    return res.status(404).json({
      status: "error",
      message: `Data dengan id ${id} tidak ditemukan`,
      data: null,
    });
  }

  doctorModel.deleteDoctor(id);

  res.status(204).send();
};

module.exports = {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
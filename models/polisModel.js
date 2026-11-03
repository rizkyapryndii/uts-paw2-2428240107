let doctors = [
  {
    id: 1,
    nama: "dr. Rina Kartika, Sp.A",
    spesialis: "Anak",
    noStr: "3121100219012345",
    jadwalPraktik: "Senin-Rabu 08.00-12.00",
    biayaKonsultasi: 150000,
  },
  {
    id: 2,
    nama: "dr. Budi Santoso, Sp.PD",
    spesialis: "Penyakit Dalam",
    noStr: "3121100219015678",
    jadwalPraktik: "Selasa-Kamis 09.00-13.00",
    biayaKonsultasi: 200000,
  },
  {
    id: 3,
    nama: "dr. Siti Aulia, Sp.OG",
    spesialis: "Kandungan",
    noStr: "3121100219018901",
    jadwalPraktik: "Senin-Jumat 10.00-14.00",
    biayaKonsultasi: 250000,
  },
];

let nextId = 4;

const getAllDoctors = () => {
  return doctors;
};

const getDoctorById = (id) => {
  return doctors.find((doctor) => doctor.id === id);
};

const getDoctorsBySpesialis = (spesialis) => {
  return doctors.filter(
    (doctor) =>
      doctor.spesialis.toLowerCase() === spesialis.toLowerCase()
  );
};

const createDoctor = (doctorData) => {
  const newDoctor = {
    id: nextId++,
    ...doctorData,
  };

  doctors.push(newDoctor);

  return newDoctor;
};

const updateDoctor = (id, doctorData) => {
  const index = doctors.findIndex((doctor) => doctor.id === id);

  if (index === -1) {
    return null;
  }

  const updatedDoctor = {
    id,
    ...doctorData,
  };

  doctors[index] = updatedDoctor;

  return updatedDoctor;
};

const deleteDoctor = (id) => {
  const index = doctors.findIndex((doctor) => doctor.id === id);

  if (index === -1) {
    return false;
  }

  doctors.splice(index, 1);

  return true;
};

module.exports = {
  getAllDoctors,
  getDoctorById,
  getDoctorsBySpesialis,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const logger = require("./middlewares/logger");
const doctorRoutes = require("./routes/doctorRoutes");

const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/errorHandler");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(logger);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    nama: "Rizky Apryandi Triadmojo",
    npm: "2428240107",
    topik: 6,
    topikNama: "Klinik - Dokter",
    resource: "/doctors",
    endpoints: [
      "GET /doctors",
      "GET /doctors/:id",
      "GET /doctors?spesialis=Anak",
      "POST /doctors",
      "PUT /doctors/:id",
      "DELETE /doctors/:id",
    ],
  });
});

app.use("/doctors", doctorRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(
    `Server berjalan di http://localhost:${PORT}`
  );
});
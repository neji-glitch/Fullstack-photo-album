require("dotenv").config(); // First line for dotenv
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Allow all origins, or specify like this to allow requests from your React app
  })
);
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
const userRoutes = require("./src/routes/userRoutes");
const albumRoutes = require("./src/routes/albumRoutes");
const photoRoutes = require("./src/routes/photoRoutes");

app.use("/users", userRoutes);
app.use("/users/:userId/albums", albumRoutes);
app.use("/albums/:albumId/photos", photoRoutes);

app.get("/data", (req, res) => {
  res.json({ data: "This is safe data accessible from anywhere." });
});

// Server Setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

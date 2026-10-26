require("dotenv").config();

const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const scenarioRoutes = require("./routes/scenarioRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Configure EJS.
app.set("view engine", "ejs");

// Parse HTML form submissions.
app.use(express.urlencoded({ extended: true }));

// Serve CSS and other static files.
app.use(express.static(path.join(__dirname, "public")));

// Homepage.
app.get("/", (req, res) => {
  res.render("index");
});

// Register scenario routes.
app.use("/", scenarioRoutes);

// Start the server after the database connects.
async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`FIREPath running on http://localhost:${PORT}`);
  });
}

startServer();
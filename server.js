const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3001;

// Route to receive ping and set a delayed ping back to main
app.get("/ping", (req, res) => {
  res.send("Secondary Server Pinged!");

  console.log("⏳ Will ping Main after 10 minutes...");

  setTimeout(async () => {
    try {
      await axios.get("https://junglibear.onrender.com/ping");
      console.log("↩️ Pinged Main after 10 mins");
    } catch (err) {
      console.error("Failed to ping Main:", err.message);
    }
  }, 10 * 60 * 1000); // 10 minutes
});

// Health route for uptime services
app.get("/", (req, res) => res.send("Secondary Server OK"));

app.listen(PORT, () => {
  console.log(`Secondary Server running on port ${PORT}`);
});

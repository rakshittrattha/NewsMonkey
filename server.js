require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = "deae395fffd041f4b56acda8d7c70cca";

app.get("/news", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const category = req.query.category || "technology";

    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: category,
        language: "en",
        sortBy: "publishedAt",
        pageSize: 9,
        page: page,
        apiKey: API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});



app.listen(5000, () => console.log("Server running on port 5000"));

import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(express.static("images"));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/movies", async (req, res) => {
  const limit = req.query.limit;
  const fileContent = await fs.readFile("./data/movies.json");

  const moviesData = JSON.parse(fileContent);

  res
    .status(200)
    .json({ movies: limit ? moviesData.splice(0, limit) : moviesData });
});

app.get("/movies/:id", async (req, res) => {
  const { id } = req.params;
  const fileContent = await fs.readFile("./data/movies.json");

  const moviesData = JSON.parse(fileContent);

  const movie = moviesData.find((m) => m.id === id);

  if (!movie) {
    res.status(404).send("movie not found");
  }

  res.status(200).json({ movie });
});

app.get("/favorites", async (req, res) => {
  const fileContent = await fs.readFile("./data/favorites.json");

  const favorites = JSON.parse(fileContent);

  res.status(200).json({ favorites });
});

app.put("/favorites", async (req, res) => {
  const movieId = req.body.movieId;

  const fileContent = await fs.readFile("./data/movies.json");
  const moviesData = JSON.parse(fileContent);

  const movie = moviesData.find((movie) => movie.id === movieId);

  const favoritesFileContent = await fs.readFile("./data/favorites.json");
  const favorites = JSON.parse(favoritesFileContent);

  let updatedFavorites = favorites;

  if (!favorites.some((m) => m.id === movie.id)) {
    updatedFavorites = [...favorites, movie];
  }

  await fs.writeFile("./data/favorites.json", JSON.stringify(updatedFavorites));

  res.status(200).json({ favorites: updatedFavorites });
});

app.delete("/favorites/:id", async (req, res) => {
  const movieId = req.params.id;
  const favoritesFileContent = await fs.readFile("./data/favorites.json");
  const favoritesData = JSON.parse(favoritesFileContent);

  const movieIndex = favoritesData.findIndex((movie) => movie.id === movieId);

  let updatedFavorites = favoritesData;

  if (movieIndex >= 0) {
    updatedFavorites.splice(movieIndex, 1);
  }

  await fs.writeFile("./data/favorites.json", JSON.stringify(updatedFavorites));

  res.status(200).json({ favorites: updatedFavorites });
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000, () => {
  console.log("server running");
});

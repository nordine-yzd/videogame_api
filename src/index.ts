//import des modules
import request from "@fewlines-education/request";
import nunjucks from "nunjucks";
import express from "express";

//configuration des modules importé
//express
const app = express();
//nunjucks
app.set("view engine", "njk");

//dire ce qui est public d'acces
app.use(express.static("public"));

nunjucks.configure("views", { autoescape: true, express: app });

//page d'accueil

app.get("/", (req, res) => {
  res.render("home.njk");
});

//page de toutes les platforms
app.get("/platforms", (req, res) => {
  const stringQuery = req.query;
  if (stringQuery.page) {
    request(
      `http://videogame-api.fly.dev/platforms?page=${stringQuery.page}`,
      (error, body) => {
        if (error) {
          throw error;
        }
        const json = JSON.parse(body);
        // console.log(json.platforms);
        res.render("platforms.njk", { platt: json.platforms });
      }
    );
  } else {
    request("http://videogame-api.fly.dev/platforms", (error, body) => {
      if (error) {
        throw error;
      }
      const json = JSON.parse(body);
      // console.log(json.platforms);

      res.render("platforms.njk", { platt: json.platforms });
    });
  }
});

// page des jeux en fonction des platforms(id)
app.get("/platforms/:id", (req, res) => {
  const slug = req.params;
  const stringQuery = req.query;

  if (stringQuery.page) {
    request(
      `https://videogame-api.fly.dev/games/platforms/${slug.id}?page=${stringQuery.page}`,
      (error, body) => {
        if (error) {
          throw error;
        }
        const json = JSON.parse(body);
        // console.log(json.games);
        res.render("game_in_platforms.njk", { games: json.games });
      }
    );
  } else {
    request(
      `https://videogame-api.fly.dev/games/platforms/${slug.id}`,
      (error, body) => {
        if (error) {
          throw error;
        }
        const json = JSON.parse(body);
        // console.log(json.games);
        res.render("game_in_platforms.njk", { games: json.games });
      }
    );
  }
});

//page des details d'un jeux grace a l'id
app.get("/games/:id", (req, res) => {
  const slug = req.params;
  request(`https://videogame-api.fly.dev/games/${slug.id}`, (error, body) => {
    if (error) {
      throw error;
    }
    const json = JSON.parse(body);
    // console.log(json);
    res.render("details_of_game.njk", { details: json });
  });
  // res.send("helloeeeee");
});

// tt les jeux
app.get("/games", (req, res) => {
  const stringQuery = req.query;
  // console.log(stringQuery);
  const stringToNumber = Number(stringQuery.page);
  const re = stringToNumber + 1;
  // console.log(stringToNumber);
  // console.log(re);

  if (stringQuery.page) {
    request(
      `http://videogame-api.fly.dev/games?page=${stringQuery.page}`,
      (error, body) => {
        if (error) {
          throw error;
        }
        const json = JSON.parse(body);
        // console.log(json.games);
        // console.log(stringQuery);

        res.render("games.njk", {
          games: json.games,
          queryStr: stringQuery,
          indexPage: stringToNumber,
          indexPlus: re,
        });
      }
    );
  } else {
    request("http://videogame-api.fly.dev/games", (error, body) => {
      if (error) {
        throw error;
      }
      const json = JSON.parse(body);
      // console.log(json.games);
      // console.log(stringQuery);

      res.render("games.njk", {
        games: json.games,
        queryStr: stringQuery,
        indexPage: stringToNumber,
      });
    });
  }
});

//creation du serveur local
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

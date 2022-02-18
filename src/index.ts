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

//

app.get("/", (req, res) => {
  res.send("Hello to my website");
});

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

//creation du serveur local
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

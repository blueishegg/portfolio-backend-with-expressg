import express, { query } from "express";
const router = express.Router();
import {
  getAllGames,
  getGameById,
  createGame,
  deleteGameById,
  // replaceGameById,
  searchGamesByTitle,
  updateRatingById,
} from "../models/models.js";

// const app = express();
// const PORT = 3000;
// router.use(express.json());
//routes that handle requests

// router.get("/", async function (req, res) {
//   const users = await getUsers();
//   res.json(users);
// });
////-----------GET all games//-----------
router.get("/", async function (req, res) {
  let games;
  if (req.query.title !== undefined) {
    games = await searchGamesByTitle(req.query.title);
  } else {
    games = await getAllGames();
  }
  res.json({
    message: "Here is a list of games I have played",
    payload: games,
  });
});
//-----------GET ALL GAMES BY ID//-----------
router.get("/:game_id", async function (req, res) {
  const game_found = await getGameById(req.params.game_id);

  res.json({
    message: `Here is the game I have played with the id of ${req.params.game_id}`,
    game: game_found,
  });
});

//-----------CREATE GAME-----------
router.post("/", async function (req, res) {
  const game = await createGame(req.body);
  res.json({ message: "Hey there!", success: true, payload: game });
});

//-----------DELETE GAME BY ID//-----------
router.delete("/:id", async function (req, res) {
  const game = await deleteGameById(req.params.id);
  res.json({ success: true, payload: game });
});

// router.patch("/:id", async function (req, res) {
//   const game = await replaceGameById(req.params.id, req.body);
//   res.json({ success: true, payload: game });
// });

router.patch("/:id", async function (req, res) {
  const result = await updateRatingById(req.params.id, req.body);
  res.json({ message: "Hey there", payload: result });
});

export default router;

import { query } from "../db/index.js";

export async function getAllGames() {
  const data = await query(`SELECT * FROM games;`);
  return data.rows;
}

export async function getGameById(game_id) {
  //instead of keeping data in js files, we have now set up Heroku, a cliud database manager to keep our data persistant. Therefore, to return data to the client, we will run queries using the nodepostgres module "query"
  let game;
  if (game_id.length > 0) {
    game = await query(`SELECT * FROM games WHERE id = $1;`, [game_id]);
  } else {
    return { message: "There is no game with that game id" };
  }
  return game.rows;
}

export async function createGame(new_game) {
  let game;
  if (new_game) {
    game = await query(
      `INSERT INTO games (title, star_rating, released_date, game_description) VALUES ($1, $2, $3, $4) RETURNING *;`,
      [
        new_game.title,
        new_game.star_rating,
        new_game.released_date,
        new_game.game_description,
      ]
    );
  } else {
    return { message: "Failed to create game" };
  }
  return game.rows;
}

export async function deleteGameById(requestedId) {
  // let deletedGameIndex = games.findIndex(function (game) {
  //   return game.id === Number(requestedId);
  // });

  // if (deletedGameIndex < 0) {
  //   return { message: "This ID does not exist, please try again" };
  // }
  // games.splice(deletedGameIndex, 1);
  let game = await query("DELETE FROM games WHERE id = $1 RETURNING *;", [
    requestedId,
  ]);
  return game.rows;
}

// export async function replaceGameById(requestedId, replacementGame) {
//   let findGameIndex = games.findIndex(function (game) {
//     return game.id === Number(requestedId);
//   });
//   if (findGameIndex < 0) {
//     return { message: "Incorrect ID, please try again" };
//   }

//   const toAdd = {
//     id: Number(requestedId),
//     title: replacementGame.title,
//     star_rating: replacementGame.star_rating,
//     released_date: replacementGame.released_date,
//     game_description: replacementGame.game_description,
//   };

//   games.splice(findGameIndex, 1, toAdd);
//   return games;
// }

export async function updateRatingById(game_id, update) {
  let game;
  if (game_id) {
    game = await query(
      `
    UPDATE games SET star_rating = $1 WHERE id = $2 RETURNING *;`,
      [update.star_rating, game_id]
    );
  } else {
    return { message: "invalid id" };
  }
  return game.rows;
}

export async function searchGamesByTitle(titleSearched) {
  // let result = games.filter(function (game) {
  //   return game.title.toLowerCase().includes(titleSearched.toLowerCase());
  // });
  // return result;
  const data = await query(
    `SELECT * FROM games WHERE title ILIKE '%' || $1 || '%';`,
    [titleSearched]
  );
  return data.rows;
}

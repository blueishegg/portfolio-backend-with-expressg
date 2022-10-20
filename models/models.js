import { games } from "../games-data.js";

function createNewId() {
  let allIds = [];
  let newId = 1;
  for (let i = 0; i < games.length; i++) {
    allIds.push(games[i].id);
  }
  while (allIds.includes(newId)) {
    newId++;
  }
  return newId;
}

// export async function getUsers() {
//   return users;
// }

export async function getAllGames() {
  // let games = deployGames();
  return games;
}

export async function getGameById(game_id) {
  // let games = deployGames();
  let game = games.find(function (game) {
    return game.id === game_id;
  });
  if (game === undefined) {
    return {
      message: `Unfortunately I have not played the game with the id of ${game_id}`,
    };
  }
  return game;
}

export async function createGame(new_game) {
  // let games = deployGames();
  let newID = createNewId();
  const toAdd = {
    id: newID,
    title: new_game.title,
    star_rating: new_game.star_rating,
    released_date: new_game.released_date,
    game_description: new_game.game_description,
  };
  games.push(toAdd);
  return games;
}

export async function deleteGameById(requestedId) {
  // let games = deployGames();
  let deletedGameIndex = games.findIndex(function (game) {
    return game.id === Number(requestedId);
  });

  if (deletedGameIndex < 0) {
    return { message: "This ID does not exist, please try again" };
  }
  games.splice(deletedGameIndex, 1);

  return games;
}

export async function replaceGameById(requestedId, replacementGame) {
  let findGameIndex = games.findIndex(function (game) {
    return game.id === Number(requestedId);
  });
  if (findGameIndex < 0) {
    return { message: "Incorrect ID, please try again" };
  }

  const toAdd = {
    id: Number(requestedId),
    title: replacementGame.title,
    star_rating: replacementGame.star_rating,
    released_date: replacementGame.released_date,
    game_description: replacementGame.game_description,
  };

  games.splice(findGameIndex, 1, toAdd);
  return games;
}

export async function searchGamesByTitle(titleSearched) {
  let result = games.filter(function (game) {
    return game.title.toLowerCase().includes(titleSearched.toLowerCase());
  });
  return result;
}

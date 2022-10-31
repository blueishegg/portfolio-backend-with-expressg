/**
 * import query function ✅
 * import our games data ✅
 * make async function - populateGamesTable ✅
 * write sql statement to get each games inserted in to table ✅
 * use our query function to send our sql query ✅
 * call our function ✅
 */
import { query } from "../index.js";
import { games } from "../../games-data.js";

async function populateGamesTable() {
  for (let i = 0; i < games.length; i++) {
    const { title, star_rating, released_date, game_description } = games[i];
    // const title = games[i].title;
    // const star_rating = games[i].star_rating;
    // const released_date = games[i].released_date;
    // const game_description = games[i].game_description;

    const res = await query(
      `INSERT INTO games
    (title, star_rating, released_date, game_description)
    VALUES ($1, $2, $3, $4)
    RETURNING title;`,
      [title, star_rating, released_date, game_description]
    );
    console.log(res);
  }
}

populateGamesTable();

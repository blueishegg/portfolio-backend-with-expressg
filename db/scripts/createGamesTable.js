/*
 we want to use our query function from our index file
 sql query to create a table
 CREATE TABLE games (
    game_id,
    title,
    star_rating,
    released_date,
    game_description,
 )
 */
import { query } from "../index.js";

const sqlString = `CREATE TABLE IF NOT EXISTS games(
    id SERIAL PRIMARY KEY,
    title TEXT,
    star_rating INT,
    released_date DATE,
    game_description TEXT
)`;

async function createGamesTable() {
  const res = await query(sqlString);
  console.log("Created games table", res);
}

createGamesTable();

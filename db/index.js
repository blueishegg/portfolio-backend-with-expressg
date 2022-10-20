// here is where we want to add code for connecting to the database
import pg from "pg";
const pool = new pg.Pool();

export function query(text, params) {
  return pool.query(text, params);
}

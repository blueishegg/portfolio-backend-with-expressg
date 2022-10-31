// here is where we want to add code for connecting to the database
import pg from "pg";
const pool = new pg.Pool({
  user: "eylcnnzdccjohe",
  host: "ec2-54-228-32-29.eu-west-1.compute.amazonaws.com",
  database: "dbqvedi5ti0vrj",
  password: "85e8a9d2b48c8725180e64bd1d621f82ac635535c715d171d4ee3133585f5db4",
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

export function query(text, params) {
  return pool.query(text, params);
}

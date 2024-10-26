import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from 'cors'; 
import env from "dotenv";

env.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

db.connect();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

let tasks = await db.query("SELECT * FROM prices");
    
tasks = tasks.rows;

console.log(tasks);


app.get("/hotels", async (req, res) => {
    let hotels = await db.query("SELECT * FROM hotels");
    res.send(hotels);
});

app.get("/prices", async (req,res) => {
    let prices = await db.query("SELECT * FROM prices");
    res.send(prices);
})


app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})
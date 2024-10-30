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


app.get("/hotels", async (req, res) => {
    let hotels = await db.query("SELECT * FROM hotels");
    res.send(hotels);
});

app.get("/prices", async (req, res) => {
    let prices = await db.query("SELECT * FROM prices");
    res.send(prices);
})

app.post("/getHotelById/:hotel_id", async (req, res) => {
    const hotel_id = req.params.hotel_id;
    let hotel;
    
    hotel = await db.query(`
        SELECT 
            hotels.hotel_name,
            hotels.jarak,
            hotels.rating,
            hotels.kamar,
            hotels.transportasi,
            hotels.image,
            prices.mulai,
            prices.akhir,
            prices.double,
            prices.triple,
            prices.quad,
            prices.quint,
            prices.price_id 
        FROM 
            hotels
        JOIN 
            prices ON hotels.hotel_id = prices.hotel_id
        WHERE 
            hotels.hotel_id = $1;              
        `, [hotel_id])
    
    console.log(hotel_id);
    res.send(hotel.rows);
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})
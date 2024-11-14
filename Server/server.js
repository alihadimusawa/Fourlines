import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from 'cors';
import env from "dotenv";
import path from 'path';
import { fileURLToPath } from "url";

env.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
app.use(express.static(path.join(__dirname, 'public')));


// Get image
app.get('/image/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, 'public', filename);
    // Send the image file if it exists
    res.sendFile(imagePath, (err) => {
        if (err) {
            console.error('File not found:', err);
            res.status(404).send('Image not found');
        }
    });
});

// Get icon
app.get("/icon/:iconName", (req,res) => {
    const iconName = req.params.iconName;
    const imagePath = path.join(__dirname, 'public', filename);
    // Send the icon file if it exist
    res.sendFile(imagePath, (err)=> {
        if(err){
            console.error("File not found", err);
            res.status(404).send("Icon not found");
        }
    })
})

// Get hotels
app.get("/hotels", async (req, res) => {
    let hotels = await db.query("SELECT * FROM hotels");
    res.send(hotels);
});


// Get prices
app.get("/prices", async (req, res) => {
    let prices = await db.query("SELECT * FROM prices");
    res.send(prices);
})


// Get hotel by id
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
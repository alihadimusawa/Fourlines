import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
import env from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

env.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: {
    rejectUnauthorized: false, // This is important for hosted services like Aiven
  },
});

db.connect();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Get image
app.get("/image/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, "public", filename);
  // Send the image file if it exists
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error("File not found:", err);
      res.status(404).send("Image not found");
    }
  });
});

// Get icon
app.get("/icon/:iconName", (req, res) => {
  const iconName = req.params.iconName;
  const imagePath = path.join(__dirname, "public", iconName);
  // Send the icon file if it exist
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error("File not found", err);
      res.status(404).send("Icon not found");
    }
  });
});

// Get hotels
app.get("/hotels", async (req, res) => {
  let hotels = await db.query("SELECT * FROM hotels");
  console.log("getting all the hotels from the backend is triggered");
  res.send(hotels);
});

// Add hotel
app.post("/addHotel", async (req, res) => {
  const {
    hotelName,
    hotelAddress,
    hotelDescription,
    hotelRating,
    hotelRoom,
    hotelDistance,
    hotelAllotment,
    hotelSpecial,
    hotelGym,
    hotelLaundry,
    hotelCafe,
    hotelWifi,
    hotelBreakfast,
    hotelPool,
    hotelImage,
    hotelRestaurant,
  } = req.body;

  try {
    const result = await db.query(
      `
          INSERT INTO hotels 
          (hotel_name, rating, kamar, transportasi, image, address, restaurant, gym, laundry, cafe, wifi, breakfast, pool, description, allotment, special, jarak)
          VALUES 
          ($1, $2, $3, 'Shuttle Bus', $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
          RETURNING hotel_id;
        `,
      [
        hotelName,
        hotelRating,
        hotelRoom,
        hotelImage,
        hotelAddress,
        hotelRestaurant,
        hotelGym,
        hotelLaundry,
        hotelCafe,
        hotelWifi,
        hotelBreakfast,
        hotelPool,
        hotelDescription,
        hotelAllotment,
        hotelSpecial,
        hotelDistance,
      ]
    );

    const hotelId = result.rows[0].hotel_id;
    res.json({ hotelId });
  } catch (error) {
    console.log(
      "Error trying to insert a new hotel into the database: \n",
      error
    );
    res.sendStatus(422);
    return;
  }
  res.sendStatus(200);
});

// Delete hotel by its id
app.delete("/hotels/:hotel_id", async (req, res) => {
  const hotelId = req.params.hotel_id;

  try {
    // Query to delete the hotel by its ID
    const result = await db.query(
      "DELETE FROM hotels WHERE hotel_id = $1 RETURNING *;",
      [hotelId]
    );

    if (result.rowCount === 0) {
      // No hotel found with the given ID
      res.status(404).send({ success: false, message: "Hotel not found." });
    } else {
      // Hotel deleted successfully
      console.log(`Hotel with ID ${hotelId} deleted.`);
      res.send({
        success: true,
        message: `Hotel with ID ${hotelId} deleted successfully.`,
        data: result.rows[0],
      });
    }
  } catch (error) {
    console.error("Error deleting hotel:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while deleting the hotel.",
    });
  }
});

// Add hotel price
app.post("/addHotelPrice", async (req, res) => {
  const {
    startDate,
    endDate,
    doublePrice,
    triplePrice,
    quadPrice,
    quintPrice,
    hotelId,
  } = req.body;

  let tempStartDate = new Date(startDate);
  let tempEndDate = new Date(endDate);

  let startDateYear = 1000;
  let endDateYear =
    tempStartDate.getFullYear() === tempEndDate.getFullYear() ? 1000 : 1001;

  const formatDate = (date, year) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const finalStartDate = formatDate(tempStartDate, startDateYear);
  const finalEndDate = formatDate(tempEndDate, endDateYear);

  const result = await db.query(
    `
        INSERT INTO prices 
        (mulai, akhir, double, triple, quad, quint, hotel_id)
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7);
    `,
    [
      finalStartDate,
      finalEndDate,
      doublePrice,
      triplePrice,
      quadPrice,
      quintPrice,
      hotelId,
    ]
  );

  if (req.body) return res.sendStatus(200);
  res.sendStatus(422);
});

//   Delete hotel price by its id
app.delete("/price/:priceId", async (req, res) => {
  const priceId = req.params.priceId;
  try {
    const result = db.query(
      `
        DELETE FROM prices
        WHERE price_id = $1;`,
      [priceId]
    );
  } catch (error) {
    console.log(error);
    return;
  }
  console.log("hotel with id of ", priceId, " has been deleted");
});

// Get prices
app.get("/prices", async (req, res) => {
  let prices = await db.query("SELECT * FROM prices");
  console.log("hotel prices for particular date in the backend is triggered");
  res.send(prices);
});

// Get Hotel Images by hotel Id
app.post("/getHotelImageById/:hotel_id", async (req, res) => {
  const hotel_id = req.params.hotel_id;
  let hotel;

  hotel = await db.query(
    `
        SELECT 
                images.image,
                image_id
        FROM 
            images
        JOIN 
            hotels ON images.hotel_id = hotels.hotel_id
        WHERE 
            hotels.hotel_id = $1;`,
    [hotel_id]
  );

  console.log("hotel images backend triggerred");
  res.send(hotel.rows);
});

// Add hotel image by hotel id
app.post("/addHotelImage/", async (req, res) => {
  const { image, hotelId } = req.body;
  console.log(image);
  try {
    db.query(
      `
            INSERT INTO images (image, hotel_id)
            VALUES ($1, $2);
        `,
      [image, hotelId]
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(422);
  }
});

// Delete hotel image by image id
app.delete("/deleteHotelImage/:imageId", async (req, res) => {
  const imageId = req.params.imageId;
  try {
    const result = db.query(
      `
        DELETE FROM images
        WHERE image_id = $1;
        `,
      [imageId]
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(422);
  }
});

// Get hotel prices by id
app.post("/getHotelPrices/:hotel_id", async (req, res) => {
  const hotel_id = req.params.hotel_id;
  let hotel;

  hotel = await db.query(
    `
        SELECT 
            hotels.hotel_name,
            hotels.address,
            hotels.restaurant,
            hotels.gym,
            hotels.laundry,
            hotels.description,
            hotels.cafe,
            hotels.wifi,
            hotels.breakfast,
            hotels.pool,
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
        `,
    [hotel_id]
  );

  console.log("hotel prices backend triggerred");
  res.send(hotel.rows);
});

// Get all of the fourlines article
app.get("/getArticles", async (req, res) => {
  const articles = await db.query(`SELECT * FROM articles;`);
  console.log("articles is fetched");
  res.send(articles.rows);
});

// Add a new article to the database
app.post("/addArticle", async (req, res) => {
  const { articleTitle, articleAuthor, articleImage, articleContent } =
    req.body;

  try {
    const response = db.query(
      `
        INSERT INTO articles(image, title, content, author)
        VALUES ($1,$2,$3,$4);
`,
      [articleImage, articleTitle, articleContent, articleAuthor]
    );
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(422);
  }
});

// Delete article by its id
app.delete("/deleteArticle/:articleId", async(req,res) => {
    const articleId = req.params.articleId;
    try {
        const response = db.query(`
            DELETE FROM articles WHERE article_id = $1;
        `, [articleId]);
        res.sendStatus(200);
        console.log("Succesfully delete an article from the database");
    } catch (error) {
        console.log(error);
        res.sendStatus(422);
        console.log("fail");
    }
    
})

// get a particular article by id
app.get("/getArticleById/:articleId", async (req, res) => {
  const articleId = req.params.articleId;
  let article = await db.query(
    `
        SELECT  * FROM articles WHERE article_id = $1;
    `,
    [articleId]
  );
  console.log("getting particular article by id from the backend is triggered");
  res.send(article.rows);
});

app.get("/faq", async (req, res) => {
  const faq = [
    {
      question: "Apa saja layanan yang ditawarkan oleh bisnis ini?",
      answer:
        "Kami menyediakan layanan pengurusan dokumen keberangkatan, penyediaan hotel di Makkah dan Madinah, serta paket wisata Islami domestik (khususnya Indonesia Timur)",
    },
    {
      question: "Apakah ada paket perjalanan yang dapat disesuaikan?",
      answer:
        "Tentu, kami menyediakan opsi kustomisasi paket sesuai kebutuhan dan anggaran Anda.",
    },
    {
      question: "Dokumen apa saja yang diperlukan untuk Haji atau Umroh?",
      answer:
        "Dokumen yang diperlukan meliputi paspor, visa, kartu vaksinasi, dan dokumen pendukung lainnya. Tim kami akan membantu Anda mengurus semuanya.",
    },
    {
      question:
        "Apakah hotel yang disediakan dekat dengan Masjidil Haram atau Masjid Nabawi?",
      answer:
        "Hotel yang kami sediakan memiliki fasilitas seperti Wi-Fi, layanan makan, transportasi, dan kamar yang nyaman.",
    },
    {
      question: "Apakah tersedia layanan pendampingan selama perjalanan?",
      answer:
        "Ya, kami menyediakan tim pendamping profesional untuk memastikan perjalanan Anda berjalan lancar.",
    },
  ];

  res.send(faq);
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

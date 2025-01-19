import styling from "../style/AdminPage.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function InsertHotelPage() {
  const ratingOptions = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  const booleanOptions = [
    { value: true, label: "true" },
    { value: false, label: "false" },
  ];

  const navigate = useNavigate();

  const goToInsertPriceImage = (hotelId) => {
    navigate(`/InsertPriceImage/${hotelId}`);
  }

// Below are for inserting price
  async function validateHotelInput(event) {
    event.preventDefault();

    const form = event.target.closest("form");
    const formData = new FormData(form);

    const hotelName = formData.get("name");
    const hotelAddress = formData.get("alamat");
    const hotelDescription = formData.get("deskripsi");
    const hotelRating = formData.get("rating");
    const hotelRoom = formData.get("kamar");
    const hotelDistance = formData.get("jarak");
    const hotelAllotment = formData.get("allotment");
    const hotelSpecial = formData.get("special");
    const hotelGym = formData.get("gym");
    const hotelLaundry = formData.get("laundry");
    const hotelCafe = formData.get("cafe");
    const hotelWifi = formData.get("wifi");
    const hotelBreakfast = formData.get("breakfast");
    const hotelPool = formData.get("pool");
    const hotelImage = formData.get("gambar");
    const hotelRestaurant = formData.get("restaurant");

    // Array of field names and values for validation
    const fields = [
      { name: "Nama hotel", value: hotelName },
      { name: "Alamat hotel", value: hotelAddress },
      { name: "Deskripsi hotel", value: hotelDescription },
      { name: "Rating hotel", value: hotelRating },
      { name: "Jumlah kamar", value: hotelRoom },
      { name: "Jarak hotel", value: hotelDistance },
      { name: "Allotment hotel", value: hotelAllotment },
      { name: "Special hotel", value: hotelSpecial },
      { name: "Fasilitas gym", value: hotelGym },
      { name: "Fasilitas laundry", value: hotelLaundry },
      { name: "Fasilitas cafe", value: hotelCafe },
      { name: "Fasilitas wifi", value: hotelWifi },
      { name: "Fasilitas sarapan", value: hotelBreakfast },
      { name: "Fasilitas kolam renang", value: hotelPool },
      { name: "Gambar hotel", value: hotelImage },
      { name: "Restoran hotel", value: hotelRestaurant },
    ];

    // Validate each field
    for (const field of fields) {
      if (!field.value) {
        alert(`Tolong lengkapi ${field.name}`);
        return; // Stop execution if a field is missing
      }
    }

    try {
      const response = await axios.post("http://localhost:3000/addHotel", {
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
        hotelRestaurant
      });
      goToInsertPriceImage(response.data.hotelId);
      return;
    } catch (error) {
      console.error("Error sbumitting hotel: ", error); 
      alert("Gagal untuk menambahkan hotel ke dalam database");
      return; 
    }
  }



  return (
    <div className={styling.insertHotelPage}>
      <h1>INSERT HOTEL</h1>

      <form>
        <h5>Nama Hotel</h5>
        <input type="text" name="name" id="name" />

        <h5>Alamat</h5>
        <input type="text" name="alamat" id="alamat" />
        
        <h5>Gambar Utama</h5>
        <input type="text" name="gambar" id="gambar" />

        <h5>Deskripsi hotel</h5>
        <textarea id="deskripsi" name="deskripsi" rows="10" cols="50" />

        <div className={styling.inputContainer}>
          <div>
            <h5>Rating</h5>
            <input type="number" name="rating" step="0.5" min="1" max="5" />
          </div>

          <div>
            <h5>Kamar</h5>
            <input type="number" name="kamar" min="0" />
          </div>

          <div>
            <h5>Jarak</h5>
            <input type="number" name="jarak" min="0" />
          </div>

          <div>
            <h5>Allotment</h5>
            <select name="allotment">
              {booleanOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h5>Special</h5>
            <select name="special">
              {booleanOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h5>Restaurant</h5>
            <select name="restaurant">
              {booleanOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styling.inputContainer}>
          <div>
            <h5>Gym</h5>
            <select name="gym">
              {booleanOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h5>Laundry</h5>
            <select name="laundry">
              {booleanOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h5>Cafe</h5>
            <select name="cafe">
              {booleanOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h5>Wifi</h5>
            <select name="wifi">
              {booleanOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h5>Breakfast</h5>
            <select name="breakfast">
              {booleanOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h5>Pool</h5>
            <select name="pool">
              {booleanOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          className={styling.addButton}
          onClick={validateHotelInput}
          id={styling.confirmButton}
        >
          ADD HOTEL
        </button>
      </form>
    </div>
  );
}

import styling from "../style/AdminPage.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function InsertPriceImage() {
  const { hotelId } = useParams();
  console.log(hotelId);

  // for image table
  const [listOfImages, setListOfImages] = useState([]);
  const [imageInput, setImageInput ] = useState("");

  const fetchImage = async () => {
    try {
      const result = await axios.post(
        `http://localhost:3000/getHotelImageById/${hotelId}`
      );
      setListOfImages(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const changeImageInput = (event) => {
    setImageInput(event.target.value); // To update the state when the input changes
    console.log(event.target.value);
  };
  

  const deleteImage = async(imageId) =>{
    try {
      const result = axios.delete(`http://localhost:3000/deleteHotelImage/${imageId}`);
    } catch (error) {
      console.log(error);
    }
  }

  const validateImageInput = async(event) => {
    event.preventDefault();

    const form = event.target.closest("form");

    const formData = new FormData(form);
    const image = formData.get("hotelImage");
    
    if(!image){
      alert("Harap masukkan link gambar ke dalam form yang telah disediakan");
      
    }

    try {
      const response = await axios.post("http://localhost:3000/addHotelImage", {
        image,
        hotelId
      });
    } catch (error) {
      console.error("Error submitting image:", error);
      alert("Gagal untuk menambahkan gambar, coba lagi");
      return;
    }
    setImageInput("")
    alert("Berhasil menambahkan gambar hotel ke database");
    fetchImage();
  }

  // ------------------ PRICE ------------------
  // for price table
  const [listOfPrices, setListOfPrices] = useState([]);

  const fetchPrice = async () => {
    const result = await axios.post(
      `http://localhost:3000/getHotelPrices/${hotelId}`
    );

    let tempResult = result.data;

    // change the year of the end date
    tempResult.forEach((currentPrice) => {
      let parts = currentPrice.akhir;

      // get the day. month and year
      parts = parts.split("-");

      // create a date object
      let tempDate = new Date();

      // change the year
      if (parts[2] == "1000") parts[2] = tempDate.getFullYear();
      else if (parts[2] == "1001") parts[2] = tempDate.getFullYear() + 1;

      // set the end date
      currentPrice.akhir = parts.join("-");

      // MULAI
      const newLocal = (parts = currentPrice.mulai);

      parts = parts.split("-");

      tempDate = new Date();

      // change the year
      if (parts[2] == "1000") parts[2] = tempDate.getFullYear();
      else if (parts[2] == "1001") parts[2] = tempDate.getFullYear() + 1;

      currentPrice.mulai = parts.join("-");

      console.log("mulai: ", currentPrice.mulai);
      console.log("akhir: ", currentPrice.akhir);
    });

    setListOfPrices(tempResult);
  };

  const deletePrice = async (priceId) => {
    try {
      const result = await axios.delete(
        `http://localhost:3000/price/${priceId}`
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPrice();
    fetchImage();
  }, []);

  // function to add price of the hotel
  async function validatePriceInput(event) {
    // prevent default submissi
    event.preventDefault();

    const form = event.target.closest("form");

    const formData = new FormData(form);
    const startDateTemp = formData.get("start_date");
    const endDateTemp = formData.get("end_date");
    const doublePrice = formData.get("double_price");
    const triplePrice = formData.get("triple_price");
    const quadPrice = formData.get("quad_price");
    const quintPrice = formData.get("quint_price");

    // startDate will have a value like this = 11/12/2002
    const startDate = new Date(startDateTemp);
    const endDate = new Date(endDateTemp);

    if (!startDateTemp || !endDateTemp) {
      alert("Harap pilih tanggal mulai dan tanggal akhir.");
      return;
    }

    if (startDate >= endDate) {
      alert("Tanggal mulai harus sebelum tanggal akhir");
    }

    if (!doublePrice || isNaN(doublePrice) || doublePrice <= 0) {
      alert("Harap masukkan harga yang valid untuk kamar double.");
      return;
    }

    if (!triplePrice || isNaN(triplePrice) || triplePrice <= 0) {
      alert("Harap masukkan harga yang valid untuk kamar triple.");
      return;
    }

    if (!quadPrice || isNaN(quadPrice) || quadPrice <= 0) {
      alert("Harap masukkan harga yang valid untuk kamar quadruple.");
      return;
    }

    if (!quintPrice || isNaN(quintPrice) || quintPrice <= 0) {
      alert("Harap masukkan harga yang valid untuk kamar quintuple.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/addHotelPrice", {
        startDate,
        endDate,
        doublePrice,
        triplePrice,
        quadPrice,
        quintPrice,
        hotelId,
      });
    } catch (error) {
      console.error("Error submitting prices:", error);
      alert("Failed to submit prices. Please try again.");
      return;
    }

    alert("Added price succesfully");
    fetchPrice();
  }

  return (
    <div>
      <form id={styling.imageForm}>
        <h1>Tambah gambar</h1>
        <table>
          <thead>
            <tr>
              <th id={styling.linkContainer}>Link Gambar</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {
              listOfImages.length > 0 &&
            listOfImages.map((currentImage, index) => {
              return (
                <tr key={index}>
                  <td id={styling.linkContainer}>{currentImage.image}</td>
                  <td id={styling.imageFormManage}>
                    <button
                      className={styling.deleteButton}
                      onClick={() => deleteImage(currentImage.image_id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td id={styling.linkContainer}>
                <input type="text" name="hotelImage" value={imageInput} onChange={changeImageInput} id={styling.hotelImageInput}/>
              </td>
              <td id={styling.imageFormManage}>
                <button
                  className={styling.addButton}
                  onClick={validateImageInput}
                >
                  CONFIRM
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <form id={styling.priceForm}>
        <h1>Tambah harga hotel</h1>
        <table>
          <thead>
            <tr>
              <th>Mulai</th>
              <th>Akhir</th>
              <th>Double</th>
              <th>Triple</th>
              <th>Quad</th>
              <th>Quint</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {listOfPrices.map((currentPrice, index) => {
              return (
                <tr key={index}>
                  <td>{currentPrice.mulai}</td>
                  <td>{currentPrice.akhir}</td>
                  <td>{currentPrice.double}</td>
                  <td>{currentPrice.triple}</td>
                  <td>{currentPrice.quad}</td>
                  <td>{currentPrice.quint}</td>
                  <td id={styling.manageButtonContainer}>
                    <button
                      className={styling.deleteButton}
                      onClick={() => deletePrice(currentPrice.price_id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td>
                <input type="date" name="start_date" />
              </td>
              <td>
                <input type="date" name="end_date" />
              </td>
              <td>
                <input type="number" name="double_price" step="1" min="0" />
              </td>
              <td>
                <input type="number" name="triple_price" step="1" min="0" />
              </td>
              <td>
                <input type="number" name="quad_price" step="1" min="0" />
              </td>
              <td>
                <input type="number" name="quint_price" step="1" min="0" />
              </td>
              <td id={styling.manageButtonContainer}>
                <button
                  className={styling.addButton}
                  onClick={validatePriceInput}
                  type="submit"
                >
                  CONFIRM
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

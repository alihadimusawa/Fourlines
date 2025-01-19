import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styling from "../style/AdminPage.module.css";
import SearchBar from "../components/SearchBar";
import axios from "axios";

function AdminPage() {
  const navigate = useNavigate();
  function goToInsert() {
    navigate("/Insert");
  }
  
  function goToInsertPriceImage(hotelId){
    navigate(`/InsertPriceImage/${hotelId}`);
  }
  
  function goToAdminHotel(){
    navigate(`/Admin`);
  }

  function goToAdminArticle(){
    navigate(`/AdminArticle`);
  }

  const [hotels, setHotels] = useState(null);

  async function fetchHotels() {
    let result = await axios.get("http://localhost:3000/hotels");
    result = result.data.rows;
    setHotels(result);
  }

  async function deleteHotels(hotelId) {
    let result = await axios.delete(`http://localhost:3000/hotels/${hotelId}`);
    fetchHotels();
  }

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    hotels && (
      <div className={styling.adminPage}>
          <h1>DASHBOR ADMIN</h1>
        <div className={styling.tableSelectorContainer}>
          <div
          style={{
            backgroundColor:"white",
            color:"#252B69"
        }} 
          className={styling.tableSelector} onClick={goToAdminHotel} id={styling.hotelSelector}>
            HOTEL
          </div>
          <div className={styling.tableSelector} id={styling.artikelSelector} onClick={goToAdminArticle}>
            ARTIKEL
          </div>
        </div>

        {/* inside the main square */}
        <div className={styling.mainSquare}>
          <table>
            <thead>
              <tr>
                <th>Nama Hotel</th>
                <th>Jarak</th>
                <th>Penilaian</th>
                <th>
                  Kamar <br />
                  Tersedia
                </th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel) => (
                <tr key={hotel.id}>
                  <td>{hotel.hotel_name}</td>
                  <td>{hotel.jarak}m</td>
                  <td>{hotel.rating}</td>
                  <td>{hotel.kamar}</td>
                  <td id={styling.manageButtonContainer}>
                    <button className={styling.editButton} onClick={()=> goToInsertPriceImage(hotel.hotel_id)}>EDIT</button>
                    <button
                      className={styling.deleteButton}
                      onClick={() => deleteHotels(hotel.hotel_id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className={styling.addButton} onClick={goToInsert}>
            ADD HOTEL
          </button>
        </div>
      </div>
    )
  );
}

export default AdminPage;

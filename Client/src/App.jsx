import { useState, useEffect } from 'react';
import axios from "axios";

function App() {
  // -------- Getting Data from The Backend --------
  const [listOfHotels, setListOfHotels] = useState([]);

  // Getting Task and Todos
  const fetchApi = async () => {
    try {
      const response = await axios.get("http://localhost:3000/hotels");
      setListOfHotels(response.data);
      console.log(response.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);  // Runs once on mount

  return (
    <div>
      <h1>List of Hotels</h1>

      <table border="1">
        <thead>
          <tr>
            <th>Id</th>
            <th>Hotels</th>
            <th>Price</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {listOfHotels.length > 0 ? (
            listOfHotels.map((hotel, index) => (
              <tr key={index}>
                <td>{hotel.id}</td>
                <td>{hotel.hotel_name}</td>
                <td>{hotel.price}</td> 
                <td>{hotel.city}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hotels found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;

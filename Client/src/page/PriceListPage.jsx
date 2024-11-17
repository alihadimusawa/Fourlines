import { useState, useEffect } from 'react';
import axios from "axios";
import Hotel from "../components/Hotel";
import Pagination from "../components/Pagination";
import PriceListStyling from "../style/Price.module.css";

function PriceListPage() {
  // -------- Getting Data from The Backend --------
  const [listOfHotels, setListOfHotels] = useState([]);
  const [hotelsPrices, setHotelsPrices] = useState([]);

  // Getting hotels and it's prices
  const fetchApi = async () => {
    try {
      const hotels_temp = await axios.get("http://localhost:3000/hotels");
      const prices_temp = await axios.get("http://localhost:3000/prices")
      var hotels = hotels_temp.data.rows;
      var prices = prices_temp.data.rows;

      // console.log(hotels_temp.data);
      // console.log(hotels);
      setListOfHotels(hotels);
      setHotelsPrices(prices);

      // console.log(hotels);
      // console.log(prices);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);  // Runs once on mount



  // -------- Setting for pagination --------
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(2);


  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const currentPost = listOfHotels.slice(firstPostIndex, lastPostIndex);



  return (
    <div className='content' id={PriceListStyling.price}>

      <div className={PriceListStyling.categoryContainer}>
        <div>
          Price List
        </div>

        <div>
          Allotment
        </div>

        <div>
          Special Price
        </div>
      </div>

      <div className={PriceListStyling.searchBar}>
        <input placeholder='Search...' />
        <img src="http://localhost:3000/Icon/searchIcon.png" alt="" />
      </div>



      {
        currentPost.map(hotel => {
          let lowest_price = 0;
          let highest_price = 0;

          hotelsPrices.forEach(currentPrice => {
            if (currentPrice.hotel_id === hotel.hotel_id) {
              if (currentPrice.double < lowest_price || lowest_price === 0) {
                lowest_price = currentPrice.double;
              }

              if (currentPrice.quad > highest_price || highest_price === 0) {
                highest_price = currentPrice.quint;
              }
            }
          });

          return (
            <Hotel
              key={hotel.hotel_id}  // Add a unique key for each element in lists
              hotelName={hotel.hotel_name}
              image={hotel.image}
              lowestPrice={lowest_price}
              highestPrice={highest_price}
              hotel_id={hotel.hotel_id}
              rating={hotel.rating}
              distance={hotel.jarak}
              description={hotel.description}
            />
          );
        })
      }
      <Pagination
        totalPost={listOfHotels.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
      />

    </div>
  );
}

export default PriceListPage;

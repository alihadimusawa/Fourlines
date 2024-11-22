import { useState, useEffect } from 'react';
import axios from "axios";
import Hotel from "../components/Hotel";
import Pagination from "../components/Pagination";
import PriceListStyling from "../style/Price.module.css";
import Fuse from "fuse.js"

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


  // -------- Setting for pagination --------
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const currentPost = listOfHotels.slice(firstPostIndex, lastPostIndex);



  // -------- Setting for dropdowns --------
  const [currentMenu, setCurrentMenu] = useState("Price List");
  const [currentSort, setCurrentSort] = useState("Sort By")

  function changeMenu(event) {
    setCurrentMenu(event.target.innerHTML);
  }

  function changeSort(event) {
    setCurrentSort(event.target.innerHTML);
  }



  // -------- Setting for search algorithm --------
  const [searchInput, setInput] = useState("");
  const [searchResult, setSearchResults] = useState([]);

  function changeInput(event) {
    setInput(event.target.value);
  }

  useEffect(() => {
    if(!searchInput || listOfHotels.length <= 0){
      setSearchResults([]);
      return;
    }

    if(listOfHotels.length > 0){
      const fuse = new Fuse(listOfHotels , {
        keys:['hotel_name'],
      })
  
      const result = fuse.search(searchInput);
      console.log(result);
      setSearchResults(result) 
    }

  }, [searchInput])


  // -------- Done --------
  useEffect(() => {
    fetchApi();
  }, []);  // Runs once on mount



  return (
    <div className='content' id={PriceListStyling.price}>

      <div className={PriceListStyling.top}>

        {/* Search Button */}
        <div className={PriceListStyling.searchBar}>
          <input placeholder='Search...' value={searchInput} onChange={() => changeInput(event)} />
          <div id={PriceListStyling.searchBarRight} onClick={() => setInput("")}>
            <img src="http://localhost:3000/Icon/searchIcon.png" alt="" id={PriceListStyling.searchImage} />
          </div>
        </div>

        {/* Category */}
        <div className={PriceListStyling.categoryContainer}>
          <div id={PriceListStyling.category}>
            {currentMenu}
            <img src="http://localhost:3000/Icon/dropdownIcon.png" alt="" />
          </div>

          {/* Dropdowns */}
          <div className={PriceListStyling.categoryDropdowns}>
            <div onClick={changeMenu}>
              Price List
            </div>
            <div onClick={changeMenu}>
              Allotment
            </div>
            <div onClick={changeMenu} id={PriceListStyling.last}>
              Special Price
            </div>
          </div>
        </div>


        {/* Sort */}
        <div className={PriceListStyling.categoryContainer}>
          <div id={PriceListStyling.category}>
            {currentSort}
            <img src="http://localhost:3000/Icon/dropdownIcon.png" alt="" />
          </div>

          {/* Dropdowns */}
          <div className={PriceListStyling.categoryDropdowns}>
            <div onClick={changeSort}>
              Nearest
            </div>
            <div onClick={changeSort}>
              Cheapest
            </div>
            <div onClick={changeSort} id={PriceListStyling.last}>
              Highest
            </div>
          </div>
        </div>


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
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

    </div>
  );
}

export default PriceListPage;

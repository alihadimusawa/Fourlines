import { useState, useEffect } from 'react';
import axios from "axios";
import Hotel from "../components/Hotel";
import Pagination from "../components/Pagination";
import PriceListStyling from "../style/Price.module.css";
import Fuse from "fuse.js"

function PriceListPage() {

  // -------- GETTING DATA FROM THE BACKEND --------
  const [listOfHotels, setListOfHotels] = useState([]);
  const [listOfHotelsCopy, setListOfHotelsCopy] = useState([]);
  const [hotelsPrices, setHotelsPrices] = useState([]);

  // Getting hotels and it's prices
  const fetchApi = async () => {
    try {
      const hotels_temp = await axios.get("http://localhost:3000/hotels");
      const prices_temp = await axios.get("http://localhost:3000/prices")
      var hotels = hotels_temp.data.rows;
      var prices = prices_temp.data.rows;

      setListOfHotels(hotels);
      setListOfHotelsCopy(hotels);
      setHotelsPrices(prices);

      // testing
      console.log(hotels);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  // -------- SETTING FOR PAGINATION --------
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const currentPost = listOfHotels.slice(firstPostIndex, lastPostIndex);



  // -------- SETTING FOR CATEGORY DROPDOWN --------
  const [currentMenu, setCurrentMenu] = useState("Price List");

  function changeMenu(event) {
    const menu = event.target.innerHTML;
    let tempHotels = [];
    setCurrentMenu(menu);

    if (menu == "Price List") {
      setListOfHotels(listOfHotelsCopy);
      return;
    }

    listOfHotelsCopy.map(hotel => {
      if ((menu == "Special Price" && hotel.special == 'true') || (menu == "Allotment" && hotel.allotment == "true")) {
        tempHotels.push(hotel);
        console.log("true");
      }
    })

    setListOfHotels(tempHotels);
  }


  // -------- SETTING FOR SORT DROPDOWN --------
  const [currentSort, setCurrentSort] = useState("Sort By");

  function changeSort(event) {
    const sort = event.target.innerHTML;
    setCurrentSort(sort);

    hotelSort(listOfHotels, sort);
  }

  // getting the lowest price and highest price of each hotel
  function getPrice() {
    listOfHotelsCopy.map(hotel => {
      let lowest_price = 0;
      let highest_price = 0;

      hotelsPrices.forEach(currentPrice => {
        if (currentPrice.hotel_id === hotel.hotel_id) {
          if (currentPrice.double < lowest_price) {
            lowest_price = currentPrice.double;
          }

          if (currentPrice.quad > highest_price) {
            highest_price = currentPrice.quint;
          }
        }
      });

      return {
        ...hotel,
        lowersPrice: lowest_price,
        highestPrice, highest_price
      }
    })

    setListOfHotelsCopy(updatedHotels);
  }


  // perform selection sort
  function hotelSort(tempListOfHotels, sortSelection) {
    let tempHotels = [...tempListOfHotels]; // Create a copy to avoid mutating the original state

    // if(sortSelection == "Cheapest") getPrice();

    for (let i = 0; i < tempHotels.length - 1; i++) {
      let minIndex = i; // Assume the current index has the smallest value

      // Find the index of the smallest/largest value based on the sortSelection property
      for (let j = i + 1; j < tempHotels.length; j++) {
        if (sortSelection == "Nearest") {
          if (tempHotels[j].jarak < tempHotels[minIndex].jarak) {
            minIndex = j;
          }
        } else if (sortSelection == "Rating") {
          if (tempHotels[j].rating > tempHotels[minIndex].rating) {
            minIndex = j;
          }
        }else if(sortSelection == "Cheapest"){
          if(tempHotels[j].lowestPrice < tempHotels[minIndex].lowestPrice){
            minIndex = j;
          }
        }
      }

      // Swap the current element with the smallest found
      if (minIndex !== i) {
        const temp = tempHotels[i];
        tempHotels[i] = tempHotels[minIndex];
        tempHotels[minIndex] = temp;
      }
    }
  }





  // -------- SETTING FOR SEARCH ALGORITHM --------
  const [searchInput, setInput] = useState("");
  const [searchResult, setSearchResults] = useState([]);

  function changeInput(event) {
    setInput(event.target.value);
  }

  function searchClicked() {
    setListOfHotels(searchResult);
    console.log("Search button is clicked");
    console.log(listOfHotels);
  }

  useEffect(() => {
    if (!searchInput || listOfHotels.length <= 0) {
      setSearchResults([]);
      return;
    }

    const fuse = new Fuse(listOfHotelsCopy, {
      keys: ['hotel_name'],
    })

    const result = fuse.search(searchInput);

    if (listOfHotels.length > 0 && result.length > 0) {
      const formattedResults = result.map(current => current.item); // Extract relevant items from Fuse.js results
      setSearchResults(formattedResults); // Update state with processed results
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
          <div id={PriceListStyling.searchBarRight} onClick={() => {
            setInput("");
            searchClicked();
          }
          }>
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
              Rating
            </div>
          </div>
        </div>


      </div>



      {
        currentPost.map(hotel => {

          return (
            <Hotel
              key={hotel.hotel_id}  // Add a unique key for each element in lists
              hotelName={hotel.hotel_name}
              image={hotel.image}
              lowestPrice={hotel.lowestPrice}
              highestPrice={hotel.highestPrice}
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

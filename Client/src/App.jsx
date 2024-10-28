import React, {useState} from 'react';
import PriceListPage from './page/PriceListPage';
import HotelDescriptionPage from './page/HotelDescriptionPage';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

    return (
        <Router>
            <Header />

            <Routes>
                <Route path='/priceList' element={<PriceListPage/>}/>
                <Route path='/hotelDescription/:hotel_id' element={<HotelDescriptionPage/>}/>
            </Routes>

            <Footer/>
        </Router>

    )
}

export default App;
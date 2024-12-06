import React, {useState} from 'react';
import PriceListPage from './page/PriceListPage';
import AboutUsPage from './page/AboutUsPage';
import HotelDescriptionPage from './page/HotelDescriptionPage';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ArticlePage from './page/ArticlePage';

function App() {

    return (
        <Router>
            <Header />

            <Routes>
                <Route path='/Hotels' element={<PriceListPage/>}/>
                <Route path='/hotelDescription/:hotel_id' element={<HotelDescriptionPage/>}/>
                <Route path='/AboutUs' element={<AboutUsPage/>} />
                <Route path='/Articles' element={<ArticlePage/>} />
            </Routes>

            <Footer/>
        </Router>

    )
}

export default App;
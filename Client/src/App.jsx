import React, { useState } from 'react';
import PriceListPage from './page/PriceListPage';
import AboutUsPage from './page/AboutUsPage';
import HotelDescriptionPage from './page/HotelDescriptionPage';
import ArticleDetailPage from './page/ArticleDetailPage';
import Homepage from './page/Homepage';
import AdminPage from './page/AdminPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ArticlePage from './page/ArticlePage';
import InsertHotelPage from './page/InsertHotelPage';
import InsertPriceImage from './page/InsertPriceImage';
import AdminArticle from './page/AdminArticle';
import InsertArticle from './page/InsertArticle';

function App() {

    return (
        <Router>
            <Header />

            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/Hotels' element={<PriceListPage />} />
                <Route path='/hotelDescription/:hotel_id' element={<HotelDescriptionPage />} />
                <Route path='/AboutUs' element={<AboutUsPage />} />
                <Route path='/Articles' element={<ArticlePage />} />
                <Route path='/articleDetail/:articleId' element={<ArticleDetailPage />} />
                <Route path='/Admin' element={<AdminPage />}></Route>
                <Route path='/insert' element={<InsertHotelPage/>}></Route>
                <Route path="/InsertPriceImage/hotelId" element={<InsertPriceImage/>}></Route>
                <Route path='/AdminArticle' element={<AdminArticle/>}></Route>
                <Route path='/InsertArticle' element={<InsertArticle/>}></Route>
            </Routes>

            <Footer />
        </Router>

    )
}

export default App;
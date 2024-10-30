import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PriceContainer from "../components/priceContainer";
import HotelBenefitsContainer from "../components/HotelBenefitsContainer";
import HotelStyling from "../style/HotelDescriptionPage.module.css";
import CustomDropdown from "../components/CustomDropdown";

function HotelDescriptionPage() {


    // ---------- Getting hotel from the server ----------
    const { hotel_id } = useParams();
    const [hotel, setHotel] = useState(null);

    async function gethotelsById(hotel_id) {
        try {
            const response = await axios.post(`http://localhost:3000/getHotelById/${hotel_id}`);
            setHotel(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    // ---------- Get the price to be displayed on the website  ----------
    const [priceId, setPriceId] = useState("0");

    function changePriceId(id) {
        setPriceId(id);
        console.log("price Id changed  ", id);
    }

    // Step by step
    // 1. Dropdown display all the price period
    // 2. after clicking the period, it will set the priceId by that period
    // 3. map the hotel and if the price id matches the priceId that we get
    // 4. pass all the price into the price container



    useEffect(() => {
        gethotelsById(hotel_id);
    }, [hotel_id]);

    return (
        <div>
            {hotel ? (
                <div className={HotelStyling.page}>

                    {/* TOP */}
                    <div id={HotelStyling.top}>
                        <img src={hotel[0].image} alt={hotel.hotel_name} />
                    </div>

                    <h3 id={HotelStyling.price}>Price</h3>
                    {/* MIDDLE */}
                    <div id={HotelStyling.middle}>
                        {
                            priceId != "0"
                                ?
                                hotel.map((current, index) => (
                                    current.price_id == priceId &&
                                    <PriceContainer
                                        key={index}
                                        double={current.double}
                                        triple={current.triple}
                                        quad={current.quad}
                                        quint={current.quint}
                                    />
                                ))
                                : <PriceContainer
                                    double="-"
                                    triple="-"
                                    quad="-"
                                    quint="-"
                                />

                        }

                        <CustomDropdown
                            title="Pilih tanggal"
                            hotel={hotel}
                            changePrice={changePriceId}
                        />
                    </div>




                    {/* BOTTOM */}
                    <div id={HotelStyling.bottom}>
                        <HotelBenefitsContainer
                            rating={hotel[0].rating}
                            jarak={hotel[0].jarak}
                            kamar={hotel[0].kamar}
                            transportasi={hotel[0].transportasi}
                        />
                    </div>

                    <button>
                        <a href="https://wa.me/6287771878828?text=Hello%20there!">
                            Request
                        </a>    
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default HotelDescriptionPage;

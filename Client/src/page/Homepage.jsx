import React, { useEffect, useState } from "react";
import axios from "axios";

function Homepage() {
   
    const [faq, setFaq] = useState(null);
    const [selected, setSelected] = useState(null);

    async function takeFaq  (){
        const result = await axios.get("http://localhost:3000/faq")
        setFaq(result.data);
    }

    function expandFaq(index){
        if(selected == index){
            setSelected(null);
            return;
        }

        setSelected(index);
    }


    useEffect( () => {
        takeFaq();
    }, []);


    return (
        <div className="Homepage">

            <img src="http://localhost:3000/image/makkah.jpg" alt="Makkah Image" id="mainImage" />

            <div className="absoluteContainer">
                <img src="http://localhost:3000/image/logoFourlinesCut.png" alt="Logo forulines" id="logoFourlinesCut" />
                <img src="http://localhost:3000/image/logoAljuhani.png" alt="logo al juhani" id="logoAljuhani" />
                <h1>Umroh / Haji Bersama Fourlines</h1>
                <h2>Travel B2B yang Menyediakan Harga Hotel Terbaik di Indonesia</h2>
                <button id="inImageButton">
                    <p>OUR HOTELS</p>
                    <div>
                        <img src="http://localhost:3000/icon/arrowRightLight.png" alt="Arrow Right Icon" id="arrowRightIcon" />
                    </div>
                </button>
            </div>

            <h3 className="divHeading">SERVICES</h3>

            <div className="servicesContainer">
                <div>
                    <h4>Wisata Islami</h4>
                    <img src="http://localhost:3000/image/wisataIslami.png" alt="Wisata Islami" />
                    <p>
                        Temukan destinasi wisata islami di Indonesia Timur bersama kami. Nikmati perjalanan spiritual yang tak terlupakan dengan layanan terbaik dari tim terpercaya kami. Apakah Anda ingin menambahkan lebih banyak detail, seperti paket khusus atau nilai utama yang ditawarkan?
                    </p>
                </div>
                <div>
                    <h4>Hotel Makkah / Madinah</h4>
                    <img src="http://localhost:3000/image/hotelServices.png" alt="Hotel Services" />
                    <p>
                        Kami menawarkan pilihan hotel terbaik di Makkah dan Madinah untuk kenyamanan perjalanan Anda. Lokasi strategis, fasilitas lengkap, dan layanan terpercaya untuk pengalaman ibadah yang tenang dan nyaman.                    </p>
                </div>
                <div>
                    <h4>Pengurusan Dokumen</h4>
                    <img src="http://localhost:3000/image/pengurusanDokumen.png" alt="Pengurusan Dokumen" />
                    <p>
                        Kami membantu Anda mengurus seluruh berkas perjalanan dengan cepat dan mudah, mulai dari paspor hingga visa, sehingga Anda dapat fokus pada persiapan ibadah atau perjalanan Anda.                    </p>
                </div>
            </div>

            <hr />
            <div id="canva">
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        paddingTop: "141.4141%",
                        paddingBottom: "0",
                        boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)",
                        marginTop: "1.6em",
                        marginBottom: "0.9em",
                        overflow: "hidden",
                        borderRadius: "8px",
                        willChange: "transform",
                    }}
                >
                    <iframe
                        loading="lazy"
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            top: "0",
                            left: "0",
                            border: "none",
                            padding: "0",
                            margin: "0",
                        }}
                        src="https://www.canva.com/design/DAGWh5430gU/kLErSsWANeI1HnGzSQLwJA/view?embed"
                        title="Canva Embed"
                    ></iframe>
                    <a
                        href="https://www.canva.com/design/DAGWh5430gU/kLErSsWANeI1HnGzSQLwJA/view?utm_content=DAGWh5430gU&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: "none" }}
                    >
                        Canva Design
                    </a>
                </div>
            </div>


            <hr />

            <h3 className="divHeading" style={{marginTop:"0px", fontWeight:"499"}}>FAQ</h3>

            {
                faq && faq.map((current, index) => (

                    <div className="faqContainer" key={index}>
                        <div className="questionContainer" onClick={() => expandFaq(index)}>
                            <span className="expandButton">{selected == index ? "-" : "+"}</span>
                            {current.question}
                        </div>
                        <div className={selected == index ? "answerContainer visible" : "answerContainer"}>
                            {current.answer}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Homepage;
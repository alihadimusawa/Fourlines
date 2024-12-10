import React from "react";


function Homepage() {
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

            <div className="faqContainer">
                <h3 className="divHeading" id="faq">FAQ</h3>


                <h5>Pertanyaan Umum</h5>

                <div>
                    <div className="questionContainer">
                        <img src="http://localhost:3000/icon/arrowDown.png" alt="Arrow Down Icon" />
                        Apa saja layanan yang ditawarkan oleh bisnis ini?
                    </div>
                    <div className="answerContainer">
                        Kami menyediakan layanan pengurusan dokumen keberangkatan, penyediaan hotel di Makkah dan Madinah, serta paket wisata Islami domestik (khususnya Indonesia Timur).
                    </div>
                </div>

                <div>
                    <div className="questionContainer">
                        <img src="http://localhost:3000/icon/arrowDown.png" alt="Arrow Down Icon" />
                        Apakah ada paket perjalanan yang dapat disesuaikan?
                    </div>
                    <div className="answerContainer">
                        Tentu, kami menyediakan opsi kustomisasi paket sesuai kebutuhan dan anggaran Anda.
                    </div>
                </div>

                <h5>Pengurusan Dokumen</h5>

                <div>
                    <div
                        className="questionContainer">
                        <img src="http://localhost:3000/icon/arrowDown.png" alt="Arrow Down Icon" />
                        Dokumen apa saja yang diperlukan untuk Haji atau Umroh?
                    </div>
                    <div className="answerContainer">
                        Dokumen yang diperlukan meliputi paspor, visa, kartu vaksinasi, dan dokumen pendukung lainnya. Tim kami akan membantu Anda mengurus semuanya.
                    </div>
                </div>

                <div>
                    <div className="questionContainer">
                        <img src="http://localhost:3000/icon/arrowDown.png" alt="Arrow Down Icon" />
                        Berapa lama proses pengurusan dokumen?
                    </div>
                    <div className="answerContainer">
                        Prosesnya bergantung pada kelengkapan dokumen Anda, biasanya memakan waktu 2–4 minggu.
                    </div>
                </div>

                <h5>Layanan Hotel</h5>

                <div>
                    <div className="questionContainer">
                        <img src="http://localhost:3000/icon/arrowDown.png" alt="Arrow Down Icon" />
                        Apakah hotel yang disediakan dekat dengan Masjidil Haram atau Masjid Nabawi?
                    </div>
                    <div className="answerContainer">
                        Ya, kami bekerja sama dengan hotel-hotel yang berlokasi strategis untuk memudahkan ibadah Anda.
                    </div>
                </div>

                <div>
                    <div className="questionContainer">
                        <img src="http://localhost:3000/icon/arrowDown.png" alt="Arrow Down Icon" />
                        Apa saja fasilitas yang tersedia di hotel?
                    </div>
                    <div className="answerContainer">
                        Hotel yang kami sediakan memiliki fasilitas seperti Wi-Fi, layanan makan, transportasi, dan kamar yang nyaman.
                    </div>
                </div>

                <h5>Lain-lain</h5>

                <div>
                    <div className="questionContainer">
                        <img src="http://localhost:3000/icon/arrowDown.png" alt="Arrow Down Icon" />
                        Bagaimana jika terjadi perubahan jadwal keberangkatan?
                    </div>
                    <div className="answerContainer">
                        Kami akan membantu menyesuaikan jadwal dan memberikan informasi terbaru sesuai kebijakan yang berlaku.
                    </div>
                </div>

                <div >
                    <div className="questionContainer">
                        <img src="http://localhost:3000/icon/arrowDown.png" alt="Arrow Down Icon" />
                        Apakah tersedia layanan pendampingan selama perjalanan?
                    </div>
                    <div className="answerContainer">
                        Ya, kami menyediakan tim pendamping profesional untuk memastikan perjalanan Anda berjalan lancar.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;
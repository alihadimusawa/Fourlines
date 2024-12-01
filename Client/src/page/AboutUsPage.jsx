import React, { useEffect, useState, useRef } from "react";
import styling from "../style/AboutUs.module.css";

function AboutUsPage() {
    return (
        <div className={styling.aboutUs}>
            {/* TOP */}
            <div className={styling.top}>
                <div className={styling.topLeft}>
                    <img src="https://fourlinestravel.com/wp-content/uploads/2024/08/img30-copy.png" alt="Saed Al Juhani" />
                    <img src="https://fourlinestravel.com/wp-content/uploads/2024/08/CEO.png" alt="al juhani ceo" />
                </div>

                <div className={styling.topRight}>
                    <p>
                        "من أكبر نعم الله علي وعلى عائلتي أن شرفنا وأكرمنا بخدمة ضيوف الرحمن لأكثر من ٥٤ سنة. ونحن الآن نعتز بتقديم خدمتنا للحجاج والمعتمرين الإندونيسيين، وقد زادت هذه الخدمة لنا رفعة وشرفا بمرور الوقت. ونسأل الله عز وجل التوفيق والسداد في خدمة ضيوف الحرمين الشريفين."
                    </p>
                    <p>
                        “Salah satu berkat terbesar dari Allah bagi saya dan keluarga adalah bahwa kami telah mendapat kehormatan dan keistimewaan untuk melayani para tamu Allah selama lebih dari 45 tahun. Kami bangga bisa melayani Jamaah Haji dan Umrah Indonesia, dan pelayanan ini menjadikan kami semakin merasa terhormat dan Istimewa dari waktu ke waktu. Kami memohon kepada Allah taufiq dan kemudahan untuk terus melayani tamu-tamu dua tanah suci yang mulia.”
                    </p>
                </div>
            </div>

            {/* MIDDLE */}
            <div className={styling.middle}>
                <div className={styling.middleLeft}>
                    <h1>Al Juhani Group</h1>
                    <p>telah berkiprah lebih dari 45 tahun dalam dunia perhotelan di Makkah-Arab Saudi yang memiliki kantor cabang di beberapa negara lain yaitu Mesir, Turki, Pakistan, Uzbekistan juga Iraq.</p>
                    <br />
                    <p>Dan dalam 5 tahun terakhir Al-Juhani Grup dipercaya menjadi penyedia fasilitas hotel berikut katering bagi Jamaah Haji Reguler Indonesia, serta meraih penghargaan 2 tahun terakhir berturut-turut untuk kategori layanan akomodasi terbaik versi Kementrian Pariwisata Kerajaan Arab Saudi.</p>

                    <h1>Four Lines Travel & Tourism</h1>
                    <p>hadir sebagai kantor perwakilan Al-Juhani Grup di Jakarta untuk kemudahan layanan perencanaan dan kelengkapan perjalanan wisata halal, dalam maupun luar negeri, umroh dan haji bagi semua kalangan, baik individu, komunitas dan perusahaan di Indonesia.</p>
                </div>
                
                <div className={styling.middleRight}>
                    <img src="https://fourlinestravel.com/wp-content/uploads/2024/08/img270.jpg" alt="" />
                </div>
            </div>


            {/* BOTTOM */}
            <div className={styling.bottom}>
                <p>"Four Lines Travel & Tourism siap bersaing dengan tetap menjunjung tinggi nilai silaturahmi dan kolaborasi di antara sesama pelaku industri."</p>
                <img src="https://fourlinestravel.com/wp-content/uploads/2024/08/img320.jpg" alt="" />

            </div>
        </div>
    )
}

export default AboutUsPage;
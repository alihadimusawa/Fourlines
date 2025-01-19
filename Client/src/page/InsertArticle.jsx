import { useNavigate } from "react-router-dom";
import styling from "../style/AdminPage.module.css";
import axios from "axios";

export default function InsertArticle() {

    const navigate = useNavigate();

    function goToAdminArticle(){
        navigate("/AdminArticle");
    }

    async function validateArticleInput(event) {
        event.preventDefault();
    
        const form = event.target.closest("form");
        const formData = new FormData(form);
    
        const articleTitle = formData.get("judul");
        const articleAuthor = formData.get("penulis");
        const articleImage = formData.get("gambar");
        const articleContent = formData.get("content");
        
        // Array of field names and values for validation
        const fields = [
          { name: "Judul Artikel", value: articleTitle },
          { name: "Nama Penulis", value: articleAuthor },
          { name: "Link Gambar", value: articleImage },
          { name: "Isi Artikel", value: articleContent },
        ];
    
        // Validate each field
        for (const field of fields) {
          if (!field.value) {
            alert(`Tolong lengkapi ${field.name}`);
            return; // Stop execution if a field is missing
          }
        }
    
        try {
          await axios.post("http://localhost:3000/addArticle", {
            articleTitle,
            articleAuthor,
            articleImage,
            articleContent
          });
          alert("Artikel baru berhasil ditambahkan ke dalam database");
          goToAdminArticle();
          return;
        } catch (error) {
          console.error("Error sbumitting article: ", error); 
          alert("Gagal untuk menambahkan artikel ke dalam database");
          return; 
        }
      }

  return (
    <form className={styling.insertHotelPage}>
      <h5>Judul Artikel</h5>
      <input type="text" name="judul" />

      <h5>Nama Penulis</h5>
      <input type="text" name="penulis" />

      <h5>Link Gambar Utama</h5>
      <input type="text" name="gambar" />

      <h5>Isi Artikel</h5>
      <textarea id="deskripsi" name="content" rows="50" cols="50" />

      <button
        className={styling.addButton}
        onClick={validateArticleInput}
        id={styling.confirmButton}
      >
        CONFIRM
      </button>
    </form>
  );
}

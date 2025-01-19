import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styling from "../style/AdminPage.module.css";
import { colors } from "@mui/material";


export default function AdminArticle() {
  const [listOfArticle, setListOfArticle] = useState();

  const navigate = useNavigate();

  function goToAdminArticle() {
    navigate(`/AdminArticle`);
  }

  function goToAdminHotel() {
    navigate(`/Admin`);
  }

  function goToinsertArticle(){
    navigate("/InsertArticle");
  }

  async function deleteArticle(article_id){
    try {
      await axios.delete(`http://localhost:3000/deleteArticle/${article_id}`, );
      fetchArticle();yug7
    } catch (error) {
      console.log(error);
      alert("Gagal menghapus artikel dari database");
    }
  }

  const fetchArticle = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getArticles");
      setListOfArticle(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  return (
    <>
      <div className={styling.adminPage}>
        <h1>DASHBOR ADMIN</h1>
        <div className={styling.tableSelectorContainer}>
          <div
            className={styling.tableSelector}
            onClick={goToAdminHotel}
            id={styling.hotelSelector}
          >
            HOTEL
          </div>
          <div
            style={{
                backgroundColor:"white",
                color:"#252B69"
            }}
            className={styling.tableSelector}
            id={styling.artikelSelector}
            onClick={goToAdminArticle}
          >
            ARTIKEL
          </div>
        </div>

        {/* This is where the article table comes in */}
        <div className={styling.mainSquare}>
          <table>
            <thead>
              <tr>
                <th>Judul Artikel</th>
                <th>Penulis</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {
                listOfArticle &&
              listOfArticle.map((article) => (
                <tr key={article.id}>
                  <td>{article.title}</td>
                  <td>{article.author}</td>
                  <td id={styling.manageButtonContainer}>
                    <button
                      className={styling.deleteButton}
                      onClick={() => deleteArticle(article.article_id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className={styling.addButton} onClick={goToinsertArticle}>
            ADD NEW
          </button>
        </div>
      </div>
    </>
  );
}

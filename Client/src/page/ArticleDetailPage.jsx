import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { inputLabelClasses } from '@mui/material';
import styling from "../style/ArticleDetailPage.module.css";


function ArticleDetail() {
    const { articleId } = useParams();
    const navigate = useNavigate();

    const goToArticlePage = () => {
        navigate("/Articles");
    }

    const [article, setArticle] = useState(null);

    const fetchArticle = async () => {
        try {
            const rawResult = await axios.get(`http://localhost:3000/getArticleById/${articleId}`);
            let result = rawResult.data[0];

            // taking the time from the article.uploadtime
            let timeDate = new Date(result.uploadtime);
            result.time = timeDate.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true, // Enables am/pm format
            });

            // taking the date from the article.uploadtime
            result.date = `${String(timeDate.getMonth() + 1).padStart(2, '0')}-${String(timeDate.getDate()).padStart(2, '0')}-${timeDate.getFullYear()}`
            setArticle(result);
        } catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {
        fetchArticle()
    }, []);

    return (
        article &&
        <div className={styling.articleDetailPage}>

            <h1>
                {article.title}
            </h1>

            <img src={article.image} alt="Article Image" className={styling.mainImage} />

            <div className={styling.infoContainer}>
                <div>
                    <img src="http://localhost:3000/icon/profileIcon.png" alt="profile icon" id={styling.profileIcon} />
                    <p>{article.author}</p>
                </div>
                <div>
                    <img src="http://localhost:3000/icon/calendarIcon.png" alt="calendar icon" />
                    <p>{article.time}</p>
                </div>
                <div>
                    <img src="http://localhost:3000/icon/timeIcon.png" alt="time icon" />
                    <p>{article.time}</p>
                </div>
                <div>
                    <img src="http://localhost:3000/icon/fastReadIcon.png" alt="fast read icon" />
                    <p>Fast Reads</p>
                </div>
            </div>

            <p className={styling.content}
                dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, "<br />") }}
            ></p>

            <button onClick={goToArticlePage}>
                Back
            </button>
        </div>


    )

}


export default ArticleDetail;
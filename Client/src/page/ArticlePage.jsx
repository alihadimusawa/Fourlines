import React, { useState, useEffect } from "react";
import Article from "../components/Article";
import axios from "axios";
import styling from "../style/ArticlePage.module.css";

function ArticlePage() {

    const [articles, setArticles] = useState();

    const fetchArticles = async () => {
        const articlesTemp = await axios.get("http://localhost:3000/getArticles");
        setArticles(articlesTemp.data);

        let uploadTime;
        let articleDate;
        let articleTime;
        // change the time template from the articles
        articlesTemp.data.forEach(article => {
            uploadTime = article.uploadtime;
            uploadTime = new Date(uploadTime);
            articleTime = uploadTime.toLocaleTimeString('en-US', { hour12: true });
            articleDate = uploadTime.toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });

            // changing the article date
            article.date = articleDate;
            article.time = articleTime;
        });
    }



    // --------- SETTING FOR DROPDOWN ---------
    const [dropdown, setDropdown] = useState();
    const [searchVal, setSearch] = useState();

    

    useEffect(() => {
        fetchArticles();
    }, []);


    return (
        <div id={styling.ArticlePage}>
            
                {
                    articles &&
                    articles.map((article, index) =>
                    (<Article
                        image={article.image}
                        title={article.title}
                        date={article.date}
                        content={article.content}
                        author={article.author}
                        key={index}
                    />)
                    )
                }

            <h1>Done</h1>
        </div>
    )
}


export default ArticlePage;
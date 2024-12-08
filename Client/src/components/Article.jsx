import React, { useState } from 'react';
import styling from "../style/ArticlePage.module.css";
import { useNavigate } from 'react-router-dom';


function Article(props) {

    const navigate = useNavigate();
    const goToDetail = () =>{
        console.log("triggered");
        navigate(`/articleDetail/${props.articleId}`);
    }


    return (
        <div className={styling.article}>
            <div className={styling.imageContainer}>
                <img src={props.image} alt="Article Image" />
            </div>
            <div className={styling.contentContainer}>
                <h3>{props.title}</h3>
                <div>
                    <p className={styling.small}><span className={styling.bold}>{props.author}</span>&nbsp;&nbsp;&nbsp;&nbsp; {props.date} </p>
                    <p>{props.content && props.content.substring(0, 200)}...</p>
                </div>
                <br />
                <a>
                    <button onClick={goToDetail}>Read More...</button>
                    <img src="http://localhost:3000/Icon/arrowRightIcon.png" alt="" id={styling.arrowRightIcon} />
                </a>
            </div>
        </div>
    )
}

export default Article;
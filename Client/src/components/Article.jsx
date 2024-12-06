import React, { useState } from 'react';
import styling from "../style/ArticlePage.module.css";

function Article(props) {

    return <div className={styling.article}>
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
            <a href="google.com">
                <p>Read More...</p>
                <img src="http://localhost:3000/Icon/arrowRightIcon.png" alt="" id={styling.arrowRightIcon} />
            </a>
        </div>


    </div>
}

export default Article;
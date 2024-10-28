import React from "react";

function Pagination(props){

    let pages = []; 

    for(let i = 1; i <= Math.ceil(props.totalPost/props.postPerPage); i++){
        pages.push(i);
    }

    return(
        <div id="pagination">
            {pages.map((page, index) =>{
                return(
                    <button key={index} onClick={() => props.setCurrentPage(page)}>{page}</button>
                );
            })}
        </div>
    )
}


export default Pagination;
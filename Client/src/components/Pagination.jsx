import React from "react";

function Pagination(props) {
  const { totalPost, postPerPage, currentPage, setCurrentPage } = props;
  const totalPages = Math.ceil(totalPost / postPerPage);

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  
  return (
    <div id="pagination">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange("prev")}
        disabled={currentPage === 1} // Disable if on the first page
      >
        &laquo;
      </button>


      {/* Next Button */}
      <button
        onClick={() => handlePageChange("next")}
        disabled={currentPage === totalPages} // Disable if on the last page
      >
        &raquo;
      </button>
    </div>
  );
}

export default Pagination;

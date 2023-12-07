import React from "react";
import { useEffect } from "react";
import { getTotalPages } from "../../utils";
import './style.css'
import PropTypes from "prop-types";

function Pagination({currentPage, totalPages, setCurrentPage, loadPages, pages}) {

    useEffect(() => {
        loadPages(currentPage, totalPages)
    }, [totalPages, currentPage])

    return(
        <div className="Pagination">
            {pages.map((item, i) => {
                if(item === '...'){
                    return <div key={i} className="dotted">{item}</div>
                }
                return <div key={i} onClick={() => setCurrentPage(item)} className={currentPage === item ? 'selected' : 'item'}>{item}</div>
            })}
        </div>
    )
}

Pagination.propTypes = {
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    setCurrentPage: PropTypes.func,
    loadPages: PropTypes.func,
    pages: PropTypes.array
}

export default React.memo(Pagination)
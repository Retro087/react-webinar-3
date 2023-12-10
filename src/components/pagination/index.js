import React from "react";
import { useEffect } from "react";
import { getTotalPages} from "../../utils";
import './style.css'
import PropTypes from "prop-types";

function Pagination({load, currentPage, totalPages, limit}) {

    let pages = [1,2,3,'...',totalPages]

    if(totalPages < 7){
        pages = []
        for(let i = 1; i <= totalPages; i++){
            pages.push(i)
        }

    }else{
        if(currentPage === 3){
            pages = [1, 2, 3, 4, '...', totalPages]
        }else if(currentPage > totalPages - 2){
            pages = [1, '...', totalPages - 2, totalPages - 1, totalPages]
        }else if(currentPage === totalPages - 2){
            pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, totalPages]
        }else if(currentPage > 3){
            pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
        }
    }

    if(totalPages === 0){
        pages = []
    }

    return(
        <div className="Pagination">
            {pages.map((item, i) => {
                if(item === '...'){
                    return <div key={i} className="dotted">{item}</div>
                }
                return <div key={i} onClick={() => load(limit, item)} className={currentPage === item ? 'selected' : 'item'}>{item}</div>
            })}
        </div>
    )
}

Pagination.propTypes = {
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    load: PropTypes.func,
    limit: PropTypes.number
}

export default React.memo(Pagination)
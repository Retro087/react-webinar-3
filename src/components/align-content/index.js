import React from "react";
import './style.css'

function AlignContent({children}){
    return(
        <div className="AlignComponent">
            {children}
        </div>
    )
}

export default React.memo(AlignContent)
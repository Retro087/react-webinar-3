import React from "react"
import { Navigate } from "react-router-dom"
import useSelector from "../../hooks/use-selector"


export let CheckAuth = ({children}) => {

    const select = useSelector(state => ({
        isAuth: state.login.isAuth,
    }))

    if(select.isAuth === false){
        return <Navigate to='/login'/>
    }
    return children        
}

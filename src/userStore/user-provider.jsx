import axios from "axios";
import { useEffect, useState } from "react";
import token from "../configs/authentication";
import UserContext from "./user-context"

const UserProvider = (props)=>{
     const  [user,setUser] = useState()
     const addUser = (user)=>{
            setUser(user)
     }
     const removeUser = ()=>{
            setUser("")
     }
     const userCtx = {
        user:user,
        addUser,
        removeUser
     }
    return (
     <UserContext.Provider value={userCtx}>
        {props.children}
    </UserContext.Provider>
    )
}

export default UserProvider;
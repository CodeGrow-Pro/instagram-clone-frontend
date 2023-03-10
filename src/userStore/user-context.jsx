import React from "react";
const UserContext = React.createContext({
    user:"",
    addUser:(user)=>{},
    removeUser:()=>{}
})

export default UserContext;
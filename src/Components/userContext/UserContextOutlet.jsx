import React from 'react'
import { Outlet } from 'react-router-dom'
import UserContext from '../../userStore/user-context'

const UserContextOutlet = () => {
  return (
    <UserContext>
        <Outlet/>
    </UserContext>
  )
}

export default UserContextOutlet
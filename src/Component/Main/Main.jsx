import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function Main({logedUser,removeUser}) {
  return (
   <>
   <Navbar logedUser={logedUser} removeUser={removeUser} />
   <Outlet/>
   </>
  )
}

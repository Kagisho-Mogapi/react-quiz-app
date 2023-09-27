import React from 'react'
import UseStateContext from '../hooks/UseStateContext'
import { Navigate, Outlet } from 'react-router-dom'

export default function Authenticate() {

    const {context} = UseStateContext()

  return (
    context.id ==0
    ? <Navigate to='/'/>
    : <Outlet/>
  )
}

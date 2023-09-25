import React, { useContext } from 'react'
import UseStateContext from '../hooks/UseStateContext'

export default function Question() {

    const {context, setContext} = UseStateContext()

    console.log(context)
  return (
    <div>Question</div>
  )
}

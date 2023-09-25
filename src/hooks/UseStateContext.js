import React, { createContext, useState, useContext, useEffect } from 'react'

const stateContext = createContext();

const getInitContext = () =>{

    if(localStorage.getItem('context')==null)
        localStorage.setItem('context', JSON.stringify({
        id: 0,
        timeTaken: 0,
        selectedOptions: []
    }))

    return JSON.parse(localStorage.getItem('context')) 
}

export default function UseStateContext(){
    const {context, setContext} = useContext(stateContext)
    return {context,
        setContext: obj => {setContext({...context, ...obj})}
    };
}  

export function ContextProvider({children}) {

    const [context, setContext] = useState(getInitContext());

    useEffect(()=>{
        localStorage.setItem('context', JSON.stringify(context))
    }
    ,[context])
  return (
    <stateContext.Provider value={{context, setContext}}>
        {children}
    </stateContext.Provider>
  )
}

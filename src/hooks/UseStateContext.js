import React, { createContext, useState, useContext } from 'react'

const stateContext = createContext();

const getInitContext = () =>{
    return{
        Id: 0,
        timeTaken: 0,
        selectedOptions: []
    }
}

export default function UseStateContext(){
    const {context, setContext} = useContext(stateContext)
    return {context,
        setContext: obj => {setContext({...context, ...obj})}
    };
}  

export function ContextProvider({children}) {

    const [context, setContext] = useState(getInitContext());

  return (
    <stateContext.Provider value={{context, setContext}}>
        {children}
    </stateContext.Provider>
  )
}

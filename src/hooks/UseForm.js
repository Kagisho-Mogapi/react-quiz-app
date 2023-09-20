import {useState} from "react";

export default function useForm(initFieldValues){
    
    const [values, setValues] = useState(initFieldValues)
    const [errors, setErros] = useState({})

    const handleInputChange = e=>{
        const {name,value}=e.target
        setValues({ 
            ...values,
            [name]: value
        })
    }

    return {
        values,
        setValues,
        errors,
        setErros,
        handleInputChange,
    }

}

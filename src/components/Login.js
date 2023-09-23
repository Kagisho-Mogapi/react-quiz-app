import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Center from './Center'
import useForm from '../hooks/UseForm'
import { createAPIEndpoint } from '../api'
import UseStateContext from '../hooks/UseStateContext'

const initFieldValues= ()=>({
    name: '',
    email: ''
})

export default function Login() {

    const {context, setContext} = UseStateContext()

    const {
        values,
        setValues,
        errors,
        setErros,
        handleInputChange,
    } = useForm(initFieldValues)

    const validate = ()=>{
        let temp ={...errors}

        temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Email format is invalid"
        temp.name = values.name ?"":"Field is required"
        setErros(temp)

        return Object.values(temp).every(x => x == "")
    }

    const login = e =>{
        e.preventDefault();
        if(validate())
            createAPIEndpoint('participant')
                .create(values)
                .then(res => {
                    setContext({id:res.data.id})
                    console.log(context)
                })
                .catch(err => console.log(err))
    }

  return (
    <Center>
        <Card sx={{width: 400}}>
            <CardContent sx={{textAlign:'center'}}>
                <Typography variant='h3' sx={{my:3}}>
                    Quiz App
                </Typography>
                <Box sx={{
                    '&  .MuiTextField-root':{
                        margin:1,
                        width:'90%'
                    }
                }}>
                    <form noValidate autoComplete="off" onSubmit={login}>
                        <TextField 
                            label="Email"
                            name='email'
                            value={values.email}
                            onChange={handleInputChange}
                            variant='outlined'
                            {...(errors.email && {error:true, helperText:errors.email})}
                        />
                        <TextField 
                            label="Name"
                            name='name'
                            value={values.name}
                            onChange={handleInputChange}
                            variant='outlined'
                            {...(errors.name && {error:true, helperText:errors.name})}
                        />
                        <Button type='submit' variant='contained' size='large' sx={{width:'90%'}}>
                            Submit
                        </Button>
                    </form>
                </Box>
            </CardContent>
        </Card>
    </Center>
  )
}

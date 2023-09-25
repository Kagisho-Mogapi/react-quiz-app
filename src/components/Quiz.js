import React, { useContext, useEffect, useState } from 'react'
import UseStateContext from '../hooks/UseStateContext'
import { ENDPOINTS, createAPIEndpoint } from '../api'
import { Box, Card, CardContent, CardHeader, LinearProgress, List, ListItemButton, Typography } from '@mui/material'
import { getFormatedTime } from '../helper'
import Center from './Center'

export default function Question() {


    const [qns, setQns] = useState([])
    const [qnIndex, setQnIndex] = useState(0)
    const [timeTaken, setTimeTaken] = useState(0)

    let timer;

    const startTime = ()=>{
      timer = setInterval(() => {
        setTimeTaken(prev => prev+1)
      }, [1000]);
    }

    useEffect(()=>{
      createAPIEndpoint(ENDPOINTS.question)
      .fetchAll()
      .then(res =>{
        setQns(res.data)
        startTime()
      })
      .catch(err => {console.log(err)})

      return ()=>{clearInterval(timer)}
    },[])
    

  return (
    qns.length != 0
    ?<Card sx={{maxWidth:650, mx: 'auto', mt:5,
      '& .MuiCardHeader-action': {m:0,alignSelf:'center'}
      }}>
      <CardHeader 
        title={'Question '+(qnIndex+1)+' of 5'}
        action={<Typography>{getFormatedTime(timeTaken)}</Typography>}/>
      <Box>
        <LinearProgress variant='determinate' value={(qnIndex+1)*100/5} />
      </Box>
      <CardContent>
        <Typography variant='h6'>
          {qns[qnIndex].qnInWords}
        </Typography>
        <List>
          {qns[qnIndex].options.map((item, index)=>
            <ListItemButton key={index} disableripple='true' >
              <div><b>{String.fromCharCode(65+index)}) {item}</b></div>
            </ListItemButton>
          )}
        </List>
      </CardContent>
    </Card>
    :null
  )
}

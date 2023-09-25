import axios from "axios";

export const BASE_URL = 'http://localhost:5078/'

export const ENDPOINTS={
    participant: 'participant',
    question: 'question'
}

export const createAPIEndpoint = endpoint =>{
    let url = BASE_URL + 'api/'+endpoint+'/';

    return{
        fetchAll : () => axios.get(url),
        fetchById: id => axios.get(url+id),
        create : newRecord => axios.post(url,newRecord),
        update : (id,updateRecord) => axios.put(url+id,updateRecord),
        delete : id =>axios.delete(url + id)
    }
}
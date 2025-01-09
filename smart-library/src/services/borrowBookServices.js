import axios from "axios"

export const getRequestBooks = async () => {
    const BASE_URL = 'http://localhost:5001'

    try {
        const response = await axios.get(`${BASE_URL}/borrow/getBorrow`)
        console.log(response.data) 
        return response.data
    } catch (error) {
        console.log(err) 
        return null
    }
    
}
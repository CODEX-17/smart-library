import axios from "axios"
const BASE_URL = 'http://localhost:5001'

export const getRequestBooks = async () => {
    
    try {
        const response = await axios.get(`${BASE_URL}/borrow/getBorrow`)
        return response.data
    } catch (error) {
        console.log(err) 
        return null
    }
    
}

export const addBorrowBook = async (data) => {
  
    try {
        const response = await axios.post(`${BASE_URL}/borrow/addBorrowBooks`, data)
        return response.data
    } catch (error) {
        console.log(err) 
        return null
    }
    
} 

export const deleteBorrowBoook = async (id) => {
  
    try {
        const response = await axios.post(`${BASE_URL}/borrow/deleteReq`, {id})
        return response.data
    } catch (error) {
        console.log(err) 
        return null
    }
    
} 

export const updateBorrowBoook = async (data) => {
  
    try {
        const response = await axios.post(`${BASE_URL}/borrow/updateReq`, data)
        return response.data
    } catch (error) {
        console.log(err) 
        return null
    }
    
} 
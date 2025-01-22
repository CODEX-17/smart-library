import axios from "axios"

const BASE_URL = 'http://localhost:5001'

export const getBooks = async () => {
    console.log('asd')
    try {
        const result = await axios.get(`${BASE_URL}/book/getBooks`)
        
        if (result) {
            console.log('Successfully get all books.')
            return result.data
        }

        console.log('Failed get all books.')
        return null

    } catch (error) {
        console.log(error)
        return null
    }
}

export const addBook = async (data) => {
    try {
        const result = await axios.post(`${BASE_URL}/book/addBook`, data)
        
        if (result) {
            console.log('Successfully added books.')
            console.log(result.data)
            return result.data
        }

        console.log('Failed add books.')
        return null

    } catch (error) {
        console.log(error)
        return null
    }
}
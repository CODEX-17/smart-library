import axios from "axios"

const BASE_URL = 'http://localhost:5001'

export const getBooks = async () => {
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
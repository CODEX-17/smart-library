import axios from "axios"

const BASE_URL = 'http://localhost:5001'

export const getGenre = async () => {
    try {  
        const result = await axios.get(`${BASE_URL}/genre/getGenre`)

        if (result) {
            console.log('Successfully to get genre data.')
            return result.data
        }
        
        console.log('Failed to get genre data.')
        return null
    } catch (error) {
        console.log(error)
        return null
    }
}
import axios from "axios"

const BASE_URL = 'http://localhost:5001'

export const getBranch = async () => {
    try {
        const result = await axios.get(`${BASE_URL}/branch/getBranch`)

        if (result) {
            console.log('Successfully get all branches.')
            return result.data
        }

    } catch (error) {
        console.log(error)
        return null
    }
}
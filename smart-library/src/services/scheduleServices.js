import axios from "axios"


const BASE_URL = 'http://localhost:5001'

export const checkSchedules = async () => {
    try {
        
        const result = await axios.get(`${BASE_URL}/schedule/checkSchedule`)

        if (result) {
            console.log('Successfully send request.')
            return result.data
        }

    } catch (error) {
        console.log('Server error:', error)
        return null
    }
}
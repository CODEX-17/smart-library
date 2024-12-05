import axios from "axios"

const BASE_URL = 'http://localhost:5001'

export const getFeedbacks = async () => {
    try {
        
        const result = await axios.get(`${BASE_URL}/feedback/getFeedBack`)

        if (result) {
            console.log('Successfully get feedbacks.')
            return result.data
        }

        return null

    } catch (error) {
        console.log(error)
        return null
    }
}

export const deleteFeedback = async (id) => {
    try {
        if (id) {
    
            const result = await axios.post(`${BASE_URL}/feedback/deleteFeedback`, { id })

            if (result) {
                console.log('service:', result)
                return result.data
            }else {
                return null
            }
            
        }else {
            console.log('No id send.')
            return null
        }
        
    } catch (error) {
        console.log(error)
        return null
    }
}
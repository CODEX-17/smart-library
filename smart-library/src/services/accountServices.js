import axios from "axios"
const BASE_URL = 'http://localhost:5001'

export const verifyEmail = async (email) => {
    try {
        const result = await axios.post(`${BASE_URL}/account/verifyEmail`, {email})    
        
        if (result) {
            console.log('Successfully verified email.')
            return result.data
        }
        
    } catch (error) {
        console.log(error)
        return null
    }
}

export const verifyCode = async (data) => {
    try {
        const result = await axios.post(`${BASE_URL}/account/verifyCode`, data)    
        
        if (result) {
            console.log('Successfully verified code.')
            return result.data
        }
        
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getAccounts = async () => {
    try {
        const result = await axios.get(`${BASE_URL}/account/getAccounts`)

        if (result) {
            console.log('Successfully get all accounts.')
            return result.data
        }

    } catch (error) {
        console.log(`Server error: `, error)
        return null
    }
}
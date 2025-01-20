import axios from "axios"

const BASE_URL = 'http://localhost:5001'

export const getTransactionHistory = async () => {
  
    try {
        const result = await axios.get(`${BASE_URL}/transaction/getTransactionHistory`)
        
        if (result) {
            console.log('Successfully get all transaction history.')
            return result.data
        }

        console.log('Failed get all transaction history.')
        return null

    } catch (error) {
        console.log(error)
        return null
    }
}
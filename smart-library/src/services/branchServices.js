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

export const addBranch = async (data) => {
    try {
        const result = await axios.post(`${BASE_URL}/branch/addBranch`, data)

        if (result) {
            console.log('Successfully add branch.')
            return result.data
        }

    } catch (error) {
        console.log(error)
        return null
    }
}

export const updateBranch = async (data) => {
    try {
        const result = await axios.post(`${BASE_URL}/branch/updateBranch`, data)

        if (result) {
            console.log('Successfully update branch.')
            return result.data
        }

    } catch (error) {
        console.log(error)
        return null
    }
}

export const deleteBranch = async (id) => {
    try {
        const result = await axios.post(`${BASE_URL}/branch/deleteBranch`, { id })

        if (result) {
            console.log('Successfully delete branch.')
            return result.data
        }

    } catch (error) {
        console.log(error)
        return null
    }
}
import axios from "axios"

const BASE_URL = 'http://82.112.236.213:5001'

export const getFileByID = async (imageID) => {

    console.log(imageID)
    try {
        const result = await axios.get(`${BASE_URL}/image/getImageByImageID/${imageID}`)

        if (result) {
            console.log('Successfully get file.')
            return result.data[0]
        }

    } catch (error) {
        console.log('Error in server: ', error)
        return null
    }
}
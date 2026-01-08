import axios from "axios"
export const pushToDb = async () => {
    try{
        const response = await axios.post('/api/bulk-insert-to-db')
        return response.data
    }catch(e){
        console.log(e)
        return false
    }
}
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001/api/v1/';

class apiProvider {
    static async login(dataObject){
        return await axios.post(`/user/login`, dataObject)
    }

    static async signup(dataObject){
        return await axios.post(`/user/signup`, dataObject)
    }

    static async userProfile(bearerToken){
        return await axios.post(
            `/user/profile`,
            undefined,
            { headers: { authorization: `Bearer ${bearerToken}` } }
        )
    }

    static async updateUserProfile(dataObject, bearerToken){
        return await axios.put(
            `/user/profile`,
            dataObject,
            { headers: { authorization: `Bearer ${bearerToken}` } }
        )
    }

}

export default apiProvider
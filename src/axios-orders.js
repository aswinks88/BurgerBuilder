import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burgermakerreactproject.firebaseio.com/'
})
export default instance
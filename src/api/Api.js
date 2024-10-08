import axios from "axios";

const Api = axios.create({
    baseURL: 'https://e1school-backend.onrender.com/'
})
// const Api = axios.create({
//     baseURL: 'http://localhost:2600/'
// })

export default Api


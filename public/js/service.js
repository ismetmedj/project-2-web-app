const myAPI = axios.create({
    baseURL: 'https://project-2-iron-hack.onrender.com',
    withCredentials: true,
    // baseURL: 'http://localhost:3000',
})
export default myAPI

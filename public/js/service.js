const myAPI = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
})
export default myAPI

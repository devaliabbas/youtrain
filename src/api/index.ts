import axios from "axios"

axios.defaults.baseURL = "http://localhost:3000/api"

export const getQuestions = async (limit: number) => {
  try {
    const response = await axios.get(`/questions?limit=${limit}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

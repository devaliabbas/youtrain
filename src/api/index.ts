import axios, { AxiosResponse, isAxiosError } from "axios"

axios.defaults.baseURL = "http://localhost:3000/api"

type SigninType = {
  email: string
  password: string
}

type SignupType = {
  firstName: string
  lastName: string
  email: string
  password: string
}

type SigninResponseData = {
  token: string
}

type FilterOptions = {
  year_q: string
  session_q: string
  specialization: string
}

export const getQuestions = async (limit: number) => {
  const token = window.localStorage.getItem("token")

  try {
    const response = await axios.get(`/questions?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 403) {
      window.localStorage.removeItem("token")
    }
  }
}

export const getQuestionsWithFilter = async (options: FilterOptions) => {
  const token = window.localStorage.getItem("token")

  try {
    const response = await axios.get(
      `/questions/getQuestionsWithFilter?year_q=${options.year_q}&session_q=${options.session_q}&specialization=${options.specialization}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 403) {
      window.localStorage.removeItem("token")
    }
  }
}

export const addQuestion = async (data: QuestionType) => {
  const token = window.localStorage.getItem("token")
  try {
    const response = await axios.post("/questions/addQuestion", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 403) {
      window.localStorage.removeItem("token")
    }
  }
}

export const signin = async (
  data: SigninType
): Promise<AxiosResponse<SigninResponseData>> => {
  try {
    const response = await axios.post<SigninResponseData>("/auth/signin", {
      email: data.email,
      password: data.password,
    })
    return response
  } catch (error) {
    // Ensure the error is of type AxiosError
    if (axios.isAxiosError(error)) {
      throw error
    } else {
      throw new Error("Unexpected error")
    }
  }
}
export const signup = async (data: SignupType) => {
  try {
    const response = await axios.post("/auth/signup", {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data
    } else {
      return { error: "An unexpected error occurred." }
    }
  }
}

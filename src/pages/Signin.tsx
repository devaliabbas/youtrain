import { Link, useNavigate } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import { signin } from "../api"
import { useState } from "react"
import { Circles } from "react-loader-spinner"
import axios from "axios"

type Inputs = {
  email: string
  password: string
}

const Signin = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [resError, setResError] = useState()

  const { register, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setIsLoading(true)

    try {
      const response = await signin(formData)
      if (response.status === 200) {
        window.localStorage.setItem("token", response.data.token)
        navigate("/", { replace: true })
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404 || error.response?.status === 403) {
          setResError(error.response.data)
        }
      } else {
        console.error("Unexpected error", error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-16 px-8 flex justify-center items-center flex-col">
      <div className="flex justify-center items-center h-20">
        <p className="text-xl font-bold">تسجيل الدخول</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-2 rounded-2xl p-4 text-lg px-8 w-full"
      >
        <div className="mt-4">
          <p>البريد الإلكتروني:</p>
          <input
            dir="ltr"
            {...register("email", { required: true })}
            type="email"
            className="border-2 rounded-lg mt-2 h-8 w-full focus:outline-none py-4 px-2"
          />
        </div>
        <div className="mt-4">
          <p>كلمة المرور:</p>
          <input
            dir="ltr"
            {...register("password", { required: true })}
            type="password"
            className="border-2 rounded-lg mt-2 h-8 w-full focus:outline-none py-4 px-2"
          />
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            type="submit"
            className="flex justify-center items-center my-4 bg-green-500 rounded-xl w-32 h-10 text-white font-bold"
          >
            {isLoading ? (
              <Circles
                height="40"
                width="40"
                color="white"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              "تسجيل الدخول"
            )}
          </button>
        </div>
        <div className="text-center">
          {resError && <p className="text-sm text-red-500">{resError}</p>}
        </div>
        <div className="mt-4 flex justify-between text-base">
          <p>ليس لديك حساب ؟</p>
          <span>
            <Link to="/signup" className="text-blue-500">
              إنشاء حساب
            </Link>
          </span>
        </div>
      </form>
    </div>
  )
}

export default Signin

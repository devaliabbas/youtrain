import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { signup } from "../api"
import { Circles } from "react-loader-spinner"
import axios from "axios"

type Inputs = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const Signup = () => {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [resError, setResError] = useState<string>()

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const password = watch("password")

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setIsLoading(true)

    try {
      const response = await signup(formData)

      if (response.token) {
        window.localStorage.setItem("token", response.token)
        navigate("/", { replace: true })
      } else if (response.error) {
        setResError(response.error)
      } else {
        setResError("An unexpected error occurred.")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setResError(error.response.data.error)
        } else {
          setResError("An error occurred during signup. Please try again.")
        }
      } else {
        setResError("An unexpected error occurred.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-16 flex justify-center items-center flex-col">
      <div className="flex justify-center items-center h-20">
        <p className="text-xl font-bold">إنشاء حساب جديد</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-2 rounded-2xl p-4 text-lg px-8 mb-16"
      >
        <div>
          <p>الإسم الأول:</p>
          <input
            {...register("firstName", { required: "هذا الحقل مطلوب." })}
            type="text"
            className="border-2 rounded-lg mt-2 h-8 w-56 focus:outline-none py-4 px-2"
          />
          {errors.firstName && (
            <p className="text-red-600 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="mt-4">
          <p>الإسم الأخير:</p>
          <input
            {...register("lastName", { required: "هذا الحقل مطلوب." })}
            type="text"
            className="border-2 rounded-lg mt-2 h-8 w-56 focus:outline-none py-4 px-2"
          />
          {errors.lastName && (
            <p className="text-red-600 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div className="mt-4">
          <p>البريد الإلكتروني:</p>
          <input
            {...register("email", { required: "هذا الحقل مطلوب." })}
            type="email"
            className="border-2 rounded-lg mt-2 h-8 w-56 focus:outline-none py-4 px-2"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mt-4">
          <p>كلمة المرور:</p>
          <input
            {...register("password", { required: "هذا الحقل مطلوب." })}
            type="password"
            className="border-2 rounded-lg mt-2 h-8 w-56 focus:outline-none py-4 px-2"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mt-4">
          <p>تأكيد كلمة المرور:</p>
          <input
            {...register("confirmPassword", {
              required: "هذا الحقل مطلوب.",
              validate: (value) => {
                return password === value || "كلمة المرور غير مطابقة"
              },
            })}
            type="password"
            className="border-2 rounded-lg mt-2 h-8 w-56 focus:outline-none py-4 px-2"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
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
              "إنشاء حساب"
            )}
          </button>
        </div>
        <div className="text-center">
          {resError && <p className="text-sm text-red-500">{resError}</p>}
        </div>
        <div className="mt-4 flex justify-between text-base">
          <p>لديك حساب ؟</p>
          <span>
            <Link to="/signin" className="text-blue-500">
              تسجيل الدخول
            </Link>
          </span>
        </div>
      </form>
    </div>
  )
}

export default Signup

import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { changePassword } from "../api"
import { Circles } from "react-loader-spinner"
import { jwtDecode } from "jwt-decode"
import { AxiosResponse } from "axios"

type Inputs = {
  email: string
  password: string
  newPassword: string
  confirmNewPassword: string
}

type DecodeType = {
  email: string
}

const Settings = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [resError, setResError] = useState()
  const [resSuccess, setResSuccess] = useState()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<Inputs>()

  const newPassword = watch("newPassword")

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setIsLoading(true)

    const decodedToken = jwtDecode(
      window.localStorage.getItem("token")!
    ) as DecodeType

    try {
      const response = await changePassword({
        ...formData,
        email: decodedToken.email,
      })

      if ((response as AxiosResponse).status === 403) {
        setResError((response as AxiosResponse).data)
      }

      if ((response as AxiosResponse).status === 200) {
        setResSuccess((response as AxiosResponse).data)
        reset()
      }

    } catch (error) {
      setResError(error.response.data)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-16">
      <form className="border-b-4" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-lg font-bold m-4 mt-20">تغيير كلمة المرور:</h1>
        <div className="my-4 px-8">
          <p>كلمة المرور القديمة:</p>
          <input
            {...register("password", { required: true })}
            type="password"
            dir="ltr"
            className="focus:outline-none p-2 h-10 border-2 rounded-lg w-full mt-2"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="my-4 px-8">
          <p>كلمة المرور الجديدة:</p>
          <input
            {...register("newPassword", { required: true })}
            type="password"
            dir="ltr"
            className="focus:outline-none p-2 h-10 border-2 rounded-lg w-full mt-2"
          />
          {errors.newPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>
        <div className="my-4 px-8">
          <p>تأكيد كلمة المرور الجديدة:</p>
          <input
            {...register("confirmNewPassword", {
              required: true,
              validate: (value) => {
                return newPassword === value || "كلمة المرور غير مطابقة"
              },
            })}
            type="password"
            dir="ltr"
            className="focus:outline-none p-2 h-10 border-2 rounded-lg w-full mt-2"
          />
          {errors.confirmNewPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.confirmNewPassword.message}
            </p>
          )}
        </div>
        <div className="flex justify-center items-center my-4">
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
              "تغيير كلمة المرور"
            )}
          </button>
        </div>
        <div className="text-center">
          {resError && <p className="text-sm text-red-500">{resError}</p>}
          {resSuccess && <p className="text-sm text-green-500">{resSuccess}</p>}
        </div>
      </form>
    </div>
  )
}

export default Settings

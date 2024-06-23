import { signUp } from "../auth/auth"
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  email: string
  firstname: string
  lastname: string
  dob: string
  password: string
  confirmpassword: string
}

const Signup = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    signUp(
      formData.email,
      formData.firstname,
      formData.lastname,
      formData.password,
      formData.dob
    )
  }

  const passwordValidateHandler = (val: string) => {
    if (val.length < 6) {
      return "كلمة المرور أصغر من 6 أحرف."
    } else if (val.length > 24) {
      return "كلمة المرور أكبر من 24 حرف."
    } else if (!val.match(/\d+/g)) {
      return "كلمة المرور يجب أن تحوي أرقام."
    }
  }

  const confirmPasswordValidateHandler = (val: string) => {
    if (watch("password") != val) {
      return "كلمة المرور غير مطابقة."
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-8">
        <h1 className="text-2xl font-bold">إنشاء حساب</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-2 rounded-xl py-4 w-72 px-8 my-8"
      >
        <div className="my-2">
          <p>البريد الإلكتروني:</p>
          <input
            {...register("email", { required: true })}
            type="email"
            className="border-2 text-lg my-2 rounded-lg w-full py-1 px-2 focus:outline-none"
          />
          {errors.email && <div className="text-red-500">هذا الحقل مطلوب.</div>}
        </div>
        <div className="my-2">
          <p>الإسم الأول:</p>
          <input
            {...register("firstname", { required: true })}
            type="text"
            className="border-2 my-2 rounded-lg w-full py-1 px-2 focus:outline-none"
          />
          {errors.firstname && (
            <div className="text-red-500">هذا الحقل مطلوب.</div>
          )}
        </div>
        <div className="my-2">
          <p>الإسم الأخير:</p>
          <input
            {...register("lastname", { required: true })}
            type="text"
            className="border-2 my-2 rounded-lg w-full py-1 px-2 focus:outline-none"
          />
          {errors.lastname && (
            <div className="text-red-500">هذا الحقل مطلوب.</div>
          )}
        </div>
        <div className="my-2">
          <p>تاريخ الميلاد:</p>
          <input
            {...register("dob", { required: true })}
            type="date"
            className="border-2 my-2 rounded-lg w-full py-1 px-2 focus:outline-none"
          />
          {errors.dob && <div className="text-red-500">هذا الحقل مطلوب.</div>}
        </div>
        <div className="my-2">
          <p>كلمة المرور:</p>
          <input
            {...register("password", {
              required: true,
              validate: passwordValidateHandler,
            })}
            type="password"
            className="border-2 my-2 rounded-lg w-full py-1 px-2 focus:outline-none"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="my-2">
          <p>تأكيد كلمة المرور:</p>
          <input
            {...register("confirmpassword", {
              required: true,
              validate: confirmPasswordValidateHandler,
            })}
            type="password"
            className="border-2 my-2 rounded-lg w-full py-1 px-2 focus:outline-none"
          />
          {errors.confirmpassword && (
            <div className="text-red-500">{errors.confirmpassword.message}</div>
          )}
        </div>
        <div className="flex justify-center items-center my-4">
          <button
            type="submit"
            className="text-lg bg-green-500 text-white font-bold py-1 px-2 border-2 rounded-xl option-btn active:shadow-none active:translate-y-2 cursor-pointer"
          >
            إنشاء حساب
          </button>
        </div>
      </form>
    </div>
  )
}

export default Signup

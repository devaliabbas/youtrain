import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"
import { FaTrashCan, FaPlus } from "react-icons/fa6"

type Inputs = {
  question: string
  options: { value: string }[]
  answer: number
  flag: string
  year: number
  session: number
  specialization: string
  image: File
}

const Dashboard = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      options: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }], // Default values for the options
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <div className="mt-16">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-4 mt-20">
          <p className="text-xl mb-2">
            السؤال: <span className="text-red-500">*</span>
          </p>
          <input
            {...register("question", { required: true })}
            type="text"
            className="border-slate-400 border-2 rounded-xl p-2 w-full focus:outline-none"
          />
          {errors.question && (
            <span className="text-red-500">هذا الحقل مطلوب.</span>
          )}
        </div>
        <div className="px-4 mt-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xl mb-2">
              الخيارات: <span className="text-red-500">*</span>
            </p>
            <FaPlus
              size={25}
              onClick={() => append({ value: "" })}
              className="bg-green-500 text-white font-bold rounded-lg w-12 h-8 p-1"
            />
          </div>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-col justify-center items-start"
            >
              <div className="flex justify-center items-center w-full">
                <p className="ml-2 text-xl">{index}</p>
                <input
                  {...register(`options.${index}.value` as const, {
                    required: true,
                  })}
                  type="text"
                  className="border-slate-400 my-2 border-2 rounded-xl p-2 w-full focus:outline-none"
                />
                <FaTrashCan
                  size={25}
                  onClick={() => remove(index)}
                  className="text-red-500 font-bold mr-2 -ml-1"
                />
              </div>
              {errors.options && errors.options[index] && (
                <span className="text-red-500 mr-6">هذا الحقل مطلوب.</span>
              )}
            </div>
          ))}
        </div>
        <div className="px-4 mt-4">
          <p className="text-xl mb-2">
            الجواب: <span className="text-red-500">*</span>
          </p>
          <select
            {...register("answer", { required: true })}
            className="border-slate-400 border-2 rounded-xl p-2 w-full focus:outline-none"
          >
            <option value=""></option>
            {fields.map((_item, index) => (
              <option key={index} value={index}>
                {index}
              </option>
            ))}
          </select>
          {errors.answer && (
            <span className="text-red-500">هذا الحقل مطلوب.</span>
          )}
        </div>
        <div className="px-4 mt-4">
          <p className="text-xl mb-2">
            المحور: <span className="text-red-500">*</span>
          </p>
          <select
            {...register("flag", { required: true })}
            className="border-slate-400 border-2 rounded-xl p-2 w-full focus:outline-none"
          >
            <option value=""></option>
            <option value="برمجيات">برمجيات</option>
            <option value="شبكات">شبكات</option>
            <option value="خوارزميات">خوارزميات</option>
            <option value="قواعد بيانات">قواعد بيانات</option>
            <option value="ذكاء صنعي">ذكاء صنعي</option>
          </select>
          {errors.question && (
            <span className="text-red-500">هذا الحقل مطلوب.</span>
          )}
        </div>
        <div className="px-4 mt-4">
          <p className="text-xl mb-2">السنة: </p>
          <input
            {...register("year")}
            type="text"
            className="border-slate-400 border-2 rounded-xl p-2 w-full focus:outline-none"
          />
        </div>
        <div className="px-4 mt-4">
          <p className="text-xl mb-2">الدورة:</p>
          <select
            {...register("session")}
            className="border-slate-400 border-2 rounded-xl p-2 w-full focus:outline-none"
          >
            <option value=""></option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
        <div className="px-4 mt-4">
          <p className="text-xl mb-2">الإختصاص:</p>
          <select
            {...register("specialization")}
            className="border-slate-400 border-2 rounded-xl p-2 w-full focus:outline-none"
          >
            <option value=""></option>
            <option value="تخرج">تخرج</option>
            <option value="برمجيات">برمجيات</option>
            <option value="شبكات">شبكات</option>
            <option value="ذكاء صنعي">ذكاء صنعي</option>
          </select>
        </div>
        <div className="px-4 mt-4">
          <p className="text-xl mb-2">الصورة:</p>
          <input
            {...register("image")}
            type="file"
            className="border-slate-400 border-2 rounded-xl p-2 w-full focus:outline-none"
          />
        </div>
        <div className="flex justify-center items-center my-8">
          <button
            type="submit"
            className="my-4 bg-green-500 rounded-xl py-2 px-4 text-white font-bold"
          >
            رفع السؤال
          </button>
        </div>
      </form>
    </div>
  )
}

export default Dashboard

import { useState } from "react"
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"
import { FaTrashCan, FaPlus } from "react-icons/fa6"
import { Circles } from "react-loader-spinner"
import { addQuestion } from '../api'

type Inputs = {
  question: string
  options_q: { value: string }[]
  answer: number
  flag_q: string
  year_q: number | null
  session_q: number | null
  specialization: string | null
  image: HTMLInputElement | null
}

const Dashboard = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      options_q: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
      year_q: null,
      session_q: null,
      specialization: null,
      image: null,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options_q",
  })

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setIsUploading(true)
    const newOptionsArray: string[] = []

    formData.options_q.map((item) => {
      newOptionsArray.push(item.value)
    })

    const response = await addQuestion({...formData, options_q: newOptionsArray})

    if (response) {
      reset()
      setIsUploading(false)
    }
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
                  {...register(`options_q.${index}.value` as const, {
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
            {...register("flag_q", { required: true })}
            className="border-slate-400 border-2 rounded-xl p-2 w-full focus:outline-none"
          >
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
            {...register("year_q")}
            type="text"
            className="border-slate-400 border-2 rounded-xl p-2 w-full focus:outline-none"
          />
        </div>
        <div className="px-4 mt-4">
          <p className="text-xl mb-2">الدورة:</p>
          <select
            {...register("session_q")}
            className="border-slate-400 border-2 rounded-xl p-2 w-full focus:outline-none"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </div>
        <div className="px-4 mt-4">
          <p className="text-xl mb-2">الإختصاص:</p>
          <select
            {...register("specialization")}
            className="border-slate-400 border-2 rounded-xl p-2 w-full focus:outline-none"
          >
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
            className="flex justify-center items-center my-4 bg-green-500 rounded-xl text-xl w-32 h-12 text-white font-bold"
          >
            {isUploading ? (
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
              "رفع السؤال"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Dashboard

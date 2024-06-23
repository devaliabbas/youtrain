import { useState } from "react"
import { supabase } from "../supabase"
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"
import { FaTrashCan, FaPlus } from "react-icons/fa6"
import { v4 as uuidv4 } from "uuid"
import { Circles } from "react-loader-spinner"

type Inputs = {
  question: string
  options: { value: string }[]
  answer: number
  flag: string
  year: number | null
  session: number | null
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
      options: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
      year: null,
      session: null,
      specialization: null,
      image: null,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  })

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    setIsUploading(true)
    const newOptionsArray: string[] = []
    const imageFile = formData.image ? formData.image[0] : null
    const imageID = uuidv4() + ".png"

    if (imageFile) {
      const { error: imageUploadError } = await supabase.storage
        .from("imageStorage")
        .upload(`questionImages/${imageID}`, imageFile)

      if (imageUploadError) {
        reset()
        console.log(imageUploadError)
        setIsUploading(false)
        return
      }
    }

    formData.options.map((item) => {
      newOptionsArray.push(item.value)
    })

    const { error: formUploadError } = await supabase.from("questions").insert({
      ...formData,
      options: newOptionsArray,
      image: imageFile ? imageID : null,
    })

    if (!formUploadError) {
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

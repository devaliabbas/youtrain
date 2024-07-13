import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"

type Inputs = {
  specialization: string
  year_q: string
  session_q: string
}

const LastExams = () => {
  
  const navigate = useNavigate()
  const [selected, setSelected] = useState("تخرج")
  const { register, handleSubmit } = useForm<Inputs>()


  const onSubmit: SubmitHandler<Inputs> = async (formData, e) => {
    const newFormData = { ...formData, specialization: selected }
    navigate("/" + e?.nativeEvent.submitter.name, { state: { data: newFormData } })
  }

  return (
    <div className="mt-16">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid mt-24 grid-cols-2 gap-5 place-items-center px-6">
          <div className="col-span-2">
            <p className="text-2xl">التخصص:</p>
          </div>
          <button
            type="button"
            onClick={() => setSelected("تخرج")}
            className={`option-btn py-2 px-4 border-2 rounded-2xl flex justify-center items-center text-xl w-32 active:shadow-none active:translate-y-2 cursor-pointer ${
              selected === "تخرج" ? "bg-green-200" : ""
            }`}
          >
            تخرج
          </button>
          <button
            type="button"
            onClick={() => setSelected("برمجيات")}
            className={`option-btn py-2 px-4 border-2 rounded-2xl flex justify-center items-center text-xl w-32 active:shadow-none active:translate-y-2 cursor-pointer ${
              selected === "برمجيات" ? "bg-green-200" : ""
            }`}
          >
            برمجيات
          </button>
          <button
            type="button"
            onClick={() => setSelected("شبكات")}
            className={`option-btn py-2 px-4 border-2 rounded-2xl flex justify-center items-center text-xl w-32 active:shadow-none active:translate-y-2 cursor-pointer ${
              selected === "شبكات" ? "bg-green-200" : ""
            }`}
          >
            شبكات
          </button>
          <button
            type="button"
            onClick={() => setSelected("ذكاء")}
            className={`option-btn py-2 px-4 border-2 rounded-2xl flex justify-center items-center text-xl w-32 active:shadow-none active:translate-y-2 cursor-pointer ${
              selected === "ذكاء" ? "bg-green-200" : ""
            }`}
          >
            ذكاء
          </button>
        </div>
        <div className="flex option-btn justify-between items-center mt-8 text-xl px-4 border-2 rounded-xl py-2 mx-8">
          <p>العام:</p>
          <select
            {...register("year_q", { required: true })}
            id="year"
            className="focus:outline-none "
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <div className="flex option-btn focus:outline-none justify-between items-center mt-8 text-xl px-4 border-2 rounded-xl py-2 mx-8">
          <p>الدورة:</p>
          <select
            {...register("session_q", { required: true })}
            id="term"
            className="focus:outline-none "
          >
            <option value="1">الأولى</option>
            <option value="2">الثانية</option>
          </select>
        </div>
        <div className="flex justify-between items-center mt-8 px-8">
          <button name="randomtest" className="option-btn py-4 px-4 border-2 rounded-2xl flex justify-center items-center w-32 active:shadow-none active:translate-y-2 cursor-pointer">
            إمتحان تجريبي
          </button>
          <button name="qlmode" className="option-btn py-4 px-4 border-2 rounded-2xl flex justify-center items-center w-32 active:shadow-none active:translate-y-2 cursor-pointer">
            وضع التعلم
          </button>
        </div>
      </form>
    </div>
  )
}

export default LastExams

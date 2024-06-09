import { useState } from "react"

type FormDataType = {
  question: string | null
  options: string[]
  answer: number | null
  flag: string | null
  year: number | null
  session: number | null
  specialization: string | null
  image: File | null
}

const Dashboard = () => {
  const [formData, setFormData] = useState<FormDataType>({
    question: null,
    options: [],
    answer: null,
    flag: null,
    year: null,
    session: null,
    specialization: null,
    image: null,
  })

  const submitQuestion = () => {
    console.log(formData)
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData({ ...formData, options: newOptions })
  }

  return (
    <div className="mt-16">
      <div className="px-4 mt-20">
        <p className="text-xl mb-2">السؤال:</p>
        <input
          onChange={(e) =>
            setFormData({ ...formData, question: e.target.value })
          }
          type="text"
          className="border-slate-400 border-2 rounded-xl p-2 w-full focus:outline-none"
        />
      </div>
      <div className="px-4 mt-4">
        <p className="text-xl mb-2">الخيارات:</p>
        <div className="flex justify-center items-center">
          <p className="ml-2 text-xl">0</p>
          <input
            onChange={(e) => handleOptionChange(0, e.target.value)}
            type="text"
            className="border-slate-400 my-2 border-2 rounded-xl p-2 w-full focus:outline-none"
          />
        </div>
        <div className="flex justify-center items-center">
          <p className="ml-2 text-xl">1</p>
          <input
            onChange={(e) => handleOptionChange(1, e.target.value)}
            type="text"
            className="border-slate-400 my-2 border-2 rounded-xl p-2 w-full focus:outline-none"
          />
        </div>
        <div className="flex justify-center items-center">
          <p className="ml-2 text-xl">2</p>
          <input
            onChange={(e) => handleOptionChange(2, e.target.value)}
            type="text"
            className="border-slate-400 my-2 border-2 rounded-xl p-2 w-full focus:outline-none"
          />
        </div>
        <div className="flex justify-center items-center">
          <p className="ml-2 text-xl">3</p>
          <input
            onChange={(e) => handleOptionChange(3, e.target.value)}
            type="text"
            className="border-slate-400 my-2 border-2 rounded-xl p-2 w-full focus:outline-none"
          />
        </div>
        <div className="flex justify-center items-center">
          <p className="ml-2 text-xl">4</p>
          <input
            onChange={(e) => handleOptionChange(4, e.target.value)}
            type="text"
            className="border-slate-400 my-2 border-2 rounded-xl p-2 w-full focus:outline-none"
          />
        </div>
      </div>
      <div className="px-4 mt-4">
        <p className="text-xl mb-2">الجواب:</p>
        <select
          onChange={(e) =>
            setFormData({ ...formData, answer: parseInt(e.target.value) })
          }
          className="border-slate-400 border-2 rounded-xl p-2 w-full focus:outline-none"
        >
          <option value=""></option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <div className="px-4 mt-4">
        <p className="text-xl mb-2">المحور:</p>
        <select className="border-slate-400 border-2 rounded-xl p-2 w-full focus:outline-none">
          <option value=""></option>
          <option value="برمجيات">برمجيات</option>
          <option value="شبكات">شبكات</option>
          <option value="خوارزميات">خوارزميات</option>
          <option value="قواعد بيانات">قواعد بيانات</option>
          <option value="ذكاء صنعي">ذكاء صنعي</option>
        </select>
      </div>
      <div className="px-4 mt-4">
        <p className="text-xl mb-2">السنة:</p>
        <input
          type="text"
          className="border-slate-400 border-2 rounded-xl p-2 w-full focus:outline-none"
        />
      </div>
      <div className="px-4 mt-4">
        <p className="text-xl mb-2">الدورة:</p>
        <select className="border-slate-400 border-2 rounded-xl p-2 w-full focus:outline-none">
          <option value=""></option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </div>
      <div className="px-4 mt-4">
        <p className="text-xl mb-2">الإختصاص:</p>
        <select className="border-slate-400 border-2 rounded-xl p-2 w-full focus:outline-none">
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
          type="file"
          className="border-slate-400 border-2 rounded-xl p-2 w-full focus:outline-none"
        />
      </div>
      <div className="flex justify-center items-center my-8">
        <button
          onClick={submitQuestion}
          className="my-4 bg-green-500 rounded-xl py-2 px-4 text-white font-bold"
        >
          رفع السؤال
        </button>
      </div>
    </div>
  )
}

export default Dashboard

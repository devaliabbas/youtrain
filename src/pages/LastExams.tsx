import { useState } from "react"

const LastExams = () => {
  const [selected, setSelected] = useState("تخرج")

  return (
    <div className="mt-16">
      <div className="grid mt-24 grid-cols-2 gap-5 place-items-center px-6">
        <div className="col-span-2">
          <p className="text-2xl">التخصص:</p>
        </div>
        <button
          onClick={() => setSelected("تخرج")}
          className={`option-btn py-2 px-4 border-2 rounded-2xl flex justify-center items-center text-xl w-32 active:shadow-none active:translate-y-2 cursor-pointer ${
            selected === "تخرج" ? "bg-green-200" : ""
          }`}
        >
          تخرج
        </button>
        <button
          onClick={() => setSelected("برمجيات")}
          className={`option-btn py-2 px-4 border-2 rounded-2xl flex justify-center items-center text-xl w-32 active:shadow-none active:translate-y-2 cursor-pointer ${
            selected === "برمجيات" ? "bg-green-200" : ""
          }`}
        >
          برمجيات
        </button>
        <button
          onClick={() => setSelected("شبكات")}
          className={`option-btn py-2 px-4 border-2 rounded-2xl flex justify-center items-center text-xl w-32 active:shadow-none active:translate-y-2 cursor-pointer ${
            selected === "شبكات" ? "bg-green-200" : ""
          }`}
        >
          شبكات
        </button>
        <button
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
        <select name="year" id="year" className="focus:outline-none ">
          <option value="2024">2024</option>
        </select>
      </div>
      <div className="flex option-btn focus:outline-none justify-between items-center mt-8 text-xl px-4 border-2 rounded-xl py-2 mx-8">
        <p>الدورة:</p>
        <select name="term" id="term" className="focus:outline-none ">
          <option value="الأولى">الأولى</option>
          <option value="الثانية">الثانية</option>
        </select>
      </div>
      <div className="flex justify-between items-center mt-8 px-8">
        <button className="option-btn py-4 px-4 border-2 rounded-2xl flex justify-center items-center w-32 active:shadow-none active:translate-y-2 cursor-pointer">
          إمتحان تجريبي
        </button>
        <button className="option-btn py-4 px-4 border-2 rounded-2xl flex justify-center items-center w-32 active:shadow-none active:translate-y-2 cursor-pointer">
          وضع التعلم
        </button>
      </div>
    </div>
  )
}

export default LastExams

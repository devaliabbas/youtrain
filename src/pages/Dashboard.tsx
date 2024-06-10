import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  question: string
  options: string[]
}

const Dashboard = () => {
  const { register, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <div className="mt-16">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-4 mt-20">
          <p className="text-xl mb-2">السؤال:</p>
          <input
            {...register("question")}
            type="text"
            className="border-slate-400 border-2 rounded-xl p-2 w-full focus:outline-none"
          />
        </div>
        <div className="px-4 mt-4">
          <p className="text-xl mb-2">الخيارات:</p>
          <div className="flex justify-center items-center">
            <p className="ml-2 text-xl">0</p>
            <input
              {...register("options.0")}
              type="text"
              className="border-slate-400 my-2 border-2 rounded-xl p-2 w-full focus:outline-none"
            />
          </div>
          <div className="flex justify-center items-center">
            <p className="ml-2 text-xl">1</p>
            <input
              {...register("options.1")}
              type="text"
              className="border-slate-400 my-2 border-2 rounded-xl p-2 w-full focus:outline-none"
            />
          </div>
          <div className="flex justify-center items-center">
            <p className="ml-2 text-xl">2</p>
            <input
              {...register("options.2")}
              type="text"
              className="border-slate-400 my-2 border-2 rounded-xl p-2 w-full focus:outline-none"
            />
          </div>
          <div className="flex justify-center items-center">
            <p className="ml-2 text-xl">3</p>
            <input
              {...register("options.3")}
              type="text"
              className="border-slate-400 my-2 border-2 rounded-xl p-2 w-full focus:outline-none"
            />
          </div>
          <div className="flex justify-center items-center">
            <p className="ml-2 text-xl">4</p>
            <input
              {...register("options.4")}
              type="text"
              className="border-slate-400 my-2 border-2 rounded-xl p-2 w-full focus:outline-none"
            />
          </div>
        </div>
        <div className="px-4 mt-4">
          <p className="text-xl mb-2">الجواب:</p>
          <select className="border-slate-400 border-2 rounded-xl p-2 w-full focus:outline-none">
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

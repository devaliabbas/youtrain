import LastExamImg from "../assets/last_exam.svg"
import HomeButton from "../components/HomeButton"

import { useNavigate } from "react-router-dom"

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="grid grid-rows-[1fr_2fr] h-screen">
      <div className="mt-16">
        <div className="flex justify-between items-center px-4 my-8">
          <div>
            <h1 className="font-bold text-xl">الدورة الأخيرة</h1>
            <p className="w-44 mt-2">إختبر نفسك في الدورة الإمتحانية الأخيرة</p>
          </div>
          <div className="border-2 w-32 p-2 flex justify-center items-center flex-col rounded-xl">
            <img src={LastExamImg} alt="LastExamImg" className="w-32" />
            <p className="font-bold mt-2">2024/4</p>
          </div>
        </div>
      </div>
      <div className="bg-green-600 rounded-t-3xl">
        <HomeButton
          title="إختبر نفسك في الدورات السابقة"
          func={() => navigate(0)}
        />
        <HomeButton
          title="وضع التعلم المستمر"
          func={() => navigate("/clmode")}
        />
        <HomeButton title="إختبار تجريبي عشوائي" func={() => navigate('/randomtest')} />
      </div>
    </div>
  )
}

export default Home

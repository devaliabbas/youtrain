import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Question from "../components/Question"

import { MockData } from "../data/MockData"
import ResultTable from "../components/ResultTable"
import NextPopUp from "../components/NextPopUp"
import ProgressBar from "../components/ProgressBar"

const QLMode = () => {
  const navigate = useNavigate()

  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [isAnswered, setIsAnswered] = useState<boolean>(false)
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [correctCount, setCorrectCount] = useState<number>(0)
  const [selected, setSelected] = useState<number>()

  const nextHandler = () => {
    setCurrentQuestion((prev) => prev + 1)
    setIsAnswered(false)
    setSelected(undefined)
  }

  const len: number = Math.floor(
    ((currentQuestion + 1) * 100) / MockData.length
  )

  return (
    <div>
      <div className="mt-16">
        {MockData[currentQuestion] ? (
          <>
            <ProgressBar len={len} />

            <Question
              question={MockData[currentQuestion]}
              setIsAnswered={setIsAnswered}
              setIsCorrect={setIsCorrect}
              isAnswered={isAnswered}
              setCorrectCount={setCorrectCount}
              selected={selected}
              setSelected={setSelected}
            />

            <NextPopUp
              nextHandler={nextHandler}
              isCorrect={isCorrect}
              isAnswered={isAnswered}
            />
          </>
        ) : (
          <div className="flex flex-col justify-center w-screen items-center">
            <h1 className="my-12 font-bold text-2xl">نهاية الأسئلة</h1>
            <ResultTable correctCount={correctCount} len={MockData.length} />
            <button
              onClick={() => navigate(0)}
              className="py-2 px-4 border-2 rounded-xl option-btn mt-8 active:shadow-none active:translate-y-2 cursor-pointer"
            >
              الجلسة التالية
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default QLMode

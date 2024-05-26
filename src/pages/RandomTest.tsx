import React from "react"
import { useState } from "react"
import Countdown from "react-countdown"

import ProgressBar from "../components/ProgressBar"

import { MockData } from "../data/MockData"
import ResultTable from "../components/ResultTable"
import { useNavigate } from "react-router-dom"

type RendererProps = {
  hours: number
  minutes: number
  seconds: number
  completed: boolean
  submitAnswers: () => void
}

type FinalResultType = {
  state: string
  color: string
}

const renderer = ({
  hours,
  minutes,
  seconds,
  completed,
  submitAnswers,
}: RendererProps) => {
  if (completed) {
    submitAnswers()
    return
  } else {
    return (
      <span>
        {hours > 9 ? hours : "0" + hours}:
        {minutes > 9 ? minutes : "0" + minutes}:
        {seconds > 9 ? seconds : "0" + seconds}
      </span>
    )
  }
}

const CountDownWrapper = ({
  submitAnswers,
  endTime,
}: {
  submitAnswers: () => void
  endTime: number
}) => (
  <Countdown
    date={endTime}
    renderer={(props) => renderer({ ...props, submitAnswers })}
  />
)
const MemoCountdown = React.memo(CountDownWrapper)

const RandomTest = () => {
  const navigate = useNavigate()

  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [answersList, setAnswersList] = useState<(number | undefined)[]>([])
  const [endTime] = useState<number>(Date.now() + 7200000)
  const [isAllAnswered, setIsAllAnswered] = useState<boolean>(false)
  const [finalMark, setFinalMark] = useState<number | undefined>()
  const [finalResult, setFinalResult] = useState<FinalResultType | undefined>()

  const len: number = Math.floor(((currentQuestion + 1) * 100) / 50)

  const answerHandler = (index: number) => {
    const ans = [...answersList]
    ans[currentQuestion] = index
    setAnswersList(ans)
    if (!ans.includes(undefined) && ans.length === MockData.length) {
      setIsAllAnswered(true)
    }
  }

  const moveHandler = (state: boolean) => {
    if (
      (state && MockData[currentQuestion + 1]) ||
      (!state && MockData[currentQuestion - 1])
    ) {
      setCurrentQuestion((prev) => (state ? prev + 1 : prev - 1))
    }
  }

  const submitAnswers = () => {
    let mark: number = 0
    for (let i: number = 0; i < answersList.length; i++) {
      if (MockData[i].answer === answersList[i]) {
        mark += 2
      }
    }
    let result = { state: "", color: "" }
    if (mark >= 50) {
      result = { state: "ناجح", color: "text-green-600" }
    } else if (mark === 48) {
      result = { state: "ناجح مساعدة", color: "text-yellow-600" }
    } else {
      result = { state: "راسب", color: "text-red-600" }
    }
    setFinalResult(result)
    setFinalMark(mark)
  }

  return (
    <div className="mt-16">
      {!finalMark && finalMark !== 0 ? (
        <>
          <ProgressBar len={len} />

          <div className="p-4">
            <div className="flex justify-between">
              <h1 className="font-bold">
                السؤال رقم {MockData[currentQuestion].id + 1}:
              </h1>
              <MemoCountdown endTime={endTime} submitAnswers={submitAnswers} />
            </div>
            <p className="text-lg my-4">{MockData[currentQuestion].question}</p>
            <div className="flex flex-col">
              {MockData[currentQuestion].options.map((item, index) => (
                <button
                  key={index}
                  onClick={() => answerHandler(index)}
                  className="rounded-2xl p-2 py-4 m-2 my-4 bg-slate-200 option-btn active:shadow-none active:translate-y-2 cursor-pointer flex justify-start"
                  style={{
                    backgroundColor:
                      answersList[currentQuestion] === index
                        ? "rgb(134, 239, 172)"
                        : "",
                  }}
                >
                  <span className="mx-2">{index + 1}-</span>
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-evenly my-4">
            <button
              onClick={() => moveHandler(false)}
              className="option-btn py-2 px-4 border-2 rounded-2xl flex justify-between items-center text-xl w-32 active:shadow-none active:translate-y-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">
                arrow_forward_ios
              </span>
              Back
            </button>
            <button
              onClick={() => moveHandler(true)}
              className="option-btn py-2 px-4 border-2 rounded-2xl flex justify-between items-center text-xl w-32 active:shadow-none active:translate-y-2 cursor-pointer"
            >
              Next
              <span className="material-symbols-outlined text-xl">
                arrow_back_ios
              </span>
            </button>
          </div>

          {isAllAnswered ? (
            <div className="flex justify-center items-center my-8">
              <button
                onClick={() => submitAnswers()}
                className="bg-green-300 option-btn py-2 px-4 border-2 rounded-2xl flex justify-between items-center text-xl w-48 active:shadow-none active:translate-y-2 cursor-pointer"
              >
                تصحيح الإجابات
                <span className="material-symbols-outlined text-xl">
                  task_alt
                </span>
              </button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="flex flex-col justify-center w-screen items-center">
          <h1 className="my-8 font-bold text-2xl">نهاية الأسئلة</h1>
          <ResultTable correctCount={finalMark / 2} len={MockData.length} />
          <div className="text-xl w-full grid grid-cols-[2fr_1fr] pr-4">
            <div className="my-4">العلامة:</div>
            <div className="my-4">{finalMark === 48 ? "48+2" : finalMark}</div>
            <div className="my-4">النتيجة: </div>
            <div className={`my-4 font-bold text-lg ${finalResult?.color}`}>
              {finalResult?.state}
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="py-2 px-4 border-2 rounded-xl option-btn mt-8 active:shadow-none active:translate-y-2 cursor-pointer"
          >
            الصفحة الرئيسية
          </button>
        </div>
      )}
    </div>
  )
}

export default RandomTest

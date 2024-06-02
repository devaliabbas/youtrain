import React from "react"
import Countdown from "react-countdown"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabase"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"

import ProgressBar from "../components/ProgressBar"
import ResultTable from "../components/ResultTable"
import { Circles } from "react-loader-spinner"

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

const flagColors: {[key: string]: string} = {
  "شبكات": "bg-red-600",
  "برمجيات": "bg-green-600",
  "قواعد بيانات": "bg-blue-600",
  "ذكاء صنعي": "bg-purple-600",
  "خوارزميات": "bg-yellow-600"
}

const RandomTest = () => {
  const navigate = useNavigate()

  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [answersList, setAnswersList] = useState<(number | undefined)[]>([])
  const [endTime] = useState<number>(Date.now() + 7200000)
  const [isAllAnswered, setIsAllAnswered] = useState<boolean>(false)
  const [finalMark, setFinalMark] = useState<number | undefined>()
  const [finalResult, setFinalResult] = useState<FinalResultType | undefined>()
  const [questions, setQuestions] = useState<QuestionType[]>()

  const len: number = Math.floor(((currentQuestion + 1) * 100) / 50)

  const answerHandler = (index: number) => {
    if (!questions) return
    const ans = [...answersList]
    ans[currentQuestion] = index
    setAnswersList(ans)
    if (!ans.includes(undefined) && ans.length === questions.length) {
      setIsAllAnswered(true)
    }
  }

  const moveHandler = (state: boolean) => {
    if (!questions) return
    if (
      (state && questions[currentQuestion + 1]) ||
      (!state && questions[currentQuestion - 1])
    ) {
      setCurrentQuestion((prev) => (state ? prev + 1 : prev - 1))
    }
  }

  const submitAnswers = () => {
    if (!questions) return
    let mark: number = 0
    for (let i: number = 0; i < answersList.length; i++) {
      if (questions[i].answer === answersList[i]) {
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

  const getQuestions = async () => {
    const { data, error } = await supabase.rpc("random_questions", {
      q_limit: 50,
    })
    if (error) return
    setQuestions(data as QuestionType[])
  }

  useEffect(() => {
    getQuestions()
  }, [])

  return (
    <>
      {questions ? (
        <div className="mt-16">
          {!finalMark && finalMark !== 0 ? (
            <>
              <ProgressBar len={len} />

              <div className="p-4">
                <div className="flex justify-between">
                  <h1 className="font-bold">
                    {questions[currentQuestion].id + 1}#
                  </h1>
                  <MemoCountdown
                    endTime={endTime}
                    submitAnswers={submitAnswers}
                  />
                </div>
                <p className="text-lg my-4">
                  {questions[currentQuestion].question}
                </p>
                <div className="flex justify-start">
                  <div className={`rounded-xl text-white py-1 px-4 font-bold ${flagColors[questions[currentQuestion].flag]}`}>
                    {questions[currentQuestion].flag}
                  </div>
                </div>
                <div className="flex flex-col">
                  {questions[currentQuestion].options.map(
                    (item: string, index: number) => (
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
                    )
                  )}
                </div>
              </div>

              <div className="flex justify-evenly my-4">
                <button
                  onClick={() => moveHandler(false)}
                  className="option-btn py-2 px-4 border-2 rounded-2xl flex justify-between items-center text-xl w-32 active:shadow-none active:translate-y-2 cursor-pointer"
                >
                  <FaAngleRight 
                    size={25}
                  />
                  Back
                </button>
                <button
                  onClick={() => moveHandler(true)}
                  className="option-btn py-2 px-4 border-2 rounded-2xl flex justify-between items-center text-xl w-32 active:shadow-none active:translate-y-2 cursor-pointer"
                >
                  Next
                  <FaAngleLeft 
                    size={25}
                  />
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
              <ResultTable
                correctCount={finalMark / 2}
                len={questions.length}
              />
              <div className="text-xl w-full grid grid-cols-[2fr_1fr] pr-4">
                <div className="my-4">العلامة:</div>
                <div className="my-4">
                  {finalMark === 48 ? "48+2" : finalMark}
                </div>
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
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
    </>
  )
}

export default RandomTest

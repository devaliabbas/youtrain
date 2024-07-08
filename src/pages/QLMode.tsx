import { useState, useEffect, useCallback } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { getQuestions, getQuestionsWithFilter } from "../api"

import Question from "../components/Question"

import ResultTable from "../components/ResultTable"
import NextPopUp from "../components/NextPopUp"
import ProgressBar from "../components/ProgressBar"
import { Circles } from "react-loader-spinner"

const QLMode = () => {
  const navigate = useNavigate()
  const { state } = useLocation()

  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [isAnswered, setIsAnswered] = useState<boolean>(false)
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [correctCount, setCorrectCount] = useState<number>(0)
  const [selected, setSelected] = useState<number>()
  const [questions, setQuestions] = useState<QuestionType[]>()

  const nextHandler = () => {
    setCurrentQuestion((prev) => prev + 1)
    setIsAnswered(false)
    setSelected(undefined)
  }

  const len: number = questions
    ? Math.floor(((currentQuestion + 1) * 100) / questions.length)
    : 0

  const _getQuestions = useCallback(
    async (filter: boolean) => {
      const res = filter
        ? await getQuestionsWithFilter({
            year_q: state.data.year_q,
            session_q: state.data.session_q,
            specialization: state.data.specialization,
          })
        : await getQuestions(20)
      setQuestions(res as QuestionType[])
    },
    [state]
  )

  useEffect(() => {
    if (!state?.data) {
      _getQuestions(false)
    } else {
      _getQuestions(true)
    }
  }, [_getQuestions, state?.data])

  return (
    <div>
      {questions ? (
        <div className="mt-16">
          {questions[currentQuestion] ? (
            <>
              <ProgressBar len={len} />

              <Question
                question={questions![currentQuestion]}
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
          ) : questions.length === 0 ? (
            <div className="my-16 w-full h-72 flex-col flex justify-center items-center">
              <div className="text-xl font-bold">
                لا توجد أسئلة لهذه الدورة.
              </div>
              <button
                onClick={() => navigate("/lastexams")}
                className="py-2 px-4 border-2 rounded-xl option-btn mt-8 active:shadow-none active:translate-y-2 cursor-pointer"
              >
                إختر دورة أخرى
              </button>
            </div>
          ) : (
            <div className="flex flex-col justify-center w-screen items-center">
              <h1 className="my-12 font-bold text-2xl">نهاية الأسئلة</h1>
              <ResultTable
                correctCount={correctCount}
                len={questions ? questions.length : 0}
              />
              {state && state.data ? (
                <button
                  onClick={() => navigate("/lastexams")}
                  className="py-2 px-4 border-2 rounded-xl option-btn mt-8 active:shadow-none active:translate-y-2 cursor-pointer"
                >
                  إختر دورة أخرى
                </button>
              ) : (
                <button
                  onClick={() => navigate(0)}
                  className="py-2 px-4 border-2 rounded-xl option-btn mt-8 active:shadow-none active:translate-y-2 cursor-pointer"
                >
                  الجلسة التالية
                </button>
              )}
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
    </div>
  )
}

export default QLMode

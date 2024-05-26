import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabase"

import Question from "../components/Question"

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
  const [questions, setQuestions] = useState<QuestionType[]>()

  const nextHandler = () => {
    setCurrentQuestion((prev) => prev + 1)
    setIsAnswered(false)
    setSelected(undefined)
  }

  const len: number = questions
    ? Math.floor(((currentQuestion + 1) * 100) / questions.length)
    : 0

  const getQuestions = async () => {
    const { data, error } = await supabase.from("quick_learn_mode").select()
    if (error) {
      console.log(error)
      return
    }
    setQuestions(data as QuestionType[])
  }

  useEffect(() => {
    getQuestions()
  }, [])

  return (
    <div>
      <div className="mt-16">
        {questions && questions[currentQuestion] ? (
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
        ) : (
          <div className="flex flex-col justify-center w-screen items-center">
            <h1 className="my-12 font-bold text-2xl">نهاية الأسئلة</h1>
            <ResultTable
              correctCount={correctCount}
              len={questions ? questions.length : 0}
            />
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

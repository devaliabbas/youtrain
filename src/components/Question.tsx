type QuestionProps = {
  question: QuestionType
  isAnswered: boolean
  setIsAnswered: React.Dispatch<React.SetStateAction<boolean>>
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean>>
  setCorrectCount: React.Dispatch<React.SetStateAction<number>>
  selected: number | undefined
  setSelected: React.Dispatch<React.SetStateAction<number | undefined>>
}

const flagColors: { [key: string]: string } = {
  شبكات: "bg-red-600",
  برمجيات: "bg-green-600",
  "قواعد بيانات": "bg-blue-600",
  "ذكاء صنعي": "bg-purple-600",
  خوارزميات: "bg-yellow-600",
}

const Question = (props: QuestionProps) => {
  const answerHandler = (index: number) => {
    props.setSelected(index)

    if (props.question.answer === index) {
      props.setIsCorrect(true)
      props.setCorrectCount((prev) => prev + 1)
    } else {
      props.setIsCorrect(false)
    }
    props.setIsAnswered(true)
  }

  return (
    <div className="p-4 pb-2 mb-32">
      <div className="flex justify-between items-center mb-4 mt-2">
        <h1 className="font-bold">{props.question.id + 1}#</h1>
        <div
          className={`rounded-xl text-white py-1 px-4 font-bold ${
            flagColors[props.question.flag]
          }`}
        >
          {props.question.flag}
        </div>
      </div>
      <p className="text-xl mb-4 mt-2">{props.question.question}</p>
      <div className="flex justify-center items-center">
        {props.question.image && (
          <img src={`https://zprnrqfkzyzadjfqihgy.supabase.co/storage/v1/object/public/imageStorage/questionImages/${props.question.image}`} alt="question_image" className="my-4" />
        )}
      </div>
      <div className="flex flex-col">
        {props.question.options.map((item: string, index: number) => (
          <button
            key={index}
            style={{
              backgroundColor:
                props.selected === index
                  ? props.selected === props.question.answer
                    ? "rgb(134 239 172)"
                    : "rgb(253 164 175)"
                  : index === props.question.answer && props.isAnswered
                  ? "rgb(134 239 172)"
                  : "",
            }}
            onClick={() => answerHandler(index)}
            className="rounded-2xl p-2 py-4 m-2 my-4 bg-slate-200 option-btn active:shadow-none active:translate-y-2 cursor-pointer flex justify-start"
            disabled={props.isAnswered}
          >
            <span className="mx-2">{index + 1}-</span>
            <span>{item}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Question

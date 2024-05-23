type QuestionProps = {
  question: MockDataType
  isAnswered: boolean
  setIsAnswered: React.Dispatch<React.SetStateAction<boolean>>
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean>>
  setCorrectCount: React.Dispatch<React.SetStateAction<number>>
  selected: number | undefined
  setSelected: React.Dispatch<React.SetStateAction<number | undefined>>
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
    <div className="p-4">
      <h1 className="font-bold">السؤال رقم {props.question.id + 1}:</h1>
      <p className="text-xl my-4">{props.question.question}</p>
      <div className="flex flex-col">
        {props.question.options.map((item, index) => (
          <button
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

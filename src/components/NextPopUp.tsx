type NextPopUpProps = {
    isCorrect: boolean
    isAnswered: boolean
    nextHandler: () => void
}

const NextPopUp = (props: NextPopUpProps) => {
  return (
    <div
      className={`${props.isCorrect ? "bg-green-100" : "bg-red-100"} ${
        props.isAnswered ? "opacity-100 left-0" : "opacity-0 left-full"
      } absolute bottom-0 w-screen h-52 rounded-t-3xl flex flex-col justify-between py-8 duration-300 transition-all`}
    >
      <div className="flex justify-center items-center">
        <h1
          className={`text-2xl ${
            props.isCorrect ? "text-green-700" : "text-red-700"
          }`}
        >
          {props.isCorrect ? "إجابة صحيحة !" : "إجابة خاطئة ..."}
        </h1>
      </div>
      <div
        onClick={props.nextHandler}
        className="text-xl flex justify-center items-center rounded-2xl my-2 mx-4 py-2 option-btn active:shadow-none active:translate-y-2 cursor-pointer bg-white"
      >
        <h1
          className={`text-2xl ${
            props.isCorrect ? "text-green-700" : "text-red-700"
          }`}
        >
          التالي
        </h1>
      </div>
    </div>
  )
}

export default NextPopUp

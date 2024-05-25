type ResultTableProps = {
    len: number
    correctCount: number
}

const ResultTable = (props: ResultTableProps) => {
  return (
    <div className="text-xl w-full grid grid-cols-[2fr_1fr] pr-4">
      <div className="my-4">عدد الأسئلة:</div>
      <div className="my-4">{props.len}</div>
      <div className="my-4">إجابات صحيحة:</div>
      <div className="my-4">{props.correctCount}</div>
      <div className="my-4">نسبة الإجابات الصحيحة:</div>
      <div className="my-4">
        {Math.floor((props.correctCount * 100) / props.len)}%
      </div>
      <div className="my-4">إجابات خاطئة:</div>
      <div className="my-4">{props.len - props.correctCount}</div>
      <div className="my-4">نسبة الإجابات الخاطئة: </div>
      <div className="my-4">
        {Math.floor(((props.len - props.correctCount) * 100) / props.len)}
        %
      </div>
    </div>
  )
}

export default ResultTable

type ProgressBarProps = {
    len: number
}

const ProgressBar = (props: ProgressBarProps) => {
  return (
    <div
      className="h-2 bg-green-500 transition-all duration-500"
      style={{ width: `${props.len}%` }}
    ></div>
  )
}

export default ProgressBar

import { FaAngleLeft } from "react-icons/fa6"

type HomeButtonProps = {
    title: string
    func: () => void
}

const HomeButton = (props: HomeButtonProps) => {
  return (
    <div onClick={props.func} className="bg-white rounded-2xl m-4 mt-6 h-14 flex justify-between items-center px-4 option-btn active:shadow-none active:translate-y-2 cursor-pointer">
      <p className="font-bold">{props.title}</p>
      <FaAngleLeft 
        size={25}
      />
    </div>
  )
}

export default HomeButton

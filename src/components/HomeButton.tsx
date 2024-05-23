type HomeButtonProps = {
    title: string
    func: () => void
}

const HomeButton = (props: HomeButtonProps) => {
  return (
    <div onClick={props.func} className="bg-white rounded-2xl m-4 mt-6 h-14 flex justify-between items-center px-4 option-btn active:shadow-none active:translate-y-2 cursor-pointer">
      <p className="font-bold">{props.title}</p>
      <span className="material-symbols-outlined text-3xl">arrow_back_ios</span>
    </div>
  )
}

export default HomeButton

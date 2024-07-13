import { useNavigate } from "react-router-dom"

type DrawerPropsType = {
  isDrawerOpen: boolean
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
  signOut: () => void
}

const Drawer = (props: DrawerPropsType) => {
  const { isDrawerOpen, setIsDrawerOpen, signOut } = props
  const navigate = useNavigate()
  return (
    <>
      {isDrawerOpen && (
        <div className="overlay" onClick={() => setIsDrawerOpen(false)}></div>
      )}
      <div
        className={`drawer ${
          isDrawerOpen ? "drawer-open" : "drawer-closed"
        } bg-slate-100 w-64 border-l-2 text-lg transition-all duration-300 ease-in-out fixed top-0 h-full p-4 flex justify-between flex-col items-start right-0`}
      >
        <div className="w-full">
          <div className="my-2 w-full">
            <button className="w-full text-right">الحساب</button>
          </div>
          <div className="border-b-2 w-full"></div>
          <div className="my-2 w-full">
            <button
              className="w-full text-right"
              onClick={() => {
                navigate("/settings")
                setIsDrawerOpen((prev) => !prev)
              }}
            >
              الإعدادات
            </button>
          </div>
          <div className="border-b-2 w-full"></div>
        </div>
        <div className="w-full">
          <div className="border-b-2 w-full"></div>
          <div className="my-2 w-full">
            <button className="w-full text-right" onClick={signOut}>
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Drawer

import { Link, useNavigate } from "react-router-dom"
import { FaBars } from "react-icons/fa6"
import { useState, useEffect } from "react"
import "./css/NavBar.css"
import Drawer from "./Drawer"

const NavBar = () => {
  const navigate = useNavigate()
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const token = window.localStorage.getItem('token')
  const [isNavHidden, setIsNavHidden] = useState(false)

  const signOut = () => {
    window.localStorage.removeItem('token')
    navigate('/signin')
    setIsDrawerOpen(false)
  }

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.classList.add("no-scroll")
    } else {
      document.body.classList.remove("no-scroll")
    }

    if (token) {
      setIsNavHidden(false)
    } else {
      setIsNavHidden(true)
    }
  }, [isDrawerOpen, token])

  return (
    <div className={`fixed h-16 border-b-2 top-0 w-full bg-white z-20 ${isNavHidden ? 'hidden' : ''}`}>
      
      <Drawer 
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        signOut={signOut}
      />

      <div className="flex justify-between items-center h-full mx-4">
        <FaBars
          size={25}
          onClick={() => {
            setIsDrawerOpen((prev) => !prev)
          }}
          className="cursor-pointer"
        />
        <Link to={"/"}>
          <h1 className="font-bold text-2xl">YouTrain</h1>
        </Link>
      </div>
    </div>
  )
}

export default NavBar

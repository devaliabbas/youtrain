import { Link } from "react-router-dom"

import { FaBars } from "react-icons/fa6"

const NavBar = () => {
  return (
    <div className="h-16 border-b-2 top-0 absolute w-full bg-white">
      <div className="flex justify-between items-center h-full mx-4">
        <FaBars 
          size={25}
        />
        <Link to={'/'}>
          <h1 className="font-bold text-2xl">YouTrain</h1>
        </Link>
      </div>
    </div>
  )
}

export default NavBar
import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <div className="h-16 border-b-2 top-0 absolute w-full bg-white">
      <div className="flex justify-between items-center h-full mx-4">
        <span className="material-symbols-outlined text-3xl">menu</span>
        <Link to={'/'}>
          <h1 className="font-bold text-2xl">GoTest</h1>
        </Link>
      </div>
    </div>
  )
}

export default NavBar
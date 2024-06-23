import { useAuth } from "../auth/useAuth"

import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

const Layout = () => {
  const { user } = useAuth()

  return (
    <>
      {user && <NavBar />}
      <Outlet />
    </>
  )
}

export default Layout

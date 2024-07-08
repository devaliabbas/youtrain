import { ReactNode } from "react"
import { Navigate, Outlet } from "react-router-dom"

interface ProtectedRouteProps {
  children?: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = window.localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/signin" replace />
  }

  return children ? <>{children}</> : <Outlet />
}

export default ProtectedRoute

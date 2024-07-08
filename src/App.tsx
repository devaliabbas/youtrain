import { Route, Routes } from "react-router-dom"

import Layout from "./pages/Layout"
import Home from "./pages/Home"
import Settings from "./pages/Settings"
import NotFound from "./pages/NotFound"
import QLMode from "./pages/QLMode"
import RandomTest from "./pages/RandomTest"
import LastExams from "./pages/LastExams"
import Dashboard from "./pages/Dashboard"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="settings" element={<Settings />} />
          <Route path="qlmode" element={<QLMode />} />
          <Route path="randomtest" element={<RandomTest />} />
          <Route path="lastexams" element={<LastExams />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App

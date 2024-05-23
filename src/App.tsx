import { Route, Routes } from "react-router-dom"

import Layout from "./pages/Layout"
import Home from "./pages/Home"
import Settings from "./pages/Settings"
import NotFound from "./pages/NotFound"
import CLMode from "./pages/CLMode"
import RandomTest from "./pages/RandomTest"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path="settings" element={<Settings />}/>
        <Route path="clmode" element={<CLMode />}/>
        <Route path="randomtest" element={<RandomTest />} />
        <Route path="*" element={<NotFound />}/>
      </Route>
    </Routes>
  )
}

export default App
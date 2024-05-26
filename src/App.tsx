import { Route, Routes } from "react-router-dom"

import Layout from "./pages/Layout"
import Home from "./pages/Home"
import Settings from "./pages/Settings"
import NotFound from "./pages/NotFound"
import QLMode from "./pages/QLMode"
import RandomTest from "./pages/RandomTest"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path="settings" element={<Settings />}/>
        <Route path="qlmode" element={<QLMode />}/>
        <Route path="randomtest" element={<RandomTest />} />
        <Route path="*" element={<NotFound />}/>
      </Route>
    </Routes>
  )
}

export default App
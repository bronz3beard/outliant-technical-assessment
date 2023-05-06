import { FC } from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import { MainRoutes, mainRoutes } from "./pageRoutes"

const App: FC = () => {
  const getRouteData = (): MainRoutes[] => mainRoutes

  return (
    <Router>
      <Routes>
        {getRouteData().map((item) => (
          <Route {...item} key={item.path} />
        ))}
      </Routes>
    </Router>
  )
}

export default App

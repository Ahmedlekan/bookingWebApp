import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Layout from "./layouts/Layout"
import Register from "./pages/Register"


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><span>Home page</span></Layout>} />
        <Route path="/search" element={<Layout><span>Search page</span></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App

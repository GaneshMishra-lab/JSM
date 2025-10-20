import { Routes, Route, HashRouter } from 'react-router-dom'
import BillForm from './pages/BillEntityForm'
import Nav from './components/Nav'
import BillPage from './pages/BillPage'
import Home from './pages/Home'
import BillDetailsPage from './pages/BillDetailsPage'
function App() {
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path="/add-bill" element={<BillForm />} />
        <Route path="/bill" element={<BillPage />} />
        <Route path="/bill/:id" element={<BillDetailsPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  )
}

export default App

import { Routes, Route, HashRouter } from 'react-router-dom'
import BillForm from './components/form/BillEntityFrom.bill'
import Nav from './components/Nav'
import BillPage from './pages/BillPage'
import Home from './pages/Home'
function App() {
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path="/add-bill" element={<BillForm />} />
        <Route path="/bill" element={<BillPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  )
}

export default App

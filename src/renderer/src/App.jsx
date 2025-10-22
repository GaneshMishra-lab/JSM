import { Routes, Route, HashRouter } from 'react-router-dom'
import BillForm from './pages/BillEntityForm'
import Nav from './components/Nav'
import BillPage from './pages/BillPage'
import Home from './pages/Home'
import BillDetailsPage from './pages/BillDetailsPage'
import InventoryPage from './pages/InventoryPage'
import PurchaseItemPage from './pages/PurchaseItemPage'
function App() {
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path="/add-bill" element={<BillForm />} />
        <Route path="/bill" element={<BillPage />} />
        <Route path="/bill/:id" element={<BillDetailsPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/purchase" element={<PurchaseItemPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App

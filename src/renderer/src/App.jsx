import { Routes, Route, HashRouter } from 'react-router-dom'
import BillForm from './pages/bill/BillEntityForm'
import Nav from './components/Nav'
import BillPage from './pages/bill/BillPage'
import Home from './pages/Home'
import BillDetailsPage from './pages/bill/BillDetailsPage'
import InventoryPage from './pages/inventory/InventoryPage'
import PurchaseItemPage from './pages/purchase/PurchaseItemPage'
import PurchaseItemByName from './pages/purchase/PurchaseItemByName'
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
        <Route path="/purchase/:metal/:name" element={<PurchaseItemByName />} />
      </Routes>
    </HashRouter>
  )
}

export default App

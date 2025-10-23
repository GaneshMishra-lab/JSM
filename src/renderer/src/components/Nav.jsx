import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Sales', link: '/sales' },
  { name: 'Purchase', link: '/purchase' },
  { name: 'Bill', link: '/bill' },
  { name: 'Inventory', link: '/inventory' }
]

const Nav = () => {
  const [selectedItem, setSelectedItem] = useState('Home')
  const nav = useNavigate()
  return (
    <div className="fixed top-0 left-0 w-[100vw] ">
      <nav className="bg-gray-800 my-8 px-8 py-4 rounded-full max-w-fit mx-auto">
        <ul className="flex list-none m-0 p-0">
          {navItems.map((item) => (
            <li key={item.name} className="mr-8">
              <span
                onClick={() => {
                  nav(`${item.link}`)
                  setSelectedItem(item.name)
                }}
                className={` font-bold text-xl cursor-pointer ${selectedItem === item.name ? 'text-amber-400 underline' : 'text-white  '}`}
              >
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Nav

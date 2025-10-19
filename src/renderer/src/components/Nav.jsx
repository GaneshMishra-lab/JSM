import { useNavigate } from 'react-router-dom'
const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Sales', link: '/sales' },
  { name: 'Purchase', link: '/bill' },
  { name: 'Inventory', link: '/inventory' }
]

const Nav = () => {
  const nav = useNavigate()
  return (
    <div className="fixed top-0 left-0 w-[100vw] ">
      <nav className="bg-gray-800 my-8 px-8 py-4 rounded-full max-w-fit mx-auto">
        <ul className="flex list-none m-0 p-0">
          {navItems.map((item) => (
            <li key={item.name} className="mr-8">
              <span
                onClick={() => nav(`${item.link}`)}
                className="text-white no  -underline font-bold text-xl cursor-pointer"
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

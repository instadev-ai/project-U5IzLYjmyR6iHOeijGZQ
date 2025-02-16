import { cn } from "@/lib/utils"
import { BarChart2, Coins, Home, LineChart, Settings, Wallet } from "lucide-react"
import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="hidden border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:block">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b px-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
            <Coins className="h-6 w-6" />
            <span className="text-primary">CryptoView</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {items.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                item.href === "/" ? "bg-accent" : "transparent"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
        <div className="border-t p-4">
          <Link
            to="/settings"
            className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

const items = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    title: "Markets",
    icon: BarChart2,
    href: "/markets",
  },
  {
    title: "Trading",
    icon: LineChart,
    href: "/trading",
  },
  {
    title: "Wallet",
    icon: Wallet,
    href: "/wallet",
  },
]

export default Sidebar
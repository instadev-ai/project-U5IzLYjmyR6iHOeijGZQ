import { cn } from "@/lib/utils"
import { BarChart2, Coins, Home, LineChart, Settings, Wallet } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"

const Sidebar = () => {
  const location = useLocation()

  const sidebarVariants = {
    hidden: { x: -250 },
    visible: { 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className="hidden lg:block w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="flex h-full flex-col">
        <motion.div 
          variants={itemVariants}
          className="flex h-16 items-center border-b px-6"
        >
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
            <Coins className="h-6 w-6 text-primary" />
            <span className="text-primary">CryptoView</span>
          </Link>
        </motion.div>
        <nav className="flex-1 space-y-1 p-4">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              custom={index}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  location.pathname === item.href 
                    ? "bg-accent text-accent-foreground" 
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            </motion.div>
          ))}
        </nav>
        <div className="border-t p-4">
          <motion.div variants={itemVariants}>
            <Link
              to="/settings"
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                location.pathname === "/settings" 
                  ? "bg-accent text-accent-foreground" 
                  : "text-muted-foreground"
              )}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
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